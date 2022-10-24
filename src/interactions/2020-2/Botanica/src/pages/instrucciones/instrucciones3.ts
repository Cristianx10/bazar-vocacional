import Pantalla from '../../Navegacion/Pantalla';
import p5 from 'p5';
import Elemento from '../../Elemento';
import Navegador from '../../Navegacion/Navegador';

class Instruccion3 implements Pantalla {

    app: p5;
    nav: Navegador;
    nextBtn: Elemento;
    prevtBtn: Elemento;
    fondo4: p5.Image;


    //animaciones
    animacionOntierra: p5.Image[];
    animacionOnagua: p5.Image[];
    animacionOnplaga: p5.Image[];
    animacionOncaidas: p5.Image[];
 

    puntero: number;
    contadoranim: number;

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;
        this.nextBtn = new Elemento(this.app, "/img/2020-2/biologia/img/botonsiguiente.png", 800, 680);
        this.prevtBtn = new Elemento(this.app, "/img/2020-2/biologia/img/botonatras.png", 500, 680);
        this.fondo4 = this.app.loadImage("/img/2020-2/biologia/img/pantallainstrucciones3.png");


        //animaciones
        this.animacionOntierra = [];
        this.animacionOnagua = [];
        this.animacionOnplaga = [];
        this.animacionOncaidas = [];
     

        this.puntero = 0;
        this.contadoranim = 0;


        for (var i = 1; i < 4; i++) {
            this.animacionOntierra.push(this.app.loadImage("/img/2020-2/biologia/img/tierra/planta" + i + ".jpg"));
            this.animacionOnagua.push(this.app.loadImage("/img/2020-2/biologia/img/seca/planta" + i + ".jpg"));
            this.animacionOnplaga.push(this.app.loadImage("/img/2020-2/biologia/img/bichos/planta" + i + ".jpg"));
            this.animacionOncaidas.push(this.app.loadImage("/img/2020-2/biologia/img/hojasfall/planta" + i + ".jpg"));
        }


    }

    draw() {
        this.app.imageMode(this.app.CORNER);

        this.app.image(this.fondo4, 0, 0);

        this.app.image(this.animacionOntierra[this.puntero], 135, 295);
        this.app.image(this.animacionOnagua[this.puntero], 395, 295);
        this.app.image(this.animacionOnplaga[this.puntero], 655, 295);
        this.app.image(this.animacionOncaidas[this.puntero], 915, 295);

        if (this.app.frameCount % 60 == 1) {
            this.puntero++;
            if (this.puntero === 3) {
                this.puntero = 0;
                this.contadoranim++;
            }
        }

        this.nextBtn.pintar();
        this.prevtBtn.pintar();
    }

    mousePressed() {
        if (this.nextBtn.isSobre()) {
            this.nav.goTo(4);
        }
        if (this.prevtBtn.isSobre()) {
            this.nav.goTo(2);
        }
    }
}

export default Instruccion3;