import p5 from 'p5';
export const STATE_NAMES = {

    PLANTA_BIEN_SMALL: 2,
    PLANTA_BIEN_MEDIANA: 3,
    PLANTA_BIEN_GRANDE: 4,

    PLANTA_BICHOS: -7,
    PLANTA_NO_BICHOS: -8,

    PLANTA_INCLINADO: 20,
    PLANTA_NO_INCLINADO: 19,

    PLANTA_SOL: 30,
    PLANTA_SIN_SOL: 29,

    AGUA_FALTA: 11,
    AGUA_BIEN: 10,

    MATERA_MEDIANA_QUEBRADA: -1,
    MATERA_SMALL_BIEN: 1,
    MATERA_MEDIANA_BIEN: 2,
    MATERA_GRANDE_BIEN: 3,

    TIERRA_MALA: -2,
    TIERRA_FALTA: -1,
    TIERRA_BIEN: 1,
    TIERRA_EXCESO: 2
}

const STATE_INTERNO = {
    PLANTA_BICHO_SMALL: "BICHOS_SMALL",
    PLANTA_BICHO_MEDIANA: "BICHOS_MEDIANA",
    PLANTA_BICHO_GRANDE: "BICHOS_GRANDE",
    PLANTA_MARCHITA_SMALL: "MARCHITA_SMALL",
    PLANTA_MARCHITA_MEDIANA: "MARCHITA_MEDIANA",
    PLANTA_MARCHITA_GRANDE: "MARCHITA_GRANDE",
    PLANTA_MARCHITA_BICHO_SMALL: "MARCHITA_BICHOS_SMALL",
    PLANTA_MARCHITA_BICHO_MEDIANA: "MARCHITA_BICHOS_MEDIANA",
    PLANTA_MARCHITA_BICHO_GRANDE: "MARCHITA_BICHOS_GRANDE",
}

class Planta {

    app: p5;
    x: number;
    y: number;

    type: number;
    tierra: number;
    tamano: number;
    sol: number;
    matera: number;
    inclinacion: number;
    bichos: number;
    agua: number;
    materaTamano: number;

    plantaImg: ImageState;
    tierraImg: ImageState;
    materaImg: ImageState;

    puntaje: number;
    puntajeMenos :number;

    colorTint: undefined | {
        r: number, g: number, b: number
    }

    initPos: {
        x: number,
        y: number
    }

    constructor(app: p5, x: number, y: number, type: number) {
        this.app = app;
        this.x = x;
        this.y = y;
        this.initPos = { x, y };

        this.type = type;

        this.tierra = STATE_NAMES.TIERRA_FALTA;
        this.tamano = STATE_NAMES.PLANTA_BIEN_SMALL;
        this.matera = STATE_NAMES.MATERA_SMALL_BIEN;
        this.agua = STATE_NAMES.AGUA_BIEN;
        this.inclinacion = STATE_NAMES.PLANTA_NO_INCLINADO;
        this.bichos = STATE_NAMES.PLANTA_NO_BICHOS;
        this.sol = STATE_NAMES.PLANTA_SOL;


        this.materaTamano = 1;


        this.plantaImg = new ImageState(this.app);
        this.tierraImg = new ImageState(this.app);
        this.materaImg = new ImageState(this.app);

        this.materaImg.addState("/img/2020-2/biologia/img/materas/matera_grande.png", STATE_NAMES.MATERA_GRANDE_BIEN);
        this.materaImg.addState("/img/2020-2/biologia/img/materas/matera_mediana.png", STATE_NAMES.MATERA_MEDIANA_BIEN);
        this.materaImg.addState("/img/2020-2/biologia/img/materas/matera_mediana_quebrada.png", STATE_NAMES.MATERA_MEDIANA_QUEBRADA);
        this.materaImg.addState("/img/2020-2/biologia/img/materas/matera_small.png", STATE_NAMES.MATERA_SMALL_BIEN);

        this.tierraImg.addState("/img/2020-2/biologia/img/materas/tierra_llena.png", STATE_NAMES.TIERRA_BIEN);
        this.tierraImg.addState("/img/2020-2/biologia/img/materas/tierra_vacia.png", STATE_NAMES.TIERRA_FALTA);
        this.tierraImg.addState("/img/2020-2/biologia/img/materas/tierra_mala.png", STATE_NAMES.TIERRA_MALA);

        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_bien_small.png", STATE_NAMES.PLANTA_BIEN_SMALL);
        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_bien_mediana.png", STATE_NAMES.PLANTA_BIEN_MEDIANA);
        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_bien_grande.png", STATE_NAMES.PLANTA_BIEN_GRANDE);

        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_bichos_small.png", STATE_INTERNO.PLANTA_BICHO_SMALL);
        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_bichos_mediana.png", STATE_INTERNO.PLANTA_BICHO_MEDIANA);
        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_bichos_grande.png", STATE_INTERNO.PLANTA_BICHO_GRANDE);


        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_marchita_insectos_small.png", STATE_INTERNO.PLANTA_MARCHITA_BICHO_SMALL);
        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_marchita_insectos_mediana.png", STATE_INTERNO.PLANTA_MARCHITA_BICHO_MEDIANA);
        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_marchita_insectos_grande.png", STATE_INTERNO.PLANTA_MARCHITA_BICHO_GRANDE);


        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_marchita_small.png", STATE_INTERNO.PLANTA_MARCHITA_SMALL);
        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_marchita_mediana.png", STATE_INTERNO.PLANTA_MARCHITA_MEDIANA);
        this.plantaImg.addState("/img/2020-2/biologia/img/plantas/" + type + "/" + "planta_marchita_grande.png", STATE_INTERNO.PLANTA_MARCHITA_GRANDE);



        this.puntaje = 0;
        this.puntajeMenos = 0;

        this.colorTint = undefined;
    }


    pintar() {

        //Pintar platanta
        //Mucho sol
        //Falta agua
        this.app.imageMode(this.app.CORNER);
        var p = this.plantaImg.getBounds();

        //Cambia de color
        //255, 130, 10
        if (this.colorTint !== undefined) {
            var { r, g, b } = this.colorTint;
            this.app.tint(r, g, b);
        }



        var desfaceY = 23;

        this.app.push();
        if (this.inclinacion === STATE_NAMES.PLANTA_INCLINADO) {

            if (this.tamano === STATE_NAMES.PLANTA_BIEN_GRANDE) {
                this.app.translate(this.x - (p.width / 2) + 50, this.y - p.height - desfaceY);
            } else {
                this.app.translate(this.x - (p.width / 2) + 35, this.y - p.height - desfaceY);
            }
            var grados = 20;
            this.app.rotate(grados * this.app.PI / 180);

        } else {
            this.app.translate(this.x - (p.width / 2), this.y - p.height - desfaceY);
        }

        this.plantaImg.draw(0, 0);

        this.app.pop();

        this.app.noTint();

        //Pintar tierra
        //TIENE TIERRA

        this.app.imageMode(this.app.CORNER)

        var t = this.tierraImg.getBounds();
        this.tierraImg.draw(this.x - (t.width / 2), this.y - t.height - 17);


        //Pintar maceta
        //Esta quebrada
        this.app.imageMode(this.app.CENTER);
        this.materaImg.draw(this.x, this.y);

    }

    resetPos() {
        this.x = this.initPos.x;
        this.y = this.initPos.y;
    }

    setPos(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isSobre(locX?:number,locY?:number) {
        var mouseX = this.app.mouseX;
        var mouseY = this.app.mouseY;

        if(locX!== undefined && locY!==undefined){
             mouseX = locX;
             mouseY = locY;
        }

        var m = this.materaImg.getBounds();
        var p = this.plantaImg.getBounds();

        var x = this.x;
        var y = this.y - (((m.height) + (p.height)) / 2) + (m.height / 2);

        var { width, height } = this.getBounds();

        var sobre = false;

        if (mouseX > x - (width / 2) && mouseX < x + (width / 2)
            && mouseY > y - (height / 2) && mouseY < y + (height / 2)) {
            sobre = true;
        }

        return sobre;
    }

    updateState() {

        //Estados de la tierra
        if (this.tierra === STATE_NAMES.TIERRA_BIEN || this.tierra === STATE_NAMES.TIERRA_EXCESO) {
            this.tierraImg.setState(STATE_NAMES.TIERRA_BIEN);
        }

        if (this.tierra === STATE_NAMES.TIERRA_FALTA) {
            this.tierraImg.setState(STATE_NAMES.TIERRA_FALTA);
        }

        if (this.tierra === STATE_NAMES.TIERRA_MALA) {
            this.tierraImg.setState(STATE_NAMES.TIERRA_MALA);
        }

        //-----------------------------


        //Estados de la matera
        if (this.matera === STATE_NAMES.MATERA_GRANDE_BIEN) {
            this.materaImg.setState(STATE_NAMES.MATERA_GRANDE_BIEN);
            this.tierraImg.setScale(74, 44);
        }

        if (this.matera === STATE_NAMES.MATERA_MEDIANA_BIEN) {
            this.materaImg.setState(STATE_NAMES.MATERA_MEDIANA_BIEN);
            this.tierraImg.setScale(56, 33);
        }

        if (this.matera === STATE_NAMES.MATERA_SMALL_BIEN) {
            this.materaImg.setState(STATE_NAMES.MATERA_SMALL_BIEN);
            this.tierraImg.setScale(43, 25);
        }

        if (this.matera === STATE_NAMES.MATERA_MEDIANA_QUEBRADA) {
            this.materaImg.setState(STATE_NAMES.MATERA_MEDIANA_QUEBRADA);
            this.tierraImg.setScale(56, 33);
        }

        //------------------------------------------


        if (this.tamano === STATE_NAMES.PLANTA_BIEN_SMALL) {

            if (this.bichos === STATE_NAMES.PLANTA_BICHOS) {

                if (this.sol === STATE_NAMES.PLANTA_SOL) {
                    this.plantaImg.setState(STATE_INTERNO.PLANTA_BICHO_SMALL);
                } else if (this.sol === STATE_NAMES.PLANTA_SIN_SOL) {
                    this.plantaImg.setState(STATE_INTERNO.PLANTA_MARCHITA_BICHO_SMALL);
                }

            } else {
                if (this.sol === STATE_NAMES.PLANTA_SOL) {
                    this.plantaImg.setState(STATE_NAMES.PLANTA_BIEN_SMALL);
                } else if (this.sol === STATE_NAMES.PLANTA_SIN_SOL) {
                    this.plantaImg.setState(STATE_INTERNO.PLANTA_MARCHITA_SMALL);
                }
            }
        }

        if (this.tamano === STATE_NAMES.PLANTA_BIEN_MEDIANA) {

            if (this.bichos === STATE_NAMES.PLANTA_BICHOS) {

                if (this.sol === STATE_NAMES.PLANTA_SOL) {
                    this.plantaImg.setState(STATE_INTERNO.PLANTA_BICHO_MEDIANA);
                } else if (this.sol === STATE_NAMES.PLANTA_SIN_SOL) {
                    this.plantaImg.setState(STATE_INTERNO.PLANTA_MARCHITA_BICHO_MEDIANA);
                }

            } else {
                if (this.sol === STATE_NAMES.PLANTA_SOL) {
                    this.plantaImg.setState(STATE_NAMES.PLANTA_BIEN_MEDIANA);
                } else if (this.sol === STATE_NAMES.PLANTA_SIN_SOL) {
                    this.plantaImg.setState(STATE_INTERNO.PLANTA_MARCHITA_MEDIANA);
                }
            }
        }

        if (this.tamano === STATE_NAMES.PLANTA_BIEN_GRANDE) {

            if (this.bichos === STATE_NAMES.PLANTA_BICHOS) {

                if (this.sol === STATE_NAMES.PLANTA_SOL) {
                    this.plantaImg.setState(STATE_INTERNO.PLANTA_BICHO_GRANDE);
                } else if (this.sol === STATE_NAMES.PLANTA_SIN_SOL) {
                    this.plantaImg.setState(STATE_INTERNO.PLANTA_MARCHITA_BICHO_GRANDE);
                }

            } else {
                if (this.sol === STATE_NAMES.PLANTA_SOL) {
                    this.plantaImg.setState(STATE_NAMES.PLANTA_BIEN_GRANDE);
                } else if (this.sol === STATE_NAMES.PLANTA_SIN_SOL) {
                    this.plantaImg.setState(STATE_INTERNO.PLANTA_MARCHITA_GRANDE);
                }
            }
        }

        if (this.agua === STATE_NAMES.AGUA_BIEN) {
            this.colorTint = undefined;
        }

        if (this.agua === STATE_NAMES.AGUA_FALTA) {
            //Cambia de color
            //255, 130, 10
            this.colorTint = {
                r: 255, g: 130, b: 0
            }
        }

        if (this.inclinacion === STATE_NAMES.PLANTA_INCLINADO) {
            this.inclinacion = STATE_NAMES.PLANTA_INCLINADO;
        }

        if (this.inclinacion === STATE_NAMES.PLANTA_NO_INCLINADO) {
            this.inclinacion = STATE_NAMES.PLANTA_NO_INCLINADO;
        }


    }


    validateStatus() {

        var totalPlantas = 15;
        var totalPuntos = 200;

        var puntajeMaxUnidad = totalPuntos / totalPlantas;

        this.puntaje = 0;
        

        if (this.sol === STATE_NAMES.PLANTA_SOL) {
            this.puntaje += puntajeMaxUnidad / 6;
        }


        if (this.agua === STATE_NAMES.AGUA_BIEN) {
            this.puntaje += puntajeMaxUnidad / 6;
        }

        if (this.tierra === STATE_NAMES.TIERRA_BIEN) {
            this.puntaje += puntajeMaxUnidad / 6;
        } else if (this.tierra >= STATE_NAMES.TIERRA_BIEN) {
            this.puntaje += (puntajeMaxUnidad / 6) / 2;
        }

        if (this.inclinacion === STATE_NAMES.PLANTA_NO_INCLINADO) {
            this.puntaje += puntajeMaxUnidad / 6;
        }

        if (this.bichos === STATE_NAMES.PLANTA_NO_BICHOS) {
            this.puntaje += puntajeMaxUnidad / 6;
        }

        if (this.matera !== STATE_NAMES.MATERA_MEDIANA_QUEBRADA) {
            this.puntaje += puntajeMaxUnidad / 6;
        }
        
        this.puntaje-= this.puntajeMenos;

        return this.puntaje;

    }

    getBounds() {
        var width = -1;
        var height = -1;

        var m = this.materaImg.getBounds();
        var p = this.plantaImg.getBounds();

        width = m.width;
        if (p.width > m.width) {
            width = p.width;
        }

        height = m.height + p.height;

        return {
            width,
            height
        }

    }

    getPos(){
        
        var m = this.materaImg.getBounds();
        var p = this.plantaImg.getBounds();

        var x = this.x;
        var y = this.y - (((m.height) + (p.height)) / 2) + (m.height / 2);

        
        return {x,y}
    }
    
}

export default Planta;

interface ImageStateImg {
    img: p5.Image,
    id: number | string,
    scale?: { width: number, height: number }
}

class ImageState {

    app: p5;
    imgState: ImageStateImg[];
    state: ImageStateImg | undefined = undefined;
    // original: p5.Image | undefined;


    constructor(app: p5) {
        this.app = app;
        this.imgState = [];
        this.state = undefined;
    }


    addState(url: string, nombre: number | string) {
        var img = this.app.loadImage(url);
        var state = {
            img,
            id: nombre
        }
        this.imgState.push(state);
    }

    setScale(width: number, height: number) {
        if (this.state && (this.state.img.width !== width || this.state.img.height !== height)) {
            this.state.scale = {
                width, height
            }
        }
    }

    draw(x: number, y: number) {
        if (this.state) {
            //Revisar el nombre del metodo
            // this.app.ImageMode(CENTET);
            if (this.state.scale) {
                this.state.img.resize(this.state.scale.width, this.state.scale.height);
            }
            this.app.image(this.state.img, x, y);

        }
    }

    getBounds() {
        var width = -1;
        var height = -1;

        if (this.state) {
            width = this.state.img.width;
            height = this.state.img.height;
        }

        return { width, height };
    }

    setState(estado: string | number) {



        for (let i = 0; i < this.imgState.length; i++) {
            let stateImg = this.imgState[i];
            if (stateImg.id == estado) {

                this.state = stateImg;
                //this.original = this.state;

            }
        }


    }




}


