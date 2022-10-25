import CARRERAS from "../../../../constants/observer";
import DiagnosisScreen from "./diagnosis-screen";
import PatientLevelOne from "./patient-level-one";
import PatientLevelThree from "./patient-level-three";
import PatientLevelTwo from "./patient-level-two";
import ResultsScreens from "./results-screen";
import StartScreens from "./start-screens";
import SymptomsScreen from "./symptoms-screen";

//Classes
let introScreens;
let symptomsScreen;
let patientOne;
let patientTwo;
let patientThree;
let diagnosisScreen;
let resultsScreen;

let NameCarrera = "MEDICINA"; // poner el nombre de la carrera;

let path = "/img/2022-01/diagnosticalos/"; //crear la variable path, se deja vacia, Se añade al lado de cada ruta de las imagenes o fuentes;

//nunito = app.loadFont(path+'fonts/nunito-bold.ttf'); //ejemplo

let app; // crear la variable de la siguiente forma y agregarla a cada metodos
//app.loadFont //ejemplo

let actividad; // crear la variable actividad


//Variables
let screen;
let changeCounter, changeCounter2, changeCounter3;
let patientsLevel2;
let patientsLevel3;
let score;

//Score a partir de las respuestas
let scoreAnswers = 0;
let allowScore=true;
let font;

//score a partir del diagnostico
let questionScore;
let Dscore = 0;

let sumascore = false;

//timer
let timerLimit;

let counter;
let wtf;
let nextScreen;
let intro;

let book;

//Level images
let level1, level2, level3;

function preload(aplicacion){
  app = aplicacion;
  resultsScreen = new ResultsScreens(app);
  resultsScreen.preload();
}

function setup() {

  //Calling classes
  introScreens = new StartScreens(app);
  symptomsScreen = new SymptomsScreen(app);
  patientOne = new PatientLevelOne(app);
  patientTwo = new PatientLevelTwo(app);
  patientThree = new PatientLevelThree(app);
  diagnosisScreen = new DiagnosisScreen(app);

  //Variables
  screen = 1;
  changeCounter = 0;
  changeCounter2 = 0;
  changeCounter3 = 0;
  book = false;
  patientsLevel2 = 0;
  patientsLevel3 = 0;
  counter = 0;
  wtf = false;
  nextScreen = 4;
  intro = 1;

  //Loading level images
  level1 = app.loadImage(path+'images/level1.jpg');
  level2 = app.loadImage(path+'images/level2.jpg');
  level3 = app.loadImage(path+'images/level3.jpg');

  //timer
  timerLimit = 100;

  scoreAnswers = 0;
  Dscore = 0;
  sumascore = false;
  
}

function draw() {

  app.imageMode(app.CORNER);
  app.background(220);

  //Switch between class screens
  switch (screen) {
    //Start screens
    case 0:
      introScreens.draw();
      /*patientOne.draw();
      timer();*/
      break;
    //Symptoms screen
    case 1:
      symptomsScreen.draw();
    //Symptoms screen
    case 1:
      switch (intro) {
        case 1:
          introScreens.draw();
          break;
        case 2:     
          symptomsScreen.draw();
          break;
      }
      break;
    //Level 1 screen
    case 2:
      changeCounter++;
      app.image(level1, 0, 0, 1280, 720);
      book = false;
      
      break;
    //Patient on level 1
    case 3:
      //Doctors office
      patientOne.draw();
     
    timer();
    app.text(scoreAnswers);
    questionScore = patientOne.getScore();
    
      //Book
      showBook();
      break;
    //Level 2 screen
    case 4:
      changeCounter2++;
      app.image(level2, 0, 0, 1280, 720);
      book = false;

      timerLimit = 125;

      if (counter < 10) {
        diagnosisScreen.setAnswered(false);
        counter = 0;
      }

      if(sumascore == false){
          Dscore =  Dscore + questionScore;
          questionScore = 0;
          sumascore = true;
        };


      break;
    //Patients on level 2
    case 5:
      //Doctors office
      switch (patientsLevel2) {
        case 0:
          patientTwo.drawPatient1();
          counter++;
          if (counter < 10) {
            diagnosisScreen.setAnswered(false);
            counter = 0;
          }
          break;
        case 1:
          patientTwo.drawPatient2();
          counter++;
          if (counter < 10) {
            diagnosisScreen.setAnswered(false);
            counter = 0;
          }
          break;
      }
      //General things
      patientTwo.draw();
  
      timer();

      sumascore = false;
      questionScore = patientTwo.getScore();
      
      //addScore();
      
      //Book
      showBook();
      break;
    //Level 3 screen
    case 6:
      changeCounter3++;
      app.image(level3, 0, 0, 1280, 720);
      book = false;
      
      timerLimit = 175;

      if (counter < 10) {
        diagnosisScreen.setAnswered(false);
        counter = 0;
      }

      if(sumascore == false){
        Dscore =  Dscore + questionScore;
        questionScore = 0;
        sumascore = true;
      };

      
      break;
    //Patients on level 3
    case 7:
      //Doctors office
      switch (patientsLevel3) {
        case 0:
          patientThree.drawPatient1();
          counter++;
          if (counter < 10) {
            diagnosisScreen.setAnswered(false);
            counter = 0;
          }
          break;
        case 1:
          patientThree.drawPatient2();
          counter++;
          if (counter < 10) {
            diagnosisScreen.setAnswered(false);
            counter = 0;
          }
          break;
        case 2:
          patientThree.drawPatient3();
          counter++;
          if (counter < 10) {
            diagnosisScreen.setAnswered(false);
            counter = 0;
          }
          break;
      }

      //General things
      patientThree.draw();
      
      sumascore = false;
      questionScore = patientThree.getScore();

      timer();
      //Book
      showBook();
      break;
    //Diagnosis screen
    case 8: 
      diagnosisScreen.draw();
      
      break;
    //Final screen
    case 9:

      if(sumascore == false){
        Dscore =  Dscore + questionScore;
        questionScore = 0;
        sumascore = true;
      };

    resultsScreen.draw();

    if(allowScore){
      addScore();
      allowScore=false;
    }

    resultsScreen.drawResults(diagnosisScreen.getDiagnosis(), Dscore);
    

      break;
  }

  //Check for changes in classes
  switchBetweenClasses();
  //levelScreens();
  diagnosisScreens();
  showBookPlay();

  console.log(screen);
  //Switch to next level after a couple of seconds
  if (changeCounter > 100 && screen === 2 && wtf == false) {
    screen = 3;
    wtf = true;
    symptomsScreen.setContinueClicked(false);
  }

  if (changeCounter2 > 100 && screen === 4) {
    screen = 5;
  }

  //Switch to next level after a couple of seconds
  if (changeCounter3 > 100 && screen === 6) {
    screen = 7;
  }

}

function timer() {

  if (app.frameCount % 60 == 0 && timerLimit > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timerLimit --;
    
  }

  app.fill(72, 72, 72)
  app.textSize(18);
  app.text(convertSeconds(timerLimit), 725, 85);

}

function convertSeconds(s) {
  let min = app.floor(s / 60);
  let sec = s % 60;
  return app.nf(min, 2) + ':' + app.nf(sec, 2);
}


function mousePressed() {

  switch (screen) {
    //Start screens clicks
    //Symptoms screen clicks
    case 1:
      switch (intro) {
        case 1:
          introScreens.clicked();
          break;
        case 2:     
          symptomsScreen.clicked();
          break;
      }
      break;
    //Patient level 1
    case 3:
      if (book == false) {
        patientOne.clicked();
      }
      symptomsScreen.clickedPlay();
      break;
    case 5:
      if (book == false) {
      switch (patientsLevel2) {
        case 0:
          patientTwo.clickPatient1();
          break;
        case 1:
          patientTwo.clickPatient2();
          break;
      }
    }
      patientTwo.clicked();
      symptomsScreen.clickedPlay();
      break;
    case 7:
      if (book == false) {
      switch (patientsLevel3) {
        case 0:
          patientThree.clickPatient1();
          break;
        case 1:
          patientThree.clickPatient2();
          break;
        case 2:
          patientThree.clickPatient3();
          break;
      }
    }
      patientThree.clicked();
      symptomsScreen.clickedPlay();
      break;
    case 8:
      diagnosisScreen.clicked();
      break;

    case 9:
      if (app.mouseX > 195 && app.mouseX < 394 && app.mouseY > 594 && app.mouseY < 650) {
        actividad.addResult([{id:CARRERAS.MEDICINA, value:Dscore}])
        //actividad.addResult([{id:"INGENIERIA_SISTEMAS", value:scoreTimes[0]+scoreTimes[1]+scoreTimes[2]}]);
        actividad.finish();
    }
      break;
  }
}

function switchBetweenClasses() {
  //Start screen to symptoms
  if (introScreens.isScreenClicked()) {
    intro = 2;
  }

  //Symptoms screen to level screen
  if (symptomsScreen.isContinueClicked()) {
    screen = 2;
  }
}

function diagnosisScreens() {
  //DIAGNOSIS FROM GAME
  //Make diagnosis during game
  if (patientOne.isClickDiagnosis() >= 1 && book == false && screen === 3) {
    screen = 8;
    diagnosisScreen.setNextScreen(4);
    console.log("click");
  }else if (timerLimit == 0  && book == false && !diagnosisScreen.isAnswered() && screen == 3 ) {
    screen = 8;
    diagnosisScreen.setNextScreen(4);
  }

  //For patient 1 in level 2
  if (patientTwo.isClickDiagnosis() == 1  && book == false && !diagnosisScreen.isAnswered() && screen == 5 && patientsLevel2 == 0) {
    screen = 8;
    patientsLevel2 = 1;
    diagnosisScreen.setNextScreen(5);

  }else if (timerLimit == 0  && book == false && !diagnosisScreen.isAnswered() && screen == 5 && patientsLevel2 == 0) {
    screen = 8;
    diagnosisScreen.setNextScreen(6);
  }

  if (patientTwo.isClickDiagnosis() == 2  && book == false && !diagnosisScreen.isAnswered() && screen == 5 && patientsLevel2 == 1) {
    screen = 8;
    diagnosisScreen.setNextScreen(6);
  }else if (timerLimit == 0  && book == false && !diagnosisScreen.isAnswered() && screen == 5 && patientsLevel2 == 1) {
    screen = 8;
    diagnosisScreen.setNextScreen(6);
  }

  //For patient 1 in level 3
  if (patientThree.isClickDiagnosis() == 1 && book == false && !diagnosisScreen.isAnswered() && screen == 7 && patientsLevel3 == 0) {
    screen = 8;
    patientsLevel3 = 1;
    diagnosisScreen.setNextScreen(7);
  }else if (timerLimit == 0  && book == false && !diagnosisScreen.isAnswered() && screen == 7 && patientsLevel3 == 0) {
    screen = 8;
    diagnosisScreen.setNextScreen(9);
  }

  //For patient 2 in level 3
  if (patientThree.isClickDiagnosis() == 2 && book == false && !diagnosisScreen.isAnswered() && screen == 7 && patientsLevel3 == 1) {
    screen = 8;
    patientsLevel3 = 2;
    diagnosisScreen.setNextScreen(7);
  }else if (timerLimit == 0  && book == false && !diagnosisScreen.isAnswered() && screen == 7 && patientsLevel3 == 1) {
    screen = 8;
    diagnosisScreen.setNextScreen(9);
  }

  //For patient 3 in level 3
  if (patientThree.isClickDiagnosis() == 3 && book == false && !diagnosisScreen.isAnswered() && screen == 7 && patientsLevel3 == 2) {
    screen = 8;
    diagnosisScreen.setNextScreen(9);
  }else if (timerLimit == 0  && book == false && !diagnosisScreen.isAnswered() && screen == 7 && patientsLevel3 == 2) {
    screen = 8;
    diagnosisScreen.setNextScreen(9);
  }

  //Switch screens after diagnosis
  if (diagnosisScreen.isAnswered()) {
    screen = diagnosisScreen.getNextScreen();
    patientOne.setClickDiagnosis(false);
    //timerLimit = 10;
  }

}

function showBookPlay() {
  //SHOWING BOOK DURING GAME
  if (patientOne.isClickBook()) {
    book = true;
  }

  if (patientTwo.isClickBook()) {
    book = true;
  }

  if (patientThree.isClickBook()) {
    book = true;
  }

  //Close book during game
  if (symptomsScreen.isCloseClicked()) {
    book = false;
  }
}

function showBook(){
  if (book) {
    symptomsScreen.drawPlay();
  }
}

function addScore(){
  let correctAnswers= [
    "Vertigo",
    "Faringitis",
    "Sinusitis",
    "Bronquitis",
    "Infección de oído",
    "Gastritis"
  ]  
  let diagnosisArray = diagnosisScreen.getDiagnosis();
  
  for (let index = 0; index < diagnosisArray.length; index++) {
    if (diagnosisArray[index] === correctAnswers[index]){
      Dscore = Dscore + 10;
      scoreAnswers=scoreAnswers+10;
    }
    
  }
}

class Diagnosticalos {
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

export default Diagnosticalos;

