import Pantalla from '../../Navegacion/Pantalla';
import p5 from 'p5';
import Elemento from '../../Elemento';
import Navegador from '../../Navegacion/Navegador';

class Transicion4 implements Pantalla {

    app: p5;
    nav: Navegador;
    diacuatro: p5.Image;

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;
        this.diacuatro = this.app.loadImage("/img/2020-2/biologia/img/quintodia.png");
        
    }

    draw() {
        this.app.imageMode(this.app.CORNER);

        this.app.image(this.diacuatro, 0, 0);
            
            
        if (this.nav.tiempo > 4) {
            this.nav.goTo(12);
            this.nav.resetTime();
        }

        
        //this.app.text(this.nav.tiempo,200,100);
    }

    mousePressed() {

       
    }
}

export default Transicion4;