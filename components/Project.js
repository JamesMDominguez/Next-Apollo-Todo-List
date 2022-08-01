import { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { gql, useMutation } from "@apollo/client";
import MenuItem from "@mui/material/MenuItem";

export default function Project({ project }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      name
      user
    }
  }
`;

    const EDIT_PROJECT = gql`
  mutation EditProject($name: String!, $user: String!, $editProjectId: ID!) {
  editProject(name: $name, user: $user, id: $editProjectId) {
    name
  }
 }
  `
    const [editProject] = useMutation(EDIT_PROJECT);

    const [form, setForm] = useState({
        name: project.name,
        user: project.user,
    });

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    return (
        <>
            <MenuItem onClick={(e) => {
                e.stopPropagation()
                handleClickOpen()
            }}>
                <div variant="outlined">Edit</div>
            </MenuItem>
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
                        <TextField fullWidth margin="normal" id="outlined-Summary" label="Name" variant="outlined" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        editProject({
                            variables: {
                                name: form.name,
                                user: form.user,
                                editProjectId: project.id
                            },
                            refetchQueries: () => [{ query: PROJECTS }]
                        })
                        handleClose()
                    }} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}