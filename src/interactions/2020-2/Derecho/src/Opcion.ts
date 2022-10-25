import p5 from 'p5';

class Opcion {
	app: p5;
	private x: number;
	private y: number;
	private size: number;
	private margen: number;
	private volverX: number;
	private volverY: number;

	private seleccionado: boolean;
	private imagen: p5.Image;
	private texto: string;
	private nombreImagen: string;


	constructor(app: p5, nombreImagen: string) {
		this.app = app;
		this.nombreImagen = nombreImagen;
		this.seleccionado = false;
		this.imagen = app.loadImage(nombreImagen);

		this.x = 0;
		this.y = 0;
		this.size = 0;
		this.margen = 0;
		this.volverX = 0;
		this.volverY = 0;

		this.texto = "";
	}

	pintar(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.app.fill(255);
		this.app.image(this.imagen, x, this.y, (this.imagen.width / 1.2), (this.imagen.height / 1.2));
		this.app.fill(0);
	}

	arrastrar() {
		this.x = this.app.mouseX;
		this.y = this.app.mouseY;
	}

	soltar() {
		this.x = this.volverX;
		this.y = this.volverY;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getImagen() {
		return this.imagen;
	}

	setX(x: number) {
		this.x = x;
	}

	setY(y: number) {
		this.y = y;
	}

	getTexto() {
		return this.texto;
	}

}

export default Opcion;