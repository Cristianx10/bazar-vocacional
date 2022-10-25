import Brick from "./Brick";
import p5 from 'p5';

class OrangeBrick extends Brick {
    constructor(posX: number, posY: number, size: number, axis: string, app: p5) {
        super(posX, posY, size, axis, app);
        this.img = app.loadImage("/img/2020-2/mercadeo/bricks/OrangeBrick-" + this.axis + "-" + this.size + ".png");
    }
}

export default OrangeBrick;