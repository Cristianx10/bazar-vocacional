import p5 from 'p5';

import Brick from "./Brick";

class YellowBrick extends Brick {

    constructor(posX: number, posY: number, axis: string, app: p5) {
        super(posX, posY, undefined, axis, app);
        this.img = this.app.loadImage("/img/2020-2/mercadeo/bricks/YellowBrick.png");
    }

}

export default YellowBrick;