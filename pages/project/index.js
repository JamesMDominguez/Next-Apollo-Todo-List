import styles from "../../styles/Home.module.css";
import { gql,useQuery } from "@apollo/client";
import client from "../../apollo-client";
import { useRouter } from 'next/router'
import ProjectMenu from "../../components/ProjectMenu"
import Project from "../../components/CreateProject";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Login from '../../components/Login'
import {useState} from 'react'

export default function app() {
  const router = useRouter()
  const [value, setValue] = useState();
  const PROJECTS = gql`
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
  `
  const { loading, error, data } = useQuery(PROJECTS);
  if(loading){
    return <h1>Loading...</h1>
  }
  else{
  const projectOptions = data.getProjects.map((project, index) => ({
    id: project.id,
    label: project.name
  }))
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "11%", marginRight: "11%" }}>
        <h1>Projects</h1>
        <div style={{ padding: "25px" }}>
          <Project />
        </div>
        <Autocomplete
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
            router.push(`/project/${newValue.id}`)
          }}
          disablePortal
          id="combo-box-demo"
          options={projectOptions}
          sx={{ width: 200, marginTop: "20px" }}
          renderInput={(params) => <TextField {...params} label="Projects" />}
        />
      </div>

      <div style={{ backgroundColor: "#ffb854", borderRadius: "15px", padding: "40px",marginLeft:"5%" ,marginRight:"5%"}}>
        <div className={styles.grid2}>
          {data.getProjects.map((project) => {
            return (
              <div key={project.id} className={styles.card2} onClick={() => router.push(`/project/${project.id}`)}>
                <div>
                  <ProjectMenu />
                  <p>{`Taks: ${project.tasks.length}`}</p>
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
}

// export async function getServerSideProps() {
//   const { data } = await client.query({
//     query: gql`
//       query GetProjects {
//         getProjects {
//           id
//           name
//           user
//           tasks {
//            summary
//          }
//         }
//       }
//       `,
//   });

//   return {
//     props: {
//       projects: data.getProjects,
//     },
//   };
// }