import Question from "./questions";

class Question20 extends Question {

    constructor(posX, posY, app) {

        super(posX, posY, app);
        this.app = app;
        this.card = this.app.loadImage(this.path+"img/question20.png");

    }

    paint() {

        this.app.imageMode(this.app.CENTER);
        this.app.image(this.card, this.posX, this.posY);

    }

}
export default Question20;