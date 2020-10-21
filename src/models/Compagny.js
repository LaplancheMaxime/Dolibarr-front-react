
export class Compagny {
    constructor() {
        this.name = null;
        this.address = null;
        this.zip = null;
        this.town = null;
        this.phone = null;
        this.email = null;
        this.socialnetworks_facebook = null;
        this.socialnetworks_twitter = null;
        this.socialnetworks_linkedin = null;
        this.url = null;
        this.siret = null;
        this.siren = null;
        this.ape = null;
        this.managers = null;
    }

    bindCompagny(resultRequest) {
        this.name = resultRequest.name;
        this.phone = resultRequest.phone;
        this.siren = resultRequest.idprof2;
        this.siret = resultRequest.idprof1;
        this.socialnetworks_facebook = resultRequest.socialnetworks.facebook;
        this.socialnetworks_linkedin = resultRequest.socialnetworks.twitter;
        this.socialnetworks_twitter = resultRequest.socialnetworks.linkedin;
        this.town = resultRequest.town;
        this.url = resultRequest.url;
        this.zip = resultRequest.zip;
        this.managers = resultRequest.managers;
        this.email = resultRequest.email;
        this.ape = resultRequest.idprof3;
        this.address = resultRequest.address;

        return true;
    }
}
