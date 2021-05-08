import React from "react";
import { Route,BrowserRouter, Redirect, Switch } from "react-router-dom";
import login  from "./Components/Login";
import tasks from './Components/Tasks';
function App (){
  
    return (<div>
      <BrowserRouter>
      <Switch>
        <Route path={"/login"} component={login} />
        <Route path={"/tasks/:id"} component ={tasks}/>
        <Redirect exact path={"/"} to={`/login`} />
      </Switch>
      </BrowserRouter>
      </div>
    );
}

export default App;
