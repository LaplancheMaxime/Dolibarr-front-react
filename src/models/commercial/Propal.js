import { Line } from "./Line";

export class Propal {

    constructor() {
        this.id = null;
        this.socid = null
        this.ref = null;
        this.ref_client = null;
        this.socid = null;
        this.third_party = null
        this.comercial_contact = null;
        this.statut = null;
        this.date_creation = null;
        this.date_validation = null;
        this.fin_validite = null;
        this.user_valid_id = null;
        this.total = null;
        this.total_ttc = null;
        this.total_tva = null;
        this.note_public = null;
        this.tva= null;
        this.remise=null;
        this.remise_percent = null;
        this.remise_absolue = null;
        this.lines = [];
        this.statut_libelle = null;
        this.last_main_doc = null;
    }

    bindPropal(propal) {
        this.id = propal.id;
        this.ref = propal.ref;
        this.ref_client = propal.ref_client;
        this.socid = propal.socid;
        this.statut = propal.statut;
        this.date_creation = propal.date_creation;
        this.date_validation = propal.date_validation;
        this.fin_validite = propal.fin_validite;
        this.total = propal.total;
        this.total_ttc = propal.total_ttc;
        this.total_tva = propal.total_tva;
        this.note_public = propal.note_public;
        this.tva= propal.tva;
        this.user_valid_id = propal.user_valid_id;
        this.remise=propal.remise;
        this.remise_percent = propal.remise_percent;
        this.remise_absolue = propal.remise_absolue;
        this.statut_libelle = propal.statut_libelle;
        this.last_main_doc = propal.last_main_doc;
        if (propal.lines) (

            propal.lines.forEach(line => {
                const tempLine = new Line();
                tempLine.bindLine(line);

                this.lines.push(tempLine);
            })
        )
    }
}