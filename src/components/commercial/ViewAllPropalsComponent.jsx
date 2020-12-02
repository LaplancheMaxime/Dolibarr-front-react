import Axios from "axios";
import React from "react";
import Moment from "react-moment";
import { AuthContext } from "../../context/Auth";
import { Propal } from "../../models/commercial/Propal";
import { ThirdParty } from "../../models/ThirdParty";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export class ViewAllPropalsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.Propals = [];

        this.state = {
            Propals : [],
            nbPropals: 0,
            ReadyToGo: false,
            noData: false,
        }

        function dateFormatter(cell, row) {
            return (<Moment unix>{cell}</Moment>);
        }

        function priceFormatter(cell, row) {
            return (<span>{Number(cell)}€</span>)
        }

        function statutFormatter(cell, row) {
            console.log(cell, row)
            return (
                cell === 1 ?
                    <span className="right badge badge-success">{row.statut_libelle}</span>
                    :
                    <span className="right badge badge-primary">{row.statut_libelle}</span>
            )
        }

        this.tableColumns = [
            {
                dataField: 'ref',
                text: "Ref.",
                sort: true,
            },
            {
                dataField: 'ref_client',
                text: "Ref. client",
                sort: false
            },
            {
                dataField: 'third_party.name',
                text: "Tiers",
                sort: false
            },
            {
                dataField: 'date_validation',
                text: "Date",
                sort: true,
                formatter:dateFormatter,
            },
            {
                dataField: 'total_ttc',
                text: "Montant",
                sort: false,
                formatter: priceFormatter,
            },
            {
                dataField: 'statut',
                text: "État",
                sort: true,
                formatter: statutFormatter
            }
        ];

        this.defaultSorted = [{
            dataField: 'date',
            order: 'asc'
        }];

        this.rowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log(e, row, rowIndex);
                this.props.history.push('/propals/'+ row.id);
            }
        }
    }

    componentDidMount() {

        Axios.get('/proposals').then(results => {
            results.data.map((propalResult, i) => {
                var propal = new Propal();
                propal.bindPropal(propalResult);

                if (propal.statut !== 0) {
                    Axios.get('/thirdparties/' + propal.socid).then(result => {

                        var third_party = new ThirdParty();
                        third_party.bindThirdParty(result.data);
                        propal.third_party = third_party;
                        this.Propals.push(propal);
                        this.setState({Propals: this.Propals});
                        
                    });
                }
            });
        },error => {
            if ((error.response && error.response.status === 404) || error.status === 404) {
                this.setState({noData: true});
            }
        });
    }

    componentWillUnmount(){
     }

    render() {
        const { SearchBar, ClearSearchButton } = Search;
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
                                        <ToolkitProvider 
                                            keyField="id" 
                                            data={this.state.Propals} 
                                            columns={this.tableColumns} 
                                            bootstrap4={true}
                                            search
                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-lg-10">
                                                                <SearchBar { ...props.searchProps } placeholder="Recherche..." />
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <ClearSearchButton { ...props.searchProps } className="btn btn-block" text="Effacer"/>
                                                            </div>
                                                        </div>
                                                        <BootstrapTable
                                                                        noDataIndication="Aucune proposition commerciale pour le moment" 
                                                                        defaultSorted={this.defaultSorted}
                                                                        rowEvents={this.rowEvents}
                                                                        striped={true} 
                                                                        bootstrap4={true}
                                                                        hover={true}
                                                                        pagination={ paginationFactory() }
                                                                        { ...props.baseProps } />
                                                    </div>
                                                )
                                            }
                                        </ToolkitProvider>
                                        {/* {this.state.noData ?
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
                                        } */}
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
