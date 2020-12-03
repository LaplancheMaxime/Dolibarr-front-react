import React from "react";
import Axios from "axios";
import { AuthContext } from "../context/Auth";
import { withRouter, NavLink  } from "react-router-dom";

class MainSideBarComponent extends React.Component {

    constructor(props) {
        super(props);

        this.openPropalNumber = 0;
        this.nbPropals = 0; 

        this.state = {
            openPropalNumber : this.openPropalNumber,
            nbPropals: this.nbPropals
        }
    }

    loadNumbers() {
        Axios.get('/proposals').then(results => {
            results.data.map((propalResult, i)  => {
                if (propalResult.statut === 1 ) {
                    this.openPropalNumber++;
                    this.setState({openPropalNumber: this.openPropalNumber});
                } else if (propalResult.statut !== 0 ) {
                    this.nbPropals++;
                    console.log(this.nbPropals);
                    this.setState({nbPropals: this.nbPropals});
                }
                return true;
            });
        }, error => {
            if ((error.response && error.response.status === 404) || error.status === 404) {
                this.setState({openPropalNumber: 0});
            }
        });
    }

    componentDidMount() {

        this.loadNumbers();
    }

    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">

                <a href="/" className="brand-link">
                <img src={window._env_.REACT_APP_SITE_LOGO_URL_MINI} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{"opacity": ".8"}}/>
                <span className="brand-text font-weight-light">{window._env_.REACT_APP_SITE_NAME}</span>
                </a>

                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item has-treeview">
                                <NavLink to="/dashboard" activeClassName="active" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Accueil
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/propals" activeClassName="active" className="nav-link">
                                    <i className="nav-icon fas fa-money-check-alt"></i>
                                    <p>
                                        Mes devis
                                        {this.state.openPropalNumber > 0 ?
                                            <span className="right badge badge-success">NEW<i className="fas fa-pen-alt"></i></span>
                                            :
                                            <span className="badge badge-primary right">{this.state.nbPropals}</span>
                                        }
                                        
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item has-treeview">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-dolly"></i>
                                    <p>
                                        Mes commandes
                                        <span className="badge badge-primary right">1</span>
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item has-treeview">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-file-invoice-dollar"></i>
                                    <p>
                                        Mes factures
                                        <span className="badge badge-primary right">0</span>
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }

}

MainSideBarComponent.contextType = AuthContext;
export default withRouter(MainSideBarComponent);
