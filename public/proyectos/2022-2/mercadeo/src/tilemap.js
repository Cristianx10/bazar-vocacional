// no compliquemos esto. No va a recibir nada siempre es lo mismo

class Tilemap {
	constructor(){
		this.cellArray = [];
		// celdas obstaculo
		this.noWalk = [
			{xPos: 5, yPos: 6}, 
			{xPos: 6, yPos: 5},
			{xPos: 7, yPos: 4},
			{xPos: 8, yPos: 3},
			{xPos: 2, yPos: 13},
			{xPos: 3, yPos: 12},
			{xPos: 4, yPos: 11},
			{xPos: 3, yPos: 14},
			{xPos: 4, yPos: 13},
			{xPos: 9, yPos: 10},
			{xPos: 10, yPos: 11},
			{xPos: 11, yPos: 12},
			{xPos: 12, yPos: 13},
			{xPos: 13, yPos: 14},
			{xPos: 14, yPos: 15},
			{xPos: 15, yPos: 16},
			{xPos: 16, yPos: 17},
			{xPos: 12, yPos: 7},
			{xPos: 13, yPos: 6},
			{xPos: 13, yPos: 8},
			{xPos: 14, yPos: 7},
			{xPos: 14, yPos: 9},
			{xPos: 15, yPos: 8},
			{xPos: 15, yPos: 10},
			{xPos: 16, yPos: 9},
			{xPos: 16, yPos: 11},
			{xPos: 17, yPos: 10},
			{xPos: 18, yPos: 11},
			{xPos: 17, yPos: 12},
			{xPos: 18, yPos: 13},
			{xPos: 19, yPos: 12},
			{xPos: 19, yPos: 14},
			{xPos: 20, yPos: 13},
			{xPos: 16, yPos: 3},
			{xPos: 16, yPos: 1},
			{xPos: 17, yPos: 2},
			{xPos: 17, yPos: 4},
			{xPos: 18, yPos: 3},
			{xPos: 18, yPos: 5},
			{xPos: 19, yPos: 4},
			{xPos: 19, yPos: 6},
			{xPos: 20, yPos: 5},
			{xPos: 20, yPos: 7},
			{xPos: 21, yPos: 6},
			{xPos: 21, yPos: 8},
			{xPos: 22, yPos: 7},
			{xPos: 22, yPos: 9},
			{xPos: 23, yPos: 8},
			{xPos: 23, yPos: 10}
		];
		this.hei = 13.8;
		this.wid = 29;
		this.gap = 56;
		this.genCells();
	}
	draw() {
		for(let f = 0; f < this.cellArray.length; f++){
			for(let g = 0; g < this.cellArray[f].length; g++){
				// celdas obstaculo son rofas
				stroke(250 * this.cellArray[f][g].type, 0, 100);
				strokeWeight(1);
				text(this.cellArray[f][g].xPos +", "+
					this.cellArray[f][g].yPos,
					(this.cellArray[f][g].xPos * this.wid), 
					(this.cellArray[f][g].yPos * this.hei) + this.gap);
				strokeWeight(2);
				point((this.cellArray[f][g].xPos * this.wid), 
					(this.cellArray[f][g].yPos * this.hei) + this.gap);
			}
		}
	}
	genCells(){
		// genera un arreglo de celdas caminables y no caminables
		for(let fil = 0; fil < 20; fil++){
			let colArray = [];
			for(let col = 0; col < 25; col++){
				let cType = 0;
				if((fil % 2) != 0 && (col % 2) === 0){
				// verifica si la celda no es caminable
					for(let no = 0; no < this.noWalk.length; no++){
						if(col === this.noWalk[no].xPos && 
							fil === this.noWalk[no].yPos){

							cType = 1;
						}
					}
					colArray.push({xPos: col, yPos: fil, type: cType});
				}

				if((fil % 2) === 0 && (col % 2) != 0){
					for(let no = 0; no < this.noWalk.length; no++){
						if(col === this.noWalk[no].xPos && 
							fil === this.noWalk[no].yPos){

							cType = 1;
						}
					}
					colArray.push({xPos: col, yPos: fil, type: cType});
				}

			}
			this.cellArray.push(colArray);
		}
	}

}
