import p5 from 'p5';

import Bird from './Bird';
import BirdSlot from './BirdSlot';
import Jail from './Jail';
import Main from './Main';
import Timer from './Timer';
import IProcessingActividad from '../../../../componentsTS/Processing/types/IProcessingActivity';

import CARRERAS from '../../../../constants/observer';
import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';
import Navegador from '../../../../componentsTS/Navegacion/config';
class Logica implements IProcessingActividad {

    // Variable para la puntuación final
    finalScore: number;
    intentos = 0;

    // Birds images
    yellowImg: p5.Image;
    greenImg: p5.Image;
    blueImg: p5.Image;
    orangeImg: p5.Image;
    redImg: p5.Image;

    // Birds and jails
    birdSlot: BirdSlot[];
    birds: Bird[];
    leftJail: Jail;
    rightJail: Jail;
    birdSelect?: Bird;

    // Inputs
    inputOne: p5.Element;
    inputTwo: p5.Element;
    inputThree: p5.Element;
    inputFour: p5.Element;
    inputFive: p5.Element;
    inputSix: p5.Element;

    // Screens and other images
    startScreen: p5.Image;
    startBtn: p5.Image;
    contextScreen: p5.Image;
    instruct1Screen: p5.Image;
    instruct2Screen: p5.Image;
    instruct3Screen: p5.Image;
    instruct4Screen: p5.Image;
    instruct5Screen: p5.Image;
    instruct6Screen: p5.Image;
    instruct7Screen: p5.Image;
    wrongpassword: p5.Image;
    badending: p5.Image;
    goodending: p5.Image;
    balancescreen: p5.Image;
    passwordScreen: p5.Image;
    gif_createImg: p5.Element;
    // backArrow: p5.Image;
    nextArrow: p5.Element;


    // Slots for birds
    slotWeight: p5.Image;
    slotYellow: p5.Image;
    slotGreen: p5.Image;
    slotBlue: p5.Image;
    slotOrange: p5.Image;
    slotRed: p5.Image;
    slotsFilled: p5.Image;
    weightOne: p5.Image;

    // Inputs and buttons
    inputPassword: p5.Element;
    listoBtn: p5.Element;
    listoBtnFinal: p5.Element;
    verificarBtn: p5.Element;


    buttonFirst: HTMLButtonElement;
    buttonLast: HTMLButtonElement;
    inputs: HTMLInputElement[];

    // Screen
    currentScreen: number;

    // Timer
    timer: Timer;

    // Correct answer
    correctAnswer: number;

    app: p5;
    main: Main;

    allInputs: p5.Element[];
    allImgs: p5.Element[];
    allButtons: p5.Element[];
    allElements: p5.Element[];

    imgs: HTMLImageElement[];

    actividad: ActividadTSLite;
    navegador: Navegador;

    constructor(main: Main) {
        this.main = main;
        this.app = this.main.app;

        this.actividad = this.main.actividad;
        this.navegador = this.main.navegador;



        this.app.width = 1280;
        this.app.height = 720;

        // Slots
        this.slotWeight = this.app.loadImage("/img/2020-2/contaduria-publica/img/slot-weight.png");
        this.slotYellow = this.app.loadImage("/img/2020-2/contaduria-publica/img/slot-yellow.png");
        this.slotGreen = this.app.loadImage("/img/2020-2/contaduria-publica/img/slot-green.png");
        this.slotBlue = this.app.loadImage("/img/2020-2/contaduria-publica/img/slot-blue.png");
        this.slotOrange = this.app.loadImage("/img/2020-2/contaduria-publica/img/slot-orange.png");
        this.slotRed = this.app.loadImage("/img/2020-2/contaduria-publica/img/slot-red.png");
        this.slotsFilled = this.app.loadImage("/img/2020-2/contaduria-publica/img/slotsfilled.png")

        // Birds
        this.weightOne = this.app.loadImage("/img/2020-2/contaduria-publica/img/pesa-img.png")
        this.yellowImg = this.app.loadImage("/img/2020-2/contaduria-publica/img/yellow-img.png");
        this.greenImg = this.app.loadImage("/img/2020-2/contaduria-publica/img/green-img.png");
        this.blueImg = this.app.loadImage("/img/2020-2/contaduria-publica/img/blue-img.png");
        this.orangeImg = this.app.loadImage("/img/2020-2/contaduria-publica/img/orange-img.png");
        this.redImg = this.app.loadImage("/img/2020-2/contaduria-publica/img/red-img.png");

        // Screens
        this.startScreen = this.app.loadImage("/img/2020-2/contaduria-publica/img/startscreen.jpg");
        this.startBtn = this.app.loadImage("/img/2020-2/contaduria-publica/img/starbutton-img.png")
        this.contextScreen = this.app.loadImage("/img/2020-2/contaduria-publica/img/contextscreen.jpg");
        this.instruct1Screen = this.app.loadImage("/img/2020-2/contaduria-publica/img/step1.jpg");
        this.instruct2Screen = this.app.loadImage("/img/2020-2/contaduria-publica/img/step2.jpg");
        this.instruct3Screen = this.app.loadImage("/img/2020-2/contaduria-publica/img/step3.jpg");
        this.instruct4Screen = this.app.loadImage("/img/2020-2/contaduria-publica/img/step4.jpg");
        this.instruct5Screen = this.app.loadImage("/img/2020-2/contaduria-publica/img/step5.jpg");
        this.instruct6Screen = this.app.loadImage("/img/2020-2/contaduria-publica/img/step6.jpg");
        this.instruct7Screen = this.app.loadImage("/img/2020-2/contaduria-publica/img/step7.jpg");
        this.balancescreen = this.app.loadImage("/img/2020-2/contaduria-publica/img/balancescreen.jpg");
        this.wrongpassword = this.app.loadImage("/img/2020-2/contaduria-publica/img/wrongpassword.jpg");
        this.badending = this.app.loadImage("/img/2020-2/contaduria-publica/img/badending.jpg");
        this.goodending = this.app.loadImage("/img/2020-2/contaduria-publica/img/goodending.jpg");
        this.passwordScreen = this.app.loadImage("/img/2020-2/contaduria-publica/img/passwordScreen.jpg");




        this.finalScore = 0;
        this.correctAnswer = 8;
        this.currentScreen = 1;
        this.birdSlot = [];
        this.birds = [];


        // Time
        this.timer = new Timer(this.app, 10, 10);

        // Jails
        this.leftJail = new Jail(this.app, 290, this.app.height / 2 - 10, 0);
        this.rightJail = new Jail(this.app, 930, this.app.height / 2 - 10, 0);

        this.leftJail.compareJail(this.rightJail);
        this.rightJail.compareJail(this.leftJail);

        // Add slots
        this.birdSlot.push(new BirdSlot(this.app, 1159, 52 + 99 * 0, this.slotWeight));
        this.birdSlot.push(new BirdSlot(this.app, 1159, 52 + 99 * 1, this.slotYellow));
        this.birdSlot.push(new BirdSlot(this.app, 1159, 52 + 99 * 2, this.slotGreen));
        this.birdSlot.push(new BirdSlot(this.app, 1159, 52 + 99 * 3, this.slotBlue));
        this.birdSlot.push(new BirdSlot(this.app, 1159, 52 + 99 * 4, this.slotOrange));
        this.birdSlot.push(new BirdSlot(this.app, 1159, 52 + 99 * 5, this.slotRed));

        // Birds and weight
        var pesa = new Bird(this.app, 1173, 56, false, false, true, this.weightOne, 1);
        pesa.setBounds(-13);
        this.birds.push(pesa);
        this.birds.push(new Bird(this.app, 1173, 160, false, false, true, this.yellowImg, 2));
        this.birds.push(new Bird(this.app, 1173, 260, false, false, true, this.greenImg, 5));
        this.birds.push(new Bird(this.app, 1173, 360, false, false, true, this.blueImg, 4));
        this.birds.push(new Bird(this.app, 1173, 460, false, false, true, this.orangeImg, 1));
        this.birds.push(new Bird(this.app, 1173, 560, false, false, true, this.redImg, 3));

        // Add birds to jail at start
        this.leftJail.addBird(this.birds[0]);
        this.leftJail.addBird(this.birds[4]);
        this.rightJail.addBird(this.birds[1]);

        // Inputs
        this.inputOne = this.app.createInput();
        this.inputOne.position(1087, 70);
        this.inputOne.size(60, 50);
        this.inputTwo = this.app.createInput();
        this.inputTwo.position(1087, 170);
        this.inputTwo.size(60, 50);
        this.inputThree = this.app.createInput();
        this.inputThree.position(1087, 270);
        this.inputThree.size(60, 50);
        this.inputFour = this.app.createInput();
        this.inputFour.position(1087, 370);
        this.inputFour.size(60, 50);
        this.inputFive = this.app.createInput();
        this.inputFive.position(1087, 470);
        this.inputFive.size(60, 50);
        this.inputSix = this.app.createInput();
        this.inputSix.position(1087, 570);
        this.inputSix.size(60, 50);

        this.inputPassword = this.app.createInput();
        this.inputPassword.position(609, 462);
        this.inputPassword.size(60, 50);

        this.listoBtn = this.app.createButton('Listo');
        this.listoBtn.position(510, 550);

        this.listoBtnFinal = this.app.createButton('Listo');
        this.listoBtnFinal.position(510, 550);
        var btnHTML = this.listoBtnFinal.elt as HTMLButtonElement;
        btnHTML.style.display = "none";

        this.verificarBtn = this.app.createButton('Verificar');
        this.verificarBtn.position(547, 572);


        //@ts-ignore
        this.gif_createImg = this.app.createImg("/img/2020-2/contaduria-publica/video/animacion.gif");
        //@ts-ignore
        this.nextArrow = this.app.createImg("/img/2020-2/contaduria-publica/img/nextarrow.png");
        this.gif_createImg.position(0, 0);
        this.nextArrow.position(814, 570);

        this.allInputs = [
            this.inputOne,
            this.inputTwo,
            this.inputThree,
            this.inputFour,
            this.inputFive,
            this.inputSix,
            this.inputPassword,
        ];

        this.allImgs = [
            this.gif_createImg,
            this.nextArrow
        ];

        this.allButtons = [
            this.listoBtn,
            this.verificarBtn
        ];

        this.allElements = [];

        this.allInputs.forEach((e) => {
            this.allElements.push(e);
        })

        this.allButtons.forEach((e) => {
            this.allElements.push(e);
        })

        this.allImgs.forEach((e) => {
            this.allElements.push(e);
        });

        this.allElements.push(this.listoBtnFinal);

        this.inputs = [];

        this.allInputs.forEach((e, i) => {
            var elem = e.elt;
            this.inputs.push(elem);
            elem.setAttribute('type', 'number');
            elem.setAttribute('placeholder', "0");
            elem.setAttribute('min', "0");
            elem.setAttribute('max', "99");
        })
        this.inputs[0].setAttribute('value', "1");

        this.imgs = [];

        this.allImgs.forEach((e) => {
            var elem = e.elt;
            this.imgs.push(elem)
        })




        // "Listo button"
        this.buttonFirst = this.allButtons[0].elt;

        // Password button
        this.buttonLast = this.allButtons[1].elt;

        this.buttonFirst.addEventListener('click', () => {
            this.currentScreen = 11;
        })

        var btnHTMLFinal = this.listoBtnFinal.elt as HTMLButtonElement;

        btnHTMLFinal.addEventListener("click", () => {
            console.log("MI PUNTUACION FINAL", this.finalScore)

            this.actividad.addResult([
                { id: CARRERAS.CONTADURIA, value: this.finalScore >= 200 ? 200 : this.finalScore }
            ])

            this.navegador.next()
        })

        this.actividad.addState("intentos", this.intentos);
        this.actividad.addState("pantalla", this.currentScreen);
        this.actividad.addState("putuacion", this.finalScore);
    }


    draw() {
        switch (this.currentScreen) {
            case 1:
                this.app.image(this.startScreen, 0, 0, 1280, 720);

                // Hide button and inputs
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                })
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })

                if (this.app.mouseX > 571 && this.app.mouseX < 571 + 81 && this.app.mouseY > 359 && this.app.mouseY < 359 + 100) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }
                break;

            case 2:
                this.app.image(this.contextScreen, 0, 0, 1280, 720);

                // Hide button and inputs
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                })
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })

                if (this.app.mouseX > 1163 && this.app.mouseX < 1163 + 70 && this.app.mouseY > 375 && this.app.mouseY < 375 + 59) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }
                break;

            case 3:
                // Hide button and inputs
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'block';
                })
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                })

                if ((this.app.mouseX > 814 && this.app.mouseX < 814 + 67 && this.app.mouseY > 570 && this.app.mouseY < 570 + 80) || (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73)) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }
                break;

            case 4:
                this.app.image(this.instruct2Screen, 0, 0, 1280, 720);

                // Hide button and inputs
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                });
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })

                if ((this.app.mouseX > 814 && this.app.mouseX < 814 + 67 && this.app.mouseY > 570 && this.app.mouseY < 570 + 80) || (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73)) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }
                break;

            case 5:
                this.app.image(this.instruct3Screen, 0, 0, 1280, 720);

                // Hide button and inputs
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                });
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })

                if ((this.app.mouseX > 814 && this.app.mouseX < 814 + 67 && this.app.mouseY > 570 && this.app.mouseY < 570 + 80) || (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73)) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }
                break;

            case 6:
                this.app.image(this.instruct4Screen, 0, 0, 1280, 720);

                // Hide button and inputs
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                });
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })

                if ((this.app.mouseX > 973 && this.app.mouseX < 973 + 67 && this.app.mouseY > 537 && this.app.mouseY < 537 + 80) || (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73)) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }
                break;

            case 7:
                this.app.image(this.instruct5Screen, 0, 0, 1280, 720);

                // Hide button and inputs
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                });
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })

                if ((this.app.mouseX > 973 && this.app.mouseX < 973 + 67 && this.app.mouseY > 537 && this.app.mouseY < 537 + 80) || (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73)) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }
                break;

            case 8:
                this.app.image(this.instruct6Screen, 0, 0, 1280, 720);

                // Hide button and inputs
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                });
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })

                if ((this.app.mouseX > 1109 && this.app.mouseX < 1109 + 94 && this.app.mouseY > 527 && this.app.mouseY < 527 + 118) || (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73)) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }
                break;

            case 9:
                this.app.image(this.instruct7Screen, 0, 0, 1280, 720);

                // Hide button and inputs
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                });
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })

                if ((this.app.mouseX > 624 && this.app.mouseX < 624 + 94 && this.app.mouseY > 455 && this.app.mouseY < 455 + 118)
                    || (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73)) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }
                break;

            case 10:
                // Paint background
                this.app.cursor(this.app.ARROW);
                this.app.imageMode(this.app.CORNER)
                this.app.image(this.balancescreen, 0, 0, 1280, 720);

                this.timer.paint();

                // Hide button and inputs
                this.buttonFirst.style.display = "block";
                this.buttonLast.style.display = "none";
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "block";
                })
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })
                this.inputs[6].style.display = "none"

                if (this.inputOne.value() != "" &&
                    this.inputTwo.value() != "" &&
                    this.inputThree.value() != "" &&
                    this.inputFour.value() != "" &&
                    this.inputFive.value() != "" &&
                    this.inputSix.value() != "") {
                    this.buttonFirst.classList.add('btn--active');
                    this.buttonFirst.disabled = false;
                } else {
                    this.buttonFirst.classList.remove('btn--active');
                    this.buttonFirst.disabled = true;
                }

                // Paint bird slots
                for (let i = 0; i < this.birdSlot.length; i++) {
                    this.birdSlot[i].paint();
                }

                // Paint birds
                for (let i = 0; i < this.birds.length; i++) {
                    this.birds[i].paint();
                }

                // Paint objects
                this.leftJail.paint();
                this.rightJail.paint();

                if (this.app.mouseX > 45 && this.app.mouseX < 45 + 112 && this.app.mouseY > 115 && this.app.mouseY < 115 + 73) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }

                if (this.timer.time <= 0) {
                    if (parseInt(this.inputs[1].value) === 2) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[2].value) === 5) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[3].value) === 4) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[4].value) === 1) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[5].value) === 3) {
                        this.finalScore += 20;
                    }
                    this.currentScreen = 13;
                    console.log("FinalScore", this.finalScore)

                    this.actividad.addState("pantalla", this.currentScreen);
                    this.actividad.addState("putuacion", this.finalScore);
                    this.app.imageMode(this.app.CORNER);
                }
                break;

            case 11:
                this.app.background("#FFFBD4");
                this.app.imageMode(this.app.CORNER)
                this.app.image(this.passwordScreen, 0, 0, 1280, 720);
                this.app.image(this.slotsFilled, 1159, 52);
                this.timer.paint();
                this.app.fill("#0B8481");
                this.app.rect(0, this.app.height - 41, this.app.width, 41);
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "block";

                // Display password input
                this.inputs.forEach((elem, i) => {
                    elem.style.display = "block";
                })

                // Hide animation
                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })

                if ((this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73)
                    || (this.app.mouseX > 45 && this.app.mouseX < 45 + 112 && this.app.mouseY > 115 && this.app.mouseY < 115 + 73)) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }

                if (this.inputPassword.value() != "") {
                    this.buttonLast.classList.add('btn--active');
                    this.buttonLast.disabled = false;
                } else {
                    this.buttonLast.classList.remove('btn--active');
                    this.buttonLast.disabled = true;
                }

                // Calcular puntaje
                this.verificarBtn.mousePressed(() => {
                    if (parseInt(this.inputs[6].value) === this.correctAnswer) {

                        if (parseInt(this.inputs[1].value) === 2) {
                            this.finalScore += 20;
                        }

                        if (parseInt(this.inputs[2].value) === 5) {
                            this.finalScore += 20;
                        }

                        if (parseInt(this.inputs[3].value) === 4) {
                            this.finalScore += 20;
                        }

                        if (parseInt(this.inputs[4].value) === 1) {
                            this.finalScore += 20;
                        }

                        if (parseInt(this.inputs[5].value) === 3) {
                            this.finalScore += 20;
                        }

                        this.finalScore += 50;
                        if (this.timer.time >= 60) {
                            this.finalScore += 50;
                        } else if (this.timer.time >= 30 && this.timer.time < 60) {
                            this.finalScore += 25;
                        } else if (this.timer.time < 30) {
                            this.finalScore += 10
                        }
                        this.timer.isRunning = false;
                        this.currentScreen = 14;
                        console.log("FinalScore", this.finalScore)
                    } else {
                        this.currentScreen = 12;
                        this.actividad.addState("pantalla", this.currentScreen);
                        this.actividad.addState("putuacion", this.finalScore);
                        console.log("FinalScore", this.finalScore)
                    }
                })

                if (this.timer.time <= 0) {
                    if (parseInt(this.inputs[1].value) === 2) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[2].value) === 5) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[3].value) === 4) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[4].value) === 1) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[5].value) === 3) {
                        this.finalScore += 20;
                    }
                    console.log("FinalScore", this.finalScore)
                    this.currentScreen = 13;

                    this.actividad.addState("pantalla", this.currentScreen);
                    this.actividad.addState("putuacion", this.finalScore);
                    this.app.imageMode(this.app.CORNER);
                }
                break;

            case 12:
                this.app.image(this.wrongpassword, 0, 0, 1280, 720);
                this.timer.paint();
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";

                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                });

                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                })

                if (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73) {
                    this.app.cursor(this.app.HAND);
                } else {
                    this.app.cursor(this.app.ARROW);
                }

                if (this.timer.time <= 0) {
                    if (parseInt(this.inputs[1].value) === 2) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[2].value) === 5) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[3].value) === 4) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[4].value) === 1) {
                        this.finalScore += 20;
                    }

                    if (parseInt(this.inputs[5].value) === 3) {
                        this.finalScore += 20;
                    }

                    console.log("FinalScore", this.finalScore)
                    this.currentScreen = 13;

                    this.actividad.addState("pantalla", this.currentScreen);
                    this.actividad.addState("putuacion", this.finalScore);
                    this.app.imageMode(this.app.CORNER);
                }
                break;

            case 13:
                this.app.image(this.badending, 0, 0, 1280, 720);
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";

                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                });

                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                });
                break;

            case 14:
                this.app.image(this.goodending, 0, 0, 1280, 720);
                this.buttonFirst.style.display = "none";
                this.buttonLast.style.display = "none";

                this.inputs.forEach((elem, i) => {
                    elem.style.display = "none";
                });

                this.imgs.forEach((elem, i) => {
                    elem.style.display = 'none';
                });
                break;
        }


    }

    mousePressed() {

        switch (this.currentScreen) {
            case 1:
                if (this.app.mouseX > 571 && this.app.mouseX < 571 + 81 && this.app.mouseY > 359 && this.app.mouseY < 359 + 100) {
                    this.currentScreen = 2;
                }
                break;
            case 2:
                if (this.app.mouseX > 1163 && this.app.mouseX < 1163 + 70 && this.app.mouseY > 375 && this.app.mouseY < 375 + 59) {
                    this.currentScreen = 3;
                }
                break;
            case 3:
                if (this.app.mouseX > 814 && this.app.mouseX < 814 + 67 && this.app.mouseY > 570 && this.app.mouseY < 570 + 80) {
                    this.currentScreen = 4;
                }
                break;
            case 4:
                if (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73) {
                    this.currentScreen = 3;
                }

                if (this.app.mouseX > 814 && this.app.mouseX < 814 + 67 && this.app.mouseY > 570 && this.app.mouseY < 570 + 80) {
                    this.currentScreen = 5;
                }
                break;
            case 5:
                if (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73) {
                    this.currentScreen = 4;
                }

                if (this.app.mouseX > 814 && this.app.mouseX < 814 + 67 && this.app.mouseY > 570 && this.app.mouseY < 570 + 80) {
                    this.currentScreen = 6;
                }
                break;
            case 6:
                if (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73) {
                    this.currentScreen = 5;
                }

                if (this.app.mouseX > 973 && this.app.mouseX < 973 + 67 && this.app.mouseY > 537 && this.app.mouseY < 537 + 80) {
                    this.currentScreen = 7;
                }
                break;
            case 7:
                if (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73) {
                    this.currentScreen = 6;
                }

                if (this.app.mouseX > 973 && this.app.mouseX < 973 + 67 && this.app.mouseY > 537 && this.app.mouseY < 537 + 80) {
                    this.currentScreen = 8;
                }
                break;

            case 8:
                if (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73) {
                    this.currentScreen = 7;
                }

                if (this.app.mouseX > 1109 && this.app.mouseX < 1109 + 94 && this.app.mouseY > 527 && this.app.mouseY < 527 + 118) {
                    this.currentScreen = 9;
                }
                break;

            case 9:
                if (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73) {
                    this.currentScreen = 8;
                }

                if (this.app.mouseX > 624 && this.app.mouseX < 624 + 94 && this.app.mouseY > 455 && this.app.mouseY < 455 + 118) {
                    this.currentScreen = 10;
                    this.timer.isRunning = true;
                }
                break;

            case 10:

                for (let i = 0; i < this.birds.length; i++) {
                    let bird = this.birds[i];
                    if (bird.isHover()) {
                        bird.isGrabbed = true;
                        bird.isOutside = false;
                        this.birdSelect = bird;
                        this.intentos++;
                        this.actividad.addState("intentos", this.intentos);
                    }
                }

                if (this.app.mouseX > 120 && this.app.mouseX < 120 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 45) {
                    this.currentScreen = 11;
                }

                if (this.app.mouseX > 45 && this.app.mouseX < 45 + 112 && this.app.mouseY > 115 && this.app.mouseY < 115 + 73) {
                    this.currentScreen = 3;
                    this.app.imageMode(this.app.CORNER);
                }
                break;
            case 11:
                if (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73) {
                    this.currentScreen = 10;
                }

                if (this.app.mouseX > 45 && this.app.mouseX < 45 + 112 && this.app.mouseY > 115 && this.app.mouseY < 115 + 73) {
                    this.currentScreen = 3;
                }
                break;
            case 12:
                if (this.app.mouseX > 66 && this.app.mouseX < 66 + 54 && this.app.mouseY > 300 && this.app.mouseY < 300 + 73) {
                    this.currentScreen = 11;
                }
                break;

            case 13:

                var btnHTML = this.listoBtnFinal.elt as HTMLButtonElement;
                btnHTML.style.display = "block";

                //    console.log("MI PUNTUACION FINAL", this.finalScore)

                break;

            case 14:

                var btnHTML = this.listoBtnFinal.elt as HTMLButtonElement;
                btnHTML.style.display = "block";


                break;
        }

        this.actividad.addState("pantalla", this.currentScreen);
    }

    mouseDragged() {

        switch (this.currentScreen) {
            case 10:
                if (this.birdSelect != undefined) {
                    if (this.birdSelect.isGrabbed == true) {
                        this.birdSelect.posX = this.app.mouseX;
                        this.birdSelect.posY = this.app.mouseY;
                    }
                }
                break;
        }
    }

    mouseReleased() {

        switch (this.currentScreen) {
            case 10:
                if (this.birdSelect != undefined && this.leftJail.isHover()) {
                    this.birdSelect.removeJail();
                    this.leftJail.addBird(this.birdSelect);

                } else if (this.birdSelect != undefined && this.rightJail.isHover()) {
                    this.birdSelect.removeJail();
                    this.rightJail.addBird(this.birdSelect);

                } else if (this.birdSelect != undefined && this.birdSelect.isGrabbed == true) {

                    this.birdSelect.removeJail();
                    this.birdSelect.posInit();

                }

                this.birdSelect = undefined;
                break;
        }
    }

}

export default Logica;