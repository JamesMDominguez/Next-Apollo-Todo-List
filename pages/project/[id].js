import styles from "../../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { useRouter } from "next/router";
import Task from "../../components/Task"

export default function task({ projects }) {
  const router = useRouter();

  return (
    <>
      <h1 style={{ marginLeft: "20%" }} onClick={()=>router.push('/project')}>{projects.name}</h1>
      <div className={styles.grid}>
        {projects.tasks.map((project) => (
         <Task project={project}/>
        ))}
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
