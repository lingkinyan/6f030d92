import React, { useEffect, useState, createContext } from "react";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

import { BASE_URL, GET_CALLS, RESET } from "../endpoints.js";

const fetcher = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export const CallContext = createContext({
  data: [],
  isLoading: false,
});

function CallProvider({ children }) {
  const [info, setInfo] = useState({
    data: [],
    isLoading: false,
  });

  const { data, isLoading, isValidating } = useSWR(
    BASE_URL.concat(GET_CALLS),
    fetcher
  );

  console.log(isValidating)
  useEffect(() => {
    // setInfo({
    //   data:[
    //     {
    //       "direction": "inbound",
    //       "from": 1,
    //       "to": 2,
    //       "via": 1,
    //       "duration": 0,
    //       "is_archived": true,
    //       "call_type": "answered",
    //       "id": "6685a0df24a7a79ae0c50f8f",
    //       "created_at": "2024-07-03T05:05:03.506Z"
    //     },
    //     {
    //       "direction": "inbound",
    //       "from": 1,
    //       "to": 2,
    //       "via": 1,
    //       "duration": 0,
    //       "is_archived": true,
    //       "call_type": "answered",
    //       "id": "6685a0df24a7a79ae0c50f8f",
    //       "created_at": "2024-07-03T23:05:03.506Z"
    //     },
    //     {
    //       "direction": "inbound",
    //       "from": 1,
    //       "to": 2,
    //       "via": 1,
    //       "duration": 0,
    //       "is_archived": true,
    //       "call_type": "answered",
    //       "id": "6685a0df24a7a79ae0c50f8f",
    //       "created_at": "2024-07-03T19:05:03.506Z"
    //     },
    //     {
    //       "direction": "outbound",
    //       "from": 2,
    //       "to": 1,
    //       "via": 1,
    //       "duration": 0,
    //       "is_archived": true,
    //       "call_type": "answered",
    //       "id": "6685b79524326ad725d48041",
    //       "created_at": "2024-07-03T20:41:57.436Z"
    //     },
    //     {
    //       "direction": "outbound",
    //       "from": 2,
    //       "to": 1,
    //       "via": 1,
    //       "duration": 0,
    //       "is_archived": true,
    //       "call_type": "answered",
    //       "id": "6685b79524326ad725d48041",
    //       "created_at": "2024-07-04T20:41:57.436Z"
    //     },
    //     {
    //       "direction": "outbound",
    //       "from": 2,
    //       "to": 1,
    //       "via": 1,
    //       "duration": 0,
    //       "is_archived": true,
    //       "call_type": "answered",
    //       "id": "6685b79524326ad725d48041",
    //       "created_at": "2024-07-04T20:41:57.436Z"
    //     }
    //   ],
    //   isLoading: false,
    // })
    if (data) setInfo({ data, isLoading: isLoading && isValidating });
    else setInfo({ data: [], isLoading: false });
  }, [data]);

  return <CallContext.Provider value={info}>{children}</CallContext.Provider>;
}

export default CallProvider;
