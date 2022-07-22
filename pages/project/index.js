import styles from "../../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { useRouter } from 'next/router'
import ProjectMenu from "../../components/ProjectMenu"
import Button from '@mui/material/Button';
import Project from "../../components/Project";
export default function app({ projects }) {
  const router = useRouter()

  return (
    <>
      <div style={{ display: "flex", justifyContent: "" }}>
        <h1 style={{ marginLeft: "11%" }}>Projects</h1>
        <div style={{ padding: "25px", marginLeft: "25%" }}>
          <Project/>
        </div>
      </div>
      <div style={{ backgroundColor: "#ffb854", margin: "10%", borderRadius: "15px", padding: "40px", marginTop: "2%", marginBottom: "2%" }}>

        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.card2} onClick={() => router.push(`/project/${project.id}`)}>
              <ProjectMenu />
              <h3 style={{ margin: "8px" }}>
                {project.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query GetProjects {
        getProjects {
          id
          name
          user
        }
      }
      `,
  });

  return {
    props: {
      projects: data.getProjects,
    },
  };
}