import p5 from "p5";


import Tile from "./tile"

import CARRERAS from "../../../../constants/observer";
import Navegador from "../../../../componentsTS/Navegacion/config";
import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';

const URL_PATH = "/img/2021-1/3DMatching"

class Logica {

    //Estas son las variables que uso en el programa
    tilesN1: Tile[] = [];
    tilesN2: Tile[] = [];
    tilesN3: Tile[] = []

    filasN1 = 2
    columnasN1 = 3

    selectedimg: p5.Image;
    matchedimg: p5.Image;
    //arreglos de cartas
    cartasN1: p5.Image[] = [];
    cartasN2: p5.Image[] = [];
    cartasN3: p5.Image[] = [];

    //let imagesDeck = []
    cartasSeleccionadas: Tile[] = []
    //let delayStartFC = null

    //numero de errores que hago
    numeroErrores = 0
    //fondos
    nivelesbg: p5.Image[] = []
    iniciobg: p5.Image;
    inst1: p5.Image;
    inst2: p5.Image;
    inst3: p5.Image;
    nivel1bg: p5.Image;
    nivel2bg: p5.Image;
    nivel3bg: p5.Image;

    //feedback match
    correcto: p5.Image;
    incorrecto: p5.Image;

    isCorrecto = false;
    isIncorrecto = false;
    //botones
    jugarOff: p5.Image;
    jugarOn: p5.Image;
    iniciarOff: p5.Image;
    iniciarOn: p5.Image;
    siguienteOff: p5.Image;
    siguienteOn: p5.Image;
    finalizarOff: p5.Image;
    finalizarOn: p5.Image;

    //gif
    instGif: p5.Image;

    //cartas variables
    carta1N1?: Tile;
    carta2N1?: Tile;
    carta3N1?: Tile;
    carta4N1?: Tile;
    carta5N1?: Tile;
    carta6N1?: Tile;
    carta1N2?: Tile;
    carta2N2?: Tile;
    carta3N2?: Tile;
    carta4N2?: Tile;
    carta5N2?: Tile;
    carta6N2?: Tile;
    carta1N3?: Tile;
    carta2N3?: Tile;
    carta3N3?: Tile;
    carta4N3?: Tile;
    carta5N3?: Tile;
    carta6N3?: Tile;
    carta7N3?: Tile;
    carta8N3?: Tile;
    carta9N3?: Tile;
    carta10N3?: Tile;
    carta11N3?: Tile;
    carta12N3?: Tile;
    carta13N3?: Tile;
    carta14N3?: Tile;
    carta15N3?: Tile;


    //cartas imagenes
    carta1N1img: p5.Image;
    carta2N1img: p5.Image;
    carta3N1img: p5.Image;
    carta4N1img: p5.Image;
    carta5N1img: p5.Image;
    carta6N1img: p5.Image;
    carta1N2img: p5.Image;
    carta2N2img: p5.Image;
    carta3N2img: p5.Image;
    carta4N2img: p5.Image;
    carta5N2img: p5.Image;
    carta6N2img: p5.Image;
    carta1N3img: p5.Image;
    carta2N3img: p5.Image;
    carta3N3img: p5.Image;
    carta4N3img: p5.Image;
    carta5N3img: p5.Image;
    carta6N3img: p5.Image;
    carta7N3img: p5.Image;
    carta8N3img: p5.Image;
    carta9N3img: p5.Image;
    carta10N3img: p5.Image;
    carta11N3img: p5.Image;
    carta12N3img: p5.Image;
    carta13N3img: p5.Image;
    carta14N3img: p5.Image;
    carta15N3img: p5.Image;


    //modal
    modal: p5.Image;

    showFeedback = false;
    pantalla = 0;
    pairsMatched = 0;

    //contador
    contadorOn = false;
    showContador = false;
    segundos = 59;
    minutos = 4;

    //fuentes
    regularfont: p5.Font;
    boldfont: p5.Font;


    app: p5;
    actividad: ActividadTSLite;
    navegador: Navegador
    
    constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {
        this.app = app;
        this.actividad = actividad;
        this.navegador = navegador;

        this.selectedimg = this.app.loadImage(URL_PATH + "/assets/selected.png")
        this.matchedimg = this.app.loadImage(URL_PATH + "/assets/matched.png")

        //fondos
        this.iniciobg = this.app.loadImage(URL_PATH + "/assets/inicioBg.jpg")
        this.inst1 = this.app.loadImage(URL_PATH + "/assets/inst1.jpg")
        this.inst2 = this.app.loadImage(URL_PATH + "/assets/inst2.jpg")
        this.inst3 = this.app.loadImage(URL_PATH + "/assets/inst3.jpg")

        //botones
        this.iniciarOff = this.app.loadImage(URL_PATH + "/assets/iniciarOff.png")
        this.iniciarOn = this.app.loadImage(URL_PATH + "/assets/iniciarOn.png")
        this.jugarOff = this.app.loadImage(URL_PATH + "/assets/jugarOff.png")
        this.jugarOn = this.app.loadImage(URL_PATH + "/assets/jugarOn.png")
        this.siguienteOff = this.app.loadImage(URL_PATH + "/assets/siguienteOff.png")
        this.siguienteOn = this.app.loadImage(URL_PATH + "/assets/siguienteOn.png")
        this.finalizarOff = this.app.loadImage(URL_PATH + "/assets/finalizarOff.png")
        this.finalizarOn = this.app.loadImage(URL_PATH + "/assets/finalizarOn.png")

        //niveles
        this.nivelesbg = [
            this.nivel1bg = this.app.loadImage(URL_PATH + "/assets/nivel1.jpg"),
            this.nivel2bg = this.app.loadImage(URL_PATH + "/assets/nivel2.jpg"),
            this.nivel3bg = this.app.loadImage(URL_PATH + "/assets/nivel3.jpg")
        ]

        //feedback match
        this.incorrecto = this.app.loadImage(URL_PATH + "/assets/incorrecto.png")
        this.correcto = this.app.loadImage(URL_PATH + "/assets/correcto.png")

        //modal
        this.modal = this.app.loadImage(URL_PATH + "/assets/modal.png")

        // gif

        this.instGif = this.app.loadImage(URL_PATH + "/assets/3D-Match.gif")

        this.regularfont = this.app.loadFont(URL_PATH + 'assets/fonts/NeueMachina-Regular.otf')
        this.boldfont = this.app.loadFont(URL_PATH + 'assets/fonts/NeueMachina-Ultrabold.otf')



        //Nivel 1
        this.cartasN1 = [
            this.carta1N1img = this.app.loadImage(URL_PATH + "/assets/Nivel1/1-1.png"),
            this.carta2N1img = this.app.loadImage(URL_PATH + "/assets/Nivel1/2-1.png"),
            this.carta3N1img = this.app.loadImage(URL_PATH + "/assets/Nivel1/3-2.png"),
            this.carta4N1img = this.app.loadImage(URL_PATH + "/assets/Nivel1/4-2.png"),
            this.carta5N1img = this.app.loadImage(URL_PATH + "/assets/Nivel1/5.png"),
            this.carta6N1img = this.app.loadImage(URL_PATH + "/assets/Nivel1/6.png")
        ]

        //Nivel 2
        this.cartasN2 = [
            this.carta1N2img = this.app.loadImage(URL_PATH + "/assets/Nivel2/1.png"),
            this.carta2N2img = this.app.loadImage(URL_PATH + "/assets/Nivel2/2.png"),
            this.carta3N2img = this.app.loadImage(URL_PATH + "/assets/Nivel2/3.png"),
            this.carta4N2img = this.app.loadImage(URL_PATH + "/assets/Nivel2/4.png"),
            this.carta5N2img = this.app.loadImage(URL_PATH + "/assets/Nivel2/5.png"),
            this.carta6N2img = this.app.loadImage(URL_PATH + "/assets/Nivel2/6.png")
        ]

        //Nivel 3
        this.cartasN3 = [
            this.carta1N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/1.png"),
            this.carta2N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/2.png"),
            this.carta3N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/3.png"),
            this.carta4N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/4.png"),
            this.carta5N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/5.png"),
            this.carta6N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/6.png"),
            this.carta7N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/7.png"),
            this.carta8N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/8.png"),
            this.carta9N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/9.png"),
            this.carta10N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/10.png"),
            this.carta11N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/11.png"),
            this.carta12N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/12.png"),
            this.carta13N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/13.png"),
            this.carta14N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/14.png"),
            this.carta15N3img = this.app.loadImage(URL_PATH + "/assets/Nivel3/15.png")
        ]


        this.createTilesN1()
        this.createTilesN2()
        this.createTilesN3()


    }


    setup() {
        //   createCanvas(1080, 720)


    }

    preload() {


    }

    resizeCards(cardDeck: p5.Image[], newWidth: number) {
        for (let i = 0; i < cardDeck.length; i++) {
            cardDeck[i].resize(newWidth, 0)
        }
    }

    //en el draw siempre estamos actualizando la logica del juego por si alguna vez cambian las cosas
    draw() {

        this.resizeCards(this.cartasN1, 100)
        this.screenFlow()

    }
    pTem = -1;
    screenFlow() {


        if (this.pTem !== this.pantalla) {
            this.pTem = this.pantalla;
            const pantalla = this.pTem;
            this.actividad.addState("pantalla", pantalla);
        }

        switch (this.pantalla) {
            case 0:
                this.app.image(this.iniciobg, -25, 0, 1135, 720)
                this.button(540, 630, "iniciar")
                break;

            case 1:
                this.app.image(this.inst1, -25, 0, 1135, 720)
                this.button(530, 500, "siguiente")
                break;

            case 2:
                this.app.image(this.inst2, -25, 0, 1135, 720)
                this.app.imageMode(this.app.CENTER)
                this.app.image(this.instGif, 540, 400, 430 * 1.25, 232 * 1.25)
                this.app.imageMode(this.app.CORNER)
                this.button(540, 610, "siguiente")
                break;

            case 3:
                this.app.image(this.inst3, -25, 0, 1135, 720)
                this.button(840, 610, "jugar")
                break;

            case 4:
                this.app.image(this.nivel1bg, -25, 0, 1135, 720)
                this.renderTiles(this.tilesN2, 0.3, 1.02)
                this.checkLevelCompletion(2)
                this.showFeedback = true
                this.showContador = true
                this.contadorOn = true
                //@ts-ignore
                if (this.pantalla === 5) {
                    this.app.background(32, 25, 52, 140)
                    this.makeModal("small")
                    this.app.textSize(40)
                    this.app.fill(255)
                    this.app.textAlign(this.app.CENTER)
                    this.app.textFont(this.regularfont)
                    this.app.text("¡Correcto!", 540, 300)
                    this.app.textSize(20)
                    this.app.text("Pulsa siguiente para ir al próximo nivel", 540, 350)
                }
                break;

            case 5:
                this.contadorOn = false
                this.button(540, 420, "siguiente")
                break;

            case 6:
                this.contadorOn = true
                this.app.image(this.nivel2bg, -25, 0, 1135, 720)
                this.renderTiles(this.tilesN1, 0.3, 1.02)
                this.checkLevelCompletion(4)
                //@ts-ignore
                if (this.pantalla === 7) {
                    this.app.background(32, 25, 52, 140)
                    this.makeModal("small")
                    this.app.textSize(40)
                    this.app.fill(255)
                    this.app.textAlign(this.app.CENTER)
                    this.app.textFont(this.regularfont)
                    this.app.text("¡Correcto!", 540, 300)
                    this.app.textSize(20)
                    this.app.text("Pulsa siguiente para ir al próximo nivel", 540, 350)
                }
                break;

            case 7:
                this.contadorOn = false
                this.button(540, 420, "siguiente")
                break;

            case 8:
                this.contadorOn = true
                this.app.image(this.nivel3bg, -25, 0, 1135, 720)
                this.renderTiles(this.tilesN3, 0.2, 0.95)
                this.checkLevelCompletion(10)
                break;

            case 9:

                if (this.loadPuntaje === false) {
                    this.loadPuntaje = true;
                    this.actividad.addResult([
                        { id: CARRERAS.DISENO_INDUSTRIAL, value: this.puntaje() }
                    ])
                }

                this.showFeedback = false
                this.app.background(32, 25, 52)
                this.makeModal("big")
                this.showContador = false
                this.contadorOn = false
                this.app.textSize(35)
                this.app.fill(255)
                this.app.textAlign(this.app.CENTER)
                this.app.textFont(this.regularfont)
                this.app.text("Juego terminado", 540, 260)
                this.app.textSize(25)
                this.app.textFont(this.boldfont)
                this.app.text("Puntaje: " + this.puntaje() + "/ / 260", 540, 310)
                this.app.textFont(this.regularfont)
                this.app.textSize(18)
                this.app.text("Tiempo: " + this.minutos + "/:" + this.segundos, 540, 350)
                this.app.text("Cartas emparejadas: " + this.pairsMatched + "/ / 10", 540, 380)
                this.app.text("Número de errores: " + this.numeroErrores, 540, 410)
                this.button(540, 470, "finalizar")

                if (this.app.mouseIsPressed) {
                    this.actividad.finish();
                }

                break;

            case 10:

        }

        if (this.showFeedback) {
            if (this.isCorrecto) {
                this.matchFeedback(this.correcto)
            }
            if (this.isIncorrecto) {
                this.matchFeedback(this.incorrecto)
            }
        }

        this.counter()
        this.gameOver()
    }

    loadPuntaje = false;

    puntaje() {

        // el puntaje se medirá de 0-260

        var score = 0

        // a medida que aumenta el nivel, hacer las parejas dará mas puntos
        if (this.pairsMatched < 3) {
            score += this.pairsMatched * 15
        }
        if (this.pairsMatched > 2 && this.pairsMatched < 5) {
            score += 30 + ((this.pairsMatched - 2) * 25)
        }
        if (this.pairsMatched > 4 && this.pairsMatched < 11) {
            score += 80 + ((this.pairsMatched - 4) * 30)
        }

        return score -= this.numeroErrores * 15 //se le restan los errores al puntaje final
    }

    checkLevelCompletion(pairsToMatch: number) {

        if (this.pairsMatched === pairsToMatch) {
            this.isIncorrecto = false
            this.isCorrecto = false

            this.pantalla += 1
        }
    }

    gameOver() {

        if (this.minutos === 0 && this.segundos === 0) {
            this.contadorOn = false
            this.pantalla = 9
        }
    }

    makeModal(size: string) {

        this.app.imageMode(this.app.CENTER)
        if (size === "small") {
            this.app.image(this.modal, 540, 360, 1148, 318)
        }
        if (size === "big") {
            this.app.image(this.modal, 540, 360, 1148 * 1.2, 318 * 1.2)
        }
        this.app.imageMode(this.app.CORNER)
    }



    buttonSystem() {

        this.buttonClicked(540, 630, 0)
        this.buttonClicked(530, 500, 1)
        this.buttonClicked(540, 610, 2)
        this.buttonClicked(840, 610, 3)
        this.buttonClicked(540, 420, 5)
        this.buttonClicked(540, 420, 7)
        this.buttonClicked(540, 470, 9)

    }

    matchFeedback(type: p5.Image) {

        if (this.showFeedback) {
            this.app.imageMode(this.app.CENTER)
            this.app.image(type, 540, 30, 144 * 1.4, 56 * 1.4)
            this.app.imageMode(this.app.CORNER)
        }
    }

    button(x: number, y: number, type: string) {

        let btnNameOn: undefined | p5.Image = undefined;
        let btnNameOff: undefined | p5.Image = undefined;

        if (type === "iniciar") {
            btnNameOn = this.iniciarOn
            btnNameOff = this.iniciarOff
        }

        if (type === "jugar") {
            btnNameOn = this.jugarOn
            btnNameOff = this.jugarOff
        }

        if (type === "siguiente") {
            btnNameOn = this.siguienteOn
            btnNameOff = this.siguienteOff
        }

        if (type === "finalizar") {
            btnNameOn = this.finalizarOn
            btnNameOff = this.finalizarOff

        }

        this.app.imageMode(this.app.CENTER)
        if (this.app.mouseX < x + (183 / 2) && this.app.mouseX > x - (183 / 2) && this.app.mouseY < y + (60 / 2) && this.app.mouseY > y - (60 / 2)) {
            if (btnNameOn) {
                this.app.image(btnNameOn, x, y, 183, 60)
            }
        } else {
            if (btnNameOff) {
                this.app.image(btnNameOff, x, y, 183, 60)
            }
        }
        this.app.imageMode(this.app.CORNER)
    }

    buttonClicked(x: number, y: number, screen: number) {
        if (this.app.mouseX < x + (183 / 2) && this.app.mouseX > x - (183 / 2) && this.app.mouseY < y + (60 / 2) && this.app.mouseY > y - (60 / 2)) {
            if (this.pantalla === screen) {
                this.pantalla += 1
            }
        }
    }

    //Esto crea cada una de las cartas
    createTilesN1() {

        let x = 230
        let y = 260
        let paddingX = 85

        this.carta4N1 = new Tile(this, 1 * x + paddingX, 1 * y, this.carta4N1img, 2, 4)
        this.carta1N1 = new Tile(this, 2 * x + paddingX, 1 * y, this.carta1N1img, 1, 1)
        this.carta3N1 = new Tile(this, 3 * x + paddingX, 1 * y, this.carta3N1img, 2, 3)
        this.carta2N1 = new Tile(this, 1 * x + paddingX, 2 * y, this.carta2N1img, 1, 2)
        this.carta6N1 = new Tile(this, 2 * x + paddingX, 2 * y, this.carta6N1img, 9, 6)
        this.carta5N1 = new Tile(this, 3 * x + paddingX, 2 * y, this.carta5N1img, 6, 5)

        this.tilesN1.push(this.carta1N1, this.carta2N1, this.carta3N1, this.carta4N1, this.carta5N1, this.carta6N1)

    }

    createTilesN2() {

        let x = 230
        let y = 260
        let paddingX = 85

        this.carta1N2 = new Tile(this, 1 * x + paddingX, 1 * y, this.carta1N2img, 1, 1)
        this.carta2N2 = new Tile(this, 2 * x + paddingX, 1 * y, this.carta2N2img, 6, 2)
        this.carta3N2 = new Tile(this, 3 * x + paddingX, 1 * y, this.carta3N2img, 9, 3)
        this.carta4N2 = new Tile(this, 1 * x + paddingX, 2 * y, this.carta4N2img, 1, 4)
        this.carta5N2 = new Tile(this, 2 * x + paddingX, 2 * y, this.carta5N2img, 2, 5)
        this.carta6N2 = new Tile(this, 3 * x + paddingX, 2 * y, this.carta6N2img, 2, 6)

        this.tilesN2.push(this.carta1N2, this.carta2N2, this.carta3N2, this.carta4N2, this.carta5N2, this.carta6N2)

    }

    createTilesN3() {

        let x = 165
        let y = 190
        let paddingX = 50

        this.carta1N3 = new Tile(this, 1 * x + paddingX, 1 * y, this.carta1N3img, 20, 1)
        this.carta2N3 = new Tile(this, 2 * x + paddingX, 1 * y, this.carta2N3img, 1, 2)
        this.carta3N3 = new Tile(this, 3 * x + paddingX, 1 * y, this.carta3N3img, 2, 3)
        this.carta4N3 = new Tile(this, 4 * x + paddingX, 1 * y, this.carta4N3img, 21, 4)
        this.carta5N3 = new Tile(this, 5 * x + paddingX, 1 * y, this.carta5N3img, 3, 5)

        this.carta6N3 = new Tile(this, 1 * x + paddingX, 2 * y, this.carta6N3img, 4, 6)
        this.carta7N3 = new Tile(this, 2 * x + paddingX, 2 * y, this.carta7N3img, 5, 7)
        this.carta8N3 = new Tile(this, 3 * x + paddingX, 2 * y, this.carta8N3img, 1, 8)
        this.carta9N3 = new Tile(this, 4 * x + paddingX, 2 * y, this.carta9N3img, 24, 9)
        this.carta10N3 = new Tile(this, 5 * x + paddingX, 2 * y, this.carta10N3img, 6, 10)

        this.carta11N3 = new Tile(this, 1 * x + paddingX, 3 * y, this.carta11N3img, 5, 11)
        this.carta12N3 = new Tile(this, 2 * x + paddingX, 3 * y, this.carta12N3img, 4, 12)
        this.carta13N3 = new Tile(this, 3 * x + paddingX, 3 * y, this.carta13N3img, 6, 13)
        this.carta14N3 = new Tile(this, 4 * x + paddingX, 3 * y, this.carta14N3img, 3, 14)
        this.carta15N3 = new Tile(this, 5 * x + paddingX, 3 * y, this.carta15N3img, 2, 15)

        this.tilesN3.push(this.carta1N3, this.carta2N3, this.carta3N3, this.carta4N3, this.carta5N3, this.carta6N3, this.carta7N3, this.carta8N3, this.carta9N3, this.carta10N3, this.carta11N3, this.carta12N3, this.carta13N3, this.carta14N3, this.carta15N3)

    }

    renderTiles(cardDeck: Tile[], ratio: number, ratio2: number) {

        for (let i = 0; i < cardDeck.length; i++) {

            cardDeck[i].render(ratio, ratio2)
        }
    }

    counter() {

        if (this.contadorOn) {
            if (this.app.frameCount % 45 === 0) {
                this.segundos -= 1
            }

            if (this.segundos < 0) {
                this.minutos -= 1
                this.segundos = 59
            }
        }

        if (this.showContador) {
            this.app.textSize(20)
            this.app.fill(255)
            this.app.textFont(this.regularfont)
            this.app.text("Tiempo " + this.minutos + "/:" + this.segundos, 915, 50)
        }
    }

    //mouseclicked para cada vez que clickeo sobre una carta
    mouseClicked() {

        this.buttonSystem()

        if (this.pantalla === 6) {
            this.checkSelected(this.tilesN1)
        }

        if (this.pantalla === 4) {
            this.checkSelected(this.tilesN2)
        }

        if (this.pantalla === 8) {
            this.checkSelected(this.tilesN3)
        }
    }

    checkSelected(cardDeck: Tile[]) {

        for (let i = 0; i < cardDeck.length; i++) {
            const card = cardDeck[i];
            if (this.app.dist(this.app.mouseX, this.app.mouseY, card.getPosX(), card.getPosY()) < 80) {
                if (this.cartasSeleccionadas.length < 2 && !card.isSelected) {
                    this.cartasSeleccionadas.push(cardDeck[i])
                    card.setIsSelected(true)
                } else if (card.isSelected) {
                    //@ts-ignore
                    this.cartasSeleccionadas.splice(cardDeck[i])

                    card.setIsSelected(false)
                }
            }
        }
        //----------------

        //-------------------
        if (this.cartasSeleccionadas.length === 2) {

            var carta1 = this.cartasSeleccionadas[0];
            var carta2 = this.cartasSeleccionadas[1];

            console.log("Carta1 - " + carta1.getPair())
            console.log("Carta2 -" + carta2.getPair())

            if (carta1.getPair() === carta2.getPair()) {
                console.log("Son Iguales")
                this.isCorrecto = true
                this.isIncorrecto = false

                const nAciertos = this.pairsMatched;
                this.actividad.addState("pairsMatched", nAciertos);

                this.isMatched(cardDeck, carta1, carta2)
                this.clearDeck(cardDeck, this.cartasSeleccionadas, carta1, carta2)

            } else {
                this.numeroErrores += 1
                this.isIncorrecto = true
                this.isCorrecto = false
                console.log("No son iguales")
                console.log(this.numeroErrores)
                const nErrores = this.numeroErrores;
                this.actividad.addState("errores", nErrores);
                this.clearDeck(cardDeck, this.cartasSeleccionadas, carta1, carta2)


            }
        }
    }

    isMatched(cardDeck: Tile[], carta1: Tile, carta2: Tile) {

        this.pairsMatched += 1
        for (let i = 0; i < cardDeck.length; i++) {
            var cartaTmp = cardDeck[i];
            if (cartaTmp.getId() === carta1.getId()) {
                cardDeck[i].setIsMatched(true);
            } else {
                if (cartaTmp.getId() === carta2.getId()) {
                    cardDeck[i].setIsMatched(true);
                }
            }
        }
    }

    clearDeck(cardDeck: Tile[], selectedCardDeck: Tile[], carta1: Tile, carta2: Tile) {

        while (selectedCardDeck.length > 0) {
            selectedCardDeck.pop()
        }

        for (let i = 0; i < cardDeck.length; i++) {
            var cartaTmp = cardDeck[i];
            if (cartaTmp.getId() === carta1.getId()) {
                cardDeck[i].setIsSelected(false)
            } else {
                if (cartaTmp.getId() === carta2.getId()) {
                    cardDeck[i].setIsSelected(false)
                }
            }
        }
    }
}
export default Logica;

