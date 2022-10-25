import Question from "./questions";

class Question3 extends Question {

    constructor(posX, posY,app) {

        super(posX, posY);
        this.app = app;
        this.card = this.app.loadImage(this.path+"img/question3.png");
        

    }

    paint() {

        this.app.imageMode(this.app.CENTER);
        this.app.image(this.card, this.posX, this.posY);

    }

}
export default Question3;