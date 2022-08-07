import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../styles/Home.module.css";
import DeleteMenu from "./DeleteMenu";
import { useState } from "react"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { gql, useMutation } from "@apollo/client";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function Task({ project }) {
  const [open, setOpen] = useState(false);
  const [editBool, setEditBool] = useState(true)
  const [form, setForm] = useState({
    summary: project.summary,
    description: project.description,
    priority: project.priority,
    status: project.status,
  });

  const EDIT_TASK = gql`
  mutation EditTask($projectId: String!, $summary: String!, $description: String!, $priority: String!, $status: String!, $editTaskId: ID!, $deleted: Boolean!) {
    editTask(projectID: $projectId, summary: $summary, description: $description, priority: $priority, status: $status, id: $editTaskId, deleted: $deleted) {
      description
      summary
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

  const [editTask] = useMutation(EDIT_TASK)

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editText = () => {
    setEditBool(false)
  }
  const editSaveBTN = () => {
    if (editBool) {
      return <Button onClick={editText} variant="outlined">Edit</Button>
    }
    return <Button onClick={() => {
      editTask({
        variables: {
          projectId: project.projectID,
          summary: form.summary,
          description: form.description,
          priority: form.priority,
          status: form.status,
          editTaskId: project.id,
          deleted: false
        },
        refetchQueries: () => [
          { query: PROJECTS, variables: { getProjectId: project.projectID } }
        ]
      })
      handleClose()
    }} variant="outlined">Save</Button>
  }

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  return (
    <>
      <div
        key={project.id}
        className={styles.card}
        style={{ display: "flex" }}
        onClick={handleOpen}
      >
        <DeleteMenu task={project} />
        <h3 style={{ margin: "8px" }}>{project.summary}</h3>
      </div>
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
            <TextField fullWidth margin="normal" InputProps={{ readOnly: editBool }} id="outlined-Summary" label="Summary" variant="outlined" value={form.summary} onChange={(e) => updateForm({ summary: e.target.value })} />
            <TextField fullWidth margin="normal" InputProps={{ readOnly: editBool }} id="outlined-Description" label="Description" variant="outlined" value={form.description} onChange={(e) => updateForm({ description: e.target.value })} multiline />
            <FormControl fullWidth margin="normal" InputProps={{ readOnly: editBool }} >
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.priority}
                label="Priority"
                onChange={(e) => updateForm({ priority: e.target.value })}
                inputProps={{ readOnly: editBool }}
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
                value={form.status}
                label="Status"
                onChange={(e) => updateForm({ status: e.target.value })}
                inputProps={{ readOnly: editBool }}
              >
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Todo">Low</MenuItem>
                <MenuItem value="Done">Medium</MenuItem>
              </Select>
            </FormControl>
          </Box>

        </DialogContent>
        <DialogActions>
          {editSaveBTN()}
        </DialogActions>
      </Dialog>
    </>
  );
}