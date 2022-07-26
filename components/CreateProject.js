import {useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { gql, useMutation } from "@apollo/client";

export default function Project() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false);

  const CREATE_PROJECT = gql`
    mutation CreateProject($name: String!, $user: String!) {
      createProject(name: $name, user: $user) {
        name
      }
    }
    `
  const PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      name
      user
    }
  }
`;
    const [form, setForm] = useState({
      name: "",
      user: "",
  });

  function updateForm(value){
    return setForm((prev) => {
        return { ...prev, ...value };
    });
}
  const [createProject] = useMutation(CREATE_PROJECT);

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
            createProject({
              variables: {
                name: form.name,
                user: form.user
              },
              refetchQueries: ()=> [{ query: PROJECTS }]
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