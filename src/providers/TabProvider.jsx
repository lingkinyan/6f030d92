import React, { useState, createContext } from "react";
import { Tabs } from "../constants/tabs";

export const TabContext = createContext({
  currentTab: Object.keys(Tabs)[0],
  setCurrentTab: () => {},
});

function TabProvider({ children }) {
  const [tab, setTab] = useState(Object.keys(Tabs)[0]);
  return (
    <TabContext.Provider
      value={{
        currentTab: tab,
        setCurrentTab: setTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export default TabProvider;
