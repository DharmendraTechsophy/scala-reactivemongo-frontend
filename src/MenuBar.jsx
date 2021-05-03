import React from "react"
import {Route,Switch} from "react-router-dom"
import StudentTable from './StudentTable'
import UniversityTable from './UniversityTable'
import StuUniJoin from './StuUniJoin'
import Menu from './Menu'



const MenuBar =(props) =>{
    console.log("props :"+props.name)
    return (
        <>
            <Menu name={props.name}/>
            <Switch>
                <Route exact path="/student" component={StudentTable} />
                <Route exact path="/university" component={UniversityTable} />
                <Route path="/join2" component={StuUniJoin} />
            </Switch>
            {/* <StudentTable/>
            <UniversityTable></UniversityTable> */}
        </>
    );
}

export default MenuBar;
