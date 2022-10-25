import Answer from "./answer";
import Question from "./question";

class PatientLevelThree {
    constructor(app){

        this.app = app;
        this.path = "/img/2022-01/diagnosticalos/";
        //Loading background images
        this.patient4 = this.app.loadImage(this.path+'images/patient4.jpg');
        this.patient5 = this.app.loadImage(this.path+'images/patient5.jpg');
        this.patient6 = this.app.loadImage(this.path+'images/patient6.jpg');

        //Questions patient 1
        this.questions1 = [];
        //Add question to list
        this.questions1.push(new Question(334, 48, this.path+'images/level3/question1.png', 5, this.app));
        this.questions1.push(new Question(381, 48, this.path+'images/level3/question2.png', 5, this.app));
        this.questions1.push(new Question(430, 48, this.path+'images/level3/question3.png', 0, this.app));
        this.questions1.push(new Question(478, 48, this.path+'images/level3/question4.png', 0, this.app));
        this.questions1.push(new Question(526, 48, this.path+'images/level3/question5.png', 0, this.app));
        this.questions1.push(new Question(575, 48, this.path+'images/level3/question6.png', 5, this.app));
        this.questions1.push(new Question(624, 48, this.path+'images/level3/question7.png', 5, this.app));

        //Questions patient 2
        this.questions2 = [];
        //Add question to list
        this.questions2.push(new Question(334, 48, this.path+'images/level3/question15.png', 0, this.app));
        this.questions2.push(new Question(381, 48, this.path+'images/level3/question16.png', 5, this.app));
        this.questions2.push(new Question(430, 48, this.path+'images/level3/question17.png', 5, this.app));
        this.questions2.push(new Question(478, 48, this.path+'images/level3/question18.png', 0, this.app));
        this.questions2.push(new Question(526, 48, this.path+'images/level3/question19.png', 5, this.app));
        this.questions2.push(new Question(575, 48, this.path+'images/level3/question20.png', 5, this.app));
        this.questions2.push(new Question(624, 48, this.path+'images/level3/question21.png', 0, this.app));

        //Questions patient 3
        this.questions3 = [];
        //Add question to list
        this.questions3.push(new Question(334, 48, this.path+'images/level3/question8.png', 5, this.app));
        this.questions3.push(new Question(381, 48, this.path+'images/level3/question9.png', 5, this.app));
        this.questions3.push(new Question(430, 48, this.path+'images/level3/question10.png', 5, this.app));
        this.questions3.push(new Question(478, 48, this.path+'images/level3/question11.png', 5, this.app));
        this.questions3.push(new Question(526, 48, this.path+'images/level3/question12.png', 0, this.app));
        this.questions3.push(new Question(575, 48, this.path+'images/level3/question13.png', 0, this.app));
        this.questions3.push(new Question(624, 48, this.path+'images/level3/question14.png', 0, this.app));

        //Answers patient 1
        this.answers1 = [];
        //Add answers1 to the list
        this.answers1.push(new Answer(this.path+'images/level3/answer1.png', this.app));
        this.answers1.push(new Answer(this.path+'images/level3/answer2.png', this.app));
        this.answers1.push(new Answer(this.path+'images/level3/answer3.png', this.app));
        this.answers1.push(new Answer(this.path+'images/level3/answer4.png', this.app));
        this.answers1.push(new Answer(this.path+'images/level3/answer5.png', this.app));
        this.answers1.push(new Answer(this.path+'images/level3/answer6.png', this.app));
        this.answers1.push(new Answer(this.path+'images/level3/answer7.png', this.app));

        //Answers patient 2
        this.answers2 = [];
        //Answers patient 2
        this.answers2.push(new Answer(this.path+'images/level3/answer15.png', this.app));
        this.answers2.push(new Answer(this.path+'images/level3/answer16.png', this.app));
        this.answers2.push(new Answer(this.path+'images/level3/answer17.png', this.app));
        this.answers2.push(new Answer(this.path+'images/level3/answer18.png', this.app));
        this.answers2.push(new Answer(this.path+'images/level3/answer19.png', this.app));
        this.answers2.push(new Answer(this.path+'images/level3/answer20.png', this.app));
        this.answers2.push(new Answer(this.path+'images/level3/answer21.png', this.app));

        //Answers patient 3
        this.answers3 = [];
        //Answers patient 3
        this.answers3.push(new Answer(this.path+'images/level3/answer8.png', this.app));
        this.answers3.push(new Answer(this.path+'images/level3/answer9.png', this.app));
        this.answers3.push(new Answer(this.path+'images/level3/answer10.png', this.app));
        this.answers3.push(new Answer(this.path+'images/level3/answer11.png', this.app));
        this.answers3.push(new Answer(this.path+'images/level3/answer12.png', this.app));
        this.answers3.push(new Answer(this.path+'images/level3/answer13.png', this.app));
        this.answers3.push(new Answer(this.path+'images/level3/answer14.png', this.app));

        //Buttons
        this.diagnosisBtn =this.app.loadImage(this.path+'images/diagnosis_btn.png');
        this.bookBtn = this.app.loadImage(this.path+'images/book_btn.png');
        this.sides1 = 110;
        this.sides2 = 110;

        //Variables
        this.firstClick = false;
        this.firstClick2 = false;
        this.firstClick3 = false;
        this.chosenQ = 0;
        this.chosenQ2= 0;
        this.chosenQ3= 0;
        this.clickBook = false;
        this.clickDiagnosis = 0;
        this.score = 0;
    }

    //Summarize all drawing processes
    drawingSum(img, questions, answers, click, chosen) {
        this.app.imageMode(this.app.CORNER);
        this.app.image(img, 0, 0, 1280, 720);

        //Draw questions
        for (let index = 0; index < questions.length; index++) {
            questions[index].draw();
        }

        //Draw answers to those questions
        if (click) {
            answers[chosen].draw();
        }
    }

    //Draw everything for patient1
    drawPatient1() {
        this.drawingSum(this.patient4, this.questions1, this.answers1, this.firstClick, this.chosenQ);
    }

    drawPatient2() {
        this.drawingSum(this.patient5, this.questions2, this.answers2, this.firstClick2, this.chosenQ2);
    }

    drawPatient3() {
        this.drawingSum(this.patient6, this.questions3, this.answers3, this.firstClick3, this.chosenQ3);
    }

    draw(){
        this.app.imageMode(this.app.CORNER);

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

    clickPatient1() {
        for (let index = 0; index < this.questions1.length; index++) {
            if (this.questions1[index].clicked()) {
                //Make sure that the index variable isnt null and then asign value
                this.firstClick = true;
                this.chosenQ = index;

                //Add points
                this.score += this.questions1[index].getPoints();

                //Hide question
                this.questions1[index].setClick(true);
            }  
        }
    }

    clickPatient2() {
        for (let index = 0; index < this.questions2.length; index++) {
            if (this.questions2[index].clicked()) {
                //Make sure that the index variable isnt null and then asign value
                this.firstClick2 = true;
                this.chosenQ2 = index;

                //Add points
                this.score += this.questions2[index].getPoints();

                //Hide question
                this.questions2[index].setClick(true);
            }  
        }
    }

    clickPatient3() {
        for (let index = 0; index < this.questions3.length; index++) {
            if (this.questions3[index].clicked()) {
                //Make sure that the index variable isnt null and then asign value
                this.firstClick3 = true;
                this.chosenQ3 = index;

                //Add points
                this.score += this.questions3[index].getPoints();

                //Hide question
                this.questions3[index].setClick(true);
            }  
        }
    }

    clicked() {
        ///When clicking on diagnosis button
        if (this.app.dist(this.app.mouseX, this.app.mouseY, 1205, 80) < 100) {
            this.clickDiagnosis++;
        } 

        //When clicking on symptoms book
        if (this.app.dist(this.app.mouseX, this.app.mouseY, 1205, 200) < 100) {
            this.clickBook = true;
        }
    }

    isClickBook() {
        return this.clickBook;
    }

    isClickDiagnosis() {
        return this.clickDiagnosis;
    }

    setClickDiagnosis(clickDiagnosis) {
        this.clickDiagnosis = clickDiagnosis;
    }

    getScore(){
        return this.score;
    }
}

export default PatientLevelThree;