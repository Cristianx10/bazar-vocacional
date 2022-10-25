import p5 from 'p5';

import Brick from './Brick';
class Logic {

    private app: p5;
    private minutes: number;
    private seconds: number;
    private time: string;
    private hint1: p5.Image;
    private hint2: p5.Image;

    private poppinsRegular: p5.Font;

    constructor(app: p5) {
        this.app = app;
        this.minutes = 5;
        this.seconds = 0;
        this.time = "";
   
        this.poppinsRegular = app.loadFont("/img/2020-2/mercadeo/font/Poppins-Regular.ttf");
        this.hint1 = app.loadImage("/img/2020-2/mercadeo/bg/hint.png");
        this.hint2 = app.loadImage("/img/2020-2/mercadeo/bg/hint2.png");

        
    }

    timer() {
        if (this.app.frameCount % 60 == 0) {
            this.seconds--;
        }
        if (this.seconds < 0) {
            this.minutes--;
            this.seconds = 59;
        }

        this.time = this.minutes + ":" + this.app.nf(this.seconds, 2);
    }

    hint() {
        var axisX = this.app.mouseX > 1170 && this.app.mouseX < 1170 + this.hint1.width;
        var axisY = this.app.mouseY > 40 && this.app.mouseY < 40 + this.hint1.height;
        if (axisX && axisY) {
            this.app.noStroke();
            this.app.fill(0, 150);
            this.app.rect(0, 0, 1280, 720);
            this.app.image(this.hint2, 970, 40);

            var hintText = "Deberás hacer clic y arrastrar las fichas con el ratón de tu computadora según la orientación que tengan (vertical u horizontalmente). ";
            this.app.textAlign(this.app.CENTER, this.app.TOP);
            this.app.fill(87, 24, 69);
            this.app.textFont(this.poppinsRegular, 15);
            this.app.textLeading(22);
            this.app.text(hintText, 995, 96, 200, 138);
        } else {
            this.app.image(this.hint1, 1170, 40);
        }
    }

    validateIntersectionH(b1: Brick, b2: Brick) {

        var b1Img = b1.getImg();
        var b2Img = b2.getImg();

        if (b1Img && b2Img) {
            var axisX = b1.getPosX() + b1Img.width > b2.getPosX() && b1.getPosX() < b2.getPosX() + b2Img.width;
            var axisY = b1.getPosY() + b1Img.height > b2.getPosY() && b1.getPosY() < b2.getPosY() + b2Img.height;
            if (axisX && axisY) {
                if (b1.getPosX() + b1Img.width > b2.getPosX() && b1.getPosX() + b1Img.width < b2.getPosX() + b2Img.width) {
                    b1.setPosX(b1.getPosX() - 1);
                } else if (b1.getPosX() > b2.getPosX() && b1.getPosX() < b2.getPosX() + b2Img.width) {
                    b1.setPosX(b1.getPosX() + 1);
                }
                b1.setLocked(false);
            }
        }


    }

    validateIntersectionV(b1: Brick, b2: Brick) {

        var b1Img = b1.getImg();
        var b2Img = b2.getImg();
        if (b1Img && b2Img) {
            var axisX = b1.getPosX() + b1Img.width > b2.getPosX() && b1.getPosX() < b2.getPosX() + b2Img.width;
            var axisY = b1.getPosY() + b1Img.height > b2.getPosY() && b1.getPosY() < b2.getPosY() + b2Img.height;
            if (axisX && axisY) {
                if (b1.getPosY() + b1Img.height > b2.getPosY() && b1.getPosY() + b1Img.height < b2.getPosY() + b2Img.height) {
                    b1.setPosY(b1.getPosY() - 1);
                } else if (b1.getPosY() > b2.getPosY() && b1.getPosY() < b2.getPosY() + b2Img.height) {
                    b1.setPosY(b1.getPosY() + 1);
                }
                b1.setLocked(false);
            }
        }
    }

    getTime() {
        return this.time;
    }
}


export default Logic;