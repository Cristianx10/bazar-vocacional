import p5 from "p5";
import { RPath } from "..";


import Compuesto from "./compuestos";
import CARRERAS from "../../../../constants/observer";
import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';
import Navegador from '../../../../componentsTS/Navegacion/config/index';

class Logica {

    app: p5;

    bg: p5.Image;
    winImg: p5.Image;
    correct: p5.Image;
    incorrect: p5.Image;
    // btnClose;
    correctos = 0;
    incorrectos = 0;
    myFont: p5.Font;
    nombre = "";
    minutos = 3;
    tiempo = 180;
    puntuacion = 0;
    puntos = "Puntaje:  ";
    compuestos: Compuesto[] = [];
    compuesto?: Compuesto; //variable que contiene el compuesto random
    random = 0; // numero random 
    carbonoGlobal = 0;
    hidrogenoGlobal = 0;
    ceros = false;
    mix = 0;
    pantalla = 0;
    //cont;
    bpista = false;
    arrowPlusC = document.querySelector('.btnM') as HTMLElement;
    arrowMinusC = document.querySelector('.btn-') as HTMLElement;
    arrowPlusH = document.querySelector('.btnM2') as HTMLElement;
    arrowMinusH = document.querySelector('.btn-2') as HTMLElement;
    mixButton = document.querySelector('.btnCombinar') as HTMLElement;
    btnpista = document.querySelector('.btnpista') as HTMLElement;
    pistadesign = document.querySelector('pistadesign') as HTMLElement;
    btnCloseReal = document.querySelector('.btnClose') as HTMLElement;
    btnContinuar = document.querySelector('.btnContinuar') as HTMLElement;
    actividad: ActividadTSLite;
    navegador: Navegador

    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {
        this.actividad = actividad;
        this.navegador = navegador;
        this.app = app;
        //para aumentar el carbono
        this.arrowPlusC.addEventListener('click', () => {
            if (this.carbonoGlobal < 10) {
                this.carbonoGlobal++;
                this.ceros = false;
            }
        });

        //para disminuir el carbono
        this.arrowMinusC.addEventListener('click', () => {
            if (this.carbonoGlobal > 0) {
                this.carbonoGlobal--;
            }
        });

        //para aumentar el HIDROGENO
        this.arrowPlusH.addEventListener('click', () => {
            if (this.hidrogenoGlobal < 30) {
                this.hidrogenoGlobal++;
                this.ceros = false;
            }
        });

        //para disminuir el HIDROGENO
        this.arrowMinusH.addEventListener('click', () => {
            if (this.hidrogenoGlobal > 0) {
                this.hidrogenoGlobal--;
            }
        });

        //para comprobar la combinacion
        this.mixButton.addEventListener('click', () => {
            if (this.carbonoGlobal == 0 || this.hidrogenoGlobal == 0) {
                this.ceros = true;

            } else {
                this.ceros = false;

                if (this.compuesto && this.compuesto.carbon == this.carbonoGlobal && this.compuesto.hidrogeno == this.hidrogenoGlobal) {
                    //console.log("SUPER");

                    //suma 10 puntos
                    this.puntuacion += 10;

                    //vuelve a 0 la combinacion de carbono e hidrogeno
                    this.carbonoGlobal = 0;
                    this.hidrogenoGlobal = 0;
                    this.correctos++

                    this.mix = 1;


                    setTimeout(() => {
                        this.seleccionarCompuesto();

                    }, 2000); //delay is in milliseconds 


                } else {
                    //console.log("BAD");

                    //vuelve a 0 la combinacion de carbono e hidrogeno
                    this.carbonoGlobal = 0;
                    this.hidrogenoGlobal = 0;
                    this.incorrectos++
                    this.mix = 2;

                    setTimeout(() => {
                        this.seleccionarCompuesto();

                    }, 2000); //delay is in milliseconds 





                }
            }
        });

        this.btnpista.addEventListener('click', () => {
            //alert(compuesto.pista);
            //bpista = true;



            if (this.bpista == false) {
                this.bpista = true;
                this.btnCloseReal.classList.add('--view');

            } else {
                this.bpista = false;

            }

        });

        this.btnCloseReal.addEventListener('click', () => {
            this.bpista = false;
            this.btnCloseReal.classList.remove('--view');
        })

        this.correct = this.app.loadImage(RPath + 'data/pro.png')
        this.incorrect = this.app.loadImage(RPath + 'data/wrong.png');
        this.bg = this.app.loadImage(RPath + 'data/PantalladeJuego.jpg');
        this.winImg = this.app.loadImage(RPath + 'data/pantallaFinal.png');
        this.myFont = this.app.loadFont(RPath + 'data/Jost-Bold.ttf');
        //btnClose = this.app.loadImage(RPath + 'data/btnClose.png');


        //this.app.createCanvas(1280, 720);
        this.app.background(this.bg);
        this.compuestos.push(new Compuesto("Metano", 1, 4, "Es el primer hidrocarburo\n y es el más sencillo."));
        this.compuestos.push(new Compuesto("Etano", 2, 6, "Es el segundo alcano. Recuerda que \nlos carbonos aumentan de a 1 y los\n hidrógenos aumentan de a 2."));
        this.compuestos.push(new Compuesto("Propano", 3, 8, "Si este es el tercer hidrocarburo,\n ¿cúantos hidrógenos tiene?"))
        this.compuestos.push(new Compuesto("Butano", 4, 10, "Si es el cuarto alcano,\n ¿cúantos hidrógenos tiene? "));
        this.compuestos.push(new Compuesto("Pentano", 5, 12, "Si un pentágono tiene 5 puntas,\n entonces ¿el pentano cuántos carbonos?"));
        this.compuestos.push(new Compuesto("Metilo", 1, 3, "Si es el primer alquilo,\n ¿cuántos hidrógenos se le quitaría?"));
        this.compuestos.push(new Compuesto("Etilo", 2, 5, "El prefijo Et es para dos carbonos \npero recuerda que al alquilo \nse le quita un hidrógeno."));
        this.compuestos.push(new Compuesto("Propilo", 3, 7, "Es el tercero y para crear un alquilo,\n piensa en la composición del alcano\n y restale un hidrógeno."));
        this.compuestos.push(new Compuesto("Butilo", 4, 9, "Su prefijo es el cuarto \n y la cantidad de hidrógenos \nes un número impar"));
        this.compuestos.push(new Compuesto("Pentilo", 5, 11, "Si un pentágono tiene 5 puntas,\n entonces ¿el pentano cuántos carbonos?"));
        this.seleccionarCompuesto();

    }

    draw() {



        switch (this.pantalla) {

            case 0:

                this.app.background(this.bg);
                this.app.textFont(this.myFont);
                this.app.textSize(25);
                this.app.textAlign(this.app.LEFT);
                this.app.fill('#4639B9');
                this.app.text(this.puntos, 637, 90);
                this.app.text(this.puntuacion, 735, 90);
                this.app.fill('#F1F1F1');
                this.app.text(this.tiempo, 550, 90);
                this.app.fill('#4639B9');
                this.app.textAlign(this.app.CENTER);
                this.app.text("Construye un", 1280 / 2, 230)
                this.app.fill("#FB2D5D");

                //pinta nombre del compuesto random

                try {
                    if (this.compuesto)
                        this.nombre = this.compuesto.nombre;
                    this.app.text(this.nombre, 1280 / 2, 260);
                } catch (error) {

                }

                if (this.tiempo <= 0) {

                    this.pantalla = 1;
                }
                this.app.textAlign(this.app.LEFT);
                //pinta el numero del carbono
                this.app.text(this.carbonoGlobal, 510, 420);
                this.app.fill("#FB2D5D");
                //pinta el numero del hidrogeno
                this.app.text(this.hidrogenoGlobal, 750, 420);
                this.app.fill("#FB2D5D");

                //tiempo
                if (this.app.frameCount % 60 == 0 && this.tiempo > 0) {
                    this.tiempo--;

                    if (this.tiempo <= 0) {
                        this.pantalla = 1;
                        this.btnpista.classList.add('remove');
                        this.btnContinuar.classList.add('btnCon')
                    }
                }

                if (this.ceros == true) {
                    this.app.fill('#4639B9');
                    this.app.text("Agrega como minímo un carbono y un hidrógeno", 50, 20);
                }

                if (this.mix == 1) {

                    this.app.fill('#DAD5F4')
                    this.app.image(this.correct, 580, 335);
                    //console.log("correcto");
                    this.app.rectMode(this.app.CORNER);
                    this.app.rect(550, 210, 180, 60)
                    this.app.noStroke();
                    this.app.fill('#52C21C');
                    this.app.text("CORRECTO", 560, 250);

                }

                if (this.mix == 2) {

                    this.app.fill('#DAD5F4')
                    this.app.image(this.incorrect, 580, 335);
                    //incorrectos++;
                    this.app.noStroke();
                    this.app.rectMode(this.app.CORNER);
                    this.app.rect(550, 210, 180, 60)
                    this.app.fill('#FB2D5D');
                    this.app.text("INCORRECTO", 560, 250);
                }

                if (this.bpista == true) {

                    this.app.fill('#fffff');
                    this.app.rectMode(this.app.CENTER);
                    this.app.noStroke();
                    this.app.rect(640, 300, 400, 150, 10);
                    this.app.fill('#FB2D5D');
                    this.app.textAlign(this.app.CENTER);
                    this.app.textSize(20);
                    if (this.compuesto)
                        this.app.text(this.compuesto.pista, 640, 280);
                    //image(btnClose, 810,200)


                } else {
                    this.bpista = false;
                }




                break;

            case 1:

                this.app.background(this.winImg);

                this.mixButton.style.visibility = "hidden";
                this.arrowMinusC.style.visibility = "hidden";
                this.arrowMinusH.style.visibility = "hidden";
                this.arrowPlusC.style.visibility = "hidden";
                this.arrowPlusH.style.visibility = "hidden";

                this.app.textSize(50)

                this.app.fill("#090D46");

                this.app.text(this.puntuacion, 615, 300);

                this.app.fill("#52C21C");

                this.app.textSize(35)
                this.app.text(this.correctos, 812, 381);

                this.app.fill("#FB2D5D");

                this.app.text(this.incorrectos, 817, 444);

                if (this.isFinal === false) {
                    const { puntuacion } = this;
                    this.isFinal = true;
                    setTimeout(() => {
                        this.actividad.addResult([
                            {
                                id: CARRERAS.QUIMICA,
                                value: puntuacion
                            }

                        ])
                        this.actividad.finish()
                    }, 10000)
                }
                break;

        }

        const { pantalla, correctos, incorrectos } = this;

        this.actividad.addState("pantalla", pantalla)
        this.actividad.addState("correctos", correctos)
        this.actividad.addState("incorrectos", incorrectos)
    }

    isFinal = false;


    //random compuesto
    seleccionarCompuesto() {

        // verifica que todavia existan compuestos
        if (this.compuestos.length == 0) {

            this.pantalla = 1;
            this.btnpista.classList.add('remove');
            this.btnContinuar.classList.add('btnCon')

        }
        this.random = Math.floor(Math.random() * this.compuestos.length);
        this.compuesto = this.compuestos[this.random];
        this.compuestos.splice(this.random, 1);

        console.log(this.compuestos);
        this.mix = 0;
    }


}


export default Logica;