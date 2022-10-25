class Answer {
    constructor(img,app) {
        //Image variables
        this.x = 685;
        this.y = 490;
        this.app = app;
        this.width = 570;
        this.height = 280;

        //Loading answer image
        this.img = this.app.loadImage(img);
    }

    draw() {
        this.app.image(this.img, this.x, this.y, this.width, this.height);
    }
}

export default Answer;