import CARRERAS from "../../../../constants/observer";
import Question1 from "./questions/question1";
import Question10 from "./questions/question10";
import Question11 from "./questions/question11";
import Question12 from "./questions/question12";
import Question13 from "./questions/question13";
import Question14 from "./questions/question14";
import Question15 from "./questions/question15";
import Question16 from "./questions/question16";
import Question17 from "./questions/question17";
import Question18 from "./questions/question18";
import Question19 from "./questions/question19";
import Question2 from "./questions/question2";
import Question20 from "./questions/question20";
import Question21 from "./questions/question21";
import Question22 from "./questions/question22";
import Question3 from "./questions/question3";
import Question4 from "./questions/question4";
import Question5 from "./questions/question5";
import Question6 from "./questions/question6";
import Question7 from "./questions/question7";
import Question8 from "./questions/question8";
import Question9 from "./questions/question9";
import Student1 from "./students/student1";
import Student2 from "./students/student2";
import Student3 from "./students/student3";
import Student4 from "./students/student4";
import Student5 from "./students/student5";
import Student6 from "./students/student6";

let NameCarrera = "LICENCIATURA_IDIOMAS"; // poner el nombre de la carrera;

let path = "/img/2022-01/counceling/"; //crear la variable path, se deja vacia, Se añade al lado de cada ruta de las imagenes o fuentes;

//nunito = app.loadFont(path+'fonts/nunito-bold.ttf'); //ejemplo

let app; // crear la variable de la siguiente forma y agregarla a cada metodos
//app.loadFont //ejemplo

let actividad; // crear la variable actividad

//metodos a añadir

//actividad.addResult([{id:NameCarrera, value:puntaje}]); // guarda el puntaje total de la interaccion en la app
//actividad.addState("parametro", value); // guarda variables extras que deseen analizar para la interaccion
//actividad.addState("pantalla1", pantalla1Time); // ejemplo
//actividad.finish() // se pone donde acaba la interaccion, esta salta directamente a la pantalla siguiente, para que tengan en cuenta por si tienen una pantalla final que deseen que se muestre durante cierto tiempo

let student1, student2, student3, student4, student5, student6;
let timeout_phase1, timeout2_phase1, timeout3_phase1, timeout4_phase1, timeout5_phase1;
let timeout_phase2, timeout2_phase2, timeout3_phase2, timeout4_phase2, timeout5_phase2;

let screenPic1, screenPic2, screenPic3, screenPic4, screenPic5, screenPic6;

let screen;

let madTimer;

let studentsArr;

let phaseNum;

let bg, desk;

let timerValue, timerValueMinutes;

let gameCanvas;

let questionCounter; //contador de pregunta

let score;

let q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22;

let qC1, qC2, qC3, qC4, qC5, qC6, qC7, qC8, qC9, qC10, qC11, qC12, qC13, qC14, qC15, qC16, qC17, qC18, qC19, qC20, qC21, qC22;

let questionArr;

let q1C, q2C, q3C, q4C, q5C, q6C, q7C, q8C, q9C, q10C, q11C, q12C, q13C, q14C, q15C, q16C, q17C, q18C, q19C, q20C, q21C, q22C; //booleanos para definir si la pregunta es :) o :(

let questionBooleanArr;

function preload(aplicacion) {

  app = aplicacion;
  screenPic1 = app.loadImage(path + "img/screen1.png");
  screenPic2 = app.loadImage(path + "img/screen2.png");
  screenPic3 = app.loadImage(path + "img/screen3.png");
  screenPic4 = app.loadImage(path + "img/screen4.png");
  screenPic5 = app.loadImage(path + "img/screen5.png");
  //screenPic6 = loadImage("img/screen6.png");


  //preguntas pics

  q1 = app.loadImage(path + "img/question1.png");
  q2 = app.loadImage(path + "img/question2.png");
  q3 = app.loadImage(path + "img/question3.png");
  q4 = app.loadImage(path + "img/question4.png");
  q5 = app.loadImage(path + "img/question5.png");
  q6 = app.loadImage(path + "img/question6.png");
  q7 = app.loadImage(path + "img/question7.png");
  q8 = app.loadImage(path + "img/question8.png");
  q9 = app.loadImage(path + "img/question9.png");
  q10 = app.loadImage(path + "img/question10.png");
  q11 = app.loadImage(path + "img/question11.png");
  q12 = app.loadImage(path + "img/question12.png");
  q13 = app.loadImage(path + "img/question13.png");
  q14 = app.loadImage(path + "img/question14.png");
  q15 = app.loadImage(path + "img/question15.png");
  q16 = app.loadImage(path + "img/question16.png");
  q17 = app.loadImage(path + "img/question17.png");
  q18 = app.loadImage(path + "img/question18.png");
  q19 = app.loadImage(path + "img/question19.png");
  q20 = app.loadImage(path + "img/question20.png");
  q21 = app.loadImage(path + "img/question21.png");
  q22 = app.loadImage(path + "img/question22.png");
 

  bg = app.loadImage(path + "img/bg.png");
  desk = app.loadImage(path + "img/desk.png");
}

function setup() {
  //gameCanvas = app.createCanvas(1280, 720);

  //gameCanvas.parent("gameContainer");

  phaseNum = 0;
  screen = 0;
  questionCounter = 0;
  score = 0;

  student1 = new Student1(258, 174, app);
  student2 = new Student2(202, 351, app);
  student3 = new Student3(144, 502, app);
  student4 = new Student4(975, 215, app);
  student5 = new Student5(1052, 351, app);
  student6 = new Student6(1132, 531, app);

  studentsArr = [student1, student2, student3, student4, student5, student6];

  questionBooleanArr = [q1C, q2C, q3C, q4C, q5C, q6C, q7C, q8C, q9C, q10C, q11C, q12C, q13C, q14C, q15C, q16C, q17C, q18C, q19C, q20C, q21C, q22C];


  qC1 = new Question1(608, 330, app, student1);
  qC2 = new Question2(608, 330, app);
  qC3 = new Question3(608, 330, app);
  qC4 = new Question4(608, 330, app);
  qC5 = new Question5(608, 330, app);
  qC6 = new Question6(608, 330, app);
  qC7 = new Question7(608, 330, app);
  qC8 = new Question8(608, 330, app);
  qC9 = new Question9(608, 330, app);
  qC10 = new Question10(608, 330, app);
  qC11 = new Question11(608, 330, app);
  qC12 = new Question12(608, 330, app);
  qC13 = new Question13(608, 330, app);
  qC14 = new Question14(608, 330, app);
  qC15 = new Question15(608, 330, app);
  qC16 = new Question16(608, 330, app);
  qC17 = new Question17(608, 330, app);
  qC18 = new Question18(608, 330, app);
  qC19 = new Question19(608, 330, app);
  qC20 = new Question20(608, 330, app);
  qC21 = new Question21(608, 330, app);
  qC22 = new Question22(608, 330, app);

  questionArr = [qC1, qC2, qC3, qC4, qC5, qC6, qC7, qC8, qC9, qC10, qC11, qC12, qC13, qC14, qC15, qC16, qC17, qC18, qC19, qC20, qC21, qC22];

  questionBooleanArr.forEach(quest =>{

    quest = false;

  });

  console.log(studentsArr);

  timerValue = 0;
  timerValueMinutes = 3;

  setInterval(timeIt, 1000);

  //if(screen === 6){
  /*timeout = setInterval((ev) => {
    student1.calledTeacher = true;
  }, Math.floor(Math.random() * (10000 - 4000) + 4000) + frameCount);

  timeout2 = setInterval((ev) => {
    student2.calledTeacher = true;
  }, Math.floor(Math.random() * (18000 - 7000) + 7000) + frameCount);

  timeout3 = setInterval((ev) => {
    student3.calledTeacher = true;
  }, Math.floor(Math.random() * (20000 - 5000) + 5000) + frameCount);

  timeout4 = setInterval((ev) => {
    student4.calledTeacher = true;
  }, Math.floor(Math.random() * (24000 - 8000) + 8000) + frameCount);

  timeout5 = setInterval((ev) => {
    student5.calledTeacher = true;
  }, Math.floor(Math.random() * (32000 - 24000) + 24000) + frameCount);

  timeout6 = setInterval((ev) => {
    student6.calledTeacher = true;
  }, Math.floor(Math.random() * (28000 - 16000) + 16000) + frameCount);
*/
  //}

  if(screen == 5){
  
  }

}

function draw() {

  app.imageMode(app.CORNER);
  app.background(255);
  //console.log(app.mouseX + ", " + app.mouseY);
  //console.log(frameCount);
  //console.log(questionCounter + ", " + score + ", " + q1C);
  //console.log(score);
  //console.log(questionBooleanArr);

  if (screen === 0) {

    app.image(screenPic1, 0, 0);

  }

  else if (screen === 1) {

    app.image(screenPic2, 0, 0);

  }

  else if (screen === 2) {

    app.image(screenPic3, 0, 0);

  }

  else if (screen === 3) {

    app.image(screenPic4, 0, 0);

  }

  else if (screen === 4) {

    app.image(screenPic5, 0, 0);

  }

  /* else if(screen === 5){
 
     image(screenPic6, 0, 0);
 
   }*/

  else if (screen === 5) {

    app.image(bg, 0, 0);


    studentsArr.forEach((stud) => {

      stud.paint();
      stud.callTeacher();

      if (stud.questionActive) {
        stud.showProblem();
      }

    });

    if(timerValueMinutes == 2){

      if(timerValue == 56){ //pregunta 1

        student1.calledTeacher = true; //student 1 question 1
        questionCounter = 1;
      }

      if(timerValue == 46){ //pregunta 2

        student2.calledTeacher = true; //student 2 question 1
        questionCounter = 2;

      }

      if(timerValue == 32){ //pregunta 3

        student4.calledTeacher = true; //student 4 question 1
        questionCounter = 3;

      }

      if(timerValue == 21){ //pregunta 4

        student1.calledTeacher = true; //student 1 question 2
        questionCounter = 4;

      }

      if(timerValue == 10){ //pregunta 5

        student5.calledTeacher = true; //student 5 question 1
        questionCounter = 5;

      }

    }

    else if(timerValueMinutes == 1){ 

      if(timerValue == 58){ //pregunta 8

        student3.calledTeacher = true; //student 3 question 1
        questionCounter = 6;

      }

      if(timerValue == 46){ //pregunta 9

        student2.calledTeacher = true; //student 2 question 2
        questionCounter = 7;

      }

      if(timerValue == 37){ //pregunta 10

        student5.calledTeacher = true; //student 5 question 2
        questionCounter = 8;

      }

      if(timerValue == 27){ //pregunta 11

        
        student6.calledTeacher = true; //student 6 question 1
        questionCounter = 9;

      }

      if(timerValue == 18){ //pregunta 12
        
        student2.calledTeacher = true; //student 2 question 3
        questionCounter = 10;

      }

      if(timerValue == 9){ //pregunta 13

        
        student4.calledTeacher = true; //student 4 question 2
        questionCounter = 11;

      }

    }

    else if(timerValueMinutes == 0){ 

      if(timerValue == 56){ //pregunta 16

        student3.calledTeacher = true; //student 3 question 2
        questionCounter = 12;

      }

      if(timerValue == 49){ //pregunta 17

        student6.calledTeacher = true; //student 6 question 2
        questionCounter = 13;


      }

      if(timerValue == 38){ //pregunta 18

        student4.question14Called = true;
        questionCounter = 14;

      }

      if(timerValue == 30){ //pregunta 19

        student1.question15Called = true;
        questionCounter = 15;

      }

      if(timerValue == 24){ //pregunta 20

        student5.calledTeacher = true; //student 5 question 3
        questionCounter = 16;

      }

      if(timerValue == 10){ //pregunta 21
    
        student3.calledTeacher = true; //student 3 question 3
        questionCounter = 17;

      }

    }


    app.imageMode(app.CORNER);
    app.image(desk, 5, 531);

    whatQuestion();
    addScore();
    //copeSeetheMald();
    
    timer();
    endGame();

    changePhase();

  }


}

function whatQuestion(){

  studentsArr.forEach(stud => {

    if(stud.calledTeacher){

        if(questionCounter == 1){

          q1C = true;

        }

        if(questionCounter == 2){

          q2C = true;

        }

        if(questionCounter == 3){

          q3C = true;

        }

        if(questionCounter == 4){

          q4C = true;

        }

        if(questionCounter == 5){

          q5C = true;

        }

        if(questionCounter == 6){

          q6C = true;

        }

        if(questionCounter == 7){

          q7C = true;

        }

        if(questionCounter == 8){

          q8C = true;

        }

        if(questionCounter == 9){

          q9C = true;

        }

        if(questionCounter == 10){

          q10C = true;

        }

        if(questionCounter == 11){

          q11C = true;

        }

        if(questionCounter == 12){

          q12C = true;

        }

        if(questionCounter == 13){

          q13C = true;

        }

        if(questionCounter == 14){

          q14C = true;

        }

        if(questionCounter == 15){

          q15C = true;

        }

        if(questionCounter == 16){

          q16C = true;

        }

        if(questionCounter == 17){

          q17C = true;

        }

        if(questionCounter == 18){

          q18C = true;

        }

        if(questionCounter == 19){

          q19C = true;

        }

        if(questionCounter == 20){

          q20C = true;

        }

        if(questionCounter == 21){

          q21C = true;

        }

        if(questionCounter == 22){

          q22C = true;

        }

      }

    });

}

function addScore(){
  
  

}

function copeSeetheMald(){

  studentsArr.forEach(stud =>{

    if(stud.calledTeacher){

      madTimer = setInterval((ev) =>{

        stud.isMad = true;

      }, 5000);

    }

  });

}

function timer() {
  app.textSize(30);
  app.textAlign(app.CENTER);

  if (timerValue >= 10) {
    app.text(timerValueMinutes + ":" + timerValue, 145, 660);
  }
  if (timerValue < 10) {
    app.text(timerValueMinutes + ":0" + timerValue, 145, 660);
  }
  if (timerValue < 0) {
    timerValue = 59;
    timerValueMinutes -= 1;
  }
}

function timeIt() {
  timerValue -= 1;
}

function changePhase() {
  if (timerValue == 59) {
    switch (timerValueMinutes) {
      case 2:
        phaseNum = 1;
        break;
      case 1:
        phaseNum = 2;
        break;
      case 2:
        phaseNum = 3;
        break;
    }
  }
}

function endGame() {
  if (timerValue == 0 && timerValueMinutes == 0) {
    
    actividad.addResult([{id:CARRERAS.LICENCIATURA_IDIOMAS, value:score}]);

    actividad.finish()

  }
}

function mousePressed() {
  console.log("Click");

  if (screen === 0) {

    if (app.mouseX > 534 && app.mouseY > 523 && app.mouseX < 745 && app.mouseY < 583) {

      screen = 1;

    }

  }

  else if (screen === 1) {

    if (app.mouseX > 1139 && app.mouseY > 574 && app.mouseX < 1243 && app.mouseY < 605) {

      screen = 2;

    }

  }

  else if (screen === 2) {

    if (app.mouseX > 1139 && app.mouseY > 574 && app.mouseX < 1243 && app.mouseY < 605) {

      screen = 3;

    }

  }

  else if (screen === 3) {

    if (app.mouseX > 1139 && app.mouseY > 574 && app.mouseX < 1243 && app.mouseY < 605) {

      screen = 4;

    }

  }

  else if (screen === 4) {

    if (app.mouseX > 1139 && app.mouseY > 574 && app.mouseX < 1243 && app.mouseY < 605) {

      screen = 5;

    }

  }

  /* else if(screen === 5){
 
     if(app.mouseX > 1139 && app.mouseY > 574 && app.mouseX < 1243 && app.mouseY < 605){
 
     screen = 6;
 
     }
 
   }*/

  else if (screen === 5) {

    studentsArr.forEach(stud => {

      if (app.dist(app.mouseX, app.mouseY, stud.posX - 150, stud.posY - 75) < 100) {

        console.log(stud + " clicked");

        stud.calledTeacher = false;

        timerValue--;

        if(questionCounter == 1){

          student1.question1Called = true;

        }

        if(questionCounter == 2){

          student2.question2Called = true;

        }

        if(questionCounter == 3){

          student4.question3Called = true;

        }

        if(questionCounter == 4){

          student1.question4Called = true;

        }

        if(questionCounter == 5){

          student5.question5Called = true;

        }

        if(questionCounter == 6){

          student3.question6Called = true;

        }

        if(questionCounter == 7){

          student2.question7Called = true;

        }

        if(questionCounter == 8){

          student5.question8Called = true;

        }

        if(questionCounter == 9){

          student6.question9Called = true;

        }

        if(questionCounter == 10){

          student2.question10Called = true;

        }

        if(questionCounter == 11){

          student4.question11Called = true;

        }

        if(questionCounter == 12){

          student3.question12Called = true;

        }

        if(questionCounter == 13){

          student6.question13Called = true;

        }

        if(questionCounter == 14){

          student4.question14Called = true;

        }

        if(questionCounter == 15){

          student1.question15Called = true;

        }

        if(questionCounter == 16){

          student5.question16Called = true;

        }

        if(questionCounter == 17){

          student3.question17Called = true;

        }

        if(questionCounter == 18){

          student4.question18Called = true;

        }

        if(questionCounter == 19){

          student6.question19Called = true;

        }

        if(questionCounter == 20){

          student1.question20Called = true;

        }

        if(questionCounter == 21){

          student3.question21Called = true;

        }

        if(questionCounter == 22){

          student2.question22Called = true;

        }

      }

      if (
        app.mouseX > 459 &&
        app.mouseY > 236 &&
        app.mouseX < 743 &&
        app.mouseY < 495 &&
        stud.questionActive
      ) {
        stud.questionActive = false;

        timerValue++;
      }

    });



  }


  //////////PREGUNTAS////////
  // x,y esquina superior izquierda &&  x,y esquina inferior derecha

  //pregunta 1 (A)
  //pregunta 2 (A)
  //pregunta 3 (C)
  //pregunta 4 (C)
  //pregunta 5 (A)
  //pregunta 6 (A)
  //pregunta 7 (B)
  //pregunta 8 (B)
  //pregunta 9 (B)
  //pregunta 10 (A)
  //pregunta 11 (B)
  //pregunta 12 (C)
  //pregunta 13 (A)
  //pregunta 14 (B)
  //pregunta 15 (D)
  //pregunta 16 (C)
  //pregunta 17 (A)

  
  if(student1.question1Called){

      //respuesta A
  if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

    //desaparecer el cuadro de pregunta 

    student1.question1Called = false;

    //pintar la siguiente pregunta
    //sumar puntaje correspondiente si es la respuesta correcta

    score += 11.7;

  }

  //respuesta B
  if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

    //desaparecer el cuadro de pregunta

    student1.question1Called = false;

    //pintar la siguiente pregunta
    //sumar puntaje correspondiente si es la respuesta correcta
  }

  //respuesta C
  if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

    //desaparecer el cuadro de pregunta

    student1.question1Called = false;

    //pintar la siguiente pregunta
    //sumar puntaje correspondiente si es la respuesta correcta
  }

  //respuesta D
  if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

    //desaparecer el cuadro de pregunta

    student1.question1Called = false;

    //pintar la siguiente pregunta
    //sumar puntaje correspondiente si es la respuesta correcta
  }

  }

else if(student2.question2Called){

    //respuesta A
if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

  //desaparecer el cuadro de pregunta 

  student2.question2Called = false;

  //pintar la siguiente pregunta
  //sumar puntaje correspondiente si es la respuesta correcta

  score += 11.7;

}

//respuesta B
if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

  //desaparecer el cuadro de pregunta

  student2.question2Called = false;

  //pintar la siguiente pregunta
  //sumar puntaje correspondiente si es la respuesta correcta
}

//respuesta C
if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

  //desaparecer el cuadro de pregunta

  student2.question2Called = false;

  //pintar la siguiente pregunta
  //sumar puntaje correspondiente si es la respuesta correcta
}

//respuesta D
if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

  //desaparecer el cuadro de pregunta

  student2.question2Called = false;

  //pintar la siguiente pregunta
  //sumar puntaje correspondiente si es la respuesta correcta
}

}

else if(student4.question3Called){

    //respuesta A
  if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

  student4.question3Called = false;

  }

  //respuesta B
  if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

  student4.question3Called = false;

  }

  //respuesta C
  if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

  student4.question3Called = false;
  score += 11.7;
  }

  //respuesta D
  if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

  student4.question3Called = false;
  }

}

else if(student1.question4Called){

    //respuesta A
  if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

    student1.question4Called = false;

  }

  //respuesta B
  if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

    student1.question4Called = false;

  }

  //respuesta C
  if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

    student1.question4Called = false;
    score += 11.7;
  }

  //respuesta D
  if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

    student1.question4Called = false;
  }

}

else if(student5.question5Called){

    //respuesta A
  if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

    student5.question5Called = false;
    score += 11.7;
  }

  //respuesta B
  if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

    student5.question5Called = false;

  }

  //respuesta C
  if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

    student5.question5Called = false;

  }

  //respuesta D
  if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

    student5.question5Called = false;
  }

}

else if(student3.question6Called){

    //respuesta A
  if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

    student3.question6Called = false;
    score += 11.7;
  }

  //respuesta B
  if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

    student3.question6Called = false;

  }

  //respuesta C
  if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

    student3.question6Called = false;

  }

  //respuesta D
  if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

    student3.question6Called = false;
  }

}

else if(student2.question7Called){

    //respuesta A
  if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

    student2.question7Called = false;

  }

  //respuesta B
  if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

    student2.question7Called = false;
    score += 11.7;
  }

  //respuesta C
  if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

    student2.question7Called = false;

  }

  //respuesta D
  if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

    student2.question7Called = false;
  }

}

else if(student5.question8Called){

    //respuesta A
  if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

    student5.question8Called = false;

  }

  //respuesta B
  if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

    student5.question8Called = false;
    score += 11.7;
  }

  //respuesta C
  if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

    student5.question8Called = false;

  }

  //respuesta D
  if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

    student5.question8Called = false;
  }

}

else if(student6.question9Called){

    //respuesta A
  if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

    student6.question9Called = false;

  }

  //respuesta B
  if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

    student6.question9Called = false;
    score += 11.7;
  }

  //respuesta C
  if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

    student6.question9Called = false;

  }

  //respuesta D
  if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

    student6.question9Called = false;
  }

}

else if(student2.question10Called){

  //respuesta A
if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

  student2.question10Called = false;
  score += 11.7;
}

//respuesta B
if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

  student2.question10Called = false;

}

//respuesta C
if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

  student2.question10Called = false;

}

//respuesta D
if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

  student2.question10Called = false;
}

}

else if(student4.question11Called){

  //respuesta A
if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

  student4.question11Called = false;

}

//respuesta B
if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

  student4.question11Called = false;
  score += 11.7;
}

//respuesta C
if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

  student4.question11Called = false;

}

//respuesta D
if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

  student4.question11Called = false;
}

}

else if(student3.question12Called){

  //respuesta A
if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

  student3.question12Called = false;

}

//respuesta B
if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

  student3.question12Called = false;

}

//respuesta C
if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

  student3.question12Called = false;
  score += 11.7;
}

//respuesta D
if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

  student3.question12Called = false;
}

}

else if(student6.question13Called){

  //respuesta A
if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

  student6.question13Called = false;

}

//respuesta B
if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

  student6.question13Called = false;

}

//respuesta C
if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

  student6.question13Called = false;
  score += 11.7;
}

//respuesta D
if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

  student6.question13Called = false;
}

}

else if(student4.question14Called){

  //respuesta A
if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

  student4.question14Called = false;

}

//respuesta B
if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

  student4.question14Called = false;
  score += 11.7;
}

//respuesta C
if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

  student4.question14Called = false;

}

//respuesta D
if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

  student4.question14Called = false;
}

}

else if(student1.question15Called){

  //respuesta A
if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

  student1.question15Called = false;

}

//respuesta B
if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

  student1.question15Called = false;

}

//respuesta C
if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

  student1.question15Called = false;

}

//respuesta D
if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

  student1.question15Called = false;
  score += 11.7;
}

}

else if(student5.question16Called){

  //respuesta A
if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

  student5.question16Called = false;

}

//respuesta B
if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

  student5.question16Called = false;

}

//respuesta C
if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

  student5.question16Called = false;
  score += 11.7;
}

//respuesta D
if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

  student5.question16Called = false;
}

}

else if(student3.question17Called){

  //respuesta A
if (app.mouseX > 432 && app.mouseY > 285 && app.mouseX < 499 && app.mouseY < 307) {

  student3.question17Called = false;
  score += 11.7;
}

//respuesta B
if (app.mouseX > 527 && app.mouseY > 285 && app.mouseX < 594 && app.mouseY < 307) {

  student3.question17Called = false;

}

//respuesta C
if (app.mouseX > 620 && app.mouseY > 285 && app.mouseX < 687 && app.mouseY < 307) {

  student3.question17Called = false;
}

//respuesta D
if (app.mouseX > 715 && app.mouseY > 285 && app.mouseX < 780 && app.mouseY < 307) {

  student3.question17Called = false;
}

}

}

class Counceling {
  constructor(config){
      actividad = config;
  }
  setup (app){
      
      preload(app);
      setup(app);
  }
  draw (app){
      draw(app);    
  }
  mousePressed(app){
      mousePressed(app);
  }
}

export default Counceling;