import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import {Button,Checkbox,Tooltip} from '@material-ui/core';
import {useParams} from "react-router-dom";
import './style.css'
import axios from 'axios';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

toast.configure();

function Tasks(props) {
  const {authToken} =props.location.state;
  const { id } = useParams();
  const [addNewTask,setAddNewTask]=useState(false);
  const [expiring,setExpiring]=useState(false);
  const [refresh,setRefresh]=useState(true);
  const [tasks,setTasks]=useState([]);
  const [taskName,setTaskName]=useState("");
  const [expiresIn,setExpiresin]=useState(-1);
  const [assignTo,setAssignto]=useState("");
  const [users,setUsers]=useState([""]);

  const header = {
    "Access-Control-Allow-Origin": "*",
    "Authorization":authToken
  }
  useEffect(()=>{
    fetchTasks();
    fetchUsers();
    setInterval(async () => {
      fetchTasks();
    }, 60000);
  },[]);

  const handleChangeVersion = (event) => {
    setAssignto(event.target.value);
  };
  const fetchUsers=()=>{
    axios.get("http://localhost:4000/user/fetchotherusers",{headers:header})
        .then((res) =>{
                console.log(res.data);
                setUsers(["",...res.data.users]);
                console.log(users);
            }
        )
        .catch((err)=>{
            console.log(err);
        });
  }
  const markAsCompleted=(data)=>{
    axios.put("http://localhost:4000/tasks/updatetaskstatus/"+data.taskId,{status:"Completed"},{headers:header})
        .then((res) =>{
                toast("Task marked as Completed");
                fetchTasks();
            }
        )
        .catch((err)=>{
            console.log(err);
            toast("Failed to update task");
        });
  }

  const createNewTask=()=>{
    if(taskName===""){
      toast("Task Name cannot be blank");
    }
    else{
      if(expiring===false){
        var body={
          taskName:taskName,
          createby:id,
          status:"Incomplete"
        }
        axios.post("http://localhost:4000/tasks/createtask",body,{headers:header})
        .then((res) =>{
              toast("New Task created");
              setAddNewTask(false)
              setTaskName("");
              setExpiring(false);
              setExpiresin(-1);
              setAssignto("");
              fetchTasks();
          }
        )
        .catch((err)=>{
          console.log(err);
          toast("Failed to create Task");
        });
      }
      else{
        if(expiresIn===-1){
          toast("Please enter Expire Time");
        }
        else{
          var body={
            taskName:taskName,
            createby:id,
            expiresIn:parseInt(expiresIn),
            status:"Incomplete"
          }
          if(assignTo!==""){
            body['assignTo']=assignTo
          }
          axios.post("http://localhost:4000/tasks/createtask",body,{headers:header})
          .then((res) =>{
              toast("New Task created");
              setAddNewTask(false);
              setTaskName("");
              setExpiring(false);
              setExpiresin(-1);
              setAssignto("");
              fetchTasks();
            }
          )
          .catch((err)=>{
            console.log(err);
            toast("Failed to create Task");
          });
        }
      }
    }
  }
  



  const deleteTask =(data)=>{
    axios.delete("http://localhost:4000/tasks/deletetask/"+data.taskId,{headers:header})
        .then((res) =>{
                console.log(res);
                toast("Task Deleted");
                fetchTasks();
            }
        )
        .catch((err)=>{
            console.log(err);
            toast("Failed to delete task");
        });
  }

  const Columns=[
    {
      field:"taskName",
      headerName:"Task Name",
      renderCell: (params)=>(
        params.value
      ),
      width:200
    },
    {
      field:"status",
      headerName:"Status",
      renderCell: (params)=>(
        params.value
      ),
      width:200
    },
    {
      field:"createdBy",
      headerName:"Created By",
      renderCell: (params)=>(
        params.value
      ),
      width:200
    },
    {
      field:"createdAt",
      headerName:"Created On",
      renderCell: (params)=>(
        params.value
      ),
      width:300
    },
    {
      field:"Actions",
      headerName:"Actions",
      renderCell: (params)=>(
        <>
        <Tooltip title="Mark as Completed">
            <Button variant="contained" color="primary" onClick={()=>markAsCompleted(params.row)}
            disabled={params.row.status==="Incomplete"?false:true}>
            <DoneIcon fontSize="small"/>
        </Button>
            </Tooltip>
            <Tooltip title="Delete">
          <Button variant="contained" color="primary" onClick={()=>deleteTask(params.row)}>
            <DeleteIcon fontSize="small"/>
            </Button>
            </Tooltip>
        </>
      ),
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      width: 200
    }

  ]

  

  const fetchTasks =() =>{
    console.log("In Tasks");
    if(refresh){
      axios.get("http://localhost:4000/tasks/tasks",{headers:header})
        .then((res) =>{
                console.log(res.status);
                console.log(res.data);
                setTasks(res.data);
            }
        )
        .catch((err)=>{
            console.log(err);
        });
    }
  }
  const togglePopup = () => {
    setAddNewTask(!addNewTask);
    if(addNewTask){
      setRefresh(false);
    }else{
      setRefresh(true);
    }
    setExpiring(false);
    setTaskName("");
    setExpiresin(-1);
    setAssignto("");
  }
  const handleExpiring = (event)=>{
    setExpiring(event.target.checked);
  }



  return (
    <div>
    <Button variant="contained" color="primary" onClick={()=>{setAddNewTask(true)}}>
      <AddIcon />
      Add new Task
    </Button>
    <div style={{ height: 400,width:"81%"}}>
    <DataGrid rows={tasks} columns={Columns} getRowId ={(row) => row.taskId} />
    </div>
    {addNewTask && <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={togglePopup}>x</span>
        <form>
          <div>
          <label>
            Task Name:
            <input type="text" name="name" onChange={(e)=>setTaskName(e.target.value)}/>
          </label>
          <div>
          <Checkbox
            checked={expiring}
            onChange={handleExpiring}
            name="Expired"
            color="primary"
          />Expiring Event
          </div>
          <div>
            {expiring && 
              <div>
                <div>
                <label>
                  Expires in (min):
                <input type="number" name="name" onChange={(e)=>setExpiresin(e.target.value)}/>
                </label>
                </div>
                <div>
                Assign to user after Expiration:
                <select value={assignTo}
                  onChange={handleChangeVersion}>
                  {users.map((team) => <option key={team} value={team}>{team}</option>)}
                </select>
                </div>
              </div>
            }
            
          </div>
          </div>
      </form>
      <Button variant="contained" color="primary" onClick={()=>togglePopup()}>
            <CancelIcon />
              Cancel
            </Button>
          <Button variant="contained" color="primary" onClick={()=>createNewTask()}>
            <AddIcon />
              Add
          </Button>
      </div>
    </div>}
  </div>
  );
}

export default (Tasks);
