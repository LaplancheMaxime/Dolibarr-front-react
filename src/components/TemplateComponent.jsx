import React from "react";
import { AuthContext } from "../context/Auth";
import MainSideBarComponent from "./MainSideBarComponent";
import NavBarComponent from "./NavBarComponent";
import PropTypes from "prop-types";

class TemplateComponent extends React.Component {
    
  render() {
      console.log('props template', this.props);
      console.log('provider context', this);
    return (
      <div className="wrapper">
          <NavBarComponent/>
          <MainSideBarComponent User={this.context.user} />
          <div className="content-wrapper" style={{"minHeight": "1589.5625px"}} >
              {this.props.children}
          </div>

          <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
              <b>Version</b> 0.0.1
            </div> 
            <strong>Copyright © 2020-2021 <a href="http://adminlte.io">AdminLTE.io</a>.</strong> All rights
            reserved.
          </footer>
      
      </div>
    );
  }

}
TemplateComponent.propTypes = {
  children: PropTypes.element.isRequired,
}
TemplateComponent.contextType = AuthContext;
export default TemplateComponent;