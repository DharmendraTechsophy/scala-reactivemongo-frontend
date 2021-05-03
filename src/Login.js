import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Grid from '@material-ui/core/Grid'
import react, { useState } from 'react';
import Axios from 'axios';
import { NavLink, useHistory } from "react-router-dom"
import AuthApi from './AuthApi'
import Cookies from 'js-cookie'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const Auth = react.useContext(AuthApi)

  function validateForm() {
    return email.length > 0 && email.length > 0;
  }

  const history = useHistory();

  const login = () => {
    if (validateForm()) {
      Axios.post("http://localhost:9000/user/search", {
        firstName: "",
        lastName: "",
        userName: "",
        email: email,
        password: password,
        createdDate: ""
      }).then((response) => {
        console.log("token : "+response.data.token)
        if (response.data.token == null)
          alert("Login Failed..")
        else {
          //cookies
          Auth.setAuth(true)
          Cookies.set("user", response.data.token,{ expires: 7 })
          //test
          console.log("Record : " + response.data)
          //redirect to student route
          if(Cookies.get("user"))
          {
            history.push("/student")
          }
        }
      });
    }
    else {
      alert("Username and password length should be more than 0")
    }

  };

  return (
    <div className="login_page">
      <Grid align="center">
        <MuiThemeProvider >
          <div>
            <AppBar
              title="Login"
            />
            <TextField
              hintText="Enter Email"
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

            <RaisedButton label="Login" primary={true} style={style} onClick={login} />
            <NavLink exact to="/signup"><RaisedButton label="SignUp" primary={true} style={style} /></NavLink>

          </div>
        </MuiThemeProvider>
      </Grid>

    </div>
  );

};

const style = {
  margin: 15,
};
export default Login;