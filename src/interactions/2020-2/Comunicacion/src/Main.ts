import p5 from 'p5';

import Global from './Global';
import Logica from './Logica';

import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';
import Navegador from '../../../../componentsTS/Navegacion/config';



class Main {

    logica: Logica;
    app: p5;
    nav: ActividadTSLite;
    navegador: Navegador;
    global: Global;

    constructor(navegador: ActividadTSLite, app: p5, global: Global, nav: Navegador) {
        this.app = app;
        this.nav = navegador;
        this.navegador = nav;
        this.global = global;

        this.logica = new Logica(app, global, this.nav, this.navegador);
    }

    draw() {
        this.logica.draw();
    }

    mouseClicked() {
        this.logica.mouseClicked();
    }

    mousePressed() {
        this.logica.mousePressed();
    }

    mouseReleased() {
        // this.logica.mouseReleased();
    }

    mouseDragged() {
        this.logica.mouseDragged();
    }


}


export default Main;