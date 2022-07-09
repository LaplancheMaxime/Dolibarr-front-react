import React from "react";

export class AcceptOrDeclineCard extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div className="card card-outline card-success">
      <div className="card-header">
          <h3 className="card-title">Informations</h3>
      </div>
      <div className="card-body">
          <h2 className="text-center">{Number(this.props.ttcPrice).toFixed(2)}€</h2>
          <hr/>
          <p>Ce document est en attente de validation de votre part.</p>
          <p>Vous pouvez consulter le document original en cliquant sur le bouton "Télécharger le PDF".</p>
          <div className="row">
              <div className='col-7'>
                  <button type="button" className="btn btn-block bg-gradient-success" onClick={() => this.props.validate(2)}><i className="far fa-check-circle"></i> Accepter</button>
              </div>
              <div className='col-5'>
                  <button type="button" className="btn btn-block bg-gradient-danger" onClick={() => this.props.validate(3)}><i className="far fa-times-circle"></i> Refuser</button>
              </div>
          </div>
      </div>
  </div>
    );

  }
}

export default AcceptOrDeclineCard;