import Pantalla from '../../Navegacion/Pantalla';
import p5 from 'p5';
import Elemento from '../../Elemento';
import Navegador from '../../Navegacion/Navegador';

class Transicion3 implements Pantalla {

    app: p5;
    nav: Navegador;
    diatres: p5.Image;

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;
        this.diatres = this.app.loadImage("/img/2020-2/biologia/img/tercerdia.png");
   
        
    }

    draw() {
        this.app.imageMode(this.app.CORNER);

        this.app.image(this.diatres, 0, 0);
            
            
        if (this.nav.tiempo > 4) {
            this.nav.goTo(10);
            this.nav.resetTime();
        }
    }

    mousePressed() {

       
    }
}

export default Transicion3;