import React from "react";
import Axios from "axios";
import { AuthContext } from "../context/Auth";
import { withRouter } from "react-router-dom";
import { config } from "../constants"

class MainSideBarComponent extends React.Component {

    constructor(props) {
        super(props);

        this.openPropalNumber = 0;

        this.state = {
            openPropalNumber : this.openPropalNumber,
        }
    }

    componentDidMount() {

        Axios.get('/proposals').then(results => {
            console.log('results', results);
            results.data.map(function(propalResult, i) {
                if (propalResult.statut ===1 ) {
                    this.openPropalNumber++;
                    this.setState({openPropalNumber: this.openPropalNumber});
                }
                return true;
            });
        }, error => {
            if ((error.response && error.response.status === 404) || error.status === 404) {
                this.setState({openPropalNumber: 0});
            }
        });
    }


    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">

                <a href="/" className="brand-link">
                <img src={config.common.SITE_LOGO_URL_MINI} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{"opacity": ".8"}}/>
                <span className="brand-text font-weight-light">{config.common.SITE_NAME}</span>
                </a>

                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item has-treeview">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="#" onClick={() => this.props.history.push("/dashboard")} className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                 {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="#" onClick={() => this.props.history.push("/propals")} className="nav-link">
                                    <i className="nav-icon fas fa-money-check-alt"></i>
                                    <p>
                                        Proposition com.
                                        {this.state.openPropalNumber > 0 &&
                                            <span className="right badge badge-success">NEW</span>
                                        }
                                        
                                    </p>
                                </a>
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
                                        Mes facture
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
