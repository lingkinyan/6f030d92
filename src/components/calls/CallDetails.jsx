import React from "react";
import Typography from "@mui/material/Typography";

import Item from "../common/Item.jsx";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import VoicemailIcon from "@mui/icons-material/Voicemail";

function CallDetails({
  is_archived,
  direction,
  duration,
  call_type,
  createdAt,
  onClick,
  from,
  to,
  via,
  count,
}) {
  const displayIcon = {
    inbound: {
      answered: <PhoneCallbackIcon color="green" />,
      missed: <PhoneMissedIcon color="red" />,
      voicemail: <VoicemailIcon color="red" />,
    },
    outbound: {
      answered: <PhoneForwardedIcon color="green" />,
      missed: <PhoneForwardedIcon color="green" />,
      voicemail: <PhoneForwardedIcon color="green" />,
    },
  }[direction][call_type];

  const commonStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  return (
    <Grid
      container
      p={1}
      my={1}
      alignItems="center"
      sx={{
        backgroundColor: is_archived ? "grey" : "green",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      <Grid item xs={2} sx={{ position: 'relative' }}>
        <Item>{displayIcon}</Item>
        { count && (
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <Typography variant="subtitle">
              x{count}
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid item flex={1} p={1}>
        <Typography sx={commonStyle}>{`${via} ${from}`}</Typography>
        <Typography sx={commonStyle}>tried to call on {to}</Typography>
      </Grid>
      <Grid item justifySelf="flex-end" xs={3} container>
        <Item>
          <Box>
            {createdAt}
          </Box>
          <Box>
            <Typography variant="subtitle">
              {
                Math.floor(duration / 60)
                ? `${Math.floor(duration / 60)}m ${duration % 60}s`
                : `${duration % 60}s`
              }
            </Typography>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}

export default CallDetails;
