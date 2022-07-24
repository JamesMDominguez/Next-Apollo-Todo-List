import styles from "../../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { useRouter } from 'next/router'
import ProjectMenu from "../../components/ProjectMenu"
import Project from "../../components/CreateProject";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function app({ projects }) {
  const router = useRouter()
  const projectOptions = projects.map((project,index)=>({
    id:index+1,
    label:project.name
  }))
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between",marginLeft: "11%",marginRight:"11%" }}>
        <h1>Projects</h1>

        <div style={{ padding: "25px"}}>
          <Project />
        </div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={projectOptions}
          sx={{ width: 200,marginTop:"20px"}}
          renderInput={(params) => <TextField {...params} label="Projects" />}
        />
      </div>
      <div style={{ backgroundColor: "#ffb854", margin: "10%", borderRadius: "15px", padding: "40px", marginTop: "2%", marginBottom: "2%" }}>

        <div className={styles.grid2}>
          {projects.map((project) => {
            return (
              <div key={project.id} className={styles.card2} onClick={() => router.push(`/project/${project.id}`)}>
                <div>
                  <ProjectMenu />
                  <p>Taks:{`${project.tasks.length}`}</p>
                  <h3>
                    {project.name}
                  </h3>
                </div>
              </div>
            )
          })}
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
          tasks {
           summary
         }
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