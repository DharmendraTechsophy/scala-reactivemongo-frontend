import React from "react";
import AuthApi from './AuthApi'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button';
const Logout = () =>{
  
    const Auth = React.useContext(AuthApi) 
    const handleLogout=()=>{
        Auth.setAuth(false)
        Cookies.remove("user")
    }
    return(
        <>
            <Button variant="contained" color="secondary" component="span" onClick={handleLogout}>Logout</Button>
      
        </>
    );
}
export default Logout;
