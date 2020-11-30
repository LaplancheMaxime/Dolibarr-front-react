import Axios from "axios";
import React from "react";
import InvoiceTemplateComponent from "../template/InvoiceTemplateComponent";
import { Compagny } from "../../models/Compagny";
import { Propal } from "../../models/commercial/Propal";
import { ThirdParty } from "../../models/ThirdParty";
import { Redirect } from "react-router-dom";
import { User } from "../../models/User";
import { AuthContext } from "../../context/Auth";

export class ViewPropalComponent extends React.Component {

    constructor(props) {
        super(props);

        this.MyCompagny = null;
        this.Propal = null;

        this.state = {
            MyCompagny : null,
            Propal: null,
            ReadyToGo: false,
            redirect: null
        }
    }

    componentDidMount() {
        Promise.all([
            Axios.get('/setup/company'),
            Axios.get('/proposals/'+this.props.match.params.id+'?contact_list=0')
        ]).then(results => {

            this.MyCompagny = new Compagny();
            this.MyCompagny.bindCompagny(results[0].data);
            this.setState({MyCompagny : this.MyCompagny });

            this.Propal = new Propal();
            this.Propal.bindPropal(results[1].data);

            Axios.get('/thirdparties/' + this.Propal.socid).then(thirdparty => {
                this.Propal.third_party = new ThirdParty();
                this.Propal.third_party.bindThirdParty(thirdparty.data);

                Axios.get('/users/1').then(commercialContact => {

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
            window.location.reload(true);
        })
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
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
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <li className="breadcrumb-item"><a href="#" onClick={()=>{this.props.history.push('/propals')}} >Mes propositions com.</a></li>
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
                                        <div className="card card-outline card-success">
                                            <div className="card-header">
                                                <h3 className="card-title">Informations</h3>
                                            </div>
                                            <div className="card-body">
                                                <h2 className="text-center">{Number(this.state.Propal.total_ttc).toFixed(2)}€</h2>
                                                <hr/>
                                                <p>Cette proposition commerciale est en attente de validation de votre part.</p>
                                                <div className="row">
                                                    <div className='col-7'>
                                                        <button type="button" className="btn btn-block bg-gradient-success" onClick={() => {this.validatePropal(2)}}><i className="far fa-check-circle"></i> Accepter</button>
                                                    </div>
                                                    <div className='col-5'>
                                                        <button type="button" className="btn btn-block bg-gradient-danger"><i className="far fa-times-circle"></i> Refuser</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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