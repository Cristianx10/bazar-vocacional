import p5 from 'p5';



import Brick from './Brick';
import Button from './Button';
import Logic from './Logic';
import Matrix from './Matrix';
import OrangeBrick from './OrangeBrick';
import PurpleBrick from './PurpleBrick';
import RedBrick from './RedBrick';
import YellowBrick from './YellowBrick';
import IProcessingActividad from '../../../../componentsTS/Processing/types/IProcessingActivity';

import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';
import CARRERAS from '../../../../constants/observer';
import Navegador from '../../../../componentsTS/Navegacion/config';
class Main implements IProcessingActividad {

    app: p5;

    screen: number;
    bricksLevel1V: Brick[];
    bricksLevel1H: Brick[];

    bricksLevel2V: Brick[];
    bricksLevel2H: Brick[];

    bricksLevel3V: Brick[];
    bricksLevel3H: Brick[];

    demoV: Brick;
    demoH: Brick;

    logic: Logic;
    character: Brick;

    bg1: p5.Image;
    bg2: p5.Image;
    axisX: p5.Image;
    axisY: p5.Image;

    poppinsBlack: p5.Font;
    poppinsRegular: p5.Font;

    btnScreen1: Button;
    btnScreen2: Button;
    btnScreen3: Button;

    matrix1: number[][];
    matrix2: number[][];
    matrix3: number[][];

    map1: Matrix;
    map2: Matrix;
    map3: Matrix;

    instructions: string;
    controls: string;


    //variable del puntaje
    score: number;
    actividad: ActividadTSLite;
    navegador: Navegador;

    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {

        this.actividad = actividad;
        this.navegador = navegador;
        this.app = app;

        this.score = 0;

        this.actividad.addState("puntuacion", this.score)
        this.actividad.addState("intentos", 0);


        //initialize
        this.screen = 0;
        this.actividad.addState("pantalla", this.screen)
        this.bricksLevel1V = [];
        this.bricksLevel1H = [];

        this.bricksLevel2V = [];
        this.bricksLevel2H = [];

        this.bricksLevel3V = [];
        this.bricksLevel3H = [];


        this.matrix1 = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];

        this.matrix2 = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];

        this.matrix3 = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];

        this.map1 = new Matrix(this.matrix1, 313, 60, this.app);
        this.map2 = new Matrix(this.matrix2, 313, 60, this.app);
        this.map3 = new Matrix(this.matrix3, 313, 60, this.app);


        this.instructions = "Mueve las fichas de colores para liberar el camino de la ficha amarilla antes de que el tiempo acabe. Las fichas solo se moverán dependiendo de su orientación; si una ficha está orientada verticalmente, solo se moverá de arriba a abajo. Si una ficha está orientada horizontalmente, solo se moverá de izquierda a derecha. Igualmente, la ficha amarilla solo se mueve de izquierda a derecha.";
        this.controls = "Deberás hacer clic y arrastrar las fichas con el ratón de tu computadora según la orientación que tengan (vertical u horizontalmente).";

        this.btnScreen1 = new Button(680, 470, 245, 80, "Continuar", this.app);
        this.btnScreen2 = new Button(540, 600, 200, 66, "Continuar", this.app);
        this.btnScreen3 = new Button(1000, 330, 200, 66, "Jugar", this.app);

        this.character = new YellowBrick(313, 360, "X", this.app);
        this.demoV = new RedBrick(713, 360, 3, "Y", this.app);
        this.demoH = new OrangeBrick(513, 260, 3, "X", this.app);
        this.logic = new Logic(this.app);

        //add bricks of level 1
        this.bricksLevel1H.push(new OrangeBrick(513, 160, 3, "X", this.app));
        this.bricksLevel1H.push(new OrangeBrick(713, 560, 2, "X", this.app));

        this.bricksLevel1V.push(new RedBrick(513, 260, 3, "Y", this.app));
        this.bricksLevel1V.push(new PurpleBrick(713, 360, 2, "Y", this.app));

        //add bricks of level 2
        this.bricksLevel2V.push(new PurpleBrick(413, 60, 2, "Y", this.app));
        this.bricksLevel2V.push(new OrangeBrick(513, 460, 2, "Y", this.app));
        this.bricksLevel2V.push(new OrangeBrick(713, 160, 3, "Y", this.app));

        this.bricksLevel2H.push(new PurpleBrick(713, 460, 2, "X", this.app));
        this.bricksLevel2H.push(new RedBrick(313, 360, 3, "X", this.app));
        this.bricksLevel2H.push(new RedBrick(613, 60, 3, "X", this.app));

        //add bricks of level 3
        this.bricksLevel3V.push(new PurpleBrick(413, 160, 2, "Y", this.app));
        this.bricksLevel3V.push(new PurpleBrick(613, 160, 2, "Y", this.app));
        this.bricksLevel3V.push(new RedBrick(313, 460, 2, "Y", this.app));
        this.bricksLevel3V.push(new RedBrick(513, 360, 2, "Y", this.app));
        this.bricksLevel3V.push(new RedBrick(713, 160, 3, "Y", this.app));
        this.bricksLevel3V.push(new OrangeBrick(513, 160, 2, "Y", this.app));
        this.bricksLevel3V.push(new OrangeBrick(313, 60, 2, "Y", this.app));
        this.bricksLevel3V.push(new OrangeBrick(613, 360, 3, "Y", this.app));

        this.bricksLevel3H.push(new OrangeBrick(613, 60, 2, "X", this.app));
        this.bricksLevel3H.push(new RedBrick(413, 60, 2, "X", this.app));
        this.bricksLevel3H.push(new PurpleBrick(413, 560, 2, "X", this.app));

        //Load Images
        this.bg1 = this.app.loadImage("/img/2020-2/mercadeo/bg/Bg1.png");
        this.bg2 = this.app.loadImage("/img/2020-2/mercadeo/bg/Bg2.png");
        this.axisX = this.app.loadImage("/img/2020-2/mercadeo/bg/axisX.png");
        this.axisY = this.app.loadImage("/img/2020-2/mercadeo/bg/axisY.png");

        //Load Fonts
        this.poppinsBlack = this.app.loadFont("/img/2020-2/mercadeo/font/Poppins-Black.ttf");
        this.poppinsRegular = this.app.loadFont("/img/2020-2/mercadeo/font/Poppins-Regular.ttf");

    }

    loop = 0;

    draw() {
        this.app.background(87, 24, 69);

        switch (this.screen) {
            case 0:
                this.app.image(this.bg1, 0, 0);
                this.app.fill(255);
                this.app.textFont(this.poppinsBlack, 72);
                this.app.textLeading(75);
                this.app.textAlign(this.app.LEFT, this.app.TOP);
                this.app.text("Think\nOutside\nThe Box", 680, 185);
                this.btnScreen1.draw();
                break;

            case 1:
                this.app.image(this.bg2, 0, 220);
                this.app.fill(255);
                this.app.textAlign(this.app.LEFT, this.app.TOP);
                this.app.textFont(this.poppinsBlack, 48);
                this.app.text("Instrucciones", 150, 84);
                this.app.text("Controles", 830, 84);

                this.app.textFont(this.poppinsRegular, 22);
                this.app.textAlign(this.app.CENTER, this.app.TOP);
                this.app.textLeading(30);
                this.app.text(this.instructions, 108, 206, 425, 350);
                this.app.text(this.controls, 704, 206, 512, 160);

                this.app.image(this.axisX, 766, 396);
                this.app.image(this.axisY, 1030, 384);

                this.btnScreen2.draw();
                break;

            case 2:

                this.map1.draw();
                this.demoV.draw();
                this.demoH.draw();
                this.character.draw();
                this.btnScreen3.draw();

                this.app.fill(255);
                this.app.textAlign(this.app.LEFT, this.app.TOP);
                this.app.textFont(this.poppinsBlack, 48);
                this.app.text("Tutorial", 1000, 200);

                if (this.app.frameCount % 30 == 0) {
                    switch (this.loop) {
                        case 1:
                            this.demoH.setPosX(this.demoH.getPosX() - 100);
                            break;
                        case 2:
                            this.demoV.setPosY(this.demoV.getPosY() - 100);
                            break;
                        case 3:
                            this.demoV.setPosY(this.demoV.getPosY() - 100);
                            break;
                        case 4:
                            this.demoV.setPosY(this.demoV.getPosY() - 100);
                            break;
                        case 5:
                            this.character.setPosX(this.character.getPosX() + 100);
                            break;
                        case 6:
                            this.character.setPosX(this.character.getPosX() + 100);
                            break;
                        case 7:
                            this.character.setPosX(this.character.getPosX() + 100);
                            break;
                        case 8:
                            this.character.setPosX(this.character.getPosX() + 100);
                            break;
                        case 9:
                            this.character.setPosX(this.character.getPosX() + 100);
                            break;
                        case 10:
                            this.demoV.setPosY(360);
                            this.demoH.setPosX(513);
                            this.character.setPosX(313);

                            break;
                    }
                    if (this.loop == 10) {
                        this.loop = 0;
                    } else {
                        this.loop++;
                    }

                }

                break;

            case 3:
                this.map1.draw();
                this.character.draw();


                for (var i = 0; i < this.bricksLevel1V.length; i++) {
                    let b = this.bricksLevel1V[i];
                    b.draw();
                }


                for (var i = 0; i < this.bricksLevel1H.length; i++) {
                    let b = this.bricksLevel1H[i];
                    b.draw();
                }


                for (var i = 0; i < this.bricksLevel1V.length; i++) {
                    let b1 = this.bricksLevel1V[i];

                    for (var j = 0; j < this.bricksLevel1H.length; j++) {
                        let b2 = this.bricksLevel1H[j];
                        this.logic.validateIntersectionV(b1, b2);
                        this.logic.validateIntersectionH(b2, b1);
                        this.logic.validateIntersectionH(this.character, b1);
                        this.logic.validateIntersectionV(b1, this.character);
                    }
                }

                if (this.character.getPosX() >= 813) {
                    this.score += 50;
                    this.actividad.addState("puntuacion", this.score)
                    this.character.setPosX(313);
                    this.character.setPosY(260);
                    this.character.setLocked(false);
                    this.screen = 4;
                    this.actividad.addState("pantalla", this.screen)
                }

                this.logic.timer();
                this.app.fill(255);
                this.app.textAlign(this.app.LEFT, this.app.TOP);
                this.app.textFont(this.poppinsBlack, 36);
                this.app.text(this.logic.getTime(), 30, 25);

                this.logic.hint();

                break;

            case 4:
                this.map2.draw();
                this.character.draw();


                for (var i = 0; i < this.bricksLevel2V.length; i++) {
                    let b = this.bricksLevel2V[i];
                    b.draw();
                }


                for (var i = 0; i < this.bricksLevel2H.length; i++) {
                    let b = this.bricksLevel2H[i];
                    b.draw();
                }


                for (var i = 0; i < this.bricksLevel2V.length; i++) {
                    let b1 = this.bricksLevel2V[i];

                    for (var j = 0; j < this.bricksLevel2H.length; j++) {
                        let b2 = this.bricksLevel2H[j];
                        this.logic.validateIntersectionV(b1, b2);
                        this.logic.validateIntersectionH(b2, b1);
                        this.logic.validateIntersectionH(this.character, b1);
                        this.logic.validateIntersectionV(b1, this.character);
                    }
                }

                if (this.character.getPosX() >= 813) {
                    this.score += 65;
                    this.actividad.addState("puntuacion", this.score)
                    this.character.setPosX(313);
                    this.character.setPosY(260);
                    this.character.setLocked(false);
                    this.screen = 5;
                    this.actividad.addState("pantalla", this.screen)
                }

                this.logic.timer();
                this.app.fill(255);
                this.app.textAlign(this.app.LEFT, this.app.TOP);
                this.app.textFont(this.poppinsBlack, 36);
                this.app.text(this.logic.getTime(), 30, 25);

                this.logic.hint();

                break;
            case 5:
                this.map3.draw();
                this.character.draw();


                for (var i = 0; i < this.bricksLevel3V.length; i++) {
                    let b = this.bricksLevel3V[i];
                    b.draw();
                }


                for (var i = 0; i < this.bricksLevel3H.length; i++) {
                    let b = this.bricksLevel3H[i];
                    b.draw();
                }


                for (var i = 0; i < this.bricksLevel3V.length; i++) {
                    let b1 = this.bricksLevel3V[i];

                    for (var j = 0; j < this.bricksLevel3H.length; j++) {
                        let b2 = this.bricksLevel3H[j];
                        this.logic.validateIntersectionV(b1, b2);
                        this.logic.validateIntersectionH(b2, b1);
                        this.logic.validateIntersectionH(this.character, b1);
                        this.logic.validateIntersectionH(this.character, b2);
                        this.logic.validateIntersectionV(b1, this.character);
                    }
                }


                for (var i = 0; i < this.bricksLevel3V.length; i++) {
                    let b1 = this.bricksLevel3V[i];

                    for (var j = 0; j < this.bricksLevel3V.length; j++) {
                        let b2 = this.bricksLevel3V[j];
                        if (b1 != b2) {
                            this.logic.validateIntersectionV(b1, b2);
                        }
                    }
                }


                for (var i = 0; i < this.bricksLevel3H.length; i++) {
                    let b1 = this.bricksLevel3H[i];

                    for (var j = 0; j < this.bricksLevel3H.length; j++) {
                        let b2 = this.bricksLevel3H[j];
                        if (b1 != b2) {
                            this.logic.validateIntersectionH(b1, b2);
                        }
                    }
                }

                if (this.character.getPosX() >= 813) {
                    this.score += 85;
                    this.actividad.addState("puntuacion", this.score)
                    this.character.setPosX(313);
                    this.character.setPosY(260);
                    this.character.setLocked(false);
                    this.screen = 6;
                    this.actividad.addState("pantalla", this.screen)
                }

                this.logic.timer();
                this.app.fill(255);
                this.app.textAlign(this.app.LEFT, this.app.TOP);
                this.app.textFont(this.poppinsBlack, 36);
                this.app.text(this.logic.getTime(), 30, 25);

                this.logic.hint();
                break;

            case 6:
                this.app.image(this.bg1, 0, 0);
                this.app.fill(255);
                this.app.textFont(this.poppinsBlack, 50);
                this.app.textLeading(65);
                this.app.textAlign(this.app.CENTER, this.app.TOP);
                this.app.text("Felicidades\nterminastes\nel  minijuego", 890, 120);

                this.app.text("Haz click en\nla pantalla\npara continuar", 890, 520);

                break;

        }


        console.log("puntuacion", this.score, this.screen);
    }

    mousePressed() {
        switch (this.screen) {
            case 0:
                if (this.btnScreen1.isFocus()) {
                    this.screen = 1;
                    this.actividad.addState("pantalla", this.screen)
                }
                break;

            case 1:
                if (this.btnScreen2.isFocus()) {
                    this.screen = 2;
                    this.actividad.addState("pantalla", this.screen)
                }
                break;

            case 2:
                if (this.btnScreen3.isFocus()) {
                    this.screen = 3;
                    this.actividad.addState("pantalla", this.screen)
                }
                break;

            case 3:
                if (this.character.isOver()) {
                    this.character.setOffset();
                }

                for (var i = 0; i < this.bricksLevel1V.length; i++) {
                    let b = this.bricksLevel1V[i];
                    if (b.isOver()) {
                        b.setOffset();
                    }
                }

                for (var i = 0; i < this.bricksLevel1H.length; i++) {
                    let b = this.bricksLevel1H[i];
                    if (b.isOver()) {
                        b.setOffset();
                    }
                }
                break;

            case 4:
                if (this.character.isOver()) {
                    this.character.setOffset();
                }

                for (var i = 0; i < this.bricksLevel2V.length; i++) {
                    let b = this.bricksLevel2V[i];
                    if (b.isOver()) {
                        b.setOffset();
                    }
                }

                for (var i = 0; i < this.bricksLevel2H.length; i++) {
                    let b = this.bricksLevel2H[i];
                    if (b.isOver()) {
                        b.setOffset();
                    }
                }
                break;
            case 5:
                if (this.character.isOver()) {
                    this.character.setOffset();
                }

                for (var i = 0; i < this.bricksLevel3V.length; i++) {
                    let b = this.bricksLevel3V[i];
                    if (b.isOver()) {
                        b.setOffset();
                    }
                }

                for (var i = 0; i < this.bricksLevel3H.length; i++) {
                    let b = this.bricksLevel3H[i];
                    if (b.isOver()) {
                        b.setOffset();
                    }
                }
                break;
            case 6:

                this.actividad.addResult([{
                    id: CARRERAS.MERCADEO, value: (this.score >= 200 ? 200 : this.score)
                }])

                this.navegador.next();
                break;
        }
    }

    mouseDragged() {
        switch (this.screen) {
            case 3:
                if (this.character.isLocked()) {
                    this.character.move();
                }

                for (var i = 0; i < this.bricksLevel1V.length; i++) {
                    let b1 = this.bricksLevel1V[i];
                    if (b1.isLocked()) {
                        b1.move();
                    }
                }

                for (var i = 0; i < this.bricksLevel1H.length; i++) {
                    let b1 = this.bricksLevel1H[i];
                    if (b1.isLocked()) {
                        b1.move();
                    }
                }
                break;

            case 4:
                if (this.character.isLocked()) {
                    this.character.move();
                }

                for (var i = 0; i < this.bricksLevel2V.length; i++) {
                    let b1 = this.bricksLevel2V[i];
                    if (b1.isLocked()) {
                        b1.move();
                    }
                }

                for (var i = 0; i < this.bricksLevel2H.length; i++) {
                    let b1 = this.bricksLevel2H[i];
                    if (b1.isLocked()) {
                        b1.move();
                    }
                }
                break;

            case 5:
                if (this.character.isLocked()) {
                    this.character.move();
                }

                for (var i = 0; i < this.bricksLevel3V.length; i++) {
                    let b1 = this.bricksLevel3V[i];
                    if (b1.isLocked()) {
                        b1.move();
                    }
                }

                for (var i = 0; i < this.bricksLevel3H.length; i++) {
                    let b1 = this.bricksLevel3H[i];
                    if (b1.isLocked()) {
                        b1.move();
                    }
                }
                break;
        }
    }

    intentos = 0;
    mouseReleased() {
        switch (this.screen) {
            case 3:
                this.intentos++;
                this.actividad.addState("intentos", this.intentos++);
                this.character.setLocked(false);
                for (var i = 0; i < this.bricksLevel1V.length; i++) {
                    let b = this.bricksLevel1V[i];
                    b.setLocked(false);
                }
                for (var i = 0; i < this.bricksLevel1H.length; i++) {
                    let b = this.bricksLevel1H[i];
                    b.setLocked(false);
                }
                break;

            case 4:
                this.intentos++;
                this.actividad.addState("intentos", this.intentos++);
                this.character.setLocked(false);
                for (var i = 0; i < this.bricksLevel2V.length; i++) {
                    let b = this.bricksLevel2V[i];
                    b.setLocked(false);
                }
                for (var i = 0; i < this.bricksLevel2H.length; i++) {
                    let b = this.bricksLevel2H[i];
                    b.setLocked(false);
                }
                break;

            case 5:
                this.intentos++;
                this.actividad.addState("intentos", this.intentos++);
                this.character.setLocked(false);
                for (var i = 0; i < this.bricksLevel3V.length; i++) {
                    let b = this.bricksLevel3V[i];
                    b.setLocked(false);
                }
                for (var i = 0; i < this.bricksLevel3H.length; i++) {
                    let b = this.bricksLevel3H[i];
                    b.setLocked(false);
                }
                break;
        }
    }

}

export default Main;