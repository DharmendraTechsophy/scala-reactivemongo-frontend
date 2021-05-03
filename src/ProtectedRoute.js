
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute=({auth,component:Component,...rest}) =>{
    return(
        <Route
        {...rest}
        render = {()=> auth ? (
            <Component/>
        ) :
        (
            <Redirect to="/"/>
        )
        }
        />
    )
}
export default ProtectedRoute;