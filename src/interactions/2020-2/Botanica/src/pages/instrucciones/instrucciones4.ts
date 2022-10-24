import Pantalla from '../../Navegacion/Pantalla';
import p5 from 'p5';
import Elemento from '../../Elemento';
import Navegador from '../../Navegacion/Navegador';

class Instruccion4 implements Pantalla {

    app: p5;
    nav: Navegador;
    nextBtn: Elemento;
    prevtBtn: Elemento;
    fondo5: p5.Image;

    animacionOnquebrada: p5.Image[];
    animacionOnquecaido: p5.Image[];
    animacionOntierramal: p5.Image[];

    puntero: number;
    contadoranim: number;

    constructor(nav: Navegador) {
        this.app = nav.app;
        this.nav = nav;
        this.nextBtn = new Elemento(this.app, "/img/2020-2/biologia/img/botonsiguiente.png", 800, 680);
        this.prevtBtn = new Elemento(this.app, "/img/2020-2/biologia/img/botonatras.png", 500, 680);
        this.fondo5 = this.app.loadImage("/img/2020-2/biologia/img/pantallainstrucciones4.png");

        this.animacionOnquebrada = [];
        this.animacionOnquecaido = [];
        this.animacionOntierramal = [];

        this.puntero = 0;
        this.contadoranim = 0;

        for (var i = 1; i < 4; i++) {
            this.animacionOnquebrada.push(this.app.loadImage("/img/2020-2/biologia/img/roto/planta" + i + ".jpg"));
            this.animacionOnquecaido.push(this.app.loadImage("/img/2020-2/biologia/img/torcidas/planta" + i + ".jpg"));
            this.animacionOntierramal.push(this.app.loadImage("/img/2020-2/biologia/img/tierramal/planta" + i + ".jpg"));
        }

    }

    draw() {
        this.app.imageMode(this.app.CORNER);

        this.app.image(this.fondo5, 0, 0);

        this.app.image(this.animacionOnquebrada[this.puntero], 142, 295);
        this.app.image(this.animacionOnquecaido[this.puntero], 540, 295);
        this.app.image(this.animacionOntierramal[this.puntero], 890, 295);

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
            this.nav.goTo(5);

            this.nav.correTime();

        }
        if (this.prevtBtn.isSobre()) {
            this.nav.goTo(3);
        }
    }
}

export default Instruccion4;