import p5 from 'p5';

import Herramienta from "./Herramienta";
import Main from './Main';
import Planta, { STATE_NAMES } from './Planta';

class Herramientas {

    app: p5;
    herramientas: Herramienta[];

    tierra: Herramienta;
    regadera: Herramienta;
    pala: Herramienta;
    palos: Herramienta;
    insecticida: Herramienta;
    matera: Herramienta;
    ventana: Herramienta;


    seleccion: Herramienta | undefined;
    currentPlanta: Planta | undefined;

    main: Main;
    constructor(app: p5, main: Main) {
        this.app = app;
        this.main = main;
        this.herramientas = [];

        this.tierra = new Herramienta(this.app, "/img/2020-2/biologia/img/herramientas/tierra.png", 1180, 119);
        this.regadera = new Herramienta(this.app, "/img/2020-2/biologia/img/herramientas/regadera.png", 1120, 249);
        this.pala = new Herramienta(this.app, "/img/2020-2/biologia/img/herramientas/pala.png", 1190, 524);
        this.palos = new Herramienta(this.app, "/img/2020-2/biologia/img/herramientas/palos.png", 1235, 630);
        this.insecticida = new Herramienta(this.app, "/img/2020-2/biologia/img/herramientas/insecticida.png", 1240, 239);
        this.matera = new Herramienta(this.app, "/img/2020-2/biologia/img/herramientas/matera.png", 1120, 400);
        this.ventana = new Herramienta(this.app, "/img/2020-2/biologia/img/herramientas/ventana.png", 275, 305);


        this.tierra.configAcciones((planta) => {
            //Le estamos hechando tierra
            if (planta.tierra === STATE_NAMES.TIERRA_BIEN) {
                planta.tierra = STATE_NAMES.TIERRA_EXCESO;

            } else if (planta.tierra === STATE_NAMES.TIERRA_FALTA) {
                planta.tierra = STATE_NAMES.TIERRA_BIEN;
            }

        });

        this.regadera.configAcciones((planta) => {
            //Le estamos hechando agua

            if (planta.agua === STATE_NAMES.AGUA_FALTA) {
                planta.agua = STATE_NAMES.AGUA_BIEN;
            }

        });

        this.pala.configAcciones((planta) => {
            //Le estamos dando pala

            if (planta.tierra === STATE_NAMES.TIERRA_MALA) {
                planta.tierra = STATE_NAMES.TIERRA_BIEN;
            }


        })

        this.palos.configAcciones((planta) => {

            if (planta.inclinacion === STATE_NAMES.PLANTA_INCLINADO) {
                planta.inclinacion = STATE_NAMES.PLANTA_NO_INCLINADO;
            }

        });

        this.insecticida.configAcciones((planta) => {

            if (planta.bichos === STATE_NAMES.PLANTA_BICHOS) {
                planta.bichos = STATE_NAMES.PLANTA_NO_BICHOS;
            }

        })


        this.matera.configAcciones((planta) => {

            /*
                        if (planta.matera ===STATE_NAMES.MATERA_MEDIANA_QUEBRADA && planta.tierra === STATE_NAMES.TIERRA_BIEN){
            
                            planta.puntajeMenos += 5;
            
                        }
            */
            if (planta.matera === STATE_NAMES.MATERA_MEDIANA_QUEBRADA) {
                planta.matera = STATE_NAMES.MATERA_MEDIANA_BIEN;
            }



        })

        this.ventana.configAcciones((planta) => {


            planta.setPos(this.ventana.x, this.ventana.y + 100);
            setTimeout(() => {
                var posVentana = this.ventana.getPos();

                if (planta.isSobre(posVentana.x, posVentana.y)) {
                    planta.sol = STATE_NAMES.PLANTA_SOL;
                    planta.updateState();
                }


            }, 2000);




        })



        this.herramientas.push(this.tierra);
        this.herramientas.push(this.regadera);
        this.herramientas.push(this.pala);
        this.herramientas.push(this.palos)
        this.herramientas.push(this.insecticida);
        this.herramientas.push(this.matera);

    }

    pintar() {
        this.herramientas.forEach((herramienta) => {
            herramienta.pintar();
        })
    }

    pintarVentana() {
        this.ventana.pintar();
    }

    movimientos = 0;
    mousePressed() {
        this.herramientas.forEach((herramienta) => {
            if (herramienta.isSobre()) {
                this.seleccion = herramienta;
                this.movimientos++;
                this.main.nav.addState("movimientos", this.movimientos)
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

            if (this.currentPlanta !== undefined) {
                this.seleccion.acciones(this.currentPlanta);
            }

            this.seleccion.resetPos();


        } else {
            if (this.currentPlanta !== undefined && this.ventana.isSobre()) {
                this.ventana.acciones(this.currentPlanta);
            }
        }
        this.seleccion = undefined;
        this.currentPlanta = undefined;
    }

    setPlanta(planta: Planta) {
        this.currentPlanta = planta;
    }

}

export default Herramientas;