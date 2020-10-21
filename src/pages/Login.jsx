import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { AuthContext, useAuth } from "../context/Auth";
import { User } from "../models/User";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.referer = '/dashboard';

    this.state = {
      isLoggedIn: false,
      isError: false,
      userName: "",
      password: "",
      referer: "/dashboard",
    }
  }

  componentDidMount() {
    if (!this.state.isLoggedIn && this.context.existingTokens && this.context.existingTokens !== "") {

      this.setState({isLoggedIn: true});
    }
  }

  connect() {
    axios
      .post(
        'http://localhost:8083/api/index.php/login',
        {
          "login": "arold.alexander",
          "password": "tj5f1983",
          "reset": 1
        },
        {
          headers: {
            "Accept": "*/*",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json"
          },
        }
      )
      .then((result) => {
        if (result.status === 200 ) {
          this.context.setAuthTokens(result.data.success.token);
          axios.defaults.headers = { 
            "DOLAPIKEY": result.data.success.token
          };
          axios.get("http://localhost:8083/api/index.php/users/info").then(userInfo => {
            const userInfoData = userInfo.data
            
            let user = new User(result.data.success.token);
            user.contact_id = userInfoData.contact_id;
            user.email = userInfoData.email;
            user.entity = userInfoData.entity;
            user.firstname = userInfoData.firstname;
            user.id = userInfoData.id;
            user.lastname = userInfoData.lastname;
            user.login = userInfoData.login;
            user.societe_id = userInfoData.societe_id;
            user.user_mobile = userInfoData.user_mobile;
            user.address = userInfoData.address;
            user.zip = userInfoData.zip;
            user.town = userInfoData.town;

            axios.get("http://localhost:8083/api/index.php/thirdparties/" + user.entity).then(thridParty => {
              const thridPartyData = thridParty.data;

              user.third_party.id = thridPartyData.id;
              user.third_party.name = thridPartyData.name;
              user.third_party.name_alias = thridPartyData.name_alias;
              user.third_party.status = thridPartyData.status;
              user.third_party.code_client = thridPartyData.code_client;
              user.third_party.address = thridPartyData.address;
              user.third_party.zip = thridPartyData.zip;
              user.third_party.town = thridPartyData.town;

              this.context.setUser(user);

              this.props.history.push(this.state.referer);
            });

          }).catch(e => console.log(e));
          this.setState({isLoggedIn: true});
        } else {
          this.setState({setIsError: true});
        }
      })
      .catch((e) => {
        console.log('error catch', e);
        this.setState({setIsError: true});
      });
  }



  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to={this.state.referer}/>
    }

    return (
      <div className="login-page" style={{ minHeight: 512.8 }}>
        <div className="login-box">
          <div className="login-logo">
            <a href="/">
              <b>Admin</b>LTE
            </a>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
  
              <div>
                <div className="input-group mb-3">
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={this.state.userName}
                    onChange={ e => this.setState({setUserName :e.target.value}) }
                    />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={ e => this.setState({setPassword: e.target.value}) }
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input className="checkbox" id="remember" />
                      <label htmlFor="remember">Remember Me</label>
                    </div>
                  </div>
                  <div className="col-4">
                    <button
                      type="submit"
                      onClick={ () => {this.connect()} }
                      className="btn btn-primary btn-block"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
  
              <p className="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AuthContext;
export default Login;
