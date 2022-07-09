import Axios from "axios";
import React from "react";
import InvoiceTemplateComponent from "../template/InvoiceTemplateComponent";
// import { Compagny } from "../../models/Compagny";
import { Propal } from "../../models/commercial/Propal";
import { ThirdParty } from "../../models/ThirdParty";
import { NavLink, Redirect } from "react-router-dom";
import { User } from "../../models/User";
import { AuthContext } from "../../context/Auth";
import NotificationManager from 'react-notifications/lib/NotificationManager';
import AcceptOrDeclineCard from "../common/PropalsInvoices/AcceptOrDeclineCard";

export class ViewPropalComponent extends React.Component {

    constructor(props) {
        super(props);

        this.MyCompagny = null;
        this.Propal = null;

        this.validatePropal = this.validatePropal.bind(this);

        this.state = {
            MyCompagny : null,
            Propal: null,
            ReadyToGo: false,
            redirect: null
        }
    }

    componentDidMount() {
        Promise.all([
            Axios.get('/proposals/'+this.props.match.params.id+'?contact_list=0')
        ]).then(results => {
            this.Propal = new Propal();
            this.Propal.bindPropal(results[0].data);

            Axios.get('/thirdparties/' + this.Propal.socid).then(thirdparty => {
                this.Propal.third_party = new ThirdParty();
                this.Propal.third_party.bindThirdParty(thirdparty.data);

                Axios.get('/users/'+this.Propal.user_valid_id).then(commercialContact => {

                    this.Propal.comercial_contact = new User();
                    this.Propal.comercial_contact.bindUser(commercialContact.data);

                    this.setState({Propal: this.Propal});
                    this.setState({ReadyToGo: true});
                });
            })
        }).catch(e => {
            console.log(e);
        });
    }

    validatePropal(i_status) {
        const proposalsCloseModel = {
            "status": i_status,
            "note_private": "Réponse client",
            "notrigger": 0
        }

        Axios.post('/proposals/' + this.state.Propal.id + '/close', proposalsCloseModel).then(result => {
            console.log('result', result);
            this.componentDidMount();
            if (i_status === 2 ) {
                NotificationManager.success("Votre approbation pour cette proposition est bien prise en compte!", "Proposition commerciale acceptée !",7000)
            } else if (i_status === 3) {
                NotificationManager.warning("Vous n'avez pas approuvé cette proposition, nous allons vous recontacter rapidement.", "Porposition commerciale refusée", 7000,);
            }
        })
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        console.log(this.state);
        return (
            <div>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Proposition commerciale</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><NavLink to='/propals' >Mes propositions commerciale</NavLink></li>
                                <li className="breadcrumb-item active">{this.state.Propal?.ref}</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        {this.state.ReadyToGo ?
                            <div className="row">
                                <div className="col-3">
                                    {this.state.Propal.statut === 1 &&
                                        <AcceptOrDeclineCard ttcPrice={this.state.Propal.total_ttc} validate={this.validatePropal} />
                                    }
                                    <div className="card card-outline card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">Votre contact commercial</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-10">
                                                    <h2 className="lead"><b>{this.state.Propal.comercial_contact.lastname} {this.state.Propal.comercial_contact.firstname}</b></h2>
                                                    <ul className="ml-4 mb-0 fa-ul text-muted">
                                                        <li className="small">
                                                            <span className="fa-li"><i className="fas fa-lg fa-envelope"></i></span> 
                                                            <a className="align-middle" href={'mailto:' + this.state.Propal.comercial_contact.email}>{this.state.Propal.comercial_contact.email}</a>
                                                        </li>
                                                        <li className="small">
                                                            <span className="fa-li"><i className="fas fa-lg fa-phone"></i></span> 
                                                            <div className="align-middle">{this.state.Propal.comercial_contact.office_phone}</div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-2 text-center" >
                                                    <i className="fas fa-3x fa-user-tie" style={{verticalAlign: 'middle'}} ></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <InvoiceTemplateComponent MyCompagny={this.state.MyCompagny} Invoice={this.state.Propal} /> 
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
ViewPropalComponent.contextType = AuthContext;
export default ViewPropalComponent;