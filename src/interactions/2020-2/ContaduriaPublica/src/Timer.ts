import p5 from 'p5';
class Timer {

    app: p5;

    posX: number;
    posY: number;
    time: number;
    maxTime: number;
    width: number;
    red: number;
    green: number;
    blue: number;
    isRunning: boolean;
    fontRegular: p5.Font;

    constructor(app: p5, posX: number, posY: number) {
        this.app = app;
        this.posX = posX;
        this.posY = posY;
        this.time = 300;
        this.maxTime = 300;
        this.width = 180;
        this.red = 129;
        this.green = 182;
        this.blue = 164;
        this.isRunning = false;
        this.fontRegular = this.app.loadFont('/img/2020-2/contaduria-publica/font/Montserrat-Regular.ttf');
    }

    paint() {
        this.app.fill("#525252")
        this.app.textSize(20);
        this.app.textFont(this.fontRegular);
        this.app.text("Tiempo: ", 66.09, 60);
        this.app.fill(255);
        this.app.noStroke();
        this.app.rect(66.09, 82, this.width, 19, 8);

        this.app.fill(this.red, this.green, this.blue);
        this.app.noStroke();
        this.app.rect(66.09, 82, this.width * (this.time / this.maxTime), 19, 8);

        this.app.stroke("#848484")
        this.app.strokeWeight(2);
        this.app.noFill();
        this.app.rect(66.09, 82, this.width, 19, 8);
        this.app.strokeWeight(1);

        if (this.isRunning) {
            if (this.app.frameCount % 60 == 0) {
                this.time--;
            }
        }

        if (this.time <= 180 && this.time >= 75) {
            this.red = 235;
            this.green = 179;
            this.blue = 58;

        } else if (this.time <= 100) {
            this.red = 233;
            this.green = 20;
            this.blue = 100;
        } else {
            this.red = 129;
            this.green = 182;
            this.blue = 164;
        }

        if (this.time <= 0) {
            this.isRunning = false;
        }
    }
}

export default Timer;