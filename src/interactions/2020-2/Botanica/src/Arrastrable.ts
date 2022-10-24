import p5 from 'p5';

import Elemento from './Elemento';
import Logica from './Logica';

class Arrastrable {

    log: Logica;
    app: p5;
    tierra: Elemento;
    agua: Elemento;
    insecticida: Elemento;
    materamediana: Elemento;
    materagrande: Elemento;
    pala: Elemento;
    palos: Elemento;

    seleccion: any;
    sel: boolean;

    constructor(log: Logica) {
        this.log = log;
        this.app = log.app;
        this.tierra = new Elemento(this.app, "/img/2020-2/biologia/img/tierra.png", 1180, 119);
        this.agua = new Elemento(this.app, "/img/2020-2/biologia/img/regadera.png", 1120, 249);
        this.insecticida = new Elemento(this.app, "/img/2020-2/biologia/img/insecticida.png", 1240, 239);
        this.materamediana = new Elemento(this.app, "/img/2020-2/biologia/img/materamediana.png", 1120, 400);
        this.materagrande = new Elemento(this.app, "/img/2020-2/biologia/img/materagrande.png", 1220, 391);
        this.pala = new Elemento(this.app, "/img/2020-2/biologia/img/pala.png", 1190, 524);
        this.palos = new Elemento(this.app, "/img/2020-2/biologia/img/palos.png", 1235, 630);

        this.seleccion = undefined;
        this.sel = false;

    }

    pintar() {

        this.tierra.pintar();
        this.agua.pintar();
        this.insecticida.pintar();
        this.materamediana.pintar();
        this.materagrande.pintar();
        this.pala.pintar();
        this.palos.pintar();

    }

    mousePressed() {
        if (this.tierra.isSobre()) {
            this.seleccion = this.tierra;
            this.sel = true;
        } else if (this.agua.isSobre()) {
            this.seleccion = this.agua;
            this.sel = true;
        } else if (this.insecticida.isSobre()) {
            this.seleccion = this.insecticida;
            this.sel = true;
        } else if (this.materamediana.isSobre()) {
            this.seleccion = this.materamediana;
            this.sel = true;
        } else if (this.materagrande.isSobre()) {
            this.seleccion = this.materagrande;
            this.sel = true;
        } else if (this.pala.isSobre()) {
            this.seleccion = this.pala;
            this.sel = true;
        } else if (this.palos.isSobre()) {
            this.seleccion = this.palos;
            this.sel = true;
        }
    }

    arrastrar() {
        if (this.seleccion != null) {
            this.seleccion.arrastrar();
        }

    }

    soltar() {
        this.sel = false;
        if (this.seleccion != null) {
            this.seleccion.resetPosicion();
            this.seleccion = null;
        }

    }


}

export default Arrastrable;