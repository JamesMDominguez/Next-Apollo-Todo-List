import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from "next/router";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { gql, useMutation } from "@apollo/client";


export default function Task() {
  const router = useRouter();
  const { id } = router.query

  const CREATE_TASK = gql`
    mutation CreateTask($projectId: String!, $summary: String!, $description: String!, $priority: String!, $status: String!, $deleted: Boolean!) {
  createTask(projectID: $projectId, summary: $summary, description: $description, priority: $priority, status: $status, deleted: $deleted) {
    summary
    description
  }
}`

    const PROJECTS = gql`
  query GetProjects($getProjectId: ID!) {
    getProject(id: $getProjectId) {
      name
      tasks {
        summary
        description
        id
        priority
        status
        projectID
      }
    }
  }
  `;

    const [form, setForm] = useState({
        summary: "",
        description: "",
        priority: "",
        status: "",
    });

    function updateForm(value){
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    const [createTask] = useMutation(CREATE_TASK);

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
                        <TextField fullWidth margin="normal" id="outlined-Summary" label="Summary" variant="outlined" value={form.summary} onChange={(e) => updateForm({ summary: e.target.value })} />
                        <TextField fullWidth margin="normal" id="outlined-Description" label="Description" variant="outlined" multiline value={form.description} onChange={(e) => updateForm({ description: e.target.value })} />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Priority"
                                value={form.priority}
                                onChange={(e) => updateForm({ priority: e.target.value })}
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
                                value={form.status}
                                onChange={(e) => updateForm({ status: e.target.value })}
                            >
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Todo">Todo</MenuItem>
                                <MenuItem value="Done">Medium</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose()
                        createTask({
                            variables: {
                                projectId: id,
                                summary: form.summary,
                                description: form.description,
                                priority: form.priority,
                                status: form.status,
                                deleted: false,
                            },
                            refetchQueries: () => [
                                { query: PROJECTS, variables: { getProjectId: id } }
                            ]
                        })
                    }} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}