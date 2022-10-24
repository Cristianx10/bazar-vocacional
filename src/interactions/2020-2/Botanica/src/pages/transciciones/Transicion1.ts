import Pantalla from '../../Navegacion/Pantalla';
import p5 from 'p5';
import Elemento from '../../Elemento';
import Navegador from '../../Navegacion/Navegador';

class Transicion1 implements Pantalla {

    app: p5;
    nav: Navegador;
    diauno: p5.Image;

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;
        this.diauno = this.app.loadImage("/img/2020-2/biologia/img/primerdia.png");
    }

    draw() {
        this.app.imageMode(this.app.CORNER);

        this.app.image(this.diauno, 0, 0);
            
            
        if (this.nav.tiempo > 4) {
            this.nav.goTo(6);
            this.nav.resetTime();
        }
        
    }

    mousePressed() {

       
    }
}

export default Transicion1;