import p5 from 'p5';



import Global from './Global';


import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';
import CARRERAS from '../../../../constants/observer';
import Navegador from '../../../../componentsTS/Navegacion/config';


class Logica {

    pantalla: number;

    pantallaInicio: p5.Image;
    pantallaGracias: p5.Image;

    nivelUno: p5.Image;
    nivelDos: p5.Image;
    nivelTresA: p5.Image;
    nivelTresB: p5.Image;
    nivelTresC: p5.Image;
    nivelTresD: p5.Image;
    nivelTresE: p5.Image;
    btnDispli: p5.Image;
    btnSosi: p5.Image;
    btnAfli: p5.Image;
    btnAmbi: p5.Image;
    btnCerte: p5.Image;
    btnDele: p5.Image;
    btnEnfo: p5.Image;
    btnObje: p5.Image;
    posXDispli: number;
    posYDispli: number;
    posXSosi: number;
    posYSosi: number;
    posXAfli: number;
    posYAfli: number;
    posXAmbi: number;
    posYAmbi: number;
    posXCerte: number;
    posYCerte: number;
    posXDele: number;
    posYDele: number;
    posXEnfo: number;
    posYEnfo: number;
    posXObje: number;
    posYObje: number;
    activarDispli: boolean;
    activarSosi: boolean;
    activarAfli: boolean;
    activarAmbi: boolean;
    activarCerte: boolean;
    activarDele: boolean;
    activarEnfo: boolean;
    activarObje: boolean;
    contador: number;

    r1: number;
    g1: number;
    b1: number;
    r2: number;
    g2: number;
    b2: number;
    r3: number;
    g3: number;
    b3: number;
    r4: number;
    g4: number;
    b4: number;
    r5: number;
    g5: number;
    b5: number;

    app: p5;
    global: Global;
    nav: ActividadTSLite;
    navegador:Navegador


    constructor(app: p5, global: Global, nav: ActividadTSLite, navegador:Navegador) {
        this.nav = nav;
        this.app = app;
        this.global = global;
        this.pantalla = 0;
        this.contador = 0;
        this.navegador = navegador;

        this.nav.addState("Pantalla", "inicio");

        this.pantallaInicio = this.app.loadImage("/img/2020-2/comunicacion/img/pantallaInicio.png");
        //nivelUnoIns = loadImage("/img/2020-2/comunicacion/img/nivelUnoIns.png");
        //nivelDosIns = loadImage("/img/2020-2/comunicacion/img/nivelDosIns.png");
        //nivelTresIns = loadImage("/img/2020-2/comunicacion/img/nivelTresIns.png");
        this.nivelUno = this.app.loadImage("/img/2020-2/comunicacion/img/nivelUno.png");
        this.nivelDos = this.app.loadImage("/img/2020-2/comunicacion/img/nivelDos.png");
        this.nivelTresA = this.app.loadImage("/img/2020-2/comunicacion/img/nivelTresA.png");
        this.nivelTresB = this.app.loadImage("/img/2020-2/comunicacion/img/nivelTresB.png");
        this.nivelTresC = this.app.loadImage("/img/2020-2/comunicacion/img/nivelTresC.png");
        this.nivelTresD = this.app.loadImage("/img/2020-2/comunicacion/img/nivelTresD.png");
        this.nivelTresE = this.app.loadImage("/img/2020-2/comunicacion/img/nivelTresE.png");
        this.pantallaGracias = this.app.loadImage("/img/2020-2/comunicacion/img/pantallaGracias.png");
        this.btnDispli = this.app.loadImage("/img/2020-2/comunicacion/img/btnDispli.png");
        this.btnSosi = this.app.loadImage("/img/2020-2/comunicacion/img/btnSosi.png");
        this.btnAfli = this.app.loadImage("/img/2020-2/comunicacion/img/btnAfli.png");
        this.btnAmbi = this.app.loadImage("/img/2020-2/comunicacion/img/btnAmbi.png");
        this.btnCerte = this.app.loadImage("/img/2020-2/comunicacion/img/btnCerte.png");
        this.btnDele = this.app.loadImage("/img/2020-2/comunicacion/img/btnDele.png");
        this.btnEnfo = this.app.loadImage("/img/2020-2/comunicacion/img/btnEnfo.png");
        this.btnObje = this.app.loadImage("/img/2020-2/comunicacion/img/btnObje.png");
        this.posXDispli = 65; this.posYDispli = 40;
        this.posXSosi = 65; this.posYSosi = 120;
        this.posXAfli = 65; this.posYAfli = 200;
        this.posXAmbi = 65; this.posYAmbi = 280;
        this.posXCerte = 65; this.posYCerte = 360;
        this.posXEnfo = 65; this.posYEnfo = 440;
        this.posXDele = 65; this.posYDele = 520;
        this.posXObje = 65; this.posYObje = 600;
        this.activarDispli = false;
        this.activarSosi = false;
        this.activarAfli = false;
        this.activarAmbi = false;
        this.activarCerte = false;
        this.activarDele = false;
        this.activarEnfo = false;
        this.activarObje = false;
        this.r1 = 0; this.g1 = 118; this.b1 = 118;
        this.r2 = 0; this.g2 = 118; this.b2 = 118;
        this.r3 = 0; this.g3 = 118; this.b3 = 118;
        this.r4 = 0; this.g4 = 118; this.b4 = 118;
        this.r5 = 0; this.g5 = 118; this.b5 = 118;
    }

    draw() {
        switch (this.pantalla) {
            case 0:
                this.app.image(this.pantallaInicio, 0, 0);
                //	fill(0);
                //	text("mouseX:" + this.app.mouseX + "mouseY:" + this.app.mouseY, 20, 20);
                break;
            case 1:
                this.app.image(this.nivelUno, 0, 0);
                //	fill(0);
                //("mouseX:" + this.app.mouseX + "mouseY:" + this.app.mouseY, 20, 20);
                this.app.image(this.btnDispli, this.posXDispli, this.posYDispli);
                this.app.image(this.btnSosi, this.posXSosi, this.posYSosi);
                this.app.image(this.btnAfli, this.posXAfli, this.posYAfli);
                this.app.image(this.btnAmbi, this.posXAmbi, this.posYAmbi);
                this.app.image(this.btnCerte, this.posXCerte, this.posYCerte);
                this.app.image(this.btnDele, this.posXDele, this.posYDele);
                this.app.image(this.btnEnfo, this.posXEnfo, this.posYEnfo);
                this.app.image(this.btnObje, this.posXObje, this.posYObje);
                this.contador++;

                break;
            case 2:
                this.app.image(this.nivelDos, 0, 0);
                this.contador++;
                break;
            case 3:
                this.app.image(this.nivelTresA, 0, 0);
                this.app.noStroke();
                this.app.fill(this.r1, this.g1, this.b1);
                this.app.rect(188, 304, 428, 63, 14);
                this.app.fill(this.r2, this.g2, this.b2);
                this.app.rect(188, 389, 428, 63, 14);
                this.app.fill(this.r3, this.g3, this.b3);
                this.app.rect(188, 469, 428, 63, 14);
                this.app.fill(this.r4, this.g4, this.b4);
                this.app.rect(659, 304, 428, 63, 14);
                this.app.fill(this.r5, this.g5, this.b5);
                this.app.rect(659, 389, 428, 63, 14);
                this.app.fill(255);
                this.app.textSize(30);
                this.app.text("Martillo : Mesa", 213, 350);
                this.app.text("Estante : Tienda", 213, 430);
                this.app.text("Memoria : Cerebro", 213, 510);
                this.app.text("Rojo : Color", 679, 350);
                this.app.text("Fotografía : retrato ", 679, 430);
                this.contador++;
                break;
            case 4:
                this.app.image(this.nivelTresB, 0, 0);
                this.app.noStroke();
                this.app.fill(this.r1, this.g1, this.b1);
                this.app.rect(188, 304, 428, 63, 14);
                this.app.fill(this.r2, this.g2, this.b2);
                this.app.rect(188, 389, 428, 63, 14);
                this.app.fill(this.r3, this.g3, this.b3);
                this.app.rect(188, 469, 428, 63, 14);
                this.app.fill(this.r4, this.g4, this.b4);
                this.app.rect(659, 304, 428, 63, 14);
                this.app.fill(this.r5, this.g5, this.b5);
                this.app.rect(659, 389, 428, 63, 14);
                this.app.fill(255);
                this.app.textSize(30);
                this.app.text("Gris : Negro", 213, 350);
                this.app.text("Padre : Martillo", 213, 430);
                this.app.text("Ladrón : Gorra", 213, 510);
                this.app.text("Profesor : Pizarra", 679, 350);
                this.app.text("Niña : Niño", 679, 430);
                this.contador++;

                break;
            case 5:
                this.app.image(this.nivelTresC, 0, 0);
                this.app.noStroke();
                this.app.fill(this.r1, this.g1, this.b1);
                this.app.rect(188, 304, 428, 63, 14);
                this.app.fill(this.r2, this.g2, this.b2);
                this.app.rect(188, 389, 428, 63, 14);
                this.app.fill(this.r3, this.g3, this.b3);
                this.app.rect(188, 469, 428, 63, 14);
                this.app.fill(this.r4, this.g4, this.b4);
                this.app.rect(659, 304, 428, 63, 14);
                this.app.fill(this.r5, this.g5, this.b5);
                this.app.rect(659, 389, 428, 63, 14);
                this.app.fill(255);
                this.app.textSize(30);
                this.app.text("Ira : Ofuscación", 213, 350);
                this.app.text("Golpe : Amnesia", 213, 430);
                this.app.text("Debilidad : Anemia", 213, 510);
                this.app.text("Soledad : Rector", 679, 350);
                this.app.text("Licor : Embriaguez", 679, 430);
                this.contador++;

                break;
            case 6:
                this.app.image(this.nivelTresE, 0, 0);
                this.app.noStroke();
                this.app.fill(this.r1, this.g1, this.b1);
                this.app.rect(188, 304, 428, 63, 14);
                this.app.fill(this.r2, this.g2, this.b2);
                this.app.rect(188, 389, 428, 63, 14);
                this.app.fill(this.r3, this.g3, this.b3);
                this.app.rect(188, 469, 428, 63, 14);
                this.app.fill(this.r4, this.g4, this.b4);
                this.app.rect(659, 304, 428, 63, 14);
                this.app.fill(this.r5, this.g5, this.b5);
                this.app.rect(659, 389, 428, 63, 14);
                this.app.fill(255);
                this.app.textSize(30);
                this.app.text("Luchador : Título", 213, 350);
                this.app.text("Maestro : Pleitesía", 213, 430);
                this.app.text("Soldado : Galardón", 213, 510);
                this.app.text("Triunfador : Congratulación", 679, 350);
                this.app.text("Líder : Ovación", 679, 430);
                this.contador++;




                break;
            case 7:
                this.app.image(this.nivelTresD, 0, 0);
                this.app.noStroke();
                this.app.fill(this.r1, this.g1, this.b1);
                this.app.rect(188, 304, 428, 63, 14);
                this.app.fill(this.r2, this.g2, this.b2);
                this.app.rect(188, 389, 428, 63, 14);
                this.app.fill(this.r3, this.g3, this.b3);
                this.app.rect(188, 469, 428, 63, 14);
                this.app.fill(this.r4, this.g4, this.b4);
                this.app.rect(659, 304, 428, 63, 14);
                this.app.fill(this.r5, this.g5, this.b5);
                this.app.rect(659, 389, 428, 63, 14);
                this.app.fill(255);
                this.app.textSize(30);
                this.app.text("Día : Noche", 213, 350);
                this.app.text("Navidad : Año Nuevo", 213, 430);
                this.app.text("Invierno : Verano", 213, 510);
                this.app.text("Vehículo : Moto", 679, 350);
                this.app.text("Asesino : Muerte", 679, 430);
                this.contador++;

                break;
            case 8:
                this.app.image(this.pantallaGracias, 0, 0);
                this.contador++;
                this.app.fill(255);
                this.app.textSize(30);

                this.app.text("Puntuacion Nivel 1: " + this.global.puntuacion1 + "/6", 500, 170);
                this.app.text("Puntuacion Nivel 2: " + this.global.puntuacion2 + "/6", 500, 210);
                this.app.text("Puntuacion Nivel 3: " + this.global.puntuacion3 + "/5", 500, 250);
                this.app.text("Puntuacion total: " + this.global.puntuacion + "/17", 500, 290);

                this.app.text("En 10 segundos continua el test", 500, 490);

                if (this.isFinal === false) {
                    this.isFinal = true;
                    var { puntuacion, puntuacion1, puntuacion2, puntuacion3 } = this.global;

                    this.nav.addState("puntaje", puntuacion);
                    this.nav.addState("puntaje1", puntuacion1);
                    this.nav.addState("puntaje2", puntuacion2);
                    this.nav.addState("puntaje3", puntuacion3);

                    var resultado = 200 * (puntuacion / 17);

                    console.log("MI RESULTADO", resultado)
                    this.nav.addResult([
                        { id: CARRERAS.COMUNICACION, value: resultado }
                    ])

                    setTimeout(() => {
                        this.nav.finish();
                    }, 10000)    
                }


                break;


        }
        var minutos = Math.floor(this.global.tiempo / 60);
        var segundos = this.global.tiempo - minutos * 60;
        var segundoT = segundos + "";
        if (segundos < 10) {

            segundoT = "0" + segundos;
        }
        this.app.text(minutos + ":" + segundoT, 90, 30);

    }

    isFinal = false;

    mouseClicked() {

        //cambios de pantalla
      

        if (this.pantalla == 0 && this.app.mouseX > 540 && this.app.mouseX < 710 && this.app.mouseY > 580 && this.app.mouseY < 624) {
            this.nav.addState("Pantalla", "instrucciones1");
            this.navegador.goTo(2);
            this.pantalla = 1;
        }

        if (this.pantalla == 1 && this.contador > 10 && this.app.mouseX > 1060 && this.app.mouseX < 1230 && this.app.mouseY > 667 && this.app.mouseY < 697) {


            if (this.posXCerte > 394 && this.posXCerte < 602 && this.posYCerte > 272 && this.posYCerte < 330) {
                this.global.puntuacion1++;
            }

            if (this.posXAfli > 677 && this.posXAfli < 891 && this.posYAfli > 272 && this.posYAfli < 330) {
                this.global.puntuacion1++;
            }

            if (this.posXSosi > 977 && this.posXSosi < 1184 && this.posYSosi > 272 && this.posYSosi < 330) {
                this.global.puntuacion1++;
            }

            if (this.posXDele > 394 && this.posXDele < 602 && this.posYDele > 570 && this.posYDele < 630) {
                this.global.puntuacion1++;
            }

            if (this.posXEnfo > 677 && this.posXEnfo < 891 && this.posYEnfo > 570 && this.posYEnfo < 630) {
                this.global.puntuacion1++;
            }

            if (this.posXDispli > 977 && this.posXDispli < 1184 && this.posYDispli > 570 && this.posYDispli < 630) {
                this.global.puntuacion1++;
            }
            this.nav.addState("Pantalla", "instrucciones2");
            this.navegador.goTo(3);
            this.pantalla = 3;
            this.contador = 0;

        }

        if (this.pantalla == 2 && this.contador > 10 && this.app.mouseX > 1060 && this.app.mouseX < 1230 && this.app.mouseY > 667 && this.app.mouseY < 697) {
            this.nav.addState("Pantalla", "instrucciones3");
            this.navegador.goTo(4);
            this.pantalla = 3;
            this.contador = 0;
        }

        if (this.pantalla == 3 && this.contador > 10 && this.app.mouseX > 1060 && this.app.mouseX < 1230 && this.app.mouseY > 667 && this.app.mouseY < 697) {
            if (this.r2 == 233) {
                this.global.puntuacion3++;
            }
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;

            this.pantalla = 4;
            this.contador = 0;
        }

        if (this.pantalla == 4 && this.contador > 10 && this.app.mouseX > 1060 && this.app.mouseX < 1230 && this.app.mouseY > 667 && this.app.mouseY < 697) {

            if (this.r4 == 233) {
                this.global.puntuacion3++;
            }

            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;

            this.pantalla = 5;
            this.contador = 0;
        }

        if (this.pantalla == 5 && this.contador > 10 && this.app.mouseX > 1060 && this.app.mouseX < 1230 && this.app.mouseY > 667 && this.app.mouseY < 697) {
            if (this.r1 == 233) {
                this.global.puntuacion3++;
            }

            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;

            this.pantalla = 6;
            this.contador = 0;
        }

        if (this.pantalla == 6 && this.contador > 10 && this.app.mouseX > 1060 && this.app.mouseX < 1230 && this.app.mouseY > 667 && this.app.mouseY < 697) {
            if (this.r4 == 233) {
                this.global.puntuacion3++;
            }

            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;

            this.pantalla = 7;
            this.contador = 0;
        }

        if (this.pantalla == 7 && this.contador > 10 && this.app.mouseX > 1060 && this.app.mouseX < 1230 && this.app.mouseY > 667 && this.app.mouseY < 697) {
            if (this.r2 == 233) {
                this.global.puntuacion3++;
            }

            this.global.puntuacion = this.global.puntuacion1 + this.global.puntuacion2 + this.global.puntuacion3;

            this.pantalla = 8;
            this.contador = 0;
        }

        console.log("Mi puntuacion", this.global.puntuacion)
        this.nav.addState("nPantalla", this.pantalla);
    }

    mousePressed() {

        //cambio colores nivel 3A

        if (this.pantalla == 3 && this.app.mouseX > 188 && this.app.mouseX < 616 && this.app.mouseY > 304 && this.app.mouseY < 367) {
            this.r1 = 233; this.g1 = 176; this.b1 = 31;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;

        }

        if (this.pantalla == 3 && this.app.mouseX > 188 && this.app.mouseX < 188 + 428 && this.app.mouseY > 389 && this.app.mouseY < 389 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 233; this.g2 = 176; this.b2 = 31;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 3 && this.app.mouseX > 188 && this.app.mouseX < 188 + 428 && this.app.mouseY > 469 && this.app.mouseY < 469 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 233; this.g3 = 176; this.b3 = 31;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 3 && this.app.mouseX > 659 && this.app.mouseX < 659 + 428 && this.app.mouseY > 304 && this.app.mouseY < 304 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 233; this.g4 = 176; this.b4 = 31;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 3 && this.app.mouseX > 659 && this.app.mouseX < 659 + 428 && this.app.mouseY > 389 && this.app.mouseY < 389 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 233; this.g5 = 176; this.b5 = 31;
        }

        //cambio colores nivel 3B

        if (this.pantalla == 4 && this.app.mouseX > 188 && this.app.mouseX < 616 && this.app.mouseY > 304 && this.app.mouseY < 367) {
            this.r1 = 233; this.g1 = 176; this.b1 = 31;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;

        }

        if (this.pantalla == 4 && this.app.mouseX > 188 && this.app.mouseX < 188 + 428 && this.app.mouseY > 389 && this.app.mouseY < 389 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 233; this.g2 = 176; this.b2 = 31;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 4 && this.app.mouseX > 188 && this.app.mouseX < 188 + 428 && this.app.mouseY > 469 && this.app.mouseY < 469 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 233; this.g3 = 176; this.b3 = 31;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 4 && this.app.mouseX > 659 && this.app.mouseX < 659 + 428 && this.app.mouseY > 304 && this.app.mouseY < 304 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 233; this.g4 = 176; this.b4 = 31;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 4 && this.app.mouseX > 659 && this.app.mouseX < 659 + 428 && this.app.mouseY > 389 && this.app.mouseY < 389 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 233; this.g5 = 176; this.b5 = 31;
        }

        //cambio colores nivel 3C

        if (this.pantalla == 5 && this.app.mouseX > 188 && this.app.mouseX < 616 && this.app.mouseY > 304 && this.app.mouseY < 367) {
            this.r1 = 233; this.g1 = 176; this.b1 = 31;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;

        }

        if (this.pantalla == 5 && this.app.mouseX > 188 && this.app.mouseX < 188 + 428 && this.app.mouseY > 389 && this.app.mouseY < 389 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 233; this.g2 = 176; this.b2 = 31;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 5 && this.app.mouseX > 188 && this.app.mouseX < 188 + 428 && this.app.mouseY > 469 && this.app.mouseY < 469 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 233; this.g3 = 176; this.b3 = 31;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 5 && this.app.mouseX > 659 && this.app.mouseX < 659 + 428 && this.app.mouseY > 304 && this.app.mouseY < 304 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 233; this.g4 = 176; this.b4 = 31;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 5 && this.app.mouseX > 659 && this.app.mouseX < 659 + 428 && this.app.mouseY > 389 && this.app.mouseY < 389 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 233; this.g5 = 176; this.b5 = 31;
        }

        //cambio colores nivel 3D

        if (this.pantalla == 6 && this.app.mouseX > 188 && this.app.mouseX < 616 && this.app.mouseY > 304 && this.app.mouseY < 367) {
            this.r1 = 233; this.g1 = 176; this.b1 = 31;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;

        }

        if (this.pantalla == 6 && this.app.mouseX > 188 && this.app.mouseX < 188 + 428 && this.app.mouseY > 389 && this.app.mouseY < 389 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 233; this.g2 = 176; this.b2 = 31;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 6 && this.app.mouseX > 188 && this.app.mouseX < 188 + 428 && this.app.mouseY > 469 && this.app.mouseY < 469 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 233; this.g3 = 176; this.b3 = 31;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 6 && this.app.mouseX > 659 && this.app.mouseX < 659 + 428 && this.app.mouseY > 304 && this.app.mouseY < 304 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 233; this.g4 = 176; this.b4 = 31;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 6 && this.app.mouseX > 659 && this.app.mouseX < 659 + 428 && this.app.mouseY > 389 && this.app.mouseY < 389 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 233; this.g5 = 176; this.b5 = 31;
        }

        //cambio colores nivel 3E

        if (this.pantalla == 7 && this.app.mouseX > 188 && this.app.mouseX < 616 && this.app.mouseY > 304 && this.app.mouseY < 367) {
            this.r1 = 233; this.g1 = 176; this.b1 = 31;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;

        }

        if (this.pantalla == 7 && this.app.mouseX > 188 && this.app.mouseX < 188 + 428 && this.app.mouseY > 389 && this.app.mouseY < 389 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 233; this.g2 = 176; this.b2 = 31;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 7 && this.app.mouseX > 188 && this.app.mouseX < 188 + 428 && this.app.mouseY > 469 && this.app.mouseY < 469 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 233; this.g3 = 176; this.b3 = 31;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 7 && this.app.mouseX > 659 && this.app.mouseX < 659 + 428 && this.app.mouseY > 304 && this.app.mouseY < 304 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 233; this.g4 = 176; this.b4 = 31;
            this.r5 = 0; this.g5 = 118; this.b5 = 118;
        }

        if (this.pantalla == 7 && this.app.mouseX > 659 && this.app.mouseX < 659 + 428 && this.app.mouseY > 389 && this.app.mouseY < 389 + 63) {
            this.r1 = 0; this.g1 = 118; this.b1 = 118;
            this.r2 = 0; this.g2 = 118; this.b2 = 118;
            this.r3 = 0; this.g3 = 118; this.b3 = 118;
            this.r4 = 0; this.g4 = 118; this.b4 = 118;
            this.r5 = 233; this.g5 = 176; this.b5 = 31;
        }

        //activacion btnDispli

        if (this.pantalla == 1 && this.app.mouseX > this.posXDispli && this.app.mouseX < this.posXDispli + 202 && this.app.mouseY > this.posYDispli && this.app.mouseY < this.posYDispli + 46) {
            this.activarDispli = true;
        } else {
            this.activarDispli = false;
        }

        //activacion btnSosi

        if (this.pantalla == 1 && this.app.mouseX > this.posXSosi && this.app.mouseX < this.posXSosi + 202 && this.app.mouseY > this.posYSosi && this.app.mouseY < this.posYSosi + 46) {
            this.activarSosi = true;
        } else {
            this.activarSosi = false;
        }

        //activacion btn Afli

        if (this.pantalla == 1 && this.app.mouseX > this.posXAfli && this.app.mouseX < this.posXAfli + 202 && this.app.mouseY > this.posYAfli && this.app.mouseY < this.posYAfli + 46) {
            this.activarAfli = true;
        } else {
            this.activarAfli = false;
        }

        //activacion btnAmbi

        if (this.pantalla == 1 && this.app.mouseX > this.posXAmbi && this.app.mouseX < this.posXAmbi + 202 && this.app.mouseY > this.posYAmbi && this.app.mouseY < this.posYAmbi + 46) {
            this.activarAmbi = true;
        } else {
            this.activarAmbi = false;
        }

        //activacion btnCerte

        if (this.pantalla == 1 && this.app.mouseX > this.posXCerte && this.app.mouseX < this.posXCerte + 202 && this.app.mouseY > this.posYCerte && this.app.mouseY < this.posYCerte + 46) {
            this.activarCerte = true;
        } else {
            this.activarCerte = false;
        }

        //activacion btnDele

        if (this.pantalla == 1 && this.app.mouseX > this.posXDele && this.app.mouseX < this.posXDele + 202 && this.app.mouseY > this.posYDele && this.app.mouseY < this.posYDele + 46) {
            this.activarDele = true;
        } else {
            this.activarDele = false;
        }

        //activacion btnEnfo

        if (this.pantalla == 1 && this.app.mouseX > this.posXEnfo && this.app.mouseX < this.posXEnfo + 202 && this.app.mouseY > this.posYEnfo && this.app.mouseY < this.posYEnfo + 46) {
            this.activarEnfo = true;
        } else {
            this.activarEnfo = false;
        }

        //activacion btnObje

        if (this.pantalla == 1 && this.app.mouseX > this.posXObje && this.app.mouseX < this.posXObje + 202 && this.app.mouseY > this.posYObje && this.app.mouseY < this.posYObje + 46) {
            this.activarObje = true;
        } else {
            this.activarObje = false;
        }

    }

    mouseDragged() {

        //arrastre btnDispli
        if (this.pantalla == 1 && this.app.mouseIsPressed == true && this.activarDispli == true) {
            this.posXDispli = this.app.mouseX;
            this.posYDispli = this.app.mouseY;
        }

        //arrastre btnSosi

        if (this.pantalla == 1 && this.app.mouseIsPressed == true && this.activarSosi == true) {
            this.posXSosi = this.app.mouseX;
            this.posYSosi = this.app.mouseY;
        }

        //arrastre btnAfli

        if (this.pantalla == 1 && this.app.mouseIsPressed == true && this.activarAfli == true) {
            this.posXAfli = this.app.mouseX;
            this.posYAfli = this.app.mouseY;
        }

        //arrastre btnAmbi

        if (this.pantalla == 1 && this.app.mouseIsPressed == true && this.activarAmbi == true) {
            this.posXAmbi = this.app.mouseX;
            this.posYAmbi = this.app.mouseY;
        }

        //arrastre btnCerte

        if (this.pantalla == 1 && this.app.mouseIsPressed == true && this.activarCerte == true) {
            this.posXCerte = this.app.mouseX;
            this.posYCerte = this.app.mouseY;
        }

        //arraste btnDele

        if (this.pantalla == 1 && this.app.mouseIsPressed == true && this.activarDele == true) {
            this.posXDele = this.app.mouseX;
            this.posYDele = this.app.mouseY;
        }

        //arraste btnEnfo

        if (this.pantalla == 1 && this.app.mouseIsPressed == true && this.activarEnfo == true) {
            this.posXEnfo = this.app.mouseX;
            this.posYEnfo = this.app.mouseY;
        }

        //arraste btnObje

        if (this.pantalla == 1 && this.app.mouseIsPressed == true && this.activarObje == true) {
            this.posXObje = this.app.mouseX;
            this.posYObje = this.app.mouseY;
        }
    }

}



export default Logica;