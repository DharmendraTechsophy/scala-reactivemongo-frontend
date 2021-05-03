import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import './App.css';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Cookies from 'js-cookie'
import Decode from 'jwt-decode'
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

// const api = axios.create({
//   baseURL: `https://reqres.in/api`
// })

const api = axios.create({
  baseURL: `http://localhost:9000/university`  
})
//const ids= Decode(Cookies.get("user")).id

function UniversityTable() {

  var columns = [
    {title: "id", field: "id",editable: 'never'},
    {title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.name} />  },
    {title: "Name", field: "name"},
    {title: "location", field: "location"},
    
  ]
  const [data, setData] = useState([]); //table data
  const[databyName,setDataByName]=useState([])
  const[name,setName] = useState("");
  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  
  useEffect(() => { 
    getData();
  }, [])
  async function getData(){
    //const alldata = await axios.get('http://localhost:9000/university/getbyidbyuser',{headers : {Authorization:`Bearer ${Cookies.get("user")}`}})
    const alldata = await axios.get('http://localhost:9000/university/getall')
    
    //console.log(alldata.data)
    setData(alldata.data)
  }


  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.name === ""){
      errorList.push("Please enter name")
    }
    //  api.post("/update", newData,{headers : {Authorization:`Bearer ${Cookies.get("user")}`}})
    if(errorList.length < 1){
      api.post("/update", newData)
      .then(res => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
    
  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if(newData.name === undefined){
      errorList.push("Please enter first name")
    }
    newData.userId = 10
    newData.id = 4

    if(errorList.length < 1){ //no error
      api.post("/create", newData)
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
        getData()
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

    
  }

  const handleRowDelete = (oldData, resolve) => {
    
    api.delete("/delete/"+oldData.id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

  const handleGetByName=(event)=>{
    event.preventDefault();
    console.log("name : "+name)
    api.get("/getbyname/"+name)
      .then(res => {
    
        setDataByName(res.data)
        setIserror(false)
      
      })
      .catch(error => {
        setErrorMessages(["No Record Found"])
        setIserror(true)
      
      })

  }




  return (
    <div className="App">
      <br></br>
      <TextField size="small" id="outlined-basic" label="Search By University Name" variant="outlined" onChange={e => setName(e.target.value)}/>
      &nbsp;<Button  size="large" variant="contained" color="primary" onClick={handleGetByName}>Search</Button>
      <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
          <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
            { name.length == 0
               ?
            <MaterialTable
              title="Unversity Table"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowUpdate: (newData, oldData) =>
        
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                      
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            />
            :
            <MaterialTable
              title="Search By Name"
              columns={columns}
              data={databyName}
              icons={tableIcons}
              options={{
                exportButton: true
              }}
            />

            }
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
  );
}

export default UniversityTable;