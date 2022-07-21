import styles from "../../styles/Home.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import client from "../../apollo-client";
import { useRouter } from "next/router";
import Task from "../../components/Task"
import { useState } from "react";

export default function task() {
  const router = useRouter();
  const [dragStatus, setDragTask] = useState()
  const [selectedTask, setSelectedTask] = useState()
  const refreshData = () => {
    router.replace(router.asPath);
  }
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
    refreshData();
  }

  if (loading) return <h1>loading...</h1>
  else {
    return (
      <>
        <h1 style={{ marginLeft: "10%" }} onClick={() => router.push('/project')}>{data.getProject.name}</h1>
        <div
          onDragEnter={() => setDragTask("Todo")}
          onDragOver={(e) => e.preventDefault()}
          onDrop={editTask}
          style={{ backgroundColor: "#4287f5", margin: "10%", borderRadius: "15px", padding: "10px", marginTop: "2%", marginBottom: "2%" }}>
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
          style={{ backgroundColor: "#bcc232", margin: "10%", borderRadius: "15px", padding: "10px", marginTop: "2%", marginBottom: "2%" }}>
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
          style={{ backgroundColor: "#35c467", margin: "10%", borderRadius: "15px", padding: "10px", marginTop: "2%", marginBottom: "2%" }}>
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
