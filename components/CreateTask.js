import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


export default function Task() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false);
    return (
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
                    Task
                </DialogTitle>
                <DialogContent>

                    <Box component="form" noValidate autoComplete="off">
                        <TextField fullWidth margin="normal"  id="outlined-Summary" label="Summary" variant="outlined"/>
                        <TextField fullWidth margin="normal"  id="outlined-Description" label="Description" variant="outlined" multiline />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Priority"
                            >
                                <MenuItem value="Lowest">Lowest</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Highest">Highest</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Status"
                            >
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Todo">Low</MenuItem>
                                <MenuItem value="Done">Medium</MenuItem>
                            </Select>
                        </FormControl>
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