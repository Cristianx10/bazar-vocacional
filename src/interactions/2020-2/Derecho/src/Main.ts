
import p5 from 'p5';

import Logica from "./Logica";
import IProcessingActividad from '../../../../componentsTS/Processing/types/IProcessingActivity';
import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';
import Navegador from '../../../../componentsTS/Navegacion/config';

class Main implements IProcessingActividad {
    //  Minim minim;
    //AudioPlayer song;

    log?: Logica;
    app: p5;
    actividad: ActividadTSLite;
    navegador: Navegador;
    /*
    settings() {
        size(1200, 700);
    }
    */

    setup() {
        this.log = new Logica(this.app, this.actividad, this.navegador);
    }

    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {
        this.app = app;
        this.actividad = actividad;
        this.navegador = navegador;
    }

    draw() {
        if (this.log) {
            this.log.pintar();
        }
    }

    mouseClicked() {
        if (this.log) {
            this.log.clickMouse();
        }
    }

}

export default Main;