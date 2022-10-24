import p5 from 'p5';

import Elemento from '../../Elemento';
import Herramientas from '../../Herramientas';
import Jardin from '../../Jardin';
import Planta, { STATE_NAMES } from '../../Planta';
import Navegador from '../../Navegacion/Navegador';
import Pantalla from "../../Navegacion/Pantalla";

class Dia implements Pantalla {

    app: p5;
    nav: Navegador;

    fondojuego: p5.Image;
    jardin: Jardin;
    herramientas: Herramientas;
    nextBtn: Elemento;
    tiempo: number;

    completoTareas: boolean;
    tiempoEnd: boolean;

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;
        this.tiempo = 0;
        this.fondojuego = this.app.loadImage("/img/2020-2/biologia/img/pantallajuego.png");
        this.herramientas = new Herramientas(this.app, this.nav.main);
        this.jardin = new Jardin(this.app, this.nav.main);

        this.nextBtn = new Elemento(this.app, "/img/2020-2/biologia/img/botonsiguiente.png", 800, 610);

        this.completoTareas = false;
        this.tiempoEnd = false;
    }

    setup() {

        var p1 = this.jardin.p1;
        var p2 = this.jardin.p2;
        var p3 = this.jardin.p3;
        p1.puntajeMenos = 0;
        p2.puntajeMenos = 0;
        p3.puntajeMenos = 0;

        this.jardin.temino = false;




        //Estados de las plantas por nivel
        switch (this.nav.getIndex()) {
            //Nivel 1
            case 6:
                this.tiempo = 15;
                break;

            //Nivel 2
            case 8:
                this.tiempo = 20;
                p1.tamano = STATE_NAMES.PLANTA_BIEN_MEDIANA;
                p2.tamano = STATE_NAMES.PLANTA_BIEN_MEDIANA;
                p3.tamano = STATE_NAMES.PLANTA_BIEN_MEDIANA;


                p3.bichos = STATE_NAMES.PLANTA_BICHOS;

                p1.matera = STATE_NAMES.MATERA_MEDIANA_QUEBRADA;
                p2.matera = STATE_NAMES.MATERA_MEDIANA_QUEBRADA;
                p3.matera = STATE_NAMES.MATERA_MEDIANA_QUEBRADA;

                p1.tierra = STATE_NAMES.TIERRA_FALTA;
                p2.tierra = STATE_NAMES.TIERRA_FALTA;
                p3.tierra = STATE_NAMES.TIERRA_BIEN;


                break;

            //Nivel 3
            case 10:

                this.tiempo = 30;
                p1.tamano = STATE_NAMES.PLANTA_BIEN_MEDIANA;
                p2.tamano = STATE_NAMES.PLANTA_BIEN_MEDIANA;
                p3.tamano = STATE_NAMES.PLANTA_BIEN_MEDIANA;


                p2.bichos = STATE_NAMES.PLANTA_BICHOS;


                p1.matera = STATE_NAMES.MATERA_MEDIANA_BIEN;
                p2.matera = STATE_NAMES.MATERA_MEDIANA_BIEN;
                p3.matera = STATE_NAMES.MATERA_MEDIANA_BIEN;

                p1.tierra = STATE_NAMES.TIERRA_MALA;
                p2.tierra = STATE_NAMES.TIERRA_FALTA;
                p3.tierra = STATE_NAMES.TIERRA_MALA;


                p1.inclinacion = STATE_NAMES.PLANTA_INCLINADO;
                p2.inclinacion = STATE_NAMES.PLANTA_INCLINADO;


                p1.agua = STATE_NAMES.AGUA_FALTA;
                p3.agua = STATE_NAMES.AGUA_FALTA;


                p3.sol = STATE_NAMES.PLANTA_SIN_SOL;

                break;

            //Nivel 4
            case 12:

                this.tiempo = 40;
                p1.tamano = STATE_NAMES.PLANTA_BIEN_GRANDE;
                p2.tamano = STATE_NAMES.PLANTA_BIEN_GRANDE;
                p3.tamano = STATE_NAMES.PLANTA_BIEN_GRANDE;



                p1.bichos = STATE_NAMES.PLANTA_BICHOS;
                p3.bichos = STATE_NAMES.PLANTA_BICHOS;


                p1.matera = STATE_NAMES.MATERA_MEDIANA_QUEBRADA;
                p2.matera = STATE_NAMES.MATERA_MEDIANA_QUEBRADA;
                p3.matera = STATE_NAMES.MATERA_MEDIANA_QUEBRADA;

                p1.tierra = STATE_NAMES.TIERRA_MALA;
                p2.tierra = STATE_NAMES.TIERRA_FALTA;
                p3.tierra = STATE_NAMES.TIERRA_MALA;


                p2.inclinacion = STATE_NAMES.PLANTA_INCLINADO;


                p1.agua = STATE_NAMES.AGUA_FALTA;
                p2.agua = STATE_NAMES.AGUA_FALTA;


                p1.sol = STATE_NAMES.PLANTA_SIN_SOL;
                p3.sol = STATE_NAMES.PLANTA_SIN_SOL;

                break;
            //Nivel 5

            case 14:
                this.jardin.diaFinal = true;

                this.tiempo = 50;
                p1.tamano = STATE_NAMES.PLANTA_BIEN_GRANDE;
                p2.tamano = STATE_NAMES.PLANTA_BIEN_GRANDE;
                p3.tamano = STATE_NAMES.PLANTA_BIEN_GRANDE;



                p1.bichos = STATE_NAMES.PLANTA_BICHOS;
                p2.bichos = STATE_NAMES.PLANTA_BICHOS;
                p3.bichos = STATE_NAMES.PLANTA_BICHOS;


                p1.matera = STATE_NAMES.MATERA_MEDIANA_BIEN;
                p2.matera = STATE_NAMES.MATERA_MEDIANA_BIEN;
                p3.matera = STATE_NAMES.MATERA_MEDIANA_BIEN;

                p1.tierra = STATE_NAMES.TIERRA_MALA;
                p2.tierra = STATE_NAMES.TIERRA_MALA;
                p3.tierra = STATE_NAMES.TIERRA_MALA;



                p1.inclinacion = STATE_NAMES.PLANTA_INCLINADO;
                p2.inclinacion = STATE_NAMES.PLANTA_INCLINADO;
                p3.inclinacion = STATE_NAMES.PLANTA_INCLINADO;


                p1.agua = STATE_NAMES.AGUA_FALTA;
                p2.agua = STATE_NAMES.AGUA_FALTA;
                p3.agua = STATE_NAMES.AGUA_FALTA;



                p1.sol = STATE_NAMES.PLANTA_SIN_SOL;
                p2.sol = STATE_NAMES.PLANTA_SIN_SOL;
                p3.sol = STATE_NAMES.PLANTA_SIN_SOL;


                break;
        }



        this.jardin.p1.updateState();
        this.jardin.p2.updateState();
        this.jardin.p3.updateState();

        this.completoTareas = false;
    }

    draw() {

        if (this.nav.resetcount) {
            this.nav.tiempo = 0;
            this.nav.resetcount = false;
        }

        this.app.image(this.fondojuego, 0, 0);

        this.herramientas.pintarVentana();
        this.jardin.pintar();
        this.herramientas.pintar();

        //6, 8, 10, 12, 14

        this.validarTareas();
        this.app.textSize(35)
        this.app.text(this.tiempo, 630, 130)

        if (this.app.frameCount % 60 == 0 && this.completoTareas == false) {
            this.tiempo -= 1;

        }

        if (this.tiempo < 0) {
            this.tiempo = 0;
            this.tiempoEnd = true;
        }

    }

    validarTareas() {
        var continuarNextNivel = false;

        var p1 = this.jardin.p1;
        var p2 = this.jardin.p2;
        var p3 = this.jardin.p3;

        var p1Status = false;
        var p2Status = false;
        var p3Status = false;

        var S = STATE_NAMES;

        switch (this.nav.getIndex()) {

            case 6:

                p1Status = (p1.tierra === S.TIERRA_BIEN || p1.tierra === S.TIERRA_EXCESO);
                p2Status = (p2.tierra === S.TIERRA_BIEN || p2.tierra === S.TIERRA_EXCESO);
                p3Status = (p3.tierra === S.TIERRA_BIEN || p3.tierra === S.TIERRA_EXCESO);

                break;

            case 8:

                p1Status = p1.matera === S.MATERA_MEDIANA_BIEN && (p1.tierra === S.TIERRA_BIEN || p1.tierra === S.TIERRA_EXCESO);
                p2Status = p2.matera === S.MATERA_MEDIANA_BIEN && (p2.tierra === S.TIERRA_BIEN || p2.tierra === S.TIERRA_EXCESO);
                p3Status = p3.matera === STATE_NAMES.MATERA_MEDIANA_BIEN && p3.bichos === S.PLANTA_NO_BICHOS && (p3.tierra === S.TIERRA_BIEN || p3.tierra === S.TIERRA_EXCESO);

                break;

            case 10:

                p1Status = p1.agua === S.AGUA_BIEN && p1.inclinacion === S.PLANTA_NO_INCLINADO && (p1.tierra === S.TIERRA_BIEN || p1.tierra === S.TIERRA_EXCESO);
                p2Status = p2.inclinacion === S.PLANTA_NO_INCLINADO && p2.bichos === S.PLANTA_NO_BICHOS && (p2.tierra === S.TIERRA_BIEN || p2.tierra === S.TIERRA_EXCESO);
                p3Status = p3.sol === STATE_NAMES.PLANTA_SOL && p3.agua === S.AGUA_BIEN && (p3.tierra === S.TIERRA_BIEN || p3.tierra === S.TIERRA_EXCESO);

                break;

            case 12:

                p1Status = p1.matera === S.MATERA_MEDIANA_BIEN && p1.sol === STATE_NAMES.PLANTA_SOL && p1.agua === S.AGUA_BIEN && p1.bichos === S.PLANTA_NO_BICHOS && (p1.tierra === S.TIERRA_BIEN || p1.tierra === S.TIERRA_EXCESO);
                p2Status = p2.matera === S.MATERA_MEDIANA_BIEN && p2.inclinacion === S.PLANTA_NO_INCLINADO && p2.sol === STATE_NAMES.PLANTA_SOL && (p2.tierra === S.TIERRA_BIEN || p2.tierra === S.TIERRA_EXCESO);
                p3Status = p3.matera === S.MATERA_MEDIANA_BIEN && p3.bichos === S.PLANTA_NO_BICHOS && p3.sol === STATE_NAMES.PLANTA_SOL && (p3.tierra === S.TIERRA_BIEN || p3.tierra === S.TIERRA_EXCESO);

                break;

            case 14:

                p1Status = p1.sol === STATE_NAMES.PLANTA_SOL && p2.inclinacion === S.PLANTA_NO_INCLINADO && p1.agua === S.AGUA_BIEN && p1.bichos === S.PLANTA_NO_BICHOS && (p1.tierra === S.TIERRA_BIEN || p1.tierra === S.TIERRA_EXCESO);
                p2Status = p2.inclinacion === S.PLANTA_NO_INCLINADO && p2.sol === STATE_NAMES.PLANTA_SOL && p2.agua === S.AGUA_BIEN && p2.bichos === S.PLANTA_NO_BICHOS && (p2.tierra === S.TIERRA_BIEN || p2.tierra === S.TIERRA_EXCESO);
                p3Status = p3.bichos === S.PLANTA_NO_BICHOS && p3.sol === STATE_NAMES.PLANTA_SOL && p3.inclinacion === S.PLANTA_NO_INCLINADO && p3.agua === S.AGUA_BIEN && (p3.tierra === S.TIERRA_BIEN || p3.tierra === S.TIERRA_EXCESO);

                break;
        }

        if (p1Status && p2Status && p3Status) {
            this.completoTareas = true;
        }

        if (continuarNextNivel) {
            this.nav.next()
            this.nav.correTime();
            //  this.nav.correTimeD();
        }


        if (this.completoTareas) {
            this.nextBtn.pintar();
        }

        if (this.tiempoEnd) {
            this.nextBtn.pintar();
        }


    }

    mousePressed() {

        if (this.tiempoEnd == false) {
            this.jardin.mousePressed();
            this.herramientas.mousePressed();
        }


        if (this.completoTareas && this.nextBtn.isSobre()) {
            this.nav.next();
            this.nav.correTime();
            //   this.nav.correTimeD();

            this.jardin.getPuntaje()


        }


        if (this.tiempoEnd && this.nextBtn.isSobre()) {
            this.nav.next();
            this.nav.correTime();
            //   this.nav.correTimeD();

            this.jardin.getPuntaje()
            this.tiempoEnd = false;

        }








    }

    mouseDragged() {
        this.jardin.mouseDragged();
        this.herramientas.mouseDragged();

    }

    mouseReleased() {
        this.jardin.forEach((p, i) => {
            if (p.isSobre()) {
                this.herramientas.setPlanta(p);
                console.log("Esta sobre la planta", i)
            }
        });


        this.jardin.mouseReleased();
        this.herramientas.mouseReleased();
    }

}

export default Dia;