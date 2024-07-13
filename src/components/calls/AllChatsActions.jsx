import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Item from "../common/Item.jsx";
import { Tabs } from "../../constants/tabs.js";
import { TabContext } from "../../providers/TabProvider.jsx";

function AllChatsActions({ onUnarchive, onArchive }) {
  const { currentTab } = useContext(TabContext);
  const [open, setOpen] = useState(false);
  const [ content, setContent ] = useState({});

  useEffect(() => {
    let temp = {};
    switch (currentTab) {
      case (Tabs.INBOX): {
        temp = {
          icon: <ArchiveIcon />,
          displayText: "Archive",
          dialogTitle: "Archiving",
        }
        break;
      }
      default: {
        temp = {
          icon: <UnarchiveIcon />,
          displayText: "Unarchive",
          dialogTitle: "Unarchiving",
        }
        break;
      }
    }
    setContent(temp)
  }, [currentTab])

  const handleOnConfirmation = () => {
    if (currentTab === Tabs.INBOX) onArchive();
    else onUnarchive();
    setOpen(false);
  };



  return (
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
          {content.icon}
        </Grid>
        <Grid item>
          <Typography>
            {content.displayText} all calls
          </Typography>
        </Grid>
      </Grid>
      {open && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle id="alert-dialog-title">
            {content.dialogTitle} all chats
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to{" "}
              {content.displayText.toLowerCase()} all chats ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>No</Button>
            <Button onClick={handleOnConfirmation}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </Item>
  );
}

export default AllChatsActions;
