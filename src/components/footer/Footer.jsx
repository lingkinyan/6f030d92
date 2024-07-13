import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import {CallContext} from '../../providers/CallProvider.jsx'

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DialpadIcon from '@mui/icons-material/Dialpad';
import { Typography } from '@mui/material';

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
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={5} container>
                <Grid item xs={6} sx={{ position: 'relative '}}>
                    <Typography sx={{ position: 'absolute', top: "-100%", right: 0 }}>{ displayingCount }</Typography>
                    <BottomNavigationAction icon={<LocalPhoneIcon />} />
                </Grid>
                <Grid item xs={6}>
                    <BottomNavigationAction icon={<PersonIcon />} />
                </Grid>
            </Grid>
            <Grid item xs={5} container>
                <Grid item xs={6}>
                    <BottomNavigationAction icon={<BrightnessLowIcon />} />
                </Grid>
                <Grid item xs={6}>
                    <BottomNavigationAction icon={<FiberManualRecordIcon />} />
                </Grid>
            </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" sx={{
            position: 'absolute',
            top:"-50%",
            textAlign: "center",
            backgroundColor: 'rgb(105, 189, 65)',
            borderRadius: '400%',
            width: 60,
            height: 60,
        }}>
            <DialpadIcon fontSize='large'/>
        </Grid>
      </BottomNavigation>
    </Box>
  );
}

export default Footer