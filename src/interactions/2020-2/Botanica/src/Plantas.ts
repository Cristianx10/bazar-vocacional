import p5 from 'p5';

import Elemento from './Elemento';
import Logica from './Logica';

class Plantas {

    log: Logica;
    app: p5;
    asolear: boolean;
    asoleado: boolean;
    plantabebe2: Elemento;
    plantabebe1hoja: Elemento;
    plantabebe1: Elemento;
    plantabebe3sintierra: Elemento;
    plantabebe3: Elemento;


    seleccion: any;
    sel: boolean;

    nivel: number;

    iden: undefined | any;
    tiempo: number;

    estado1: boolean;
    

    constructor(log: Logica) {
        this.log = log;
        this.app = log.app;
        this.asolear = false;
        this.asoleado = false;
        this.plantabebe2 = new Elemento(this.app, "/img/2020-2/biologia/img/plantabebe2.png", 600, 459);
        this.plantabebe1hoja = new Elemento(this.app, "/img/2020-2/biologia/img/plantabebe1hoja.png", 760, 458);
        this.plantabebe1 = new Elemento(this.app, "/img/2020-2/biologia/img/plantabebe1.png", 760, 455);
        this.plantabebe3sintierra = new Elemento(this.app, "/img/2020-2/biologia/img/plantabebe3sintierra.png", 930, 450);
        this.plantabebe3 = new Elemento(this.app, "/img/2020-2/biologia/img/plantabebe3.png", 930, 450);


        this.seleccion = undefined;
        this.sel = false;

        this.nivel = 1;

        this.run = this.run.bind(this);
        this.iden = undefined;
        this.tiempo = 0;

        this.estado1 = false;

    }

    pintar() {
        switch (this.nivel) {
            case 1:
                this.plantabebe2.pintar();
                if (this.asolear == false && this.asoleado == false) {
                    this.plantabebe1hoja.pintar();
                } else if (this.asolear == true) {
                    this.plantabebe1hoja.pintar(290, 460);
                }
                if (this.tiempo > 3) {
                    this.asolear = false;
                    this.asoleado = true;
                }
                if (this.asoleado) {
                    this.plantabebe1.pintar();
                    this.resetTime();
                }

                console.log(this.tiempo);
                if (this.estado1) {
                    this.plantabebe3.pintar();
                } else {
                    this.plantabebe3sintierra.pintar();
                }
                break;
            case 2:
                this.plantabebe2.pintar();
                this.plantabebe1.pintar();
                this.plantabebe3.pintar();

                break;

            default:
                break;
        }

    }

    mousePressed() {
        switch (this.nivel) {
            case 1:
                if (this.plantabebe1hoja.isSobre()) {
                    console.log("ahi jue")
                    this.seleccion = this.plantabebe1hoja;
                    this.sel = true;
                    console.log(this.seleccion)
                }
                break;

            default:
                break;
        }

    }

    arrastrar() {
        if (this.seleccion != null) {
            this.seleccion.arrastrar();
        }

    }

    soltar() {
        if (this.app.mouseX > 100 && this.app.mouseX < 438 && this.app.mouseY > 215 && this.app.mouseY < 500 && this.seleccion != null && this.asoleado == false && this.asolear == false) {
            this.asolear = true;
            this.correTime();
            console.log(this.asolear)
        }


        this.sel = false;
        if (this.seleccion != null) {
            this.seleccion.resetPosicion();
            this.seleccion = null;
        }


    }

    correTime() {
        if (this.iden == null) {
            this.start();
        } else {
            if (this.iden !== undefined) {
                clearInterval(this.iden);
            }

            this.iden = undefined;
        }
    }

    resetTime() {
        clearInterval(this.iden);
        this.iden = null;
        this.tiempo = 0;
    }


    start() {
        this.iden = setInterval(this.run, 1000);
    }

    run() {
        this.tiempo++;
    }


}

export default Plantas;