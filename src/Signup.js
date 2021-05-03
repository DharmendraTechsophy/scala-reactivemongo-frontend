import React, { useState } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Axios from 'axios';
import { NavLink } from "react-router-dom"
import Grid from '@material-ui/core/Grid'
import {useHistory } from "react-router-dom";

const Signup = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const date = "2021-04-13"

  const history = useHistory();

  function validateForm() {
    return firstname.length > 0 && lastname.length > 0 && username.length > 0 && password.length > 0;
  }

  function validateEmail() {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
  }

  const register = () => {
    console.log(firstname.length)
    console.log(lastname.length)
    console.log(username.length)
    console.log(password.length)
    console.log(email)
    if (validateForm() && validateEmail()) {
      Axios.post("http://localhost:9000/user/create", {
        firstName: firstname,
        lastName: lastname,
        userName: username,
        email: email,
        password: password,
        createdDate: date
      }).then((response) => {
        alert("User Submitted Successfully!")
        
        console.log("response signup:" + response)
        history.push("/")
        
      });
    }
    else {
      alert("firstName,lastname,username,password length should be more than 0,Email in correct format")
    }


  };



  return (
    <div>
      <Grid align="center">
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Register"
            />
            <TextField
              hintText="Enter your First Name"
              floatingLabelText="First Name"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <br />
            <TextField
              hintText="Enter your Last Name"
              floatingLabelText="Last Name"
              onChange={(e) => setLastname(e.target.value)}
            />
            <br />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="User Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={register} />
            <NavLink exact to="/"><RaisedButton label="LogIn" primary={true} style={style} /></NavLink>
          </div>
        </MuiThemeProvider>
      </Grid>
    </div>
  );
}
const style = {
  margin: 25,
};
export default Signup;
