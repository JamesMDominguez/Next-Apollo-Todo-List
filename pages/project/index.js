import styles from "../../styles/Home.module.css";
import { gql,useQuery } from "@apollo/client";
import { useRouter } from 'next/router'
import ProjectMenu from "../../components/ProjectMenu"
import Project from "../../components/CreateProject";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useState} from 'react'
import Loading from "../../components/Loading";
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const matches = useMediaQuery('(min-width:600px)');
  const objToday = new Date(),
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear()

  const today = curMonth + ", " + curYear;

  if (loading) {
    return(
      <div style={{display:"flex",justifyContent:"center"}}>
      <Loading/>
      </div>
    )
  }
  else{
  const projectOptions = data.getProjects.map((project, index) => ({
    id: project.id,
    label: project.name
  }))
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between",marginLeft:"5%" ,marginRight:"5%",flexWrap:"wrap",marginBottom:"5%"}}>
        <h1 style={{marginTop:"20px" }}>Kanban</h1>
        <div style={{ paddingTop: "25px" }}>
          <Project />
        </div>
        <div style={{margin:matches?"0":"auto"}}>
        <Autocomplete
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
            router.push(`/project/${newValue.id}`)
          }}
          disablePortal
          id="combo-box-demo"
          options={projectOptions}
          sx={{ width: 300, marginTop: "20px",marginBottom:"20px"}}
          renderInput={(params) => <TextField {...params} label="Projects" />}
          />
          </div>
      </div>

      <div style={{ backgroundColor: "#ffb854", borderRadius: "15px", padding: "40px",paddingTop:"10px",marginLeft:"5%" ,marginRight:"5%"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <h2>{`${data.getProjects.length} Projects`}</h2>
        <h2>{today}</h2>
        </div>
        <div className={styles.grid2}>
          {data.getProjects.map((project) => {
            return (
              <div key={project.id} className={styles.card2} onClick={() => router.push(`/project/${project.id}`)}>
                <div>
                  <ProjectMenu project={project}/>
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