import p5 from "p5";


import Elemento from "../Components/Elemento";



import { IData } from '../../index';

import Navegador from "../../../../../componentsTS/Navegacion/config";
import CARRERAS from '../../../../../constants/observer';
import ActividadTSLite from '../../../../../components/Actividad/config/ActividadTSLite';

class Instrucciones1 {

    app: p5;
    actividad: ActividadTSLite;
    btnJugar: Elemento;
    inicio: p5.Image;


    navegador: Navegador

    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {
        this.actividad = actividad;
        this.navegador = navegador;
        this.app = app;
        this.inicio = this.app.loadImage("/img/2021-1/MedicinaDoctor/img/medicina/recursos/logo__m2.png")
        this.btnJugar = new Elemento(app, "/img/2021-1/MedicinaDoctor/img/medicina/recursos/Boton--jugar.png", 700, 420);
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();
    }

    mousePressed() {

        if (this.btnJugar.isHover()) {
            this.navegador.next();
        }
    }
}

export default Instrucciones1;


export class Instrucciones2 {


    app: p5;
    actividad: ActividadTSLite;
    btnJugar: Elemento;
    inicio: p5.Image;

    navegador: Navegador

    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {
        this.actividad = actividad;
        this.navegador = navegador;
        this.app = app;
        this.inicio = this.app.loadImage("/img/2021-1/MedicinaDoctor/img/medicina/recursos/instrucciones.png")
        this.btnJugar = new Elemento(app, "/img/2021-1/MedicinaDoctor/img/medicina/recursos/Boton--siguiente.png", 1060, 660);
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();
    }

    mousePressed() {
        if (this.btnJugar.isHover()) {
            this.navegador.next();
        }
    }

}



export class Instrucciones3 {


    app: p5;
    actividad: ActividadTSLite;
    btnJugar: Elemento;
    inicio: p5.Image;
    video1: p5.Image | undefined;
    video2: p5.Image | undefined;
    navegador: Navegador

    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador, img1?: p5.Image, img2?: p5.Image) {
        this.actividad = actividad;
        this.navegador = navegador;
        this.app = app;
        this.inicio = this.app.loadImage("/img/2021-1/MedicinaDoctor/img/medicina/recursos/guia.jpg")
        this.btnJugar = new Elemento(app, "/img/2021-1/MedicinaDoctor/img/medicina/recursos/Boton--siguiente.png", 1060, 660);
        this.video1 = img1;
        this.video2 = img2;

    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();
        if (this.video1 != undefined) {
            this.app.image(this.video1, 440, 380);

        }
        if (this.video2 != undefined) {
            this.app.image(this.video2, 940, 380);

        }
    }

    mousePressed() {
        if (this.btnJugar.isHover()) {
            this.navegador.next();
        }
    }

}



export class Instrucciones4 {


    app: p5;
    actividad: ActividadTSLite;
    btnJugar: Elemento;
    inicio: p5.Image;

    navegador: Navegador
    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {
        this.actividad = actividad;
        this.navegador = navegador;
        this.app = app;
        this.inicio = this.app.loadImage("/img/2021-1/MedicinaDoctor/img/medicina/recursos/medicinas.jpg")
        this.btnJugar = new Elemento(app, "/img/2021-1/MedicinaDoctor/img/medicina/recursos/Boton--siguiente.png", 1060, 660);
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();
    }

    mousePressed() {
        if (this.btnJugar.isHover()) {
            this.navegador.next();
        }
    }

}

export class Instrucciones5 {


    app: p5;
    actividad: ActividadTSLite;
    btnJugar: Elemento;
    inicio: p5.Image;

    data: IData;
    navegador: Navegador

    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador, data: IData) {
        this.actividad = actividad;
        this.navegador = navegador;
        this.data = data;
        this.app = app;

        this.inicio = this.app.loadImage("/img/2021-1/MedicinaDoctor/img/medicina/recursos/resultados_pantalla.png")
        this.btnJugar = new Elemento(app, "/img/2021-1/MedicinaDoctor/img/medicina/recursos/Boton--siguiente.png", 1060, 660);


    }

    setup() {
        this.data.registros.forEach((registro, index) => {

            if (index === 0 || index === 1) {
                if (registro.estadoPaciente === 'VIVO') {
                    this.data.puntajeFinal = this.data.puntajeFinal + 20;
                    this.data.puntajeFinal = this.data.puntajeFinal - (5 * registro.errores);
                } else {
                    this.data.puntajeFinal = this.data.puntajeFinal + 0;
                }
            }

            if (index === 2 || index === 3) {
                if (registro.estadoPaciente === 'VIVO') {
                    this.data.puntajeFinal = this.data.puntajeFinal + 30;
                    this.data.puntajeFinal = this.data.puntajeFinal - (10 * registro.errores);
                } else {
                    this.data.puntajeFinal = this.data.puntajeFinal + 0;
                }
            }

            if (index === 4 || index === 5) {
                if (registro.estadoPaciente === 'VIVO') {
                    this.data.puntajeFinal = this.data.puntajeFinal + 50;
                    this.data.puntajeFinal = this.data.puntajeFinal - (15 * registro.errores);
                } else {
                    this.data.puntajeFinal = this.data.puntajeFinal + 0;
                }
            }
        })
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();
        this.app.textSize(20);
        this.app.textFont('Bell MT');
        this.app.fill(0);
        this.app.text("aciertos", 110, 220);
        this.app.text("errores", 110, 240);
        this.app.text("estado Paciente", 110, 260);
        this.data.registros.forEach((registro, index) => {
            this.app.text("Paciente N°" + index, 280 + (130 * index), 200);
            this.app.text(registro.aciertos, 280 + (130 * index), 220);
            this.app.text(registro.errores, 280 + (130 * index), 240);
            this.app.text(registro.estadoPaciente, 280 + (130 * index), 260);
        });

    }

    isFinal = false;
    mousePressed() {
        if (this.btnJugar.isHover()) {
            this.navegador.next();

        }

        console.log(this.data.puntajeFinal);

        const { puntajeFinal } = this.data;
        if (this.isFinal === false) {
            this.isFinal = true;
            this.actividad.addResult([
                { id: CARRERAS.MEDICINA, value: puntajeFinal }
            ])
        }

        this.actividad.finish();



    }

}