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

  useEffect(() => {
    if (data) setInfo({ data, isLoading: isLoading && isValidating });
    else setInfo({ data: [], isLoading: false });
  }, [data]);

  return <CallContext.Provider value={info}>{children}</CallContext.Provider>;
}

export default CallProvider;
