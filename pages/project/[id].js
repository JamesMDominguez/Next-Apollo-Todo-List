import styles from "../../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { useRouter } from "next/router";
import Task from "../../components/Task"
import { useState } from "react";

export default function task({ projects }) {
  const router = useRouter();
  const [dragStatus, setDragTask] = useState()
  const [selectedTask,setSelectedTask] = useState()
  const [drop, setDrop] = useState()

  return (
    <>
      <h1 style={{ marginLeft: "10%" }} onClick={() => router.push('/project')}>{projects.name}</h1>
      <div
        onDragEnter={() => setDragTask("Todo")}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => setDrop(dragStatus)}
        style={{ backgroundColor: "#4287f5", margin: "10%", borderRadius: "15px", padding: "10px", marginTop: "2%", marginBottom: "2%" }}>
        <h1 style={{ marginLeft: "5%" }} onClick={() => router.push('/project')}>Todo</h1>
        <div className={styles.grid}>
          {projects.tasks.filter((task) => task.status === "Todo").map((project) => (
            <div
              draggable="true"
              onDragStart={() => setSelectedTask(project)}
              style={{ margin: "1rem" }}>
              <Task project={project} />
            </div>))}
        </div>
      </div>

      <div
        onDragEnter={() => setDragTask("In Progress")}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => setDrop(dragStatus)}
        style={{ backgroundColor: "#bcc232", margin: "10%", borderRadius: "15px", padding: "10px", marginTop: "2%", marginBottom: "2%" }}>
        <h1 style={{ marginLeft: "5%" }} onClick={() => router.push('/project')}>In Progress</h1>
        <div className={styles.grid}>
          {projects.tasks.filter((task) => task.status === "In Progress").map((project) => (
            <div draggable="true"
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
        onDrop={() => setDrop(dragStatus)}
        style={{ backgroundColor: "#35c467", margin: "10%", borderRadius: "15px", padding: "10px", marginTop: "2%", marginBottom: "2%" }}>
        <h1 style={{ marginLeft: "5%" }} onClick={() => router.push('/project')}>Done</h1>
        <div className={styles.grid}>
          {projects.tasks.filter((task) => task.status === "Done").map((project) => (
            <div draggable="true"
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

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data } = await client.query({
    query: gql`
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
    `,
    variables: { getProjectId: id },
  });

  return {
    props: {
      projects: data.getProject,
    },
  };
}
