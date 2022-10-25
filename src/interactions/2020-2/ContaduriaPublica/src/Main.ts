import p5 from 'p5';

import Logica from './Logica';
import ProcessingView from '../../../../componentsTS/Processing/view/index';

import IProcessingActividad from '../../../../componentsTS/Processing/types/IProcessingActivity';
import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';
import Navegador from '../../../../componentsTS/Navegacion/config';
class Main implements IProcessingActividad {


    logica?: Logica;
    app: p5;
    actividad: ActividadTSLite;
    navegador: Navegador;
    pantalla?: ProcessingView;

    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {
        this.navegador = navegador;
        this.actividad = actividad;
        this.app = app;

        this.logica = new Logica(this);
    }

    draw() {
        if (this.logica) {
            this.logica.draw();
        }
    }

    mousePressed() {
        if (this.logica) {
            this.logica.mousePressed();
        }
    }

    mouseReleased() {
        if (this.logica) {
            this.logica.mouseReleased();
        }
    }

    mouseDragged() {
        if (this.logica) {
            this.logica.mouseDragged();
        }
    }

    setPantalla(pantalla: ProcessingView) {
        this.pantalla = pantalla;

        if (this.logica) {
            this.logica.allElements.forEach(e => {
                if (this.pantalla) {
                    this.pantalla.addElemento(e.elt);
                }
            })
        }

    }


}

export default Main;