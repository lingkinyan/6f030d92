import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useSWRConfig } from "swr";
import axios from "axios";
const { DateTime } = require("luxon");
const isEmpty = require('lodash.isempty');

import { BASE_URL, GET_CALLS } from "../../endpoints.js";
import callGrouping from "../../utilities/callGrouping.js"
import CallRecord from "../../constants/propTypes/CallRecord.js"

import CallDetails from "./CallDetails.jsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

function CallBlock({ date, records }) {
  const { mutate } = useSWRConfig();
  const [target, setTarget] = useState({});
  const [sorted, setSorted] = useState(records);

  const handleOnConfirmation = async ({ id, isArchived }) => {
    await axios.patch(BASE_URL.concat(GET_CALLS).concat(`/${id}`), { is_archived: isArchived ? false : true });
    mutate(BASE_URL.concat(GET_CALLS));
    setTarget({});
  }

  useEffect(() => {
    if(records.length) {
      const sorted = records
        .sort((a,b) => a.created_at > b.created_at ? 1 : -1)
        .map((record) => ({ ...record, createdAt: DateTime.fromISO(record.created_at).toFormat("hh:mm a") }))
      setSorted(callGrouping(sorted))
    }
  }, [records])

  return (
    <Box my={1}>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>{date}</Typography>
      {sorted.map((record) => (
        <CallDetails
          key={record.id}
          onClick={() => setTarget({ id: record.id, isArchived: record.is_archived })}
          {...record}
        />
      ))}
      {target && (
        <Dialog open={!isEmpty(target)} onClose={() => setTarget({})}>
          <DialogTitle id="alert-dialog-title">
            {target.isArchived ? "Unarchiving" : "Archiving"} the chat
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to{" "}
              {target.isArchived ? "unarchive" : "archive"} the chats ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTarget({})}>No</Button>
            <Button onClick={() => handleOnConfirmation(target)}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

CallBlock.propTypes = {
  date: PropTypes.string.isRequired,
  records: PropTypes.arrayOf(PropTypes.shape(CallRecord)).isRequired,
}

export default CallBlock;
