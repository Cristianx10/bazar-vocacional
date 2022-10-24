import Pantalla from '../../Navegacion/Pantalla';
import p5 from 'p5';
import Elemento from '../../Elemento';
import Navegador from '../../Navegacion/Navegador';

class Transicion2 implements Pantalla {

    app: p5;
    nav: Navegador;
    diados: p5.Image;

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;
        this.diados = this.app.loadImage("/img/2020-2/biologia/img/segundodia.png");
     
    }

    draw() {
        this.app.imageMode(this.app.CORNER);

        this.app.image(this.diados, 0, 0);
            
            
        if (this.nav.tiempo > 4) {
            this.nav.goTo(8);
            this.nav.resetTime();
        }

        console.log(this.nav.tiempoD);

    }

    mousePressed() {

       
    }
}

export default Transicion2;