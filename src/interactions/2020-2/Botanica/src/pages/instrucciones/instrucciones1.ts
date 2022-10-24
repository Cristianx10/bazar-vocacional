import Pantalla from '../../Navegacion/Pantalla';
import p5 from 'p5';
import Elemento from '../../Elemento';
import Navegador from '../../Navegacion/Navegador';

class Instruccion1 implements Pantalla {

    app: p5;
    nav: Navegador;
    fondo: p5.Image;
    nextBtn: Elemento;

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;

        this.fondo = this.app.loadImage("/img/2020-2/biologia/img/pantallainstrucciones.png");
        this.nextBtn = new Elemento(this.app, "/img/2020-2/biologia/img/botonsiguiente.png", 640, 610);
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.fondo, 0, 0);

        this.nextBtn.pintar();
    }

    mousePressed() {
        if (this.nextBtn.isSobre()) {
            this.nav.goTo(2);
        }
    }
}

export default Instruccion1;