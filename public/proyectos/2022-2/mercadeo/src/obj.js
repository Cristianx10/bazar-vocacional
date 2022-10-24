class Obj {
	constructor(x1, y1, x2, y2, x3, y3, x4, y4, image) {
		//Left corner
		this.x1 = x1;
		this.y1 = y1;

		//Rigth corner
		this.x2 = x2;
		this.y2 = y2;

		//Rigth bottom corner
		this.x3 = x3;
		this.y3 = y3;

		//Left bottom corner
		this.x4 = x4;
		this.y4 = y4;

		this.image = image;

		this.center = () => {
			let centerPos = [];
			
			// Agrega la mitad del tamaño de la segunda coordenada a la primera
			// (1--*--2)
			centerPos.push(this.x1 + (this.x2 / 2));
			let upCorn;
			let dnCorn;

			// Elige cuales son las esquinas mas altas y mas bajas
			if (this.y1 > this.y2) {
				upCorn = this.y1;
			}
			if (this.y2 > this.y1) {
				upCorn = this.y2;
			}
			if (this.y1 === this.y2) {
				upCorn = this.y1;
			}

			if (this.y3 < this.y4) {
				dnCorn = this.y3;
			}
			if (this.y4 < this.y3) {
				dnCorn = this.y4;
			}
			if (this.y4 === this.y3) {
				dnCorn = this.y4;
			}

			// Agrega la mitad de la esquina inferior a la superior
			/* upCorn
			*  |
			*  |
			*  MITAD
			*  |
			*  |
			*  dnCorn
			*/
			centerPos.push(upCorn + (dnCorn / 2));

			// Retorna esto:
			/*    upC
			 *     |
			 * X1--M--X2
			 *     |
			 *    dnC
			 */

			return centerPos;
		};
		//// tal vez esto no era muy necesario

	}

	draw() {
		if (this.image != undefined) {
			image(this.image, this.x, this.y, this.width, this.height);
		} else {
			fill(0);
			quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
		}
	}

	getPos() { 
		let pos = [this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4];
		return pos;
		
	}
}
