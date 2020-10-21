export class Line {
    constructor() {
        this.id = null ;
        this.desc = null;
        this.qty = null;
        this.subprice= null ;
        this.remise_percent = null;
        this.rang = null;
        this.pa_ht = null ;
        this.total_ht= null;
        this.total_tva = null;
        this.total_ttc = null ;
        this.ref= null;
        this.product_ref =null;
        this.libelle = null ;
    }

    bindLine(line) {

        this.id = line.id;
        this.desc = line.desc;
        this.qty = line.qty;
        this.subprice = line.subprice;
        this.remise_percent = line.remise_percent;
        this.rang = line.rang;
        this.pa_ht = line.pa_ht;
        this.total_ht = line.total_ht;
        this.total_tva = line.total_tva;
        this.total_ttc = line.total_ttc;
        this.ref = line.ref;
        this.product_ref = line.product_ref;
        this.libelle = line.libelle;
    }
}