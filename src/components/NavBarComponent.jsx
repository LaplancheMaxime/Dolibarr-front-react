import React from "react";
import { withRouter } from "react-router-dom";
import {AuthContext} from "../context/Auth"

class NavBarComponent extends React.Component {

 logOut() {
    this.context.setAuthTokens('');
  }

  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="/admin" role="button"><i className="fas fa-bars"></i></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
             {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={() => this.props.history.push("/")} className="nav-link">Accueil</a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="mailto:contact@mltech.fr" className="nav-link">Contact</a>
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
                <div className="text-center">
                  <br />
                  <b>{this.context.user?.firstname} {this.context.user?.lastname}</b> <br />
                  <small>({this.context.user.login})</small>
                  <br />
                  <table style={{width: "100%"}}>
                    <tbody>
                      <tr>
                        <td className="col-sm-1" ><i className="fas fa-at fa-sm"></i></td>
                        <td className="col-sm-10 text-left" >{this.context.user?.email}</td>
                      </tr>
                      <tr>
                        <td className="col-sm-1" ><i className="fas fa-phone fa-sm"></i></td>
                        <td className="col-sm-10 text-left" >{this.context.user?.user_mobile}</td>
                      </tr>
                    </tbody>
                  </table>
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