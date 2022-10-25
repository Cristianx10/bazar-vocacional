import p5 from 'p5';
class Button {

    private posX: number;
    private posY: number;
    private width: number;
    private height: number;

    private focus: boolean;
    private text: string;
    private font: p5.Font;
    private app: p5;

    constructor(posX: number, posY: number, width: number, height: number, text: string, app: p5) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.text = text;
        this.app = app;
        this.font = app.loadFont("/img/2020-2/mercadeo/font/Poppins-Regular.ttf");
        this.focus = false;
    }

    draw() {
        this.app.noStroke();

        this.focus = this.app.mouseX > this.posX && this.app.mouseX < this.posX + this.width && this.app.mouseY > this.posY && this.app.mouseY < this.posY + this.height;

        if (this.focus) {
            this.app.fill(230);
        } else {
            this.app.fill(255);
        }

        this.app.rect(this.posX, this.posY, this.width, this.height);
        this.app.fill(87, 24, 69);
        this.app.textFont(this.font, 24);
        this.app.textAlign(this.app.CENTER, this.app.CENTER);
        this.app.text(this.text, this.posX + (this.width / 2), this.posY + (this.height / 2) - 5);
    }

    isFocus() {
        return this.focus;
    }

    setFocus(focus: boolean) {
        this.focus = focus;
    }
}

export default Button;