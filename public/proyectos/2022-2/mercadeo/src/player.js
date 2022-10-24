class Player {

	constructor(xCell, yCell, imageObject) {
		this.currPos = [xCell, yCell];
		this.pastPos = [xCell, yCell];
		this.x = (this.currPos[0]);
		this.y = (this.currPos[1]);
		this.width = 40;
		this.height = 44;
		this.imageObject = imageObject;  // receives frame array
		this.state = 0;  // Current frame
		this.prevState = 0;

		this.heldObject = false;
	}

	draw(tileMap) {
		this.x = (this.currPos[0] * tileMap.wid) - this.width / 2;
		this.y = (this.currPos[1] * tileMap.hei) + tileMap.gap - this.height;
		this.center = [this.x + (this.width / 2), this.y + (this.height / 2)];
		image(this.imageObject[this.state], this.x, this.y, this.width, this.height);
	}

	upDatePos(tileMap, temPos) {
		for (let n = 0; n < tileMap.noWalk.length; n++){
			if((temPos[0] === tileMap.noWalk[n].xPos &&
				temPos[1] === tileMap.noWalk[n].yPos)
				|| temPos[0] < 0 || temPos[1] < 0){
				temPos = this.currPos;
			}
		}
		this.currPos = temPos;
		if (((this.currPos[0] * tileMap.wid) - this.width / 2) > 640
			|| ((this.currPos[1] * tileMap.hei)
				+ tileMap.gap - this.height) > 300){
			this.currPos = this.pastPos;
		}

		this.pastPos = this.currPos;
	}

	move(input, tileMap) {
		let temPos;
		// 0: up, 1: down, 2: left, 3: right
		switch (input) {
			case 0:
				temPos = [this.currPos[0] + 1, this.currPos[1] - 1];
				this.upDatePos(tileMap,temPos);
				this.state = 2;
				break;

			case 1:
				temPos = [this.currPos[0] - 1, this.currPos[1] + 1];
				this.upDatePos(tileMap,temPos);
				if (this.prevState === 1) {
					this.state = 1;
				} else {
					this.state = 0;
				}
				break;

			case 2:
				temPos = [this.currPos[0] - 1, this.currPos[1] - 1];
				this.upDatePos(tileMap,temPos);
				this.state = 1;
				this.prevState = 1;
				break;

			case 3:
				temPos = [this.currPos[0] + 1, this.currPos[1] + 1];
				this.upDatePos(tileMap,temPos);
				this.state = 0;
				this.prevState = 0;
				break;
		}
	}


	isNear(object, distance){
		if (dist(this.center[0], this.center[1], object.x, object.y) < distance){
			return true;
		} else {
			return false;
		}
	}

	holdItem(object){
		object.x = this.x + 20;
		object.y = this.y + 10;
	}

	getX() { 
		return this.x
	}

	getY() { 
		return this.y
	}

	setX(x) { 
		this.x = x;
	}
	setY(y) { 
		this.y = y;
	}

	getState() { 
		return this.state;
	}
	setState(e) { 
		this.state = e;
	}
}
