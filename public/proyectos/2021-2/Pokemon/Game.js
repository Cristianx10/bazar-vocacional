var app = this;

class Game {
    constructor() {

        this.mainScreen = null;

        this.r = 0;
        this.arrayLevel1 = null;
        this.arrayLevel2 = null;
        this.tiempoLevel1 = null;
        this.tiempoLevel2 = null;
        this.lifeLevel1 = null;
        this.lifeLevel2 = null;

        this.message = "";
        this.winLose = 0;

        this.resultado = null;
        this.resultado1 = 80;
        this.resultado2 = 120;

        this.tiempoTotal = null;
        this.vidasUsadas = null;
        this.bloquesTotales = null;

        this.tutorial1 = null;
        this.tutorial2 = null;
        this.tutorial3 = null;
        this.tutorial4 = null;
        this.tutorial5 = null;
        this.tutorial6 = null;
        this.perdiste = null;
        this.ganaste = null;
        this.intro1 = null;
        this.intro2 = null;
        this.resultadoScreen = null;
        this.level2 = null;

        this.valid = false;

        this.capture = true;
        this.liberado = true;

        this.playerX = 80;
        this.playerY = 146;
        this.side = 1;

        this.screen = null;
        this.level1 = null;

        this.screen = 0;
        this.levelActivated = null;
        this.arrayBloques = [];
        this.allowTimer = false;
        this.s = 0;
        this.m = 0;
        this.t = 0;
        this.tiempoFinal1 = 0;
        this.tiempoFinal2 = 0;

        this.block1 = null;
        this.block2 = null;
        this.block3 = null;
        this.block4 = null;
        this.block5 = null;
        this.block6 = null;
        this.block7 = null;
        this.block8 = null;
        this.block9 = null;
        this.block10 = null;
        this.block11 = null;
        this.block12 = null;
    }

    setup() {
        this.title = "Pokemón";
        app.createCanvas(1280, 720);
        app.background(0);

        this.font = app.loadFont("./img/pixelmix.ttf");
        app.textFont(this.font, 128);
        app.textSize(20);

        this.mainScreen = app.loadImage("./img/mainScreen.png");
        this.tutorial1 = app.loadImage("./img/tutorial1.png");
        this.tutorial2 = app.loadImage("./img/tutorial2.png");
        this.tutorial3 = app.loadImage("./img/tutorial3.png");
        this.tutorial4 = app.loadImage("./img/tutorial4.png");
        this.tutorial5 = app.loadImage("./img/tutorial5.png");
        this.tutorial6 = app.loadImage("./img/tutorial6.png");
        this.intro1 = app.loadImage("./img/intro1.png");
        this.intro2 = app.loadImage("./img/intro2.png")
        this.perdiste = app.loadImage("./img/perdiste.png");
        this.ganaste = app.loadImage("./img/ganaste1.png");
        this.ganaste2 = app.loadImage("./img/ganaste2.png");
        this.level1 = app.loadImage("./img/level1.png");
        this.level2 = app.loadImage("./img/level2.png")
        this.resultadoScreen = app.loadImage("./img/resultados.png");


        this.playerF = app.loadImage("./img/characterfoward.png");
        this.playerR = app.loadImage("./img/characterright.png");
        this.playerL = app.loadImage("./img/characterleft.png");
        this.playerB = app.loadImage("./img/characterback.png");

        this.pikachu = app.loadImage("./img/pikachu.png");
        this.charmander = app.loadImage("./img/charizard.png");
        this.bulbasaur = app.loadImage("./img/bulbasaur.png");
        this.squirtle = app.loadImage("./img/squirtle.png");

        this.life3 = app.loadImage("./img/3hearts.png");
        this.life2 = app.loadImage("./img/2hearts.png");
        this.life1 = app.loadImage("./img/1heart.png");

        this.life = 3;

        this.levelActivated = false;

        this.capturado = false;

        this.block1 = app.loadImage("./img/derecha.png");
        this.block2 = app.loadImage("./img/izquierda.png");
        this.block3 = app.loadImage("./img/arriba.png");
        this.block4 = app.loadImage("./img/abajo.png");
        this.block5 = app.loadImage("./img/1vez.png");
        this.block6 = app.loadImage("./img/2veces.png");
        this.block7 = app.loadImage("./img/3veces.png");
        this.block8 = app.loadImage("./img/4veces.png");
        this.block9 = app.loadImage("./img/5veces.png");
        this.block10 = app.loadImage("./img/6veces.png");
        this.block11 = app.loadImage("./img/capturar.png");
        this.block12 = app.loadImage("./img/liberar.png");
    }

    draw() {
        this.drawScreen(app);
    }

    mousePressed() {
        switch (this.screen) {
            case 0:
                if (
                    app.mouseX > 521 &&
                    app.mouseX < 768 &&
                    app.mouseY > 421 &&
                    app.mouseY < 501
                ) {
                    this.screen = 1;
                }
                break;
            case 1:
                if (
                    app.mouseX > 988 &&
                    app.mouseX < 1236 &&
                    app.mouseY > 601 &&
                    app.mouseY < 680
                ) {
                    this.screen = 2;
                }
                break;
            case 2:
                if (
                    app.mouseX > 988 &&
                    app.mouseX < 1236 &&
                    app.mouseY > 601 &&
                    app.mouseY < 680
                ) {
                    this.screen = 3;
                }
                break;
            case 3:
                if (
                    app.mouseX > 988 &&
                    app.mouseX < 1236 &&
                    app.mouseY > 601 &&
                    app.mouseY < 680
                ) {
                    this.screen = 4;
                }
                break;
            case 4:
                if (
                    app.mouseX > 988 &&
                    app.mouseX < 1236 &&
                    app.mouseY > 601 &&
                    app.mouseY < 680
                ) {
                    this.screen = 5;
                }
                break;
            case 5:
                if (
                    app.mouseX > 988 &&
                    app.mouseX < 1236 &&
                    app.mouseY > 601 &&
                    app.mouseY < 680
                ) {
                    this.screen = 6;
                }
                break;
            case 6:
                if (
                    app.mouseX > 988 &&
                    app.mouseX < 1236 &&
                    app.mouseY > 601 &&
                    app.mouseY < 680
                ) {
                    this.screen = 7;
                }
                break;
            case 7:
                if (
                    app.mouseX > 988 &&
                    app.mouseX < 1236 &&
                    app.mouseY > 601 &&
                    app.mouseY < 680
                ) {
                    this.screen = 8;
                }

            case 8:
                if (this.winLose == 1) {
                    if (
                        app.mouseX > 563 &&
                        app.mouseX < 716 &&
                        app.mouseY > 467 &&
                        app.mouseY < 516
                    ) {
                        this.levelActivated = false;
                        this.allowTimer = false;
                        this.screen = 9;

                    }
                } else if (this.winLose == 2) {
                    if (
                        app.mouseX > 543 &&
                        app.mouseX < 756 &&
                        app.mouseY > 463 &&
                        app.mouseY < 513
                    ) {
                        this.levelActivated = false;
                        this.allowTimer = false;
                        this.screen = 11;
                    }
                }
                this.levelActivated = true;
                this.allowTimer = true;
                this.blocks(app);
                break;

            case 9:
                if (
                    app.mouseX > 988 &&
                    app.mouseX < 1236 &&
                    app.mouseY > 601 &&
                    app.mouseY < 680
                ) {
                    this.life = 3;
                    this.r = 0;
                    this.m = 0;
                    this.s = 0;
                    this.reset();
                    this.winLose = 0;
                    this.arrayBloques = [];
                    this.screen = 10;
                }
                break;

            case 10:
                if (this.winLose == 1) {
                    if (
                        app.mouseX > 563 &&
                        app.mouseX < 716 &&
                        app.mouseY > 467 &&
                        app.mouseY < 516
                    ) {
                        this.levelActivated = false;
                        this.allowTimer = false;
                        this.screen = 11;
                    }
                } else if (this.winLose == 2) {
                    if (
                        app.mouseX > 543 &&
                        app.mouseX < 756 &&
                        app.mouseY > 463 &&
                        app.mouseY < 513
                    ) {
                        this.levelActivated = false;
                        this.allowTimer = false;
                        this.screen = 11;
                    }
                }
                this.levelActivated = true;
                this.allowTimer = true;
                this.blocks(app);
                break;
            case 11:
                if (
                    app.mouseX > 988 &&
                    app.mouseX < 1236 &&
                    app.mouseY > 601 &&
                    app.mouseY < 680
                ) {
                    oActivity.addResult([{ id: CARRERAS.DISENO_INTERACTIVO, value: this.resultado }]);
                    oActivity.addState("Tiempo de juego", this.tiempoTotal);
                    oActivity.addState("Bloques usados del juego", this.bloquesTotales);
                    oActivity.addState("vidas usadas", this.vidasUsadas);
                    oActivity.finish();
                }
                break;
        }
    }

    drawScreen(app) {
        switch (this.screen) {
            case 0:
                app.image(this.mainScreen, 0, 0);
                break;
            case 1:
                app.image(this.tutorial1, 0, 0);
                break;
            case 2:
                app.image(this.tutorial2, 0, 0);
                break;
            case 3:
                app.image(this.tutorial3, 0, 0);
                break;
            case 4:
                app.image(this.tutorial4, 0, 0);
                break;
            case 5:
                app.image(this.tutorial5, 0, 0);
                break;
            case 6:
                app.image(this.tutorial6, 0, 0);
                break;
            case 7:
                app.image(this.intro1, 0, 0);
                break;

            case 8:
                app.image(this.level1, 0, 0);
                if (this.life == 3) {
                    app.image(this.life3, 1080, 56);
                } else if (this.life == 2) {
                    app.image(this.life2, 1080, 56);
                } else if (this.life == 1) {
                    app.image(this.life1, 1080, 56);
                } else {
                    this.winLose = 2;
                    this.allowTimer = false;
                    this.levelActivated = false;
                }

                if (!this.capturado) {
                    app.image(this.pikachu, 530, 152);
                } else {
                    app.image(this.pikachu, -500, 152);
                }
                app.image(this.charmander, 620, 250);
                app.image(this.squirtle, 80, 260);
                app.image(this.bulbasaur, 530, 432);

                this.timer(app);

                switch (this.side) {
                    case 1:
                        app.image(this.playerF, this.playerX, this.playerY);
                        break;
                    case 2:
                        app.image(this.playerL, this.playerX, this.playerY);
                        break;
                    case 3:
                        app.image(this.playerR, this.playerX, this.playerY);
                        break;
                    case 4:
                        app.image(this.playerB, this.playerX, this.playerY);
                        break;
                }

                switch (this.winLose) {
                    case 0:
                        break;
                    case 1:
                        console.log("r= " + this.r);
                        app.image(this.ganaste, 0, 0);
                        if (this.r == 0) {
                            this.restaResultado();
                            this.r = this.reset + 1;
                        }
                        break;
                    case 2:
                        app.image(this.perdiste, 0, 0);
                        if (this.r == 0) {
                            this.restaResultado();
                            this.r = this.reset + 1;
                        }
                        break;
                }
                app.text(this.message, 50, 650);
                this.drawBlocks(10, app);
                break;
            case 9:
                app.image(this.intro2, 0, 0);
                break;
            case 10:
                app.image(this.level2, 0, 0);
                if (this.life == 3) {
                    app.image(this.life3, 1080, 56);
                } else if (this.life == 2) {
                    app.image(this.life2, 1080, 56);
                } else if (this.life == 1) {
                    app.image(this.life1, 1080, 56);
                } else {
                    this.winLose = 2;
                    this.allowTimer = false;
                    this.levelActivated = false;
                }
                if (!this.capturado) {
                    app.image(this.charmander, 620, 250);
                } else {
                    app.image(this.charmander, -500, 152);
                }

                app.image(this.pikachu, 430, 152);
                app.image(this.squirtle, 160, 345);
                app.image(this.bulbasaur, 435, 432);

                this.timer(app);
                switch (this.side) {
                    case 1:
                        app.image(this.playerF, this.playerX, this.playerY);
                        break;
                    case 2:
                        app.image(this.playerL, this.playerX, this.playerY);
                        break;
                    case 3:
                        app.image(this.playerR, this.playerX, this.playerY);
                        break;
                    case 4:
                        app.image(this.playerB, this.playerX, this.playerY);
                        break;
                }
                switch (this.winLose) {
                    case 0:
                        break;
                    case 1:

                        app.image(this.ganaste2, 0, 0);
                        if (this.r == 0) {
                            this.restaResultado();
                            this.r = this.reset + 1;
                        }
                        break;
                    case 2:
                        app.image(this.perdiste, 0, 0);
                        if (this.r == 0) {
                            this.restaResultado();
                            this.r = this.reset + 1;
                        }
                        break;
                }
                app.text(this.message, 50, 650);
                this.drawBlocks(10, app);
                break;
            case 11:
                app.image(this.resultadoScreen, 0, 0);
                app.text(this.bloquesTotales, 737, 301);
                app.text(this.tiempoTotal + "Sg", 737, 352);
                app.text(this.vidasUsadas + "/6", 737, 402);
                app.text(this.resultado, 737, 452);
                break;
        }

    }

    reset() {
        this.playerX = 80;
        this.playerY = 146;
        this.capturado = false;
    }

    validation(app) {
        this.val(0, app);
    }

    val(i, app) {
        if (this.arrayBloques[i] == 1) {
            this.side = 3;
            switch (this.arrayBloques[i + 1]) {
                case 5:
                    this.playerX = this.playerX + 90;
                    break;
                case 6:
                    this.playerX = this.playerX + 90 * 2;
                    break;
                case 7:
                    this.playerX = this.playerX + 90 * 3;
                    break;
                case 8:
                    this.playerX = this.playerX + 90 * 4;
                    break;
                case 9:
                    this.playerX = this.playerX + 90 * 5;
                    break;
                case 10:
                    this.playerX = this.playerX + 90 * 6;
                    break;
            }

        }
        if (this.arrayBloques[i] == 2) {
            this.side = 2;
            if (this.arrayBloques[i + 1] < 5 || this.arrayBloques[i + 1] > 10) {

                console.log("recuerda indicar la cantidad de veces");
            } else {
                switch (this.arrayBloques[i + 1]) {
                    case 5:
                        this.playerX = this.playerX - 90;
                        break;
                    case 6:
                        this.playerX = this.playerX - 90 * 2;
                        break;
                    case 7:
                        this.playerX = this.playerX - 90 * 3;
                        break;
                    case 8:
                        this.playerX = this.playerX - 90 * 4;
                        break;
                    case 9:
                        this.playerX = this.playerX - 90 * 5;
                        break;
                    case 10:
                        this.playerX = this.playerX - 90 * 6;
                        break;
                }
            }
        }
        if (this.arrayBloques[i] == 3) {
            this.side = 4;

            if (this.arrayBloques[i + 1] < 5 || this.arrayBloques[i + 1] > 10) {

                console.log("recuerda indicar la cantidad de veces");
            } else {
                switch (this.arrayBloques[i + 1]) {
                    case 5:
                        this.playerY = this.playerY - 90;
                        break;
                    case 6:
                        this.playerY = this.playerY - 90 * 2;
                        break;
                    case 7:
                        this.playerY = this.playerY - 90 * 3;
                        break;
                    case 8:
                        this.playerY = this.playerY - 90 * 4;
                        break;
                    case 9:
                        this.playerY = this.playerY - 90 * 5;
                        break;
                    case 10:
                        this.playerY = this.playerY - 90 * 6;
                        break;
                }
            }
        }
        if (this.arrayBloques[i] == 4) {
            this.side = 1;
            if (this.arrayBloques[i + 1] < 5 || this.arrayBloques[i + 1] > 10) {

                console.log("recuerda indicar la cantidad de veces");
            } else {
                switch (this.arrayBloques[i + 1]) {
                    case 5:
                        this.playerY = this.playerY + 90;
                        break;
                    case 6:
                        this.playerY = this.playerY + 90 * 2;
                        break;
                    case 7:
                        this.playerY = this.playerY + 90 * 3;
                        break;
                    case 8:
                        this.playerY = this.playerY + 90 * 4;
                        break;
                    case 9:
                        this.playerY = this.playerY + 90 * 5;
                        break;
                    case 10:
                        this.playerY = this.playerY + 90 * 6;
                        break;
                }
            }
        }
        if (this.screen == 8) {
            if (this.arrayBloques[i] == 11) {
                if (app.dist(this.playerX, this.playerY, 530, 152) < 20) {
                    console.log("capturado Pikachu");
                    this.capturado = true;
                    this.capture = true;
                } else {
                    this.capturado = false;
                    this.message = "No capturaste al pokemon correcto";
                    this.capture = false;
                }
            }
            if (this.arrayBloques[i] == 12) {
                if (this.capturado) {
                    if (app.dist(this.playerX, this.playerY, 700.87, 417) < 20) {
                        console.log("Pikachu Liberado");
                        this.capturado = false;
                        this.liberado = true;
                    } else {
                        this.message = "No liberaste al pokemon en el lugar correcto";
                        this.liberado = false;
                    }
                }
            }
        } else {
            if (this.arrayBloques[i] == 11) {
                if (app.dist(this.playerX, this.playerY, 620, 250) < 20) {
                    console.log("capturado Pikachu");
                    this.capturado = true;
                    this.capture = true;
                } else {
                    this.capturado = false;
                    this.message = "No capturaste al pokemon correcto";
                    this.capture = false;
                }
            }
            if (this.arrayBloques[i] == 12) {
                if (this.capturado) {
                    if (app.dist(this.playerX, this.playerY, 156, 248) < 20) {
                        console.log("Pikachu Liberado");
                        this.capturado = false;
                        this.liberado = true;
                    } else {
                        this.message = "No liberaste al pokemon en el lugar correcto";
                        this.liberado = false;
                    }
                }
            }
        }
        i++;
        if (i < this.arrayBloques.length) {
            setTimeout(() => { this.val(i, app) }, 500);
        } else {


            if (this.screen == 10) {
                if (
                    app.dist(this.playerX, this.playerY, 519.42, 153.23) < 20 || app.dist(this.playerX, this.playerY, 247, 243) < 20 ||
                    app.dist(this.playerX, this.playerY, 254, 428) < 20 || app.dist(this.playerX, this.playerY, 516, 428) < 20
                ) {
                    this.message = "Chocaste con un arbol";
                    this.life = this.life - 1;
                    return;
                }
            }

            if (
                this.playerX < 52 ||
                this.playerX > 785 ||
                this.playerY < 138 ||
                this.playerY > 420
            ) {
                this.message = "Te saliste del tablero";
                this.life = this.life - 1;
                return;
            } else if (this.arrayBloques.includes(11) == false) {
                this.message = "No capturaste a un pokemon";
                this.life = this.life - 1;
                return;
            } else if (this.arrayBloques.includes(11)) {
                if (!this.capture) {
                    this.message = "Capturaste al pokemon incorrecto o no capturaste un pokemon";
                    this.life = this.life - 1;
                    return;
                } else if (this.arrayBloques.includes(12) == false) {
                    this.message = "No liberaste al pokemon";
                    this.life = this.life - 1;
                    return;
                } else if (this.arrayBloques.includes(12)) {
                    if (!this.liberado) {
                        this.message = "Liberaste al pokemon en el lugar incorrecto";
                        this.life = this.life - 1;
                        return;
                    } else {
                        this.winLose = 1;
                        this.allowTimer = false;
                        this.levelActivated = false;
                        this.tiempoFinal1 = this.m * 60 + this.s;
                        console.log("Tiempo Final= " + this.tiempoFinal1);
                    }
                }

            }
        }

    }


    blocks(app) {
        if (this.levelActivated) {
            if (
                app.mouseX > 859 &&
                app.mouseX < 961 &&
                app.mouseY > 305 &&
                app.mouseY < 339
            ) {
                console.log("IZQUIERDA");
                let codeLeft = 1;
                this.arrayBloques.push(codeLeft);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 859 && app.mouseX < 961 && app.mouseY > 353 && app.mouseY < 387) {
                console.log("DERECHA");
                let codeRight = 2;
                this.arrayBloques.push(codeRight);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 859 && app.mouseX < 961 && app.mouseY > 401 && app.mouseY < 435) {
                console.log("ARRIBA");
                let codeUp = 3;
                this.arrayBloques.push(codeUp);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 859 && app.mouseX < 961 && app.mouseY > 449 && app.mouseY < 483) {
                console.log("ABAJO");
                let codeDown = 4;
                this.arrayBloques.push(codeDown);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 969 && app.mouseX < 1071 && app.mouseY > 305 && app.mouseY < 339) {
                console.log("UNA VEZ")

                let codeOne = 5;
                this.arrayBloques.push(codeOne);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 969 && app.mouseX < 1071 && app.mouseY > 353 && app.mouseY < 387) {
                console.log("DOS VECES");

                let codeTwo = 6;
                this.arrayBloques.push(codeTwo);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 969 && app.mouseX < 1071 && app.mouseY > 401 && app.mouseY < 435) {
                console.log("TRES VECES");

                let codeThree = 7;
                this.arrayBloques.push(codeThree);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 969 && app.mouseX < 1071 && app.mouseY > 449 && app.mouseY < 483) {
                console.log("CUATRO VECES");

                let codeFour = 8;
                this.arrayBloques.push(codeFour);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 1079 && app.mouseX < 1181 && app.mouseY > 305 && app.mouseY < 339) {
                console.log("CINCO VECES");

                let codeFive = 9;
                this.arrayBloques.push(codeFive);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 1079 && app.mouseX < 1181 && app.mouseY > 353 && app.mouseY < 387) {
                console.log("SEIS VECES")

                let codeSix = 10;
                this.arrayBloques.push(codeSix);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 1079 && app.mouseX < 1181 && app.mouseY > 401 && app.mouseY < 435) {
                console.log("CAPTURAR");

                let codeCapture = 11;
                this.arrayBloques.push(codeCapture);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (app.mouseX > 1079 && app.mouseX < 1181 && app.mouseY > 449 && app.mouseY < 483) {
                console.log("LIBERAR");

                let codeFree = 12;
                this.arrayBloques.push(codeFree);
                console.log("arrayBloques= " + this.arrayBloques);
            }

            if (
                app.mouseX > 898 &&
                app.mouseX < 1052 &&
                app.mouseY > 655 &&
                app.mouseY < 704
            ) {
                console.log("LIMPIAR");
                this.arrayBloques = [];
                console.log("arrayBloques= " + this.arrayBloques);
                this.reset();
            }

            if (
                app.mouseX > 730 &&
                app.mouseX < 884 &&
                app.mouseY > 655 &&
                app.mouseY < 704
            ) {
                console.log("DESHACER");
                this.arrayBloques.pop();
                console.log("arrayBloques= " + this.arrayBloques);
                this.reset();
            }
            if (
                app.mouseX > 1069 &&
                app.mouseX < 1223 &&
                app.mouseY > 655 &&
                app.mouseY < 704
            ) {

                if (this.playerX != 80 || this.playerY != 146) {
                    this.reset();
                    console.log("reset");
                }

                this.validation(app);

            }
        }
    }

    drawBlocks(posx, app) {
        if (this.levelActivated) {
            for (let index = 0; index < this.arrayBloques.length; index++) {
                if (this.arrayBloques[index] == 1) {
                    app.image(this.block1, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 2) {
                    app.image(this.block2, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 3) {
                    app.image(this.block3, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 4) {
                    app.image(this.block4, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 5) {
                    app.image(this.block5, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 6) {
                    app.image(this.block6, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 7) {
                    app.image(this.block7, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 8) {
                    app.image(this.block8, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 9) {
                    app.image(this.block9, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 10) {
                    app.image(this.block10, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 11) {
                    app.image(this.block11, posx + (89 * index), 570);
                }

                if (this.arrayBloques[index] == 12) {
                    app.image(this.block12, posx + (89 * index), 570);
                }
            }
        }
    }

    restaResultado() {
        let lose = false;

        if (this.screen == 8) {
            if (this.life == 3) {
                this.resultado1 = this.resultado1;
            } else if (this.life == 2) {
                this.resultado1 = this.resultado1 - (this.resultado1 * 0.2);
            } else if (this.life == 1) {
                this.resultado1 = this.resultado1 - (this.resultado1 * 0.3);
            } else if (this.life == 0) {
                this.resultado1 = this.resultado1 - (this.resultado1 * 0.6);
                lose = true;
            }
            if (lose) {
                if (this.arrayBloques.length > 8) {
                    this.resultado1 = this.resultado1 - (this.resultado1 * 0.1);
                } else if (this.arrayBloques.length <= 8 || this.arrayBloques.length >= 7) {
                    this.resultado1 = this.resultado1;
                } else if (this.arrayBloques.length < 7) {
                    this.resultado1 = this.resultado1 - (this.resultado1 * 0.2);
                }

                if (this.tiempoFinal1 <= 15) {
                    this.resultado1 = this.resultado1 - this.resultado1 * 0.4;
                } else if (this.tiempoFinal1 > 15 || this.tiempoFinal1 <= 60) {
                    this.resultado1 = this.resultado1 - (this.resultado1 * 0.2);
                } else if (this.tiempoFinal1 > 60 || this.tiempoFinal1 <= 150) {
                    this.resultado1 = this.resultado1 - (this.resultado1 * 0.1);
                }
            } else {
                if (this.arrayBloques.length > 8) {
                    this.resultado1 = this.resultado1 - (this.resultado1 * 0.3);
                } else if (this.arrayBloques.length <= 8 || this.arrayBloques.length >= 7) {
                    this.resultado1 = this.resultado1 - (this.resultado1 * 0.1);
                } else if (this.arrayBloques.length < 7) {
                    this.resultado1 = this.resultado1;
                }

                if (this.tiempoFinal1 <= 15) {
                    this.resultado1 = this.resultado1 - this.resultado1 * 0.1;
                } else if (this.tiempoFinal1 > 15 || this.tiempoFinal1 <= 60) {
                    this.resultado1 = this.resultado1 - (this.resultado1 * 0.2);
                } else if (this.tiempoFinal1 > 60 || this.tiempoFinal1 <= 150) {
                    this.resultado1 = this.resultado1 - (this.resultado1 * 0.3);
                }
            }
            this.resultado = this.resultado1;
            this.bloquesTotales = this.arrayBloques.length;
            this.tiempoTotal = this.tiempoFinal1;
            this.vidasUsadas = this.life;
        }

        if (this.screen == 10) {
            if (this.life == 3) {
                this.resultado2 = this.resultado2;
            } else if (this.life == 2) {
                this.resultado2 = this.resultado2 - (this.resultado2 * 0.2);
            } else if (this.life == 1) {
                this.resultado2 = this.resultado2 - (this.resultado2 * 0.3);
            } else if (this.life == 0) {
                this.resultado2 = this.resultado2 - (this.resultado2 * 0.6);
                lose = true;
            }
            if (lose) {
                if (this.arrayBloques.length > 8) {
                    this.resultado2 = this.resultado2 - (this.resultado2 * 0.1);
                } else if (this.arrayBloques.length <= 8 || this.arrayBloques.length >= 7) {
                    this.resultado2 = this.resultado2;
                } else if (this.arrayBloques.length < 7) {
                    this.resultado2 = this.resultado2 - (this.resultado2 * 0.2);
                }

                if (this.arrayBloques.length > 12) {
                    this.resultado2 = this.resultado2 - (this.resultado2 * 0.3);
                } else if (this.arrayBloques.length <= 12) {
                    this.resultado2 = this.resultado2;
                }
            } else {
                if (this.arrayBloques.length > 12) {
                    this.resultado2 = this.resultado2 - (this.resultado2 * 0.2);
                } else if (this.arrayBloques.length <= 12) {
                    this.resultado2 = this.resultado2;
                }

                if (this.tiempoFinal1 <= 15) {
                    this.resultado2 = this.resultado2 - this.resultado2 * 0.1;
                } else if (this.tiempoFinal1 > 15 || this.tiempoFinal1 <= 60) {
                    this.resultado2 = this.resultado2 - (this.resultado2 * 0.2);
                } else if (this.tiempoFinal1 > 60 || this.tiempoFinal1 <= 150) {
                    this.resultado2 = this.resultado2 - (this.resultado2 * 0.3);
                }
            }
            this.resultado = this.resultado + this.resultado2;
            this.bloquesTotales = this.bloquesTotales + this.arrayBloques.length;
            this.tiempoTotal = this.tiempoTotal + this.tiempoFinal1;
            this.vidasUsadas = this.vidasUsadas + this.life;
        }
    }

    timer(app) {


        if (this.allowTimer) {

            if (this.m < 5) {
                if (app.frameCount % 60 == 0) {
                    this.s += 1;
                }
                if (this.s == 60) {
                    this.s = 0;
                    this.m += 1;
                }

                this.t = app.nf(this.m, 2) + ":" + app.nf(this.s, 2);

                app.text(this.t, 900, 81);
            } else {
                this.t = app.nf(this.m, 2) + ":" + app.nf(this.s, 2);
                app.text(this.t, 900, 81);
            }

        } else {
            this.t = app.nf(this.m, 2) + ":" + app.nf(this.s, 2);
            app.text(this.t, 900, 81);
        }
    }
    sleep(milliseconds) {

        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
}


var pokemon = new Game();

function setup() {
    pokemon.setup()
}


function draw() {
    pokemon.draw()
}

function mousePressed() {
    pokemon.mousePressed()
}

function setPage(value) {
    pokemon.screen = value;
}