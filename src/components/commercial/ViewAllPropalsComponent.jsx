import Axios from "axios";
import React from "react";
import Moment from "react-moment";
import { AuthContext } from "../../context/Auth";
import { Propal } from "../../models/commercial/Propal";
import { ThirdParty } from "../../models/ThirdParty";
import DataTable from 'react-data-table-component';


const $ = require('jquery');
$.DataTable = require('datatables.net');

export class ViewAllPropalsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.Propals = [];

        this.state = {
            Propals : [],
        }

        function dateFormatter(cell) {
            return (<Moment unix>{cell}</Moment>);
        }

        function priceFormatter(cell) {
            return (<span>{Number(cell)}€</span>)
        }

        function statutFormatter(cell, row) {
            console.log(cell, row)
            return (
                cell === 1 ?
                    <h5><span className="right badge badge-success">{row.statut_libelle}</span></h5>
                    :
                    <h5><span className="right badge-lg badge badge-primary">{row.statut_libelle}</span></h5>
            )
        }

        this.tableColumns = [
            {
                selector: row => row.ref,
                name: "Ref.",
                sortable: true,
            },
            {
                selector: row => row.ref_client,
                name: "Ref. client",
                sortable: false
            },
            {
                selector: row => row.third_party.name,
                name: "Tiers",
                sortable: false
            },
            {
                selector: row => row.date_validation,
                name: "Date",
                sortable: true,
                format: (row, index) => dateFormatter(row.date_validation),
            },
            {
                selector: row => row.total_ttc,
                name: "Montant",
                sortable: false,
                format: (row, index) => priceFormatter(row.total_ttc),
            },
            {
                selector: row => row.statut,
                name: "État",
                sortable: true,
                format: (row, index) => statutFormatter(row.statut, row)
            }
        ];

        this.defaultSorted = [{
            dataField: 'date',
            order: 'asc'
        }];

        this.rowEvents = (row, rowIndex) => {
                console.log(row, rowIndex);
                this.props.history.push('/propals/'+ row.id);
        }
    }

    componentDidMount() {

        Axios.get('/proposals').then(results => {
            let count = results.data.length ? results.data.length : 0;
            let i = 0; 
            results.data.map((propalResult) => {
                var propal = new Propal();
                propal.bindPropal(propalResult);

                if (propal.statut !== 0) {
                    Axios.get('/thirdparties/' + propal.socid).then(result => {

                        var third_party = new ThirdParty();
                        third_party.bindThirdParty(result.data);
                        propal.third_party = third_party;
                        this.Propals.push(propal);
                        i++
                        if (i === count) {
                            this.setState({Propals: this.Propals});
                        }
                        
                        
                    });
                }

                return true;
            });
        },error => {
        });
    }

    componentWillUnmount(){
     }

    render() {
        return(
            <div>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Mes devis</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item active">Mes devis.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <DataTable
                                            columns={this.tableColumns}
                                            data={this.state.Propals}
                                            persistTableHead={true}
                                            pointerOnHover
                                            striped
                                            highlightOnHover
                                            onRowClicked={this.rowEvents}
                                            defaultSortFieldId={1}
                                            pagination
                                        />
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
