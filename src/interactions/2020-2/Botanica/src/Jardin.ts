
import p5 from 'p5';


import Herramienta from './Herramienta';
import Main from './Main';
import Planta from './Planta';
import CARRERAS from '../../../../constants/observer';


class Jardin {

    app: p5;
    plantas: Planta[];
    seleccion: Planta | undefined;
    currentHerramienta: Herramienta | undefined;

    p1: Planta;
    p2: Planta;
    p3: Planta;
    main: Main;

    temino = false;
    diaFinal = false;

    constructor(app: p5, main: Main) {
        this.app = app;
        this.main = main;
        this.plantas = []


        this.p1 = new Planta(this.app, 600, 459, 1);
        this.p1.updateState();

        this.p2 = new Planta(this.app, 760, 458, 2);
        this.p2.updateState();

        this.p3 = new Planta(this.app, 930, 455, 3);
        this.p3.updateState();

        this.plantas.push(this.p1);
        this.plantas.push(this.p2);
        this.plantas.push(this.p3);

    }

    pintar() {
        this.plantas.forEach((planta) => {
            planta.pintar();
        })

    }


    forEach(recorrerPlantas: (planta: Planta, index: number) => void) {
        this.plantas.forEach((planta, index) => {
            recorrerPlantas(planta, index);
        })
    }

    movimientos = 0;

    mousePressed() {
        this.plantas.forEach((planta) => {
            if (planta.isSobre()) {
                this.seleccion = planta;
                this.movimientos++;
                this.main.nav.addState("movimientosPlanta", this.movimientos)
            }
        })
    }

    mouseDragged() {
        if (this.seleccion !== undefined) {
            var mouseX = this.app.mouseX;
            var mouseY = this.app.mouseY;

            this.seleccion.setPos(mouseX, mouseY)
        }

    }

    mouseReleased() {

        if (this.seleccion !== undefined) {

            if (this.currentHerramienta !== undefined) {

            }

            this.seleccion.resetPos();

            this.seleccion = undefined;
        }

    }

    getPuntaje() {
        var p1 = this.p1.validateStatus();
        var p2 = this.p2.validateStatus();
        var p3 = this.p3.validateStatus();


        if (this.temino === false) {
            this.temino = true;
            console.log("Mi puntuacion>", p1 + p2 + p3);

            var total = p1 + p2 + p3;

            this.main.nav.addResult([
                { id: CARRERAS.CIENCIAS_NATURALES, value: total }
            ])
        }

        if (this.diaFinal === true) {
            this.main.nav.finish();
        }

    }

}


export default Jardin;