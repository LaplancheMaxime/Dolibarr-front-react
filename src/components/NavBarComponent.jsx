import React from "react";
import { withRouter, NavLink  } from "react-router-dom";
import {AuthContext} from "../context/Auth";
import { config } from "../constants";

class NavBarComponent extends React.Component {

 logOut() {
    this.context.setAuthTokens('');
  }

  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="/" role="button"><i className="fas fa-bars"></i></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink to="/dashboard" activeClassName="active" className="nav-link">
              Accueil
            </NavLink>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href={'mailto:' + config.common.MAIL_CONTACT} className="nav-link">Contact</a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown user-menu">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user-alt fa-lg user-image" alt="User"> </i>
              <span className="d-none d-md-inline">{this.context.user?.firstname} {this.context.user?.lastname}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{"left": "inherit", "right": "0px"}}>
              <li className="user-header bg-primary align-middle ">
                <img className="img-circle" src={config.url.DOLIBARR_INSTANCE + "public/theme/common/user_man.png"} alt="User"/>
                <br />
                <div className="text-center">
                  <b>{this.context.user?.firstname} {this.context.user?.lastname}</b> <br />
                  <small>({this.context.user.login})</small>
                </div>
              </li>
              <div className="user-footer">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" onClick={() => this.logOut()} className="btn btn-default btn-flat btn-block">Sign out</a>
              </div>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }

}
NavBarComponent.contextType = AuthContext;
export default withRouter(NavBarComponent);