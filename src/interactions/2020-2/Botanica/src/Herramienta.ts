import { timeStamp } from 'console';
import p5 from 'p5';

import Planta from './Planta';

class Herramienta {

    app: p5;
    view: p5.Image;
    x: number;
    y: number;
    initPos: {
        x: number,
        y: number
    }
    fAcciones: ((planta: Planta) => void) | undefined;

    constructor(app: p5, URL: string, x: number, y: number) {
        this.app = app;
        this.view = this.app.loadImage(URL);
        this.x = x;
        this.y = y;
        this.initPos = { x, y };
    }

    pintar() {
        this.app.imageMode(this.app.CENTER);
        this.app.image(this.view, this.x, this.y);
    }

  

    configAcciones(acciones: (planta: Planta) => void) {
        this.fAcciones = acciones;
    }

    acciones(planta: Planta) {
        if (this.fAcciones !== undefined) {
            this.fAcciones(planta);
            planta.updateState();
        }
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


        var { width, height } = this.view;

        var sobre = false;

        var x = this.x;
        var y = this.y;

        if (mouseX > x - (width / 2) && mouseX < x + (width / 2)
            && mouseY > y - (height / 2) && mouseY < y + (height / 2)) {
            sobre = true;
        }

        return sobre;

    }


    getPos(){
        return{x:this.x,y:this.y}
    }

}

export default Herramienta;