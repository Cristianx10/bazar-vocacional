class Student {

    constructor(posX, posY, app) {

        this.posX = posX;
        this.posY = posY;
        this.app = app;
        this.path = "/img/2022-01/counceling/"


        this.calledTeacher = false;
        this.questionActive = false;

        this.questionMark = this.app.loadImage(this.path +"img/question.png");
        this.questionField = this.app.loadImage(this.path +"img/questionField.png");

        this.questionOne = this.app.loadImage(this.path +"img/question1.png");
        /*this.questionTwo = loadImage("./img/question2.png");
        this.questionThree = loadImage("./img/question3.png");
        this.questionFour = loadImage("./img/question4.png");
        this.questionFive = loadImage("./img/question5.png");
        this.questionSix = loadImage("./img/question6.png");
        this.questionSeven = loadImage("./img/question7.png");
        this.questionEight = loadImage("./img/question8.png");
        this.questionNine = loadImage("./img/question9.png");
        this.questionTen = loadImage("./img/question10.png");
        this.questionEleven = loadImage("./img/question11.png");
        this.questionTwelve = loadImage("./img/question12.png");
       */

       // this.intervalId;

    }

    paint() {

    }

    callTeacher() {

        if (this.calledTeacher) {

            this.app.imageMode(this.app.CENTER);
            this.app.image(this.questionMark, this.posX - 100, this.posY - 75);

        }

    }

    showQuestion() {

        this.app.fill(0);
        this.app.rect(this.posX - 150, this.posY - 75, 150, 50);

        /*rect(307, 52, 680, 350);*/
    }

    showProblem() {

        //fill(0);
        //rect(348, 52, 550, 350);
        this.app.imageMode(this.app.CENTER);
        this.app.image(this.questionField, 608, 330);
        /* let cards = [
             { name: "question1", img: "./img/question1.png" },
             { name: "question2", img: "./img/question2.png" },
             { name: "question3", img: "./img/question3.png" },
             { name: "question4", img: "./img/question3.png" },
             { name: "question5", img: "./img/question3.png" },
             { name: "question6", img: "./img/question3.png" },
             { name: "question7", img: "./img/question3.png" },
             { name: "question8", img: "./img/question3.png" },
             { name: "question9", img: "./img/question3.png" },
             { name: "question10", img: "./img/question3.png" },
             { name: "question11", img: "./img/question3.png" },
             { name: "question12", img: "./img/question3.png" },
             { name: "question13", img: "./img/question3.png" },
         ];


         
         for (let index = 0; 1 < cards.length; index++) {
             //const element = array[index];
             imageMode(CENTER);

             image(this.cards[2], 608, 330);






         }*/
    }

   /* stopCallingTeacher() {

        clearInterval(this.intervalId);

    }*/

}
export default Student;