import styles from "../../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { useRouter } from 'next/router'

export default function app({ projects }) {
    const router = useRouter()
  
    return (
    <>
    <h1 style={{ marginLeft: "20%" }}>Projects</h1>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.card} onClick={() => router.push(`/project/${project.id}`)}>
            <h3>
              {project.name}
            </h3>
          </div>
        ))}
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