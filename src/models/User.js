import { ThirdParty } from "./ThirdParty";

export class User {

  constructor(dolitoken) {
    this.dolitoken = dolitoken;
    this.id = null;
    this.email = null;
    this.user_mobile = null;
    this.office_phone = null;
    this.login = null;
    this.entity = null;
    this.societe_id = null;
    this.contact_id = null;
    this.firstname = null;
    this.lastname = null;
    this.entity = null;
    this.address = null;
    this.zip = null;
    this.town = null
    this.third_party = new ThirdParty();
  }

  bindUser(props) {
    this.id = props.id;
    this.email = props.email;
    this.user_mobile = props.user_mobile;
    this.office_phone = props.office_phone;
    this.login = props.login;
    this.entity = props.entity;
    this.societe_id = props.societe_id;
    this.contact_id = props.contact_id;
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.entity = props.entity;
    this.address = props.address;
    this.zip = props.zip;
    this.town = props.town;
    this.third_party = new ThirdParty();
  }
}