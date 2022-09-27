import { path } from "../MadLab";
class Profesor {

    constructor(app) {
        this.app = app;
        this.posx = 170;
        this.posy = 520;
        this.frasesTurorial = [];
        this.buencompuesto = undefined;
        this.Crearfrases();
        this.parteDelTutorial = 0;
        this.tutorial = undefined;
        this.img = this.app.loadImage(path + '/data/Profesor.png');
        this.imgS = this.app.loadImage(path + '/data/Profesor Sorprendido.png')
        this.imgB = this.app.loadImage(path + "/data/Profesor Correcto.png")
        this.sombra = [14];
        this.frases = undefined;
        this.globo = this.app.loadImage(path + "/data/nube.png")

        this.sombra[0] = this.app.loadImage(path + "/data/tutorial1.png");
        this.sombra[1] = this.app.loadImage(path + "/data/tutorial1.png");
        this.sombra[2] = this.app.loadImage(path + "/data/tutorial2.png");
        this.sombra[3] = this.app.loadImage(path + "/data/tutorial3.png");
        this.sombra[4] = this.app.loadImage(path + "/data/tutorial4.png");
        this.sombra[5] = this.app.loadImage(path + "/data/tutorial5.png");
        this.sombra[6] = this.app.loadImage(path + "/data/tutorial6.png");
        this.sombra[7] = this.app.loadImage(path + "/data/tutorial7.png");
        this.sombra[8] = this.app.loadImage(path + "/data/tutorial8.png");
        this.sombra[9] = this.app.loadImage(path + "/data/tutorial8.png");
        this.sombra[10] = this.app.loadImage(path + "/data/tutorial9.png");
        this.sombra[11] = this.app.loadImage(path + "/data/tutorial10.png");
        this.sombra[12] = this.app.loadImage(path + "/data/tutorial1.png");
        this.sombra[13] = this.app.loadImage(path + "/data/tutorial1.png");

    }
    pintarProfesor(tutorial) {

        this.app.fill(0);
        this.img.resize(300, 400);
        if (this.parteDelTutorial < 12) {
            this.app.image(this.sombra[this.parteDelTutorial], 640, 360)
        }

        this.globo.resize(416, 252)
        this.app.image(this.globo, 220, 150)
        if (this.buencompuesto == false) {
            this.app.image(this.imgS, this.posx, this.posy);
        } else {
            if (this.buencompuesto == true) {
                this.app.image(this.imgB, this.posx, this.posy);
            } else {
                this.app.image(this.img, this.posx, this.posy)
            }

        }

        this.tutorial = tutorial;
        this.app.textSize(16);
        this.pintarFrases();


    }

    Crearfrases() {
        this.frasesTurorial = [14];
        this.frases = undefined;;

        this.frasesTurorial[0] = ("Hola! bienvenido a" + "\n" + "Mad-Lab,soy el profesor" + "\n" +
            "Y este es mi perro Argo," + "\n" + "estoy aquí para guiarte"
            + "\n" + "y explicarte tus labores")


        this.frasesTurorial[1] = ("Tu objetivo es" + "\n" + "crear compuestos" + "\n" + "químicos en el menor" + "\n"
            + "tiempo posible");

        this.frasesTurorial[2] = ("Los compuestos" + "\n" + "aparecerán en la" + "\n" + "parte superior");

        this.frasesTurorial[3] = ("Debes arrastrar" + "\n" + "los elementos" + "\n" + "de la tabla");

        this.frasesTurorial[4] = ("Y organizarlos en" + "\n" + "orden de fórmula" + "\n" + "en las casillas");

        this.frasesTurorial[5] = ("Recuerda que puedes" + "\n" + "poner varias veces" + "\n" + "un elemento en la" + "\n" + "misma casilla");

        this.frasesTurorial[6] = ("Y puedes eliminar" + "\n" + "elementos" + "\n" + "arrastrándolos al" + "\n" + "basurero");

        this.frasesTurorial[7] = ("Para crear un" + "\n" + "compuesto debes dar" + "\n" + "al botón mezclar");

        this.frasesTurorial[8] = ("Y con la esponja" + "\n" + "puedes limpiar tu" + "\n" + "espacio al terminar" + "\n" + "de mezclar");

        this.frasesTurorial[9] = ("Si creas un" + "\n" + "compuesto peligroso" + "\n" + "perderás muchos puntos \ny deberás eliminarlo");

        this.frasesTurorial[10] = ("Puedes consultar" + "\n" + "el libro por" + "\n" + "pista pero se te" + "\n" + "descontarán puntos"
            + "\n" + "cada que lo uses");

        this.frasesTurorial[11] = ("Para pasar de nivel" + "\n" + "arrastra el" + "\n" + "compuesto hacia mi");

        this.frasesTurorial[12] = ("Estas list@?");





    }



    siguienteFrase() {
        if (this.tutorial == true) {
            this.parteDelTutorial++;
        }

    }

    pintarFrases() {

        if (this.tutorial == true) {
            this.app.text(this.frasesTurorial[this.parteDelTutorial], this.posx + 50, 100);
        }
        if (this.tutorial == false) {
            this.app.text(this.frases, this.posx + 50, 100);
        }

    }


    validarNivel(compuesto, nivel) {

        if (compuesto.getNombre() == nivel) {
            this.buencompuesto = true;
            this.frases = "Bien Hecho!\n" + "Vamos con el\n siguiente nivel";

        } else {
            if (compuesto.getNombre() == "Compuesto\nPeligroso") {
                this.frases = "CREASTE UN\nCOMPUESTO PELIGROSO!!!" + "\n" + "DESHAZTE DE ÉL RÁPIDO" + "\n" + "REVISA BIEN LA FORMULA\n" + "Y QUE TU ESPACIO\n DE TRABAJO NO ESTE SUCIO"

            } else {
                this.frases = "Esto no es\nlo que te pedí \n" + "dejalo en el basurero\n e intenta de nuevo";

            }
            this.buencompuesto = false;
        }

    }



    getParteDelTutorial() {
        return this.parteDelTutorial;
    }

    getFrases() {
        return this.frases;
    }

    getBuenCompuesto() {
        return this.buencompuesto;
    }

    setCompuesto(boolean) {
        this.buencompuesto = boolean;
    }

    setFrases(frase) {
        this.frases = frase;
    }
}

export default Profesor;