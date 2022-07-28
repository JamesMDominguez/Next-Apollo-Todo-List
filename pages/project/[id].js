import styles from "../../styles/Home.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Task from "../../components/Task"
import { useState } from "react";
import CreateTask from "../../components/CreateTask"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Loading from "../../components/loading";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function task() {
  const router = useRouter();
  const [dragStatus, setDragTask] = useState()
  const [selectedTask, setSelectedTask] = useState()
  const EDIT_TASK = gql`
mutation EditTask($projectId: String!, $summary: String!, $description: String!, $priority: String!, $status: String!, $editTaskId: ID!, $deleted: Boolean!) {
  editTask(projectID: $projectId, summary: $summary, description: $description, priority: $priority, status: $status, id: $editTaskId, deleted: $deleted) {
    summary
    description
  }
}
`;


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

  const [value, setValue] = useState();
  const matches = useMediaQuery('(min-width:640px)');
  const [editMyTask] = useMutation(EDIT_TASK);
  const { id } = router.query

  const { loading, error, data } = useQuery(PROJECTS, {
    variables: {
      getProjectId: id,
    },
  });


  const editTask = () => {
    console.log("droped")
    console.log(selectedTask)
    editMyTask({
      variables: {
        projectId: selectedTask.projectID,
        summary: selectedTask.summary,
        description: selectedTask.description,
        priority: selectedTask.priority,
        status: dragStatus,
        editTaskId: selectedTask.id,
        deleted: false,
      },
      refetchQueries: () => [
        { query: PROJECTS, variables: { getProjectId: selectedTask.projectID } }
      ]
    })
  }

  if (loading) {
    return(
      <div style={{display:"flex",justifyContent:"center"}}>
      <Loading/>
      </div>
    )
  }
  else {
    const taskOptions = data.getProject.tasks.map((task, index) => ({
      id: task.id,
      label: task.summary
    }))
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between",marginLeft:"5%" ,marginRight:"5%",flexWrap:"wrap",marginBottom:"5%"}}>
          <h1 onClick={() => router.push('/project')} style={{marginTop:"25px" }}>{data.getProject.name}</h1>
          <div style={{ paddingTop: "25px" }}>
            <CreateTask />
          </div>
        <div style={{margin:matches?"0":"auto"}}>
          <Autocomplete
            value={value}
            onChange={(e, newValue) => {
              setValue(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={taskOptions}
            sx={{ width: 300, marginTop: "20px",marginBottom:"20px",marginLeft:"15px" }}
            renderInput={(params) => <TextField {...params} label="Projects" />}
          />
        </div>

        </div>
        <div className={styles.flexContainer}>        
          <div
            onDragEnter={() => setDragTask("Todo")}
            onDragOver={(e) => e.preventDefault()}
            onDrop={editTask}
            style={{ backgroundColor: "#4287f5", borderRadius: "15px", padding: "10px"}}>
            <h1 style={{ marginLeft: "5%" }} onClick={() => router.push('/project')}>Todo</h1>
            <div className={styles.grid}>
              {data.getProject.tasks.filter((task) => task.status === "Todo" && task.deleted != true).map((project) => (
                <div
                  draggable="true"
                  key={project.id}
                  onDragStart={() => setSelectedTask(project)}
                  style={{ margin: "1rem" }}>
                  <Task project={project} />
                </div>))}
            </div>
          </div>
          <div
            onDragEnter={() => setDragTask("In Progress")}
            onDragOver={(e) => e.preventDefault()}
            onDrop={editTask}
            style={{ backgroundColor: "#bcc232", borderRadius: "15px", padding: "10px" }}>
            <h1 style={{ marginLeft: "5%" }} onClick={() => router.push('/project')}>In Progress</h1>
            <div className={styles.grid}>
              {data.getProject.tasks.filter((task) => task.status === "In Progress" && task.deleted != true).map((project) => (
                <div draggable="true"
                  key={project.id}
                  onDragStart={() => setSelectedTask(project)}
                  style={{ margin: "1rem" }}>
                  <Task project={project} />
                </div>
              ))}
            </div>
          </div>

          <div
            onDragEnter={() => setDragTask("Done")}
            onDragOver={(e) => e.preventDefault()}
            onDrop={editTask}
            style={{ backgroundColor: "#35c467", borderRadius: "15px", padding: "10px" }}>
            <h1 style={{ marginLeft: "5%" }} onClick={() => router.push('/project')}>Done</h1>
            <div className={styles.grid}>
              {data.getProject.tasks.filter((task) => task.status === "Done" && task.deleted != true).map((project) => (
                <div draggable="true"
                  key={project.id}
                  onDragStart={() => setSelectedTask(project)}
                  style={{ margin: "1rem" }}>
                  <Task project={project} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </>
    );
  }
}

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   const { data } = await client.query({
//     query: gql`
//       query GetProjects($getProjectId: ID!) {
//         getProject(id: $getProjectId) {
//           name
//           tasks {
//             summary
//             description
//             id
//             priority
//             status
//             projectID
//           }
//         }
//       }
//     `,
//     variables: { getProjectId: id },
//   });

//   return {
//     props: {
//       projects: data.getProject,
//     },
//   };
// }
