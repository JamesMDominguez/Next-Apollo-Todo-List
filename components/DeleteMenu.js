import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

export default function LongMenu() {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [stateStack, setStateSnack] = useState({
    open: false,
    Transition: Slide,
  });

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(false)
  };

  const handleClickOpen = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setOpen(true);
    console.log(open);
  };

  const handleCloseAlert = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setOpen(false);
    setAnchorEl(null);
    setOpenMenu(false);
    console.log("12");
  };

  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
    console.log("67");
  };

  function SlideTransition(props) {
    console.log(props)
    return <Slide {...props} direction="up" />;
  }

  const handleClickSnack = (e, Transition) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setStateSnack({
      open: true,
      Transition,
    });
    setOpen(false);
    setOpenMenu(false);
    setTimeout(()=>{
        setStateSnack({
            open: false,
            Transition,
          })
    }, 1000)
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={anchorEl ? "long-menu" : undefined}
        aria-expanded={anchorEl ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleClickOpen}>
          <div variant="outlined">Delete</div>
        </MenuItem>
      </Menu>

      <Dialog
        open={open}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you would like to delete this task?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Disagree</Button>
          <Button onClick={(e) => handleClickSnack(e, SlideTransition)}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={stateStack.open}
        TransitionComponent={stateStack.Transition}
        message="Message Deleted"
        key={stateStack.Transition.name}
      />
    </div>
  );
}
