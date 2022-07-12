import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import DeleteMenu from "./DeleteMenu";
import {useState} from "react"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Task(props){
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    summary: props.project.summary,
    description: props.project.description,
    priority: props.project.priority,
    status: props.project.status,
  });

  const handleOpen = (e) => {
    console.log(e)
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  return (
    <>
      <div
        key={props.project.id}
        className={styles.card}
        style={{ display: "flex" }}
        onClick={handleOpen}
      >
        <DeleteMenu />
        <h3 style={{ margin: "8px" }}>{props.project.summary}</h3>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.project.summary}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.project.description}
          </DialogContentText>

          <Box component="form" noValidate autoComplete="off">
          <TextField fullWidth margin="normal" inputProps={{ readOnly: true }} id="outlined-Summary" label="Summary" variant="outlined" value={form.summary} onChange={(e) => updateForm({ summary: e.target.value })}/>
          <TextField fullWidth margin="normal" inputProps={{ readOnly: true }} id="outlined-Description" label="Description" variant="outlined" value={form.description} onChange={(e) => updateForm({ description: e.target.value })}/>
          <TextField fullWidth margin="normal" inputProps={{ readOnly: true }} id="outlined-Priority" label="Priority" variant="outlined" value={form.priority} onChange={(e) => updateForm({ priority: e.target.value })}/>
          <TextField fullWidth margin="normal" inputProps={{ readOnly: true }} id="outlined-Priority" label="Status" variant="outlined" value={form.status} onChange={(e) => updateForm({ priority: e.target.status })}/>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Edit</Button>
          <Button onClick={handleClose} variant="outlined">Save</Button>

        </DialogActions>
      </Dialog>
    </>
  );
}

// summary
// description
// id
// priority
// status
// projectID