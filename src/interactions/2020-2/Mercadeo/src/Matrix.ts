import p5 from 'p5';
class Matrix {

    private posX: number;
    private posY: number;

    private matrix: number[][];
    private app: p5;
    private title1: p5.Image;
    private title2: p5.Image;

    constructor(matrix: number[][], posX: number, posY: number, app: p5) {
        this.posX = posX;
        this.posY = posY;
        this.app = app;

        this.title1 = app.loadImage("/img/2020-2/mercadeo/bg/title1.png");
        this.title2 = app.loadImage("/img/2020-2/mercadeo/bg/title2.png");

        this.matrix = matrix;

    }

    draw() {
        for (var row = 0; row < 6; row++) {
            for (var col = 0; col < 6; col++) {
                switch (this.matrix[row][col]) {
                    case 0:
                        this.app.image(this.title1, this.posX + (100 * col), this.posY + (100 * row));
                        break;
                    case 1:
                        this.app.image(this.title2, this.posX + (100 * col), this.posY + (100 * row));
                        break;

                }
            }
        }
    }


}


export default Matrix;