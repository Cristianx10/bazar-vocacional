import p5 from "p5";

import Game from "./game";
import Stack from "./util/Stack";
import CARRERAS from "../../../../constants/observer";
import Navegador from '../../../../componentsTS/Navegacion/config/index';
import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';

const LPath = "/img/2021-1/ball-sort";

class Logica {
    // -------------------------------------
    // CONSTANTS
    // -------------------------------------
    bottleWidth = 50;
    bottleHeight = 180;
    bottleAjustment = this.bottleWidth / 2;
    bottleLayoutPositionY = 340;

    // -------------------------------------
    // GLOBAL VARIABLES
    // -------------------------------------
    finalTotalScore = 0;
    bottle: p5.Image;
    pressedBottle: p5.Image;
    spacing = 0;
    columns = 0;
    gameToDraw: any;
    game: any;
    takeout: any;
    drawTakeOut: any;
    backgroundColor: any;
    gameData: {
        level: number;
        movements: number;
        errors: number;
        time: number;
        timeInt: number;
        finished: boolean;
        score: number;
    }[] = [];
    currentLevel: any = undefined;
    playing: any;

    correct = false;
    incorrect = false;

    boongaloFont: p5.Font;
    gif: any;
    score: any;



    //-----------Will
    screen: number;
    uitour: number;
    soundBtn: boolean;
    finalScore: number;

    dakiti: any;

    menuBg: p5.Image;
    musicOn: p5.Image;
    mgameOn: p5.Image;
    badmov: p5.Image;
    goodmov: p5.Image;
    timeOut: p5.Image;

    inst1Bg: p5.Image;
    inst2Bg: p5.Image;
    inst3Bg: p5.Image;
    inst4: p5.Image;
    inst5: p5.Image;
    inst6: p5.Image;
    game1: p5.Image;
    game2: p5.Image;
    lvlComp: p5.Image;
    final: p5.Image;
    final1: p5.Image;
    final2: p5.Image;
    final3: p5.Image;
    //-----------Will

    end = true;
    // -------------------------------------
    // FUNCTIONS
    // -------------------------------------

    app: p5;
    actividad: ActividadTSLite;
    navegador: Navegador;

    preload() {
        this.dakiti = (this.app as any).loadSound(LPath + "/sound/lofi.mp3");
        this.dakiti.setVolume(0.05);
        this.dakiti.loop();
    }


    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {
        this.app = app;
        this.actividad = actividad;
        this.navegador = navegador;

        this.boongaloFont = this.app.loadFont(LPath + '/font/b.otf');
        //@ts-ignore
        this.gif = this.app.createImg(LPath + "/images/gif.gif");
        this.app.textFont(this.boongaloFont);
        // this.app.createCanvas(1280, 720);
        this.screen = 0;
        this.uitour = 0;
        this.finalScore = 0;
        this.soundBtn = false;

        this.bottle = this.app.loadImage(LPath + '/images/bottle.png');
        this.pressedBottle = this.app.loadImage(LPath + '/images/pressed_bottle.png');
        this.currentLevel = 1;
        this.timeOut = this.app.loadImage(LPath + '/images/menu-inst/timeOut.png');

        //----------Will
        this.menuBg = this.app.loadImage(LPath + '/images/menu-inst/menubg.png');
        this.inst1Bg = this.app.loadImage(LPath + '/images/menu-inst/inst1bg.png');
        this.inst2Bg = this.app.loadImage(LPath + '/images/menu-inst/inst2bg.png');
        this.inst3Bg = this.app.loadImage(LPath + '/images/menu-inst/inst3bg.png');
        this.inst4 = this.app.loadImage(LPath + '/images/menu-inst/inst4.png');
        this.inst5 = this.app.loadImage(LPath + '/images/menu-inst/inst5.png');
        this.inst6 = this.app.loadImage(LPath + '/images/menu-inst/inst6.png');
        this.game1 = this.app.loadImage(LPath + '/images/menu-inst/game1.png');
        this.game2 = this.app.loadImage(LPath + '/images/menu-inst/game2.png');
        this.lvlComp = this.app.loadImage(LPath + '/images/menu-inst/lvlcomplete.png');

        this.final = this.app.loadImage(LPath + '/images/menu-inst/lastScreen.png');
        this.final1 = this.app.loadImage(LPath + '/images/oro.png');
        this.final2 = this.app.loadImage(LPath + '/images/plata.png');
        this.final3 = this.app.loadImage(LPath + '/images/bronce.png');

        this.musicOn = this.app.loadImage(LPath + '/images/ui/musicon.png');
        this.mgameOn = this.app.loadImage(LPath + '/images/ui/mgameon.png');
        this.badmov = this.app.loadImage(LPath + '/images/ui/bad.png');
        this.goodmov = this.app.loadImage(LPath + '/images/ui/good.png');

        //----------Will

        this.app.frameRate(30);
    }



    startGame(level: number) {

        this.game = new Game(level);
        this.game.starTime();
        this.gameToDraw = this.game.currentGame;
        this.columns = this.gameToDraw.length + 1;
        this.spacing = 1280 / this.columns;
        this.backgroundColor = 'black';
        this.drawTakeOut = false;
        this.playing = true;
    }

    loadPuntaje = false;

    draw() {

        switch (this.screen) {
            case 0:
                this.app.image(this.menuBg, 0, 0);
                this.gif.position(-1000, -1000);
                if (this.soundBtn == true) {
                    this.app.image(this.musicOn, 0, 0);
                }

                break;
            case 1:
                this.app.image(this.inst1Bg, 0, 0);
                break;
            case 2:
                this.app.image(this.inst2Bg, 0, 0);
                break;
            case 3:
                this.app.image(this.inst3Bg, 0, 0);
                this.gif.position(770, 180);
                break;
            case 4:
                this.gif.position(-1000, -1000);
                switch (this.uitour) {
                    case 0:
                        this.app.image(this.inst4, 0, 0);
                        break;

                    case 1:
                        this.app.image(this.inst5, 0, 0);
                        break;

                    case 2:
                        this.app.image(this.inst6, 0, 0);
                        break;
                }
                break;
            case 5:
                if (this.playing) {
                    if (this.currentLevel == 1) {
                        this.app.image(this.game1, 0, 0);
                    } else if (this.currentLevel == 2) {
                        this.app.image(this.game2, 0, 0);
                    }

                    this.app.fill(255, 255, 255);
                    // Draw the game.
                    this.gameToDraw = this.game.currentGame;

                    this.bottle.resize(this.bottleWidth, 0);
                    //Draw bottles
                    for (let i = 0; i < this.game.currentBottlesState.length; i++) {
                        let x = this.spacing * (i + 1) - this.bottleAjustment;

                        if (this.game.currentBottlesState[i])
                            this.app.image(this.pressedBottle, x, this.bottleLayoutPositionY);
                        else
                            this.app.image(this.bottle, x, this.bottleLayoutPositionY);


                        this.pressedBottle.resize(this.bottleWidth, 0);



                    }

                    //Draw the balls
                    for (let i = 0; i < this.gameToDraw.length; i++) {

                        let x = this.spacing * (i + 1);
                        let currentStack = this.gameToDraw[i];
                        let tempStack = new Stack();
                        let preStack = new Stack();
                        let postStack = new Stack();
                        let height = 1;


                        while (currentStack.size() > 0) {
                            preStack.push(currentStack.pop());
                        }

                        while (preStack.size() > 0) {

                            let currentBall = preStack.pop() as any;
                            //@ts-ignore
                            this.app.fill(this.app.color(this.getColor(currentBall)));
                            this.app.ellipse(x, 520 - (height * 30), 30, 30);
                            height++;
                            postStack.push(currentBall);
                        }

                        while (postStack.size() > 0) {
                            tempStack.push(postStack.pop());
                        }

                        while (tempStack.size() > 0) {
                            currentStack.push(tempStack.pop());
                        }

                    }

                    //Draw takeout balls
                    if (this.drawTakeOut) {


                        let fillColor = this.game.takeout[0];
                        let howMany = this.game.takeout[1];
                        let counter = 0;
                        while (counter < howMany) {
                            //@ts-ignore
                            this.app.fill(this.app.color(this.getColor(fillColor)));
                            this.app.ellipse(this.spacing * (this.game.takeout[2] + 1), 300 - (counter * 30), 30, 30);
                            counter++;
                        }
                    }


                    //Draw time
                    this.app.fill(255, 255, 255)
                    this.app.textSize(32);
                    this.app.text(this.game.getTime(), 144, 115);
                    this.app.text(this.game.movements, 386, 115);

                    if (this.game.finished) {

                        let dataLevel = this.game.currentLevel;
                        let dataMovements = this.game.movements + 1;
                        let dataErrors = this.game.errors;
                        let dataTime = this.game.getTime();
                        let dataTimeInt = this.game.currentTime;
                        let dataFinished = false;

                        if (this.game.currentLevel == 3) {

                            let data = {
                                level: dataLevel,
                                movements: dataMovements,
                                errors: dataErrors,
                                time: dataTime,
                                timeInt: dataTimeInt,
                                finished: dataFinished,
                                score: this.game.score(1, false, this.game.errors, this.game.movements, dataTimeInt)
                            }


                            this.gameData.push(data);



                            this.screen = 8;
                            setTimeout(() => {
                                this.screen = 5;
                                this.currentLevel = 2;
                                this.startGame(4);
                            }, 4000);
                        } else if (this.game.currentLevel == 4) {

                            let data = {
                                level: dataLevel,
                                movements: dataMovements,
                                errors: dataErrors,
                                time: dataTime,
                                timeInt: dataTimeInt,
                                finished: dataFinished,
                                score: this.game.score(2, false, this.game.errors, this.game.movements, dataTimeInt)
                            }

                            this.gameData.push(data);


                            this.screen = 7;
                        }
                    }

                }

                //Sound Btn Feedback
                if (this.soundBtn == true) {
                    this.app.image(this.mgameOn, 0, 0);
                }

                break;

            case 6:
                this.app.image(this.lvlComp, 0, 0);
                break;

            case 7:

                this.app.image(this.final, 0, 0);

                this.finalTotalScore = this.gameData[0].score + this.gameData[1].score;

                if (this.end) {
                    console.log('****************************');
                    console.log('Final Score: ' + this.finalTotalScore);
                    console.log('****************************');
                    this.end = false;


                    if (this.loadPuntaje === false) {
                        this.loadPuntaje = true;
                        const score = this.finalTotalScore;
                        this.actividad.addResult([
                            { id: CARRERAS.INGENIERIA_SISTEMAS, value: score }
                        ])

                        setTimeout(() => {
                            this.actividad.finish();
                        }, 5000)
                    }


                }

                this.finalScore = 2;
                if (this.score > 100)
                    this.finalScore = 1;

                if (this.score > 150)
                    this.finalScore = 0;



                switch (this.finalScore) {
                    case 0:

                        this.app.image(this.final1, 550, 300);
                        break;
                    case 1:
                        this.app.image(this.final3, 550, 300);
                        break;
                }

                break;

            case 8:
                this.app.image(this.timeOut, 0, 0);
                break;
        }

        if (this.correct) {
            this.app.image(this.goodmov, 0, 0);
        }

        if (this.incorrect) {
            this.app.image(this.badmov, 0, 0);
        }

        if (this.game) {
            const { currentLevel, movements, errors } = this.game;
            this.actividad.addState("currentLevel", currentLevel)
            this.actividad.addState("movements", movements)
            this.actividad.addState("errors", errors)
        }

        const screen = this.screen;
        this.actividad.addState("screen", screen)

    }


    //Get color hexacode from string.
    getColor(color: any) {

        let colorToFill;

        switch (color) {
            case 'blue':
                colorToFill = '#04d9ff';
                break;

            case 'yellow':
                colorToFill = '#ffff00';
                break;

            case 'red':
                colorToFill = '#FF6666';
                break;

            case 'pink':
                colorToFill = '#DD319F';
                break;
            case 'purple':
                colorToFill = '#A531FF';
                break;
            case 'green':
                colorToFill = '#16E49A'
                break;
            case 'orange':
                colorToFill = '#FFA230';
                break;
            case 'darkBlue':
                colorToFill = '#0731C3';
                break;
            case 'darkGreen':
                colorToFill = '#00802B';
                break;
            case 'grey':
                colorToFill = '#5F5F5F';
                break;
            case 'brown':
                colorToFill = '#673737';
                break;
            case 'white':
                colorToFill = '#FFFFFF';
                break;
        }

        return colorToFill;

    }

    //-------Navegacion temporal Will
    keyPressed() {
        if (this.app.key == 'd') {
            this.screen++;
        } else if (this.app.key == 'a') {
            this.screen--;
        }
    }
    //-------Navegacion temporal Will



    mousePressed() {

        //-------Navegacion temporal con el mouse Will
        switch (this.screen) {
            case 0:
                if ((this.app.mouseX > 555 && this.app.mouseX < 732) && (this.app.mouseY > 413 && this.app.mouseY < 473)) {
                    this.screen = 1;
                }
                if ((this.app.mouseX > 1090 && this.app.mouseX < 1200) && (this.app.mouseY > 80 && this.app.mouseY < 173)) {
                    this.soundBtn = !this.soundBtn;
                    if (this.soundBtn == true) {
                        this.dakiti.play();
                    } else if (this.soundBtn == false) {
                        this.dakiti.stop();
                    }
                }

                break;

            case 1:
                if ((this.app.mouseX > 287 && this.app.mouseX < 512) && (this.app.mouseY > 493 && this.app.mouseY < 555)) {

                    this.screen = 2;
                }
                break;

            case 2:
                if ((this.app.mouseX > 333 && this.app.mouseX < 558) && (this.app.mouseY > 493 && this.app.mouseY < 555)) {
                    this.screen = 3;
                }
                if ((this.app.mouseX > 80 && this.app.mouseX < 159) && (this.app.mouseY > 80 && this.app.mouseY < 143)) {
                    this.screen = 1;
                }
                break;

            case 3:
                if ((this.app.mouseX > 287 && this.app.mouseX < 512) && (this.app.mouseY > 493 && this.app.mouseY < 555)) {
                    this.screen = 4;
                }
                if ((this.app.mouseX > 80 && this.app.mouseX < 159) && (this.app.mouseY > 80 && this.app.mouseY < 143)) {
                    this.screen = 2;
                }
                break;

            case 4:
                switch (this.uitour) {
                    case 0:
                        if ((this.app.mouseX > 80 && this.app.mouseX < 161) && (this.app.mouseY > 355 && this.app.mouseY < 418)) {
                            this.screen = 3;
                        }

                        if ((this.app.mouseX > 1120 && this.app.mouseX < 1200) && (this.app.mouseY > 350 && this.app.mouseY < 418)) {
                            this.uitour = 1;
                        }
                        break;

                    case 1:
                        if ((this.app.mouseX > 80 && this.app.mouseX < 161) && (this.app.mouseY > 355 && this.app.mouseY < 418)) {
                            this.uitour = 0;
                        }

                        if ((this.app.mouseX > 1120 && this.app.mouseX < 1200) && (this.app.mouseY > 350 && this.app.mouseY < 418)) {
                            this.uitour = 2;
                        }
                        break;

                    case 2:
                        if ((this.app.mouseX > 80 && this.app.mouseX < 161) && (this.app.mouseY > 355 && this.app.mouseY < 418)) {
                            this.uitour = 1;
                        }
                        if ((this.app.mouseX > 975 && this.app.mouseX < 1200) && (this.app.mouseY > 578 && this.app.mouseY < 640)) {
                            this.screen = 5;
                            //Comienzo juego
                            this.startGame(3);
                        }
                        break;
                }
                break;

            case 5:

                //Music Btn 

                if ((this.app.mouseX > 1122 && this.app.mouseX < 1200) && (this.app.mouseY > 77 && this.app.mouseY < 140)) {
                    this.soundBtn = !this.soundBtn;
                    if (this.soundBtn == true) {
                        this.dakiti.play();
                    } else if (this.soundBtn == false) {
                        this.dakiti.stop();
                    }
                }

                //Restart Btn 

                if ((this.app.mouseX > 1023 && this.app.mouseX < 1101) && (this.app.mouseY > 77 && this.app.mouseY < 140)) {
                    if (this.game.currentLevel == 3) {
                        this.startGame(3);
                    } else {
                        this.startGame(4);
                    }
                }


                //Calculate bottles area.

                let counter = 1;

                while (counter <= this.columns - 1) {

                    let x1 = this.spacing * (counter) - this.bottleAjustment;
                    let x2 = x1 + (2 * this.bottleAjustment);
                    let y1 = this.bottleLayoutPositionY;
                    let y2 = this.bottleLayoutPositionY + this.bottleHeight;

                    if (this.app.mouseY > y1 && this.app.mouseY < y2) {
                        if (this.app.mouseX > x1 && this.app.mouseX < x2) {



                            if (!this.drawTakeOut) {

                                if (!this.game.currentBottlesState[counter - 1]) {

                                    this.game.currentBottlesState[counter - 1] = true;
                                    this.game.takeout = this.game.currentGame[counter - 1].takeout(counter - 1);
                                    this.drawTakeOut = true;

                                    return false;

                                } else {

                                    for (let i = 0; i < this.game.currentBottlesState.length; i++) {
                                        if (i != (counter - 1))
                                            this.game.currentBottlesState[i] = false;
                                    }

                                    return false;

                                }

                            } else {

                                let bottleStack = this.game.currentGame[counter - 1];


                                let temp = counter;

                                if (((bottleStack.size() + this.game.takeout[1]) <= bottleStack.capacity || bottleStack.size() == 0) || counter - 1 == this.game.takeout[2]) {
                                    if (bottleStack.peek() === 'empty' || bottleStack.peek() === this.game.takeout[0] || counter - 1 == this.game.takeout[2]) {



                                        counter = 0;
                                        while (counter < this.game.takeout[1]) {

                                            bottleStack.push(this.game.takeout[0]);

                                            if (this.game.gameSolved()) {

                                                this.playing = false;

                                                let dataLevel = this.game.currentLevel;
                                                let dataMovements = this.game.movements + 1;
                                                let dataErrors = this.game.errors;
                                                let dataTime = this.game.getTime();
                                                let dataTimeInt = this.game.currentTime;
                                                let dataFinished = true;


                                                let data = {
                                                    level: dataLevel,
                                                    movements: dataMovements,
                                                    errors: dataErrors,
                                                    time: dataTime,
                                                    timeInt: dataTimeInt,
                                                    finished: dataFinished,
                                                    score: this.game.score(this.currentLevel, true, this.game.errors, this.game.movements, dataTimeInt)
                                                }

                                                this.gameData.push(data);


                                                if (this.currentLevel == 1) {
                                                    this.screen = 6;

                                                    setTimeout(() => {

                                                        this.screen = 5;
                                                        this.currentLevel = 2;
                                                        this.startGame(4);

                                                    }, 3000);
                                                } else if (this.currentLevel == 2) {
                                                    this.screen = 7;
                                                }

                                                return false;



                                            }
                                            counter++;

                                        }

                                        this.drawTakeOut = false;

                                        for (let i = 0; i < this.game.currentBottlesState.length; i++) {
                                            this.game.currentBottlesState[i] = false;
                                        }

                                        if (temp - 1 == this.game.takeout[2]) {
                                            return;
                                        }


                                        this.game.addMove();

                                        this.correct = true;
                                        setTimeout(() => {
                                            this.correct = false;
                                        }, 250);

                                        return false;

                                    }
                                }





                                this.game.addError();
                                this.incorrect = true;

                                setTimeout(() => {
                                    this.incorrect = false;
                                }, 250);

                                return false;
                            }



                        }
                    }

                    counter++;
                }

                //Pressed bottle.
                for (let i = 0; i < this.game.currentBottlesState.length; i++) {
                    this.game.currentBottlesState[i] = false;
                }

                //Put back took out balls.

                if (this.drawTakeOut) {

                    let tookOutBalls = this.game.takeout;
                    counter = 0;
                    let stack = this.gameToDraw[tookOutBalls[2]];

                    while (counter < tookOutBalls[1]) {

                        stack.push(tookOutBalls[0]);
                        counter++;

                    }

                    this.drawTakeOut = false;
                }


                return false;

                break;
        }

    }
}

export default Logica;