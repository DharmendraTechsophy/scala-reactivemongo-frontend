import react from 'react'
import {Switch } from 'react-router'
import Signup from './Signup'
import Login from './Login'
import MenuBar from './MenuBar'
import ProtectedRoute from './ProtectedRoute'
import ProtectedLogin from './ProtectedLogin'
import AuthApi from './AuthApi'
const User=()=>{

  
    const Auth = react.useContext(AuthApi)

    return(  
        <>
            <Switch>
                <ProtectedLogin exact path="/" auth={Auth.auth} component={Login}/>
                <ProtectedLogin exact path="/signup" auth={Auth.auth} component={Signup}/>
                <ProtectedRoute exact path="/student" auth={Auth.auth} component={MenuBar }/>
                <ProtectedRoute exact path="/university" auth={Auth.auth} component={MenuBar }/>
                <ProtectedRoute exact path="/join2" auth={Auth.auth} component={MenuBar }/>
            </Switch>
        </>
    );
}
export default User;