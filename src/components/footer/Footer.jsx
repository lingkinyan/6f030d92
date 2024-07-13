import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import {CallContext} from '../../providers/CallProvider.jsx'

import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DialpadIcon from '@mui/icons-material/Dialpad';
import { Typography } from '@mui/material';

const DialButton = styled(BottomNavigationAction)({
  position: 'absolute',
  top:"-20%",
  zIndex: 10,
  backgroundColor: 'rgb(105, 189, 65)',
  borderRadius: '400%',
  minWidth: 40,
  width: 40,
  height: 40,
  padding: 0,
});

function Footer() {
  const { displayingCount } = useContext(CallContext);
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: 'relative '}}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction icon={<LocalPhoneIcon />} />
        <BottomNavigationAction disabled icon={<PersonIcon />} />
        <DialButton icon={<DialpadIcon />}/>
        <BottomNavigationAction disabled icon={<BrightnessLowIcon />} />
        <BottomNavigationAction disabled icon={<FiberManualRecordIcon />} />
      </BottomNavigation>
      <Typography sx={{ position: 'absolute', top: "0", left: "20%" }}>{ displayingCount }</Typography>
    </Box>
  );
}

export default Footer