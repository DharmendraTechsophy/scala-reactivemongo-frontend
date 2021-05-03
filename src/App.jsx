import react,{useEffect} from 'react'
import { BrowserRouter } from "react-router-dom"
import AuthApi from './AuthApi'
import User from './User'
import Cookies from 'js-cookie'

const App = () => {
    const [auth,setAuth]= react.useState(false);
    
    const readCookie = ()=>{
        const user = Cookies.get("user")
        if(user){
            setAuth(true);
        }
    }
    useEffect(()=>{
        readCookie();
    },[])
    return (
        <>
            <AuthApi.Provider value={{auth,setAuth }}>
                <BrowserRouter>
                    <User />
                </BrowserRouter>
            </AuthApi.Provider>
        </>
    )
}
export default App;
