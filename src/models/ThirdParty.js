export class ThirdParty {
    constructor() {
        this.id= null;
        this.name= null;
        this.name_alias=null;
        this.address=null;
        this.zip= null;
        this.town= null;
        this.status=null;
        this.code_client=null;
        this.email=null;
        this.phone=null;
        this.siren=null;
        this.siret=null;
        this.ape=null;
    }

    bindThirdParty(props) {
        this.id= props.id;
        this.name= props.name;
        this.name_alias=props.name_alias;
        this.address=props.address;
        this.zip= props.zip;
        this.town= props.town;
        this.status= props.status;
        this.code_client=props.code_client;
        this.email = props.email;
        this.phone = props.phone;
        this.siren = props.idprof1;
        this.siret = props.idprof2;
        this.ape = props.idprof3;
    }
}