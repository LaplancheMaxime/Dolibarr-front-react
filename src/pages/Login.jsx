import React from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import Axios from "axios";
import { AuthContext } from "../context/Auth";
import { User } from "../models/User";
import {config } from "../constants"
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.referer = '/dashboard';

    this.authValues = {
      email: "",
      password: "",
      rememberMe: false
    }

    this.formSchema = Yup.object().shape({
      email: Yup.string().required('Email obligatoire'),
      password: Yup.string().required('Mot de passe obligatoire')
    })


    this.state = {
      isLoggedIn: false,
      isError: false,
      authValues: this.authValues,
      referer: "/dashboard",
    }

    this.formControlClassName = 'form-control'
    this.errorClassName = 'is-invalid'
  }

  componentDidMount() {
    if (!this.state.isLoggedIn && this.context.existingTokens && this.context.existingTokens !== "") {

      this.setState({isLoggedIn: true});
    }
  }

  connect(values) {
    console.log(values);
    Axios
      .post(
        '/login',
        {
          "login": values.email,
          "password": values.password,
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
          Axios.defaults.headers = { 
            "DOLAPIKEY": result.data.success.token
          };
          Axios.get("/users/info").then(userInfo => {
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

            Axios.get("/thirdparties/" + user.entity).then(thridParty => {
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
      }, error => {
        console.log('error ici !!! ');
        console.log(error, error.response);

        if(error.response.status === 403) {
          NotificationManager.error("Connexion impossible", "Identifiants incrorrects", 7000);
        }
        this.authValues.password = "";
        this.setState({setIsError: true, authValues: this.authValues})
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
              <img src={config.common.SITE_LOGO_URL} alt="Website logo" style={{width: '250px'}}/><br />
              <h4>Votre espace client personalisé !</h4>
            </a>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Connexion à votre espace</p>

              <Formik
                initialValues={this.authValues}
                onSubmit={values => {this.connect(values); }}
                validationSchema={this.formSchema}
              >
                {({ errors, touched }) => (
                  <Form >
                  <div>
                    <div className="input-group mb-3">
                      <Field
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Email"
                        className={
                            errors.email && touched.email ?
                                this.formControlClassName +' '+ this.errorClassName 
                            : 
                                this.formControlClassName
                        }
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-envelope"></span>
                        </div>
                      </div>
                      <ErrorMessage component="div" name="email" className="invalid-feedback text-danger" />
                    </div>
                    
                    <div className="input-group mb-3">
                    <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        className={
                            errors.password && touched.password ?
                                this.formControlClassName +' '+ this.errorClassName 
                            : 
                                this.formControlClassName
                        }
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock"></span>
                        </div>
                      </div>
                      <ErrorMessage component="div" name="password" className="invalid-feedback text-danger"/>
                    </div>
                    <div className="row">
                      <div className="col-7">  
                          {/* <input className="checkbox" id="remember" /> */}
                          <label htmlFor="rememberMe"><Field type="checkbox" name="rememberMe" /> Se souvenir de moi</label>
                      </div>
                      <div className="col-5">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Connexion
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
              </Formik>
              <p className="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
              </p>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

Login.contextType = AuthContext;
export default Login;
