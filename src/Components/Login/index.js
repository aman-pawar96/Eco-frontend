import React, { useState } from "react";
import { Paper, Typography, InputBase,InputAdornment } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import { useStyle } from "./style";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CheckIcon from '@material-ui/icons/Check';
import { Alert } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";


toast.configure();

function Login(props) {
    const {classes}=props;
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(null);

    const header = {
        "Access-Control-Allow-Origin": "*"
    }
    const handleSubmit=()=>{
        setError(null);
        console.log(userName);
        console.log(password);
        if (userName == null || userName.trim().length === 0) {
            return;
        }
        if (password == null || password.trim().length === 0) {
            return;
        }
        console.log(header);
        axios.post("http://localhost:4000/user/login",{userName:userName,password:password},{headers:header})
        .then((res) =>{
                console.log(res.status);
                console.log(res.data);
                //Tasks({AuthToken:res.data.token});
                props.history.push({
                    pathname:'/tasks/'+userName,
                    state: {authToken:res.data.token }
                });
            }
        )
        .catch((err)=>{
            console.log(err);
            toast("Invalid Username or Password");
        });
    }

    return (<div className={classes.main}>
            <Paper className={classes.paper}>
                <div className={classes.loginHeader}>
                    <AccountCircleOutlinedIcon className={classes.icon} />
                    <Typography className={classes.typo}>Hi there! Please Sign in</Typography>
                </div>
                <div className={classes.loginBody}>
                    {error !== null && <Alert severity="error" icon={false} className={classes.alert} onClose={()=>{setError(null)}}>
                        {error}
                    </Alert>}
                    <form onSubmit={(e) => {e.preventDefault()}}>
                        <InputBase
                            id="userName"
                            placeholder="Username"
                            type="text"
                            autoComplete="current-password"
                            className={classes.inputBase}
                            classes={{ input: classes.input }}
                            value={userName}
                            onChange={(event)=>{
                                setUserName(event.target.value)
                            }}
                            required
                        />
                        <InputBase
                            id="password"
                            placeholder="Password"
                            type="password"
                            autoComplete="current-password"
                            className={classes.inputBase}
                            classes={{ input: classes.input }}
                            value={password}
                            onChange={(event)=>{
                                setPassword(event.target.value)
                            }}
                            required
                            endAdornment={
                                <InputAdornment position="end" className={classes.lockIcon}>
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            }
                        />
                        <button type="submit" className={classes.subButton}  onClick={()=>{handleSubmit()}}>
                            <CheckIcon/>
                        </button>
                    </form>
                </div>
            </Paper>
        </div>
        );
}


export default withStyles(useStyle)(Login);
