import p5 from "p5";

import Logica from "./logica";
import Navegador from '../../../../componentsTS/Navegacion/config/index';
import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';

class MainCofig {

    logica?: Logica;
    app: p5;
    actividad: ActividadTSLite;
    navegador:Navegador

    constructor(app: p5, actividad: ActividadTSLite, navegador:Navegador) {
        this.app = app;
        this.actividad = actividad;
        this.navegador = navegador;
    }

    setup() {

        this.logica = new Logica(this.app, this.actividad, this.navegador)
        this.logica.setup();

    }

    draw() {

        if (this.logica) {
            this.logica.draw();
        }
    }

    mousePressed() {
        if (this.logica) {
            this.logica.mouseClicked();
        }
    }
}

export default MainCofig