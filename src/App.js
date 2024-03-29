import React, { useState } from "react";
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
// import { config } from "./constants";
import {NotificationContainer} from 'react-notifications';

function App() {

  var existingTokens;

  if (localStorage.getItem("DoliToken") !== 'undefined') {
      existingTokens= JSON.parse(localStorage.getItem("DoliToken"));
  } else {
    existingTokens = '';
  }
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("User"))
  );

  const setToken = (token) => {

    localStorage.setItem("DoliToken", JSON.stringify(token));
    let o_user = new User(token);

    setupUser(o_user);
    setAuthTokens(token);
    
    Axios.defaults.headers = { 
      "DOLAPIKEY": token
    };
  };

  const setupUser = (userparam => {
    localStorage.setItem("User", JSON.stringify(userparam));
    setUser(userparam);
  })

  Moment.globalFormat = 'DD/MM/YYYY';

  Axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    console.log('error', error);
    console.log('error.response', error.response);
    if (401 === error.response.status) {
      setToken("");

    }
    return Promise.reject(error);
  });

  Axios.defaults.baseURL = process.env.REACT_APP_API_ADDRESS

  Axios.defaults.headers = { 
    "DOLAPIKEY": authTokens
  };

  document.title = process.env.REACT_APP_SITE_NAME + " - Votre espace client personalisé !"


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
            <NotificationContainer />
          </TemplateComponent>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
