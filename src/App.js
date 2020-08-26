import React, { useState}  from 'react';
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Login";
import {useStateValue} from "./StateProvider";

import './App.css';

function App() {

  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
       <Login/>
      ):(
        <div className="app_body">
        <Router>
          <Switch>
          <Sidebar />
            <Route exact path="/rooms/:roomId">
             
              <Chat/>
            </Route>
            <Route exact path="/">
              <Chat/>
            </Route> 
          </Switch>
        </Router>
        
        
      </div>
      )}
      
      
    </div>
  );
}

export default App;
