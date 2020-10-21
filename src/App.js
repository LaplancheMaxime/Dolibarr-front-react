import React, { useState } from "react";
import Admin from "./components/Admin";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import './App.css';
import { User } from "./models/User";
import { AuthContext } from "./context/Auth";
import TemplateComponent from "./components/TemplateComponent";
import ViewPropalComponent from "./components/commercial/ViewPropalComponent";
import Moment from 'react-moment';
import Axios from "axios";
import ViewAllPropalsComponent from "./components/commercial/ViewAllPropalsComponent";
import DashboardComponent from "./components/DashboardComponent";

function App() {

  var existingTokens;

  if (localStorage.getItem("DoliToken") !== 'undefined') {
      existingTokens= JSON.parse(localStorage.getItem("DoliToken"));
      console.log("j'ai un token", existingTokens);
  } else {
    console.log('PAS DE TOKEN...');
    existingTokens = '';
  }
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("User"))
  );

  const setToken = (token) => {
    console.log('mise en storage du token');
    localStorage.setItem("DoliToken", JSON.stringify(token));
    let o_user = new User(token);
    setupUser(o_user);
    setAuthTokens(token);
    Axios.defaults.headers = { 
      "DOLAPIKEY": token
    };
  };

  const setupUser = (user => {
    localStorage.setItem("User", JSON.stringify(user));
    setUser(user);
  })

  Moment.globalFormat = 'DD/MM/YYYY';

  Axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    console.log('error', error);
    console.log('error.response', error.response);
    if (401 === error.response.status) {
      setToken("");
      // window.location = '/login';
    }
  });


  return (
    <AuthContext.Provider value={{ existingTokens, setAuthTokens: setToken, user, setUser: setupUser}}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} /> 
          <TemplateComponent >
            <PrivateRoute path="/dashboard" component={DashboardComponent} exact />
            <PrivateRoute path="/propals/:id" component={ViewPropalComponent} exact/>
            <PrivateRoute path="/propals" component={ViewAllPropalsComponent} exact />
            {/* <PrivateRoute path="/propals/1" render={() => <ViewPropalComponent User={user} />} />  */}
            <PrivateRoute path="/admin" component={Admin} User={user} />
          </TemplateComponent>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
