import { path } from "../MadLab";

class Elemento {

    constructor(posx, posy, simbolo, app) {
        this.app = app;
        this.posx = posx;
        this.posy = posy;
        this.simbolo = simbolo;
        this.img = undefined;
        //this.seleccionarElemento();
        switch (this.simbolo) {
            case "H":
                this.img = this.app.loadImage(path + '/data/h.png');
                break;

            case "O":
                this.img = this.app.loadImage(path + '/data/o.png');
                break;

            case "Na":
                this.img = this.app.loadImage(path + '/data/na.png');
                break;

            case "Cl":
                this.img = this.app.loadImage(path + '/data/cl.png');
                break;

            case "Fe":
                this.img = this.app.loadImage(path + '/data/fe.png');
                break;

            case "Ca":
                this.img = this.app.loadImage(path + '/data/ca.png');
                break;

            case "S":
                this.img = this.app.loadImage(path + '/data/s.png');
                break;

            case "K":
                this.img = this.app.loadImage(path + '/data/k.png');
                break;

            case "Mn":
                this.img = this.app.loadImage(path + '/data/mn.png');
                break;

            case "C":
                this.img = this.app.loadImage(path + '/data/c.png');
                break;

            case "Cu":
                this.img = this.app.loadImage(path + '/data/cu.png');
                break;
        }
    }

    pintarElemento() {
        // this.app.fill(this.color)
        this.img.resize(60, 60)
        this.app.image(this.img, this.posx, this.posy);
        this.app.fill(250)
        this.app.textSize(16);
        this.app.text(this.simbolo, this.posx, this.posy + 60);

    }

    seleccionarElemento() {
        switch (this.simbolo) {
            case "H":
                this.img = this.app.loadImage(path + '/data/h.png');
                break;

            case "O":
                this.img = this.app.loadImage(path + '/data/o.png');
                break;

            case "Na":
                this.img = this.app.loadImage(path + '/data/na.png');
                break;

            case "Cl":
                this.img = this.app.loadImage(path + '/data/cl.png');
                break;

            case "Fe":
                this.img = this.app.loadImage(path + '/data/fe.png');
                break;

            case "Ca":
                this.img = this.app.loadImage(path + '/data/ca.png');
                break;

            case "S":
                this.img = this.app.loadImage(path + '/data/s.png');
                break;

            case "K":
                this.img = this.app.loadImage(path + '/data/k.png');
                break;

            case "Mn":
                this.img = this.app.loadImage(path + '/data/mn.png');
                break;

            case "C":
                this.img = this.app.loadImage(path + '/data/c.png');
                break;

            case "Cu":
                this.img = this.app.loadImage(path + '/data/cu.png');
                break;

        }
    }

    seleccionarElemento(mousex, mousey) {

        if (mousex > this.posx - 25 && mousex < this.posx + 25 && mousey > this.posy - 25 && mousey < this.posy + 25) {
            return true;
        }

    }

    getPosX() {
        return this.posx;
    }

    getPosY() {
        return this.posy;
    }

    getSimbolo() {
        return this.simbolo
    }

    setPosX(x) {
        this.posx = x;
    }

    setPosY(y) {
        this.posy = y;
    }

}

export default Elemento;