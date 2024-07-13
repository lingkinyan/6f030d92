import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";

const { DateTime } = require("luxon");
import { BASE_URL, GET_CALLS, RESET } from "../../endpoints.js";
import { useSWRConfig } from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
const isEmpty = require('lodash.isempty');

import Item from '../common/Item.jsx'
import AllChatsActions from "./AllChatsActions.jsx";
import CallBlock from "./CallBlock.jsx";
import Error from "../common/Error.jsx";
import {CallContext} from '../../providers/CallProvider.jsx'
import { TabContext } from '../../providers/TabProvider.jsx'
import { Tabs } from '../../constants/tabs.js'

function ListCalls() {
  const { data, isLoading, setDisplayingCount, error } = useContext(CallContext);
  const { currentTab } = useContext(TabContext);
  const [ count, setCount ] = useState(0);
  const [ calls, setCalls ] = useState([]);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if(data.length) {
      let archivedCount = 0;
      const filteredData = data
        .filter((call) => {
          if (currentTab === Tabs.INBOX) return !call.is_archived;
          if (call.is_archived) archivedCount ++;
          return true;
        })
      const mappedData = filteredData.map((call) => ({
          ...call,
          createdDate: DateTime.fromISO(call.created_at).toFormat(
            "MMMM dd, yyyy"
          ),
        }))
        .reduce((acc, curr) => {
          const exist = acc[curr.createdDate] || [];
          exist.push(curr);
          acc[curr.createdDate] = exist;
          return acc;
        }, {});
      setCalls(mappedData);
      setCount(currentTab === Tabs.INBOX ? filteredData.length : archivedCount);
      setDisplayingCount(filteredData.length)
    }
  }, [currentTab, data])

  const archiveAll = useCallback(async () => {
    if(data) {
      const ids = Object.values(data).map((call) => call.id)
      for( const id of ids) {
        await axios.patch(BASE_URL.concat(GET_CALLS).concat(`/${id}`), { is_archived: true })
      }
      mutate(BASE_URL.concat(GET_CALLS));
    }
  }, [currentTab, data])

  const unArchiveAll = async () => {
    await axios.patch(BASE_URL.concat(RESET));
    mutate(BASE_URL.concat(GET_CALLS));
  }

  if(!isEmpty(error)) return <Error />
  else if(isLoading) return <CircularProgress />
  return (
    <main>
      {
        Object.entries(calls).length ? (
          <>
            <AllChatsActions count={count} onUnarchive={() => unArchiveAll()} onArchive={() => archiveAll()}/>
            {Object.entries(calls).map(([date, value], index) => (
              <CallBlock key={index} date={date} records={value} />
            ))}
          </>
        ) : (
          <Item>
            <Typography>You do not have any call</Typography>
          </Item>
        )
      }  
    </main>
  );
}

export default ListCalls;
