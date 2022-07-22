import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Project() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false);
    return(
        <>
        <Button variant="outlined" size="large" sx={{ color: 'black', borderColor: 'black', '&:hover': { borderColor: '#ffb854', color: '#ffb854', } }} onClick={handleClickOpen}>
            Create
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"New Project"}
        </DialogTitle>
        <DialogContent>
        <Box component="form" noValidate autoComplete="off">
        <TextField fullWidth margin="normal"  id="outlined-Summary" label="Name" variant="outlined"/>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </>

    )
}