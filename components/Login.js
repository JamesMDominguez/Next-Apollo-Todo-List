import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const Login = () => {
  const { user, isAuthenticated, isLoading,loginWithRedirect } = useAuth0();

  if(isAuthenticated){
      return (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
      );
  }

  return <Button variant="outlined" size="large" sx={{ color: 'black',marginTop:"25px", borderColor: 'black', '&:hover': { borderColor: '#ffb854', color: '#ffb854', } }} onClick={() => loginWithRedirect()}>Log In</Button>;


};

export default Login;