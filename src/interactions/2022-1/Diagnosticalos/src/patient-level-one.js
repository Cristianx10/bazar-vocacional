import Answer from "./answer";
import Question from "./question";

class PatientLevelOne {
    constructor(app) {

        this.app = app;
        this.path = "/img/2022-01/diagnosticalos/";
        //Loading background image
        this.patient1 = this.app.loadImage(this.path+'images/patient1.jpg');

        //Questions
        this.questions = [];
        //Add question to list
        this.questions.push(new Question(404, 63, this.path+'images/level1/question1.png', 0,this.app));
        this.questions.push(new Question(472, 63, this.path+'images/level1/question2.png', 5,this.app));
        this.questions.push(new Question(541, 63, this.path+'images/level1/question3.png', 5,this.app));
        this.questions.push(new Question(606, 63, this.path+'images/level1/question4.png', 0,this.app));

        //Answers 
        this.answers = [];
        //Add answers to the list
        this.answers.push(new Answer(this.path+'images/level1/answer1.png',this.app));
        this.answers.push(new Answer(this.path+'images/level1/answer2.png',this.app));
        this.answers.push(new Answer(this.path+'images/level1/answer3.png',this.app));
        this.answers.push(new Answer(this.path+'images/level1/answer4.png',this.app));

        //Buttons
        this.diagnosisBtn = this.app.loadImage(this.path+'images/diagnosis_btn.png');
        this.bookBtn = this.app.loadImage(this.path+'images/book_btn.png');
        this.sides1 = 110;
        this.sides2 = 110;

        //Variables
        this.firstClick = false;
        this.chosenQ = 0;
        this.clickBook = false;
        this.clickDiagnosis = 0;
        this.score = 0;

        //timer
        
    }

    draw() {
        //Background image
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.patient1, 0, 0, 1280, 720);

        //Draw questions
        for (let index = 0; index < this.questions.length; index++) {
            this.questions[index].draw();    
        }

        //Draw answers
        if (this.firstClick) {
            this.answers[this.chosenQ].draw(); 
        }

        //Drawing buttons
        this.app.imageMode(this.app.CENTER);
        this.app.image(this.diagnosisBtn, 1205, 80, this.sides1, this.sides1);
        this.app.image(this.bookBtn, 1205, 200, this.sides2, this.sides2);
        this.hover();

        //Drawing score
        this.app.fill(255);
        this.app.rect(640, 25, 180, 75, 10);
        this.app.noStroke();
        this.app.fill(72, 72, 72);
        this.app.textSize(16);
        this.app.text('PUNTAJE: ' + this.score, 655, 55);
        this.app.text('TIEMPO: ', 655, 85);

    }

    

    hover() {
        //Diagnosis button
        if (this.app.dist(this.app.mouseX, this.app.mouseY, 1205, 80) < 100) {
            this.sides1 = 130;
        } else {this.sides1 = 110;}

        //Book button
        if (this.app.dist(this.app.mouseX, this.app.mouseY, 1205, 200) < 100) {
            this.sides2 = 130;
        } else {this.sides2 = 110;}
    }

    clicked() {
        //When clicking on questions
        for (let index = 0; index < this.questions.length; index++) {
            if (this.questions[index].clicked()) {
                //Make sure that the index variable isnt null and then asign value
                this.firstClick = true;
                this.chosenQ = index; 
                
                //Add points
                this.score += this.questions[index].getPoints();

                //Hide question
                this.questions[index].setClick(true);
            }
        }

        ///When clicking on diagnosis button
        if (this.app.dist(this.app.mouseX, this.app.mouseY, 1205, 80) < 100) {
            this.clickDiagnosis++;
        } 

        //When clicking on symptoms book
        if (this.app.dist(this.app.mouseX, this.app.mouseY, 1205, 200) < 100) {
            this.clickBook = true;
        }
    }

    setClickDiagnosis(click) {
        this.clickDiagnosis = click;
    }

    isClickBook() {
        return this.clickBook;
    }

    isClickDiagnosis() {
        return this.clickDiagnosis;
    }

    getScore() {
        return this.score;
    }
}

export default PatientLevelOne;