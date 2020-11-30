import React from "react";
import Moment from "react-moment";
import DownloadDocumentButtonComponent from "../commercial/DownloadDocumentButtonComponent"

class InvoiceTemplateComponent extends React.Component {
    render() {
      var parse = require('html-react-parser');

        return (
            <div className="invoice p-3 mb-3">
              <div className="row">
                <div className="col-12">
                  <h4>
                    <i className="fas fa-globe"></i> {this.props.MyCompagny.name}
                    <small className="float-right">Date: <Moment unix>{this.props.Invoice.date_validation}</Moment></small><br/>
                    <small className="float-right"><span className="right badge badge-primary">{this.props.Invoice.statut_libelle}</span></small>
                  </h4>
                </div>
              </div>
              <div className="row invoice-info">
                <div className="col-sm-4 invoice-col">
                  De
                  <address>
                    <strong>{this.props.MyCompagny.name}</strong><br/>
                    {this.props.MyCompagny.address}<br/>
                    {this.props.MyCompagny.zip}, {this.props.MyCompagny.town}<br/>
                    Phone: {this.props.MyCompagny.phone}<br/>
                    Email: {this.props.MyCompagny.email}
                  </address>
                </div>
                <div className="col-sm-4 invoice-col">
                  À
                  <address>
                    <strong>
                    {this.props.Invoice.third_party.name_alias !== "" ?
                        this.props.Invoice.third_party.name_alias
                      :
                        this.props.Invoice.third_party.name
                    }
                    </strong><br/>
                    {this.props.Invoice.third_party.address}<br/>
                    {this.props.Invoice.third_party.zip}, {this.props.Invoice.third_party.town}<br/>
                    Phone: {this.props.Invoice.third_party.phone} <br/>
                    Email: {this.props.Invoice.third_party.email}
                  </address>
                </div>
                <div className="col-sm-4 invoice-col">
                  <b>Ref : {this.props.Invoice.ref}</b><br/>
                  <br/>
                  {this.props.Invoice.ref_client != null &&
                  <div>
                    <b>Ref client : </b>
                    {this.props.Invoice.ref_client}
                    <br/>
                  </div>
                  }
                  
                  <b>Échéance :</b>  <Moment unix>{this.props.Invoice.fin_validite}</Moment><br/>
                  <b>Compte :</b> {this.props.Invoice.third_party.code_client}
                </div>
              </div>
              {this.props.Invoice.note_public != null && this.props.Invoice.note_public !== "" ?
                <div className="row">
                  <p className="text-muted well well-sm shadow-none" style={{"marginTop": "10px"}}>
                    <b>Information(s):</b> <br/>
                    {this.props.Invoice.note_public}
                  </p>
                </div>
                :
                <div></div>
              }


              <div className="row">
                <div className="col-12 table-responsive">
                  <table className="table table-striped">
                    <thead>
                    <tr>
                      <th>Product</th>
                      <th>Prix unit. HT</th>
                      <th>Qté</th>
                      <th>Réduc.</th>
                      <th>Total HT</th>
                    </tr>
                    </thead>
                    <tbody>
                      {this.props.Invoice.lines.map(line => 
                        <tr key={line.id}>
                          <td className="align-middle">{line.libelle != null &&
                                <div>
                                  <b>{parse(line.libelle)}</b>
                                  <br />
                                </div>
                              }
                              {parse(line.desc)}
                            </td>
                          <td className="align-middle">{Number(line.subprice).toFixed(2)}€</td>
                          <td className="align-middle">{line.qty}</td>
                          <td className="align-middle">{line.remise_percent}%</td>
                          <td className="align-middle">{Number(line.total_ht).toFixed(2)}€</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  {this.props.Invoice.tva === null &&
                    <p className="text-muted well well-sm shadow-none" style={{"marginTop": "10px"}}>
                      * TVA non applicable art-293B du CGI
                    </p>
                  }
                  <p className="lead">Méthodes de paiement :</p>
                  <img src="../../dist/img/credit/visa.png" alt="Visa"/>
                  <img src="../../dist/img/credit/mastercard.png" alt="Mastercard"/>
                  <img src="../../dist/img/credit/american-express.png" alt="American Express"/>
                  <img src="../../dist/img/credit/paypal2.png" alt="Paypal"/>

                  {/* <p className="text-muted well well-sm shadow-none" style={{"marginTop": "10px"}}>
                    Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem
                    plugg
                    dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.
                  </p> */}
                </div>
                <div className="col-6">
                  <div className="table-responsive">
                    <table className="table">
                      <tbody><tr>
                        <th style={{"width":"50%"}}>Sous-total:</th>
                        <td>{Number(this.props.Invoice.total).toFixed(2)}€</td>
                      </tr>
                      <tr>
                        <th>Taxe {this.props.Invoice.tva != null ?
                          '(' + this.props.Invoice.tva + '%)' 
                          :
                           '(0%)'
                          }:
                        </th>
                        <td>{Number(this.props.Invoice.total_tva).toFixed(2)}€</td>
                      </tr>
                      <tr>
                        <th>Total:</th>
                        <td>{Number(this.props.Invoice.total_ttc).toFixed(2)}€</td>
                      </tr>
                    </tbody></table>
                  </div>
                </div>
              </div>

              <div className="row no-print">
                <div className="col-12">
                  <DownloadDocumentButtonComponent document={this.props.Invoice.last_main_doc} />
                </div>
              </div>
            </div>
        );
    }
}

export default InvoiceTemplateComponent;