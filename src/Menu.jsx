import React from "react";
import {NavLink} from "react-router-dom";
import './index.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Cookies from 'js-cookie'
import Logout from "./Logout"
import Decode from 'jwt-decode'
const Menu = () =>{
    
    //const name = Decode(Cookies.get("user")).firstName
    var name="";
    if(Cookies.get("user"))
    {name = Decode(Cookies.get("user")).firstName}
    

    return(
        <>
            <div className="menu_style">
                <NavLink activeClassName="active_class" to="/student">Student</NavLink>
                <NavLink activeClassName="active_class" to="/university">University</NavLink>
                <NavLink activeClassName="active_class" to="/join2">University_Student</NavLink>
                <div className="profile_name">                    
                    <AccountCircleIcon/>
                    {name}&nbsp;
                    
                    <Logout/>
                </div>
                
            </div>
            
        </>
        
    );
    
}
export default Menu;
