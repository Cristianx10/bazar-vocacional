import p5 from "p5";
import ProcessingImg from '../../../../componentsTS/Processing/config/ProcessingImg';




export default class Elemento {

    app: p5;
    url: string;
    width: number;
    height: number;
    parte?: p5.Image;
    pos: { x: number, y: number, inicial: { x: number, y: number } };
    block: boolean;
    img: ProcessingImg;


    constructor(app: p5, url: string, x: number, y: number, width?: number, height?: number) {
        this.app = app;
        this.url = url;
        this.width = 0;
        this.height = 0;
        this.img = new ProcessingImg(this.app);

        if (width !== null && width !== undefined) {
            this.width = width;
        }


        if (height !== null && height !== undefined) {
            this.height = height;
        }


        if (url !== "") {
            this.parte = this.img.loadImage(url);
            if(this.parte){
                this.width = this.parte.width;
                this.height = this.parte.height;
            }
        }

        




        this.pos = {
            x: x,
            y: y,
            inicial: {
                x: x,
                y: y
            }
        };
        this.block = false;
    }

    setposx(x: number) {
        this.pos.x = x;

    }

    pintar() {
        if (this.url !== "") {
            this.app.imageMode(this.app.CENTER);
            if (this.parte) {
                this.app.image(this.parte, this.pos.x, this.pos.y);
            }
        }
    }

    resetPosicion() {
        this.pos.x = this.pos.inicial.x;
        this.pos.y = this.pos.inicial.y;
    }


    isSobre() {

        if (this.parte !== null && this.parte !== undefined) {
            this.width = this.parte.width;
            this.height = this.parte.height;
        }

        //Circulo
        /* if (
            this.app.dist(
              this.app.mouseX,
              this.app.mouseY,
              this.pos.x,
              this.pos.y
            ) <
            ((this.width / 2)+(this.height / 2))/2
          ) {
            return true;
          }
          return false;*/

        //Cuadrados
        if (
            this.app.mouseX > this.pos.x - this.width / 2 &&
            this.app.mouseX < this.pos.x + this.width / 2 &&
            this.app.mouseY > this.pos.y - this.height / 2 &&
            this.app.mouseY < this.pos.y + this.height / 2
        ) {
            return true;
        }
        return false;
    }

    isSobreElemento(elemento: Elemento) {
        if (this.parte !== null && this.parte !== undefined) {
            this.width = this.parte.width;
            this.height = this.parte.height;
        }
        if (
            this.app.dist(elemento.pos.x, elemento.pos.y, this.pos.x, this.pos.y) <
            (this.width / 2 + this.height / 2) / 2
        ) {
            return true;
        }
        return false;
        /*
            //Cuadrados
            if(this.app.mouseX > (elemento.pos.x - (this.width/2)) && this.app.mouseX < (elemento.pos.x + (this.width/2)) && 
            this.app.mouseY > (elemento.pos.y - (this.height/2)) && this.app.mouseY < (elemento.pos.y + (this.height/2))) {
              return true;
            }
            return false;*/
    }

    arrastrar() {
        if (this.block === false) {
            this.pos.x = this.app.mouseX;
            this.pos.y = this.app.mouseY;
        }
    }


}