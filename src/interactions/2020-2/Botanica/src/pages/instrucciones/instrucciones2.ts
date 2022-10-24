import p5 from 'p5';

import Elemento from '../../Elemento';
import Navegador from '../../Navegacion/Navegador';
import Pantalla from '../../Navegacion/Pantalla';

class Instruccion2 implements Pantalla {

    app: p5;
    nav: Navegador;
    nextBtn: Elemento;
    prevtBtn: Elemento;
    fondo3: p5.Image;
    

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;


        this.nextBtn = new Elemento(this.app, "/img/2020-2/biologia/img/botonsiguiente.png", 800, 610);
        this.prevtBtn = new Elemento(this.app, "/img/2020-2/biologia/img/botonatras.png", 500, 610);
        this.fondo3 = this.app.loadImage("/img/2020-2/biologia/img/pantallainstrucciones2.png");
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.fondo3, 0, 0);

        this.nextBtn.pintar();
        this.prevtBtn.pintar();
    }

    mousePressed() {
        if (this.nextBtn.isSobre()) {
            this.nav.goTo(3);
        }
        if (this.prevtBtn.isSobre()) {
            this.nav.goTo(1);
        }
    }
}

export default Instruccion2;