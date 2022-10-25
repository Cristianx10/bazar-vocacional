import p5 from 'p5';
class BirdSlot {

    app: p5;

    posX: number;
    posY: number;
    width: number;
    height: number;
    img: p5.Image;
    constructor(app: p5, posX: number, posY: number, img: p5.Image) {
        this.app = app;
        this.posX = posX;
        this.posY = posY;
        this.width = 80;
        this.height = 87;
        this.img = img;
    }

    paint() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.img, this.posX, this.posY);
    }
}

export default BirdSlot;