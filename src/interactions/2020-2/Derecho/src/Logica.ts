import p5 from 'p5';

import Sonido from '../../../../componentsTS/Sonido/Sonido';


import Opcion from './Opcion';

import CARRERAS from '../../../../constants/observer';
import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';
import Navegador from '../../../../componentsTS/Navegacion/config';

class Logica {
	app: p5;

	audio1: Sonido;
	audio2: Sonido;
	audio3: Sonido;
	audio4: Sonido;

	private opciones: Opcion[];
	private opciones1: Opcion[];
	private opciones2: Opcion[];
	private opciones3: Opcion[];

	private respuestas: string[];
	private respuestas1: string[];
	private respuestas2: string[];
	private respuestas3: string[];

	private respuestaSeleccionada: string;
	private respuestaSeleccionada1: string;
	private respuestaSeleccionada2: string;
	private respuestaSeleccionada3: string;

	private agarrado?: Opcion;
	pantalla: number;
	time: number;

	seconds: number;
	minutes: number;

	puntaje: number;
	puntaje1: number;
	puntaje2: number;
	puntaje3: number;

	x: number;
	x1: number;
	x2: number;
	x3: number;

	y: number[];
	y1: number[];
	y2: number[];
	y3: number[];

	private mostrar1: boolean;
	private mostrar2: boolean;
	private mostrar3: boolean;
	private mostrar4: boolean;

	private audioEscuchado: boolean;
	private audioEscuchado2: boolean;

	intro: p5.Image;
	continuarH: p5.Image;
	continuar: p5.Image;
	caso1: p5.Image;
	caso2: p5.Image;
	respuesta1: p5.Image;
	respuesta2: p5.Image;
	ultima: p5.Image;
	input: p5.Image;
	continuarF: p5.Image;

	navegador: Navegador;
	actividad: ActividadTSLite;


	constructor(app: p5, actividad: ActividadTSLite, navegador: Navegador) {
		this.app = app;
		this.actividad = actividad;
		this.navegador = navegador;
		//	minim = new Minim((PApplet) app);
		// this loads mysong.wav from the data folder
		this.audio1 = new Sonido("/img/2020-2/derecho/img/Caso 1.mp3");
		this.audio2 = new Sonido("/img/2020-2/derecho/img/Caso 2.mp3");
		this.audio3 = new Sonido("/img/2020-2/derecho/img/Suceso 1.mp3");
		this.audio4 = new Sonido("/img/2020-2/derecho/img/Suceso 2.mp3");

		this.actividad.addState("total", 0)



		this.respuestaSeleccionada = "";
		this.respuestaSeleccionada1 = "";
		this.respuestaSeleccionada2 = "";
		this.respuestaSeleccionada3 = "";

		this.x = (this.app.width / 2) + 308;
		this.y = [];
		this.y[0] = 0;
		this.y[1] = 10;
		this.y[2] = 15;

		this.x1 = this.app.width / 2 + 355;
		this.y1 = [];
		this.y1[0] = 0;
		this.y1[1] = 25;
		this.y1[2] = 23;

		this.x2 = this.app.width / 2 + 70;
		this.y2 = [];
		this.y2[0] = 0;
		this.y2[1] = 38;
		this.y2[2] = 29;

		this.x3 = this.app.width / 2 + 330;
		this.y3 = [];
		this.y3[0] = 0;
		this.y3[1] = 40;
		this.y3[2] = 33;

		this.time = this.app.millis() + 1000;
		this.seconds = 30;
		this.minutes = 1;

		this.pantalla = 0;
		this.mostrar1 = false;
		this.mostrar2 = false;
		this.mostrar3 = false;
		this.mostrar4 = false;

		this.opciones = [];
		this.opciones1 = [];
		this.opciones2 = [];
		this.opciones3 = [];

		this.respuestas = [];
		this.respuestas1 = [];
		this.respuestas2 = [];
		this.respuestas3 = [];

		this.agarrado = undefined;

		this.definirRespuestas();


		//this.definirImagenes();
		this.intro = this.app.loadImage("/img/2020-2/derecho/img/Intro.png");
		this.continuarH = this.app.loadImage("/img/2020-2/derecho/img/ContinuarH.png");
		this.continuar = this.app.loadImage("/img/2020-2/derecho/img/Continuar.png");
		this.continuarF = this.app.loadImage("/img/2020-2/derecho/img/ContinuarF.png");
		this.caso1 = this.app.loadImage("/img/2020-2/derecho/img/Caso1.png");
		this.caso2 = this.app.loadImage("/img/2020-2/derecho/img/Caso2.jpg");
		this.respuesta1 = this.app.loadImage("/img/2020-2/derecho/img/Respuesta1.jpg");
		this.respuesta2 = this.app.loadImage("/img/2020-2/derecho/img/Respuesta2.jpg");
		this.ultima = this.app.loadImage("/img/2020-2/derecho/img/Ultima.png");
		this.input = this.app.loadImage("/img/2020-2/derecho/img/Input.png");



		// primer input
		for (var i = 0; i < 3; i++) {
			let a = new Opcion(this.app, "/img/2020-2/derecho/img/A" + (i + 1) + ".png");
			this.opciones.push(a);
		}
		// segundo input
		for (var i = 0; i < 3; i++) {
			let a = new Opcion(this.app, "/img/2020-2/derecho/img/B" + (i + 1) + ".png");
			this.opciones1.push(a);
		}
		// tercer input
		for (var i = 0; i < 3; i++) {
			let a = new Opcion(this.app, "/img/2020-2/derecho/img/C" + (i + 1) + ".png");
			this.opciones2.push(a);
		}
		// cuarto input
		for (var i = 0; i < 3; i++) {
			let a = new Opcion(this.app, "/img/2020-2/derecho/img/D" + (i + 1) + ".png");
			this.opciones3.push(a);
		}

		this.puntaje = 0;
		this.puntaje1 = 0;
		this.puntaje2 = 0;
		this.puntaje3 = 0;

		this.actividad.addState("puntaje", this.puntaje)
		this.actividad.addState("puntaje1", this.puntaje1)
		this.actividad.addState("puntaje2", this.puntaje2)
		this.actividad.addState("puntaje3", this.puntaje3)

		this.audioEscuchado = false;
		this.audioEscuchado2 = false;

		this.actividad.addState("pantalla", this.pantalla)
	}

	pintar() {
		console.log(this.pantalla)
		this.app.background(255);
		switch (this.pantalla) {

			case 0:
				this.app.image(this.intro, 0, 0, 1200, 700);
				if (this.app.mouseX > 345 && this.app.mouseX < 345 + 146 && this.app.mouseY > 266 && this.app.mouseY < 266 + 50)
					this.app.image(this.continuarH, 345, 270, 146, 55);
				break;

			case 1:
				this.app.image(this.caso1, 0, 0, 1200, 700);
				if (this.audioEscuchado == false) {
					this.app.image(this.continuarF, 900, 500);
				} else {
					this.app.image(this.continuar, 900, 500);
				}

				if (this.app.mouseX > 900 && this.app.mouseX < 900 + this.continuar.width && this.app.mouseY > 500
					&& this.app.mouseY < 500 + this.continuar.height && this.audioEscuchado == true)
					this.app.image(this.continuarH, 900, 500);

				if (this.app.mouseX > 450 && this.app.mouseX < 490 && this.app.mouseY > 130 && this.app.mouseY < 160) {
					this.app.cursor(this.app.HAND);
				} else {
					this.app.cursor(this.app.ARROW);
				}

				break;

			case 2:
				this.app.image(this.respuesta1, 0, 0, 1200, 700);
				//contador
				if (this.app.millis() > this.time) {
					this.time = this.app.millis() + 1000;
					this.seconds--;
				}
				if (this.seconds < 0) {
					this.minutes--;
					this.seconds = 59;
				}
				if (this.minutes == 0 && this.seconds == 0) {
					this.pantalla++;
					this.seconds = 30;
					this.minutes = 1;
				}
				this.app.fill(0);
				this.app.textSize(20);
				this.app.text(this.minutes + ":" + this.seconds, 1100, 50);


				if (this.audioEscuchado == false) {
					this.app.image(this.continuarF, 900, 500);
				} else {
					this.app.image(this.continuar, 900, 500);
				}
				if (this.app.mouseX > 900 && this.app.mouseX < 900 + this.continuar.width && this.app.mouseY > 500
					&& this.app.mouseY < 500 + this.continuar.height && this.audioEscuchado == true)
					this.app.image(this.continuarH, 900, 500);

				if (this.app.mouseX > 425 && this.app.mouseX < 465 && this.app.mouseY > 115 && this.app.mouseY < 155) {
					this.app.cursor(this.app.HAND);
				} else if (this.app.mouseX > 950 && this.app.mouseX < 980 && this.app.mouseY > 280 && this.app.mouseY < 300) {
					this.app.cursor(this.app.HAND);
				} else if (this.app.mouseX > 1015 && this.app.mouseX < 1040 && this.app.mouseY > 320 && this.app.mouseY < 345) {
					this.app.cursor(this.app.HAND);
				} else {
					this.app.cursor(this.app.ARROW);
				}

				if (this.app.mouseX > 900 && this.app.mouseX < 900 + this.continuar.width && this.app.mouseY > 500
					&& this.app.mouseY < 500 + this.continuar.height && this.audioEscuchado == true)
					this.app.image(this.continuarH, 900, 500);

				this.app.fill(0);
				this.app.textSize(12);
				this.app.text(this.respuestaSeleccionada, 840, 295);

				this.app.text(this.respuestaSeleccionada1, 888, 339);

				for (var i = 0; i < this.opciones.length; i++) {
					this.app.imageMode(this.app.CENTER);
					if (this.mostrar1 == true)
						this.opciones[i].pintar(this.x, ((this.y[i] * 4) * i) + 335);
					this.app.imageMode(this.app.CORNER);
				}

				for (var i = 0; i < this.opciones1.length; i++) {
					this.app.imageMode(this.app.CENTER);
					if (this.mostrar2 == true)
						this.opciones1[i].pintar(this.x1, ((this.y1[i] * 4) * i) + 420);
					this.app.imageMode(this.app.CORNER);
				}
				break;

			case 3:
				this.app.image(this.caso2, 0, 0, 1200, 700);

				if (this.audioEscuchado == false) {
					this.app.image(this.continuarF, 900, 500);
				} else {
					this.app.image(this.continuar, 900, 500);
				}

				//contador


				if (this.app.mouseX > 900 && this.app.mouseX < 900 + this.continuar.width && this.app.mouseY > 500
					&& this.app.mouseY < 500 + this.continuar.height && this.audioEscuchado == true)
					this.app.image(this.continuarH, 900, 500);

				if (this.app.mouseX > 450 && this.app.mouseX < 490 && this.app.mouseY > 130 && this.app.mouseY < 160) {
					this.app.cursor(this.app.HAND);
				} else {
					this.app.cursor(this.app.ARROW);
				}
				break;

			case 4:

				this.app.image(this.respuesta2, 0, 0, 1200, 700);
				//contador
				if (this.app.millis() > this.time) {
					this.time = this.app.millis() + 1000;
					this.seconds--;
				}
				if (this.seconds < 0) {
					this.minutes--;
					this.seconds = 59;
				}
				if (this.minutes == 0 && this.seconds == 0) {
					this.pantalla++;
					this.seconds = 30;
					this.minutes = 1;
				}
				this.app.fill(0);
				this.app.textSize(20);
				this.app.text(this.minutes + ":" + this.seconds, 1100, 50);


				if (this.audioEscuchado == false) {
					this.app.image(this.continuarF, 900, 500);
				} else {
					this.app.image(this.continuar, 900, 500);
				}
				if (this.app.mouseX > 900 && this.app.mouseX < 900 + this.continuar.width && this.app.mouseY > 500
					&& this.app.mouseY < 500 + this.continuar.height && this.audioEscuchado == true)
					this.app.image(this.continuarH, 900, 500);

				if (this.app.mouseX > 425 && this.app.mouseX < 465 && this.app.mouseY > 115 && this.app.mouseY < 155) {
					this.app.cursor(this.app.HAND);
				} else if (this.app.mouseX > 735 && this.app.mouseX < 760 && this.app.mouseY > 325 && this.app.mouseY < 350) {
					this.app.cursor(this.app.HAND);
				} else if (this.app.mouseX > 1000 && this.app.mouseX < 1030 && this.app.mouseY > 280 && this.app.mouseY < 300) {
					this.app.cursor(this.app.HAND);
				} else {
					this.app.cursor(this.app.ARROW);
				}
				this.app.fill(0);
				this.app.text(this.respuestaSeleccionada2, 590, 345);
				this.app.text(this.respuestaSeleccionada3, 835, 295);

				for (var i = 0; i < this.opciones.length; i++) {
					this.app.imageMode(this.app.CENTER);
					if (this.mostrar3 == true)
						this.opciones2[i].pintar(this.x2, ((this.y2[i] * 4) * i) + 455);
					this.app.imageMode(this.app.CORNER);
				}

				for (var i = 0; i < this.opciones1.length; i++) {
					this.app.imageMode(this.app.CENTER);
					if (this.mostrar4 == true)
						this.opciones3[i].pintar(this.x3, ((this.y3[i] * 4) * i) + 400);
					this.app.imageMode(this.app.CORNER);
				}
				break;

			case 5:
				this.app.image(this.ultima, 0, 0, 1200, 700);
				this.app.image(this.continuar, 520, 205);
				if (this.app.mouseX > 520 && this.app.mouseX < 520 + this.continuar.width && this.app.mouseY > 205
					&& this.app.mouseY < 205 + this.continuar.height) {
					this.app.image(this.continuarH, 520, 205);
				}

				break;

		}

	}

	clickMouse() {
		console.log("X: " + this.app.mouseX + " Y: " + this.app.mouseY);


		switch (this.pantalla) {
			case 0:
				if (this.app.mouseX > 345 && this.app.mouseX < 345 + 146 && this.app.mouseY > 266 && this.app.mouseY < 266 + 50)
					this.pantalla = 1;

				break;

			case 1:
				if (this.app.mouseX > 900 && this.app.mouseX < 900 + this.continuar.width && this.app.mouseY > 500
					&& this.app.mouseY < 500 + this.continuar.height && this.audioEscuchado == true) {
					this.pantalla = 2;
					this.audioEscuchado = false;
				}

				if (this.app.mouseX > 450 && this.app.mouseX < 490 && this.app.mouseY > 130 && this.app.mouseY < 160) {
					this.audio1.play();
					this.audioEscuchado = true;
				}
				break;

			case 2:

				if (this.app.mouseX > 900 && this.app.mouseX < 900 + this.continuar.width && this.app.mouseY > 500
					&& this.app.mouseY < 500 + this.continuar.height && this.audioEscuchado == true && this.mostrar2 == false) {
					this.pantalla = 3;
					this.audioEscuchado = false;
				}

				for (var i = 0; i < this.opciones.length; i++) {

					if (this.app.mouseX > this.opciones[i].getX() - (((this.opciones[i].getImagen().width) / 2) / 1.2)
						&& this.app.mouseX < this.opciones[i].getX() + (((this.opciones[i].getImagen().width) / 2) / 1.2)
						&& this.app.mouseY > this.opciones[i].getY() - ((this.opciones[i].getImagen().height / 2) / 1.2)
						&& this.app.mouseY < this.opciones[i].getY() + (this.opciones[i].getImagen().height / 2) / 1.2
						&& this.mostrar1 == true) {
						this.respuestaSeleccionada = this.respuestas[i];
						console.log("cumplio");
						if (i == 0) {
							this.puntaje = 38;
						}
						if (i == 1) {
							this.puntaje = 6;
						}
						if (i == 2) {
							this.puntaje = 0;
						}
						console.log(this.puntaje);
					}
				}
				for (var i = 0; i < this.opciones1.length; i++) {

					if (this.app.mouseX > this.opciones1[i].getX() - (((this.opciones1[i].getImagen().width) / 2) / 1.2)
						&& this.app.mouseX < this.opciones1[i].getX() + (((this.opciones1[i].getImagen().width) / 2) / 1.2)
						&& this.app.mouseY > this.opciones1[i].getY() - ((this.opciones1[i].getImagen().height / 2) / 1.2)
						&& this.app.mouseY < this.opciones1[i].getY() + (this.opciones1[i].getImagen().height / 2) / 1.2
						&& this.mostrar2 == true) {
						this.respuestaSeleccionada1 = this.respuestas1[i];
						this.audioEscuchado = true;
						console.log("cumplio");
						if (i == 0) {
							this.puntaje1 = 38;
						}
						if (i == 1) {
							this.puntaje1 = 6;
						}
						if (i == 2) {
							this.puntaje1 = 0;
						}
						console.log(this.puntaje1);
					}
				}
				if (this.app.mouseX > 425 && this.app.mouseX < 465 && this.app.mouseY > 115 && this.app.mouseY < 155) {
					this.audio3.play();
				} else if (this.app.mouseX > 950 && this.app.mouseX < 980 && this.app.mouseY > 280 && this.app.mouseY < 300) {
					this.mostrar1 = true;
				} else if (this.app.mouseX > 1015 && this.app.mouseX < 1040 && this.app.mouseY > 320 && this.app.mouseY < 345) {
					this.mostrar2 = true;
				} else {
					this.mostrar1 = false;
					this.mostrar2 = false;
				}
				break;
			case 3:
				if (this.app.mouseX > 900 && this.app.mouseX < 900 + this.continuar.width && this.app.mouseY > 500
					&& this.app.mouseY < 500 + this.continuar.height && this.audioEscuchado == true) {
					this.pantalla = 4;
					this.audioEscuchado = false;
				}

				if (this.app.mouseX > 450 && this.app.mouseX < 490 && this.app.mouseY > 130 && this.app.mouseY < 160) {
					this.audio2.play();
					this.audioEscuchado = true;
				}
				break;
			case 4:
				if (this.app.mouseX > 900 && this.app.mouseX < 900 + this.continuar.width && this.app.mouseY > 500
					&& this.app.mouseY < 500 + this.continuar.height && this.audioEscuchado == true && this.mostrar4 == false) {
					this.pantalla = 5;
					this.audioEscuchado = false;
				}
				for (var i = 0; i < this.opciones2.length; i++) {

					if (this.app.mouseX > this.opciones2[i].getX() - (((this.opciones2[i].getImagen().width) / 2) / 1.2)
						&& this.app.mouseX < this.opciones2[i].getX() + (((this.opciones2[i].getImagen().width) / 2) / 1.2)
						&& this.app.mouseY > this.opciones2[i].getY() - ((this.opciones2[i].getImagen().height / 2) / 1.2)
						&& this.app.mouseY < this.opciones2[i].getY() + (this.opciones2[i].getImagen().height / 2) / 1.2
						&& this.mostrar3 == true) {
						this.audioEscuchado = true;
						this.respuestaSeleccionada2 = this.respuestas2[i];
						console.log("cumplio");
						if (i == 0) {
							this.puntaje2 = 38;
						}
						if (i == 1) {
							this.puntaje2 = 0;
						}
						if (i == 2) {
							this.puntaje2 = 6;
						}
						console.log(this.puntaje2);
					}
				}
				for (var i = 0; i < this.opciones3.length; i++) {

					if (this.app.mouseX > this.opciones3[i].getX() - (((this.opciones3[i].getImagen().width) / 2) / 1.2)
						&& this.app.mouseX < this.opciones3[i].getX() + (((this.opciones3[i].getImagen().width) / 2) / 1.2)
						&& this.app.mouseY > this.opciones3[i].getY() - ((this.opciones3[i].getImagen().height / 2) / 1.2)
						&& this.app.mouseY < this.opciones3[i].getY() + (this.opciones3[i].getImagen().height / 2) / 1.2
						&& this.mostrar4 == true) {
						this.respuestaSeleccionada3 = this.respuestas3[i];
						console.log("cumplio");
						if (i == 0) {
							this.puntaje3 = 38;
						}
						if (i == 1) {
							this.puntaje3 = 6;
						}
						if (i == 2) {
							this.puntaje3 = 0;
						}
						console.log(this.puntaje3);
					}
				}
				if (this.app.mouseX > 425 && this.app.mouseX < 465 && this.app.mouseY > 115 && this.app.mouseY < 155) {
					this.audio4.play();
				} else if (this.app.mouseX > 735 && this.app.mouseX < 760 && this.app.mouseY > 325 && this.app.mouseY < 350) {
					this.mostrar3 = true;
				} else if (this.app.mouseX > 1000 && this.app.mouseX < 1030 && this.app.mouseY > 280 && this.app.mouseY < 300) {
					this.mostrar4 = true;
				} else {
					this.mostrar3 = false;
					this.mostrar4 = false;
				}
				break;
			case 5:
				if (this.app.mouseX > 520 && this.app.mouseX < 520 + this.continuar.width && this.app.mouseY > 205
					&& this.app.mouseY < 205 + this.continuar.height) {
					// esta es la condicion para poder pasar al siguiente juego
					//	this.app.exit();

					/*
					///////////////////////////////////////////////////////////////////////////
					*/

					var total = this.puntaje + this.puntaje1 + this.puntaje2 + this.puntaje3;
					console.log(total);

					this.actividad.addState("total", total)
					this.actividad.addState("puntaje", this.puntaje)
					this.actividad.addState("puntaje1", this.puntaje1)
					this.actividad.addState("puntaje2", this.puntaje2)
					this.actividad.addState("puntaje3", this.puntaje3);

					this.actividad.addResult([
						{ id: CARRERAS.DERECHO, value: (total > 200 ? 200 : total) }
					])

					this.actividad.finish();

				}
				break;
		}
		this.actividad.addState("puntaje", this.puntaje)
		this.actividad.addState("puntaje1", this.puntaje1)
		this.actividad.addState("puntaje2", this.puntaje2)
		this.actividad.addState("puntaje3", this.puntaje3)
		this.actividad.addState("pantalla", this.pantalla)
	}

	definirImagenes() {

	}

	definirRespuestas() {
		// primera pregunta
		this.respuestas[0] = "está sobrecalificado";
		this.respuestas[1] = "podría calificar";
		this.respuestas[2] = "quizás no era...";

		// segunda pregunta
		this.respuestas1[0] = "Y a pesar de sus...";
		this.respuestas1[1] = "Y a pesar de sus...";
		this.respuestas1[2] = "Y quizás se perdió...";

		// tercera pregunta
		this.respuestas3[0] = "ya que mi cliente...";
		this.respuestas3[1] = "ya que mi se encuentra...";
		this.respuestas3[2] = "ya que mi cliente...";

		// cuarta pregunta
		this.respuestas2[0] = "hagan labor social...";
		this.respuestas2[1] = "hagan presenten...";
		this.respuestas2[2] = "le compensen...";
	}

}

export default Logica;
