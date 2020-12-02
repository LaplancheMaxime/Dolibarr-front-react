import Axios from "axios";
import React from "react";
import { AuthContext } from "../context/Auth";

class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ReadyToGo: false
        }
    }

    componentDidMount() {

        Axios.get('/proposals').then(results => {
                results.data.map((propalResult, i) => {
                    if (propalResult.statut ===1 ) {
                        this.openPropalNumber++;
                        this.setState({openPropalNumber: this.openPropalNumber});
                    }
                    return true;
                });
                this.setState({ReadyToGo : true})
        }, (error) => {
            if ((error.response && error.response.status === 404) || error.status === 404) {
                this.setState({openPropalNumber: 0});
                this.setState({ReadyToGo : true})
            }
        });
    }

    render() {

    return (
        <div>
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Accueil</h1>
                    </div>
                </div>
            </div>
        </section>
        <section className="content">
            <div className="container-fluid">
                {this.state.ReadyToGo ?
                    <div className="row">
                        <div className="col-12">
                            <div className="info-box p-3 mb-3">
                                <p>Bienvenue sur votre espace client MLTech !</p>
                            </div>
                        </div>
                    </div>
                :
                    <div className="row">
                        <div className="col-12">
                            <div className="info-box p-3 mb-3">
                                <div className="overlay">
                                    <i className="fas fa-3x fa-spin fa-sync-alt"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    </div>
    );
    }
}
DashboardComponent.contextType = AuthContext;
export default DashboardComponent;
