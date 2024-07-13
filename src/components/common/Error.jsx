import React from "react";
import Grid from "@mui/material/Grid";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";

function Error() {
  return (
    <Grid
      item
      xs={12}
      flex="1"
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <ErrorIcon color="error" />
        <Grid item>
          <Typography variant="subtitle">
            Sorry, we are encountering some issues right now
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle">Please try later.</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Error;
