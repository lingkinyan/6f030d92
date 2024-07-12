import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ArchiveIcon from "@mui/icons-material/Archive";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Item from "../common/Item.jsx";

function ArchiveAllChats({ onConfirm }) {
  const [open, setOpen] = useState(false);
  const handleOnConfirmation = () => {
    onConfirm();
    setOpen(false);
  }
  return (
    <section>
      <Item>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => setOpen(true)}
        >
          <Grid item xs={2}>
            <ArchiveIcon />
          </Grid>
          <Grid item>
            <Typography>Archive all calls</Typography>
          </Grid>
        </Grid>
      </Item>
      {open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle id="alert-dialog-title">
            Archiving all chats
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to archive all chats ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>No</Button>
            <Button onClick={handleOnConfirmation}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </section>
  );
}

export default ArchiveAllChats;
