import p5 from "p5";

import Logica from "./logica";

import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';
import Navegador from '../../../../componentsTS/Navegacion/config/index';


class MainConfig {

    logica?: Logica;
    app: p5;
    actividad: ActividadTSLite;
    navegador: Navegador

    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {
        this.app = app;
        this.navegador = navegador;
        this.actividad = actividad;
    }

    setup() {

        this.logica = new Logica(this.app, this.actividad, this.navegador)
        //   this.logica.setup();

    }

    draw() {

        if (this.logica) {
            this.logica.draw();
        }
    }


}

export default MainConfig;