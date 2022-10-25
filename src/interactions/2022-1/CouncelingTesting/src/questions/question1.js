import Question from "./questions";

class Question1 extends Question {

    constructor(posX, posY, app, student1) {

        super(posX, posY);
        this.app = app;

        this.student1 = student1;

        this.card = this.app.loadImage(this.path+"img/question1.png");

    }

    paint() {

        if(this.student1.calledTeacher){

            this.app.imageMode(this.app.CENTER);
            this.app.image(this.card, this.posX, this.posY);

        }

    }

}

export default Question1;