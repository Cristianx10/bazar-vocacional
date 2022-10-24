import { fstat } from 'fs';

import p5 from 'p5';

import Main from '../Main';

import Pantalla from './Pantalla';

class Navegador {

    app: p5;
    indexPantalla: number;
    pantallas: PantallaSetup[];
    pantallaActual: undefined | PantallaSetup;

    iden: NodeJS.Timeout | undefined;
    tiempo: number;
    resetcount: boolean;


    idenD: NodeJS.Timeout | undefined;
    tiempoD: number;
    main: Main;


    constructor(app: p5, main: Main) {
        this.main = main;
        this.app = app;
        this.pantallas = [];
        this.indexPantalla = -1;
        this.tiempo = 0;
        this.tiempoD = 0;
        this.resetcount = false;

        this.main.nav.addState("pantalla", this.indexPantalla)
    }

    draw() {

        if (this.pantallaActual !== undefined) {

            if (this.pantallaActual.inicializado === false) {
                this.pantallaActual.setInicializado(true);
                if (this.pantallaActual.pantalla.setup !== undefined) {
                    this.pantallaActual.pantalla.setup();
                }
            }
            if (this.pantallaActual.pantalla.draw !== undefined) {
                this.pantallaActual.pantalla.draw();
            }

        }

    }

    mousePressed() {

        if (this.pantallaActual !== undefined) {
            if (this.pantallaActual.pantalla.mousePressed !== undefined) {
                this.pantallaActual.pantalla.mousePressed();
            }
        }

    }

    mouseReleased() {

        if (this.pantallaActual !== undefined) {
            if (this.pantallaActual.pantalla.mouseReleased !== undefined) {
                this.pantallaActual.pantalla.mouseReleased();
            }
        }

    }

    mouseDragged() {

        if (this.pantallaActual !== undefined) {
            if (this.pantallaActual.pantalla.mouseDragged !== undefined) {
                this.pantallaActual.pantalla.mouseDragged();
            }
        }

    }

    private changePantalla() {
        if (this.pantallaActual !== undefined) {
            this.pantallaActual.inicializado = false;
        }
        this.main.nav.addState("pantalla", this.indexPantalla);
    }

    next() {
        if (this.indexPantalla + 1 < this.pantallas.length) {
            this.indexPantalla++;
            this.pantallaActual = this.pantallas[this.indexPantalla];
            this.changePantalla();
        }

    }

    back() {
        if (this.indexPantalla - 1 >= 0) {
            this.indexPantalla--;
            this.pantallaActual = this.pantallas[this.indexPantalla];
            this.changePantalla();
        }
    }

    goTo(index: number) {
        if (index >= 0 && index < this.pantallas.length) {
            this.indexPantalla = index;
            this.pantallaActual = this.pantallas[this.indexPantalla];
            this.changePantalla();
        }
    }

    add(pantalla: Pantalla) {
        var newPantalla = new PantallaSetup(pantalla);
        this.pantallas.push(newPantalla);
    }


    correTime() {
        if (this.iden == null) {
            this.start();
        } else {
            clearInterval(this.iden);

            this.iden = undefined;
        }
    }

    resetTime() {
        if (this.iden) {
            clearInterval(this.iden);
        }
        this.iden = undefined;
        this.tiempo = 0;
    }


    start() {
        this.iden = setInterval(() => {
            this.run();
        }, 1000);
    }

    run() {
        this.tiempo++;

    }

    getIndex() {
        return this.indexPantalla;
    }



    //----Cronometro en cada Día
    /*
        correTimeD() {
            if (this.idenD == null) {
                this.start();
            } else {
                clearInterval(this.idenD);
    
                this.idenD = undefined;
            }
        }
    
        resetTimeD() {
            if(this.idenD){
                clearInterval(this.idenD);
            }
            this.idenD = undefined;
            this.tiempoD = 0;
        }
    
    
        startD() {
            this.idenD = setInterval(()=>{
                this.run();
            }, 1000);
        }
    
        runD() {
            this.tiempoD++;
            
        }
    
    
    */

}

export default Navegador;


class PantallaSetup {

    inicializado: boolean;
    pantalla: Pantalla;

    constructor(pantalla: Pantalla) {
        this.pantalla = pantalla;
        this.inicializado = false;
    }

    setInicializado(inicializado: boolean) {
        this.inicializado = inicializado;
    }
}