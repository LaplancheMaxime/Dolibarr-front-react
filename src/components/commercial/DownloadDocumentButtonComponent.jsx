import Axios from "axios";
import React from "react";
export class DownloadDocumentButtonComponent extends React.Component {
    constructor(props) {
        super(props);

        var splitDocument = this.props.document.split('/');
        var modulepart = splitDocument[0];
        var original_file = splitDocument[1] + '/' + splitDocument[2];
        var filename = splitDocument[2];

        this.documentBase64 = null;

        this.state = {
            modulepart,
            original_file,
            filename,
            'documentBase64': this.documentBase64
        }

    }

    componentDidMount() {
        Axios.get('/documents/download?modulepart='+this.state.modulepart+'&original_file='+this.state.original_file).then(result => {
            this.setState({'documentBase64': result.data.content});
        })
    }

    render() {
        return(
            <a href={'data:application/pdf;base64,' + this.state.documentBase64} download={this.state.filename} className="btn btn-primary float-right" style={{"marginRight": "5px"}}>
                <i className="fas fa-download"></i> Télécharger le PDF
            </a>
        );
    }

}

export default  DownloadDocumentButtonComponent;