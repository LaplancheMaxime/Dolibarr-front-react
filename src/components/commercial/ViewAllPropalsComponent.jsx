import Axios from "axios";
import React from "react";
import Moment from "react-moment";
import { AuthContext } from "../../context/Auth";
import { Propal } from "../../models/commercial/Propal";
import { ThirdParty } from "../../models/ThirdParty";

const $ = require('jquery');
$.DataTable = require('datatables.net');

export class ViewAllPropalsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.Propals = [];

        this.state = {
            Propals : [],
            ReadyToGo: false,
            noData: false,
        }

        this.tableRef = React.createRef();
    }

    componentDidMount() {

        Axios.get('/proposals').then(results => {
            results.data.map(function(propalResult, i) {
                var propal = new Propal();
                propal.bindPropal(propalResult);
                Axios.get('/thirdparties/' + propal.socid).then(result => {

                    var third_party = new ThirdParty();
                    third_party.bindThirdParty(result.data);
                    propal.third_party = third_party;

                    var index = this.Propals.findIndex((propalFind) => propalFind.id === propal.id);
                    if (index >= 0) {
                        this.Propals[index].third_party = third_party;
                        this.setState({Propals: this.Propals});
                    }

                });
                this.Propals.push(propal);
                return true;
            });

            this.setState({Propals: this.Propals});

            $(this.tableRef.current).DataTable({
                "responsive": true,
                "paging": true,
                "ordering": true,
                "info": true,
                "order": [[ 3, "desc" ], [5, "asc"]],
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
                },
            });
        },error => {
            if ((error.response && error.response.status === 404) || error.status === 404) {
                this.setState({noData: true});
            }
        });
    }

    componentWillUnmount(){
        $('.data-table-wrapper')
        .find('table')
        .DataTable()
        .destroy(true);
     }

    render() {
        return(
            <div>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Mes propositions comerciales</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">Mes propositions com.</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card card-solid">
                                    <div className="card-body pb-0">
                                        {this.state.noData ?
                                            <p className="text-center">Aucune proposition commerciale pour le moment</p>
                                        :
                                            <table ref={this.tableRef} className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Ref.</th>
                                                        <th>Ref. client</th>
                                                        <th>Tiers</th>
                                                        <th>Date</th>
                                                        <th>Montant</th>
                                                        <th>État</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {this.state.Propals.map(function(propal) {
                                                        if (propal.statut !== 0) {
                                                            return <tr key={propal.id } onClick={()=>{this.props.history.push('/propals/'+propal.id)}} style={{cursor: 'pointer'}}>
                                                                    <td>{propal.ref}</td>
                                                                    <td>{propal.ref_client}</td>
                                                                    <td>{propal.third_party?.name}</td>
                                                                    <td><Moment unix>{propal.date_validation}</Moment></td>
                                                                    <td>{Number(propal.total_ttc)}€</td>
                                                                    <td>
                                                                        {propal.statut === 1 ?
                                                                            <span className="right badge badge-success">{propal.statut_libelle}</span>
                                                                            :
                                                                            <span className="right badge badge-primary">{propal.statut_libelle}</span>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                        } else {
                                                            return true
                                                        }
                                                    })}
                                                </tbody>

                                            </table>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}

ViewAllPropalsComponent.contextType = AuthContext;
export default ViewAllPropalsComponent;
