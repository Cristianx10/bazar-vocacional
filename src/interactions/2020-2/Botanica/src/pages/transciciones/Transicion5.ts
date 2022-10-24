import p5 from 'p5';

import Navegador from '../../Navegacion/Navegador';
import Pantalla from '../../Navegacion/Pantalla';

class Transicion5 implements Pantalla {

    app: p5;
    nav: Navegador;
    diacinco: p5.Image;

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;
        this.diacinco = this.app.loadImage("/img/2020-2/biologia/img/cuartodia.png");
    }

    draw() {
        this.app.imageMode(this.app.CORNER);

        this.app.image(this.diacinco, 0, 0);


        if (this.nav.tiempo > 4) {
            this.nav.goTo(14);
            this.nav.resetTime();
        }
    }

    mousePressed() {


    }
}

export default Transicion5;