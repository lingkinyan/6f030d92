import React, { useContext } from "react";

import { Box, Tabs, Tab } from "@mui/material";
import { TabContext } from '../../providers/TabProvider.jsx'
import { Tabs as TABS} from '../../constants/tabs';
import AirCall from "./AirCall.jsx"
import TuneIcon from '@mui/icons-material/Tune';


const Header = () => {
  const { currentTab, setCurrentTab } = useContext(TabContext);
  console.log(TABS)

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={currentTab}
        onChange={(e, val) => setCurrentTab(val)}
        aria-label="lab API tabs example"
        variant="fullWidth"
      >
        <Tab disabled icon={<AirCall />} />
        {Object.values(TABS).map((tab) => (
          <Tab
            key={tab}
            label={tab.replace('_', ' ')}
            value={tab}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
              fontSize: '0.6rem',
              minWidth: '80px',
              padding: 0
            }}
          />
        ))}
        <Tab disabled icon={<TuneIcon />} />
      </Tabs>
    </Box>
  );
};

export default Header;
