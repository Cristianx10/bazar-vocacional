import p5 from 'p5';

import Elemento from '../Elemento';
import Navegador from '../Navegacion/Navegador';
import Pantalla from '../Navegacion/Pantalla';

class Inicio implements Pantalla {

    app: p5;
    nav: Navegador;
    fondo: p5.Image;
    inicia: Elemento;
    instucciones: Elemento;

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;
        this.fondo = this.app.loadImage("/img/2020-2/biologia/img/pantallainicio.png");
        this.inicia = new Elemento(this.app, "/img/2020-2/biologia/img/botonjugar.png", 640, 390);
        this.instucciones = new Elemento(this.app, "/img/2020-2/biologia/img/botoninstrucciones.png", 640, 320);
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.fondo, 0, 0);
       // this.inicia.pintar();
        this.instucciones.pintar();
    }

    mousePressed() {
 /*
        if (this.inicia.isSobre()) {
            this.nav.goTo(5);
            this.nav.correTime();
        }
        */
        if (this.instucciones.isSobre()) {
            this.nav.goTo(1);
        }

    }
}

export default Inicio;