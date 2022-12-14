import p5 from 'p5';
class Elemento {

    app: p5;
    url: string;
    width: number;
    height: number;
    posNew: any;



    pos: {
        x: number,
        y: number,
        inicial: {
            x: number,
            y: number
        }
    };
    parte?: p5.Image;

    block = false;

    constructor(app: p5, url: string, x: number, y: number, width?: number, height?: number) {
        this.app = app;
        this.url = url;
        this.width = 0;
        this.height = 0;
        this.posNew = {};


        if (width != null) {
            this.width = width;
        }

        if (height != null) {
            this.height = height;
        }


        if (url != "") {
            this.parte = this.app.loadImage(url);
            this.width = this.parte.width;
            this.height = this.parte.height;
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

    pintar(newX?: number, newY?: number) {
        if (this.url != "") {
            this.app.imageMode(this.app.CENTER);
            if (newX == null && newY == null && this.parte) {
                this.app.image(this.parte, this.pos.x, this.pos.y);
            } else {
                if (this.parte && newX != null && newY != null) {
                    this.pos = {
                        x: newX,
                        y: newY,
                        inicial: {
                            x: newX,
                            y: newY
                        }
                    };

                    this.app.image(this.parte, newX, newY);
                }

            }
        }
        //console.log(this.width)
    }

    resetPosicion() {
        this.pos.x = this.pos.inicial.x;
        this.pos.y = this.pos.inicial.y;
    }


    isSobre() {

        if (this.parte != null) {
            this.width = this.parte.width;
            this.height = this.parte.height;
        }


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
        if (this.parte != null) {
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
        if (this.block == false) {
            this.pos.x = this.app.mouseX;
            this.pos.y = this.app.mouseY;
        }
    }


}


export default Elemento;