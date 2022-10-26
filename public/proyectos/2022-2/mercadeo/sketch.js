let tileMap;
let player;
let complemetaryObjs;
let screensCounter = 0;
let bindCounter = 0;
// notas en porcentajes de 20 para cada nivel
let grades = [0, 0, 0, 0, 0]
let gradesFive = [0, 0, 0, 0, 0]

let playerLock = false;
let transitioning = true;
let holdTime = 0;
let playerHit = false


//Variables del primer juego
let phasesGameOne = -1;
let objectPanaderia;
let choosenColorGameOne = false;


// Segundo juego
let smallBeer;
let phasesGameTwo = -1;

// Donde se pueden colocar las cervezas
let beerZones = [
  { x: 115, y: 180, chosen: false },
  { x: 230, y: 75, chosen: false },
  { x: 425, y: 160, chosen: false },
  { x: 545, y: 110, chosen: false }
];


//tercer juego

let instructionsOrder = 0;
let gameThreeCases = false;
let valueMix = 0;
let valueBBQ = 0;
let valueNatural = 0;
let finishedGameThree = false;


// Cuarto juego
let chicle;
let phasesGameFou = -1;

// Donde se pueden colocar los chicles
let chicZones = [
  { x: 115, y: 180, chosen: false },
  { x: 515, y: 200, chosen: false },
  { x: 650, y: 155, chosen: false },
  { x: 495, y: 80, chosen: false }
];


//quinto juego
//llargo es 135
let instructionsOrderFive = 0;
let gameFiveCases = false;
let rangeOneX = 303;
let rangeOneY = 140;
let rangeOneOn = false;
let rangeTwoX = 303;
let rangeTwoY = 215;
let rangeTwoOn = false;
let backgroundCounter = 0;
let secondScreenFive = false;
let backgroundOneDecision = 0;
let secondAct = false;
let backgroundTwoDecOne = 0;
let backgroundTwoDecTwo = 0;

let finalScore = 0;

let finalScoreScreensCounter = 0;
let scoreOneAct = false;
let scoreTwoAct = false;
let scoreThreeAct = false;
let scoreForthAct = false;
let scoreFifthAct = false;

function preload() {
  // Cosas globales
  mainMenu = loadImage("./assets/mainMenu.png");
  instruction = loadImage("./assets/instructions.png");
  background = loadImage("./assets/background.png");
  beerObject = loadImage("./assets/beer.png");
  meatObject = loadImage("./assets/meat.png");
  stantesObject = loadImage("./assets/stantes.png");

  nextButton = loadImage("./assets/nextButton.png");
  pointer1 = loadImage("./assets/pointer1.png");
  pointer2 = loadImage("./assets/pointer2.png");
  background2 = loadImage("./assets/background2.png");
  background4 = loadImage("./assets/background4.png");
  locationIndicator2 = loadImage("./assets/location2.png");

  cajaName = loadImage("./assets/cajaName.png");
  cajaCandy = loadImage("./assets/cajaCandy.png");
  bindings = loadImage("./assets/binds.png");

  // Pos 0 = right, 1 = left, 2= back
  managerObject = [loadImage("./assets/manager_right.png"), loadImage("./assets/manager_left.png"), loadImage("./assets/manager_back.png")];
  // Pos 0 = right, 1 = left, 2= back
  characterObject = [loadImage("./assets/woman_right.png"), loadImage("./assets/woman_left.png"), loadImage("./assets/woman_back.png")];

  //Cosas del primer juego
  locationIndicator = loadImage("./assets/location.png");
  gameOneDialogues = [loadImage("./assets/game1-dialogue1.png"), loadImage("./assets/chooserGameOne.png")]
  gameOneAssets = [loadImage("./assets/panaderia_rojo.png"), loadImage('./assets/panaderia_amarilla.png'), loadImage('./assets/panaderia_azul.png'), loadImage('./assets/preGameOne.png')]

  // Cosas del segundo juego
  gameTwoDialogue = loadImage("./assets/game2-location1.png");
  preGameTwo = loadImage("./assets/preGameTwo.png");
  beerSmall = loadImage("./assets/beerSmall.png");

  //Cosas del tercer juego
  instructionsGame3 = [loadImage("./assets/Group88.png"), loadImage("./assets/Group87.png"), loadImage("./assets/excelSheet.png")];
  nextImageGameFour = loadImage("./assets/siguienteGameFour.png");

  //Cosas del 5 juego

  instructionsGame5 = [loadImage("./assets/instructionsGame5_1.png"), loadImage("./assets/instructionsGame5_2.png"), loadImage("./assets/nivel5background.png")];
  backgroundsGame5 = [loadImage("./assets/nivel5background2.png"), loadImage("./assets/nivel5background3.png")]

  // Cosas del cuarto juego
  gameFouDialogue = loadImage("./assets/game4-location1.png");
  preGameFou = loadImage("./assets/preGameFou.png");
  chicleSmall = loadImage("./assets/chicle.png");
  chicleBig = loadImage("./assets/chicleBig.png");

  finalScoreScreens = [loadImage("./assets/nivelUno_Answer.png"), "", loadImage("./assets/nivelTwo_Answer.png"), "", loadImage("./assets/nivelThree_Answer.png"), "", loadImage("./assets/nivelFour_Answer.png"), "", loadImage("./assets/nivelFive_Answer.png"), "", loadImage("./assets/nivelFinal_Answer.png")]
  levelOneAnswers = [loadImage("./assets/nivelUno_AnswerCorrect.png"), loadImage("./assets/nivelUno_AnswerWrong.png")]
  levelTwoAnswers = [loadImage("./assets/nivelTwo_AnswerCorrect.png"), loadImage("./assets/nivelTwo_AnswerWrong.png")]
  levelThreeAnswers = [loadImage("./assets/nivelThree_AnswerCorrect.png"), loadImage("./assets/nivelThree_AnswerWrong.png")]
  levelFourAnswers = [loadImage("./assets/nivelFour_AnswerCorrect.png"), loadImage("./assets/nivelFour_AnswerWrong.png")]
  levelFiveAnswers = [loadImage("./assets/nivelFive_AnswerCorrect.png"), loadImage("./assets/nivelFive_AnswerWrong.png")]
  fondoAzul = loadImage("./assets/nivelFondo_Answer.png")
}

function setup() {
  createCanvas(700, 350);
  tileMap = new Tilemap();
  //imageMode(CORNER);
  if(tileMap != undefined && characterObject != undefined){
	  player = new Player(2, 1, characterObject, tileMap);
  }

  smallBeer = { x: 200, y: 200, img: beerSmall };
  chicle = { x: 230, y: 220, img: chicleSmall };

}


function draw() {
  grades[4] = gradesFive[0] + gradesFive[1] + gradesFive[2] + gradesFive[3] + gradesFive[4];
  finalScore = grades[0] + grades[1] + grades[2] + grades[3]+ grades[4];
  holdTime++;

  // Para que el usuario no inmediatamente clickee
  if (holdTime < 3 || holdTime > 60 * 2) {

    switch (screensCounter) {
      //Pantalla de inicio
      case 0:
        image(mainMenu, 0, 0);
        break;
      //Instrucciones
      case 1:
        image(instruction, 0, 0)
        break;
      //Primer juego - Poveda
      case 2:
        image(background, 0, 0);

	if (phasesGameOne === 0){
		if (player.currPos[0] === 8 && player.currPos[1] === 5
		  || player.currPos[0] === 9 && player.currPos[1] === 6){

		  player.setState(2);
		  image(gameOneDialogues[0], 0, 0)
		} else {
		  image(locationIndicator, 0, 0);
		}
	}

        if (phasesGameOne === 1) {
          image(gameOneDialogues[1], 0, 0)
        }

        image(managerObject[1], 260, 80)

        if (phasesGameOne < 0) {
          image(gameOneAssets[3], 0, 0)
        }

        break;
      //Segundo juego - Sebastian
      case 3:
        image(background2, 0, 0);
        image(managerObject[1], 240, 220);

        if (phasesGameTwo === -1) {
          image(preGameTwo, 0, 0);
        }
        if (phasesGameTwo === 0) {
          image(locationIndicator2, 180, 220);
        if (player.currPos[0] === 7 && player.currPos[1] === 14
	  || player.currPos[0] === 7 && player.currPos[1] === 16) {
            playerLock = true;
            player.setState(0);
            image(nextButton, 560, 250);
            image(gameTwoDialogue, 0, 300);
            image(smallBeer.img, smallBeer.x, smallBeer.y);
          }

        }

        if (phasesGameTwo === 1) {
          image(smallBeer.img, smallBeer.x, smallBeer.y);
          player.holdItem(smallBeer);
        }

        break;
      //Tercer juego - Poveda
      case 4:

        let valueRestante = 100 - (valueMix * 0.1) - (valueBBQ * 0.1) - (valueNatural * 0.1);
        let valueGastado = valueMix + valueBBQ + valueNatural;

        image(instructionsGame3[instructionsOrder], 0, 0);

        if (gameThreeCases == true) {
          if (valueMix < 100 || valueBBQ < 100 || valueNatural < 100) {
            fill(255, 0, 0);
          } else { fill(0); }

          textSize(13);
          text((valueMix * 0.1 + " %"), 385, 162);
          text((valueBBQ * 0.1 + " %"), 385, 187);
          text((valueNatural * 0.1 + " %"), 385, 212);


          if (valueRestante < 0 || valueGastado < 0) {
            fill(255, 0, 0);
          } else {
            fill(0)
          }
          text((valueRestante + " %"), 385, 240);
          text((valueGastado + "$"), 385, 264);
        }


        if (valueRestante === 0) {
          image(nextImageGameFour, 0, 0);
          finishedGameThree = true
        }
        break;

      //Cuarto juego - Sebastian
      case 5:
        if (screensCounter == 5) {
          image(background4, 0, 0);
          image(managerObject[0], 200, 220);

        }


        if (phasesGameFou === -1 && screensCounter == 5) {
          image(preGameFou, 0, 0);
        }
        if (phasesGameFou === 0) {
          image(locationIndicator2, 250, 220);
        if (player.currPos[0] === 9 && player.currPos[1] === 14
	  || player.currPos[0] === 9 && player.currPos[1] === 16) {
            playerLock = true;
            player.setState(1);
            image(nextButton, 560, 250);
            image(gameFouDialogue, 0, 300);
            image(chicle.img, chicle.x, chicle.y);
          }

        }

        if (phasesGameFou === 1) {
          image(chicle.img, chicle.x, chicle.y);
          player.holdItem(chicle);
        }

        break;
      //Quinto juego - Poveda
      case 6:

        image(instructionsGame5[instructionsOrderFive], 0, 0)
        
        let rangeOneValue = "";
        let rangeTwoValue = "";

        if (gameFiveCases === true) {

          fill(35, 89, 155)
          circle(rangeOneX, rangeOneY, 10)
          circle(rangeTwoX, rangeTwoY, 10)


          if (rangeOneOn === true) {
            rangeOneX = mouseX;
          }

          //Limitex primera
          if (rangeOneX > 438 && rangeOneOn === true) {
            rangeOneX = 438;
            rangeOneOn = !rangeOneOn;
          }

          if (rangeOneX < 303 && rangeOneOn === true) {
            rangeOneX = 303;
            rangeOneOn = !rangeOneOn;
          }

          //Limites segunda
          
          if (rangeTwoOn === true) {
            rangeTwoX = mouseX;
          }

          if (rangeTwoX > 438 && rangeTwoOn === true) {
            rangeTwoX = 438;
            rangeTwoOn = !rangeTwoOn;
          }

          if (rangeTwoX < 303 && rangeTwoOn === true) {
            rangeTwoX = 303;
            rangeTwoOn = !rangeTwoOn;
          }
          //Primea
          //1
          if (rangeOneX > 303 && rangeOneX < 324) {
            rangeOneValue = "0-10 años"
          }

          //2
          if (rangeOneX > 324 && rangeOneX < 344) {
            rangeOneValue = "10-15 años"
          }

          //3
          if (rangeOneX > 344 && rangeOneX < 364) {
            rangeOneValue = "15-20 años"
          }

          //4
          if (rangeOneX > 364 && rangeOneX < 384) {
            rangeOneValue = "20-25 años"
          }

          //5
          if (rangeOneX > 384 && rangeOneX < 404) {
            rangeOneValue = "25-30 años"
          }

          //6
          if (rangeOneX > 404 && rangeOneX < 424) {
            rangeOneValue = "35-40 años"
          }
        
          //7
          if (rangeOneX > 424 && rangeOneX < 444) {
            rangeOneValue = "40-45 años"
          }


          //Limites segunda

          if (rangeTwoOn === true) {
            rangeTwoX = mouseX;
          }

          if (rangeTwoX > 438 && rangeTwoOn === true) {
            rangeTwoX = 438;
            rangeTwoOn = !rangeTwoOn;
          }

          if (rangeTwoX < 303 && rangeTwoOn === true) {
            rangeTwoX = 303;
            rangeTwoOn = !rangeTwoOn;
          }
          //Primea
          //1
          if (rangeTwoX > 303 && rangeTwoX < 324) {
            rangeTwoValue = "1 km"
          }

          //2
          if (rangeTwoX > 324 && rangeTwoX < 344) {
            rangeTwoValue = "2 km"
          }

          //3
          if (rangeTwoX > 344 && rangeTwoX < 364) {
            rangeTwoValue = "3 km"
          }

          //4
          if (rangeTwoX > 364 && rangeTwoX < 384) {
            rangeTwoValue = "4 km"
          }

          //5
          if (rangeTwoX > 384 && rangeTwoX < 404) {
            rangeTwoValue = "5 km"
          }

          //6
          if (rangeTwoX > 404 && rangeTwoX < 424) {
            rangeTwoValue = "10 km"
          }

          //7
          if (rangeTwoX > 424 && rangeTwoX < 444) {
            rangeTwoValue = "20 km"
          }

          fill(255)
          textSize(14)
          text(rangeOneValue, 349, 160)
          text(rangeTwoValue, 349, 235)
        }

        if (secondScreenFive === true) {
          image(backgroundsGame5[backgroundCounter], 0, 0)
        }

        //segunda pantalla
        if (backgroundCounter === 0) {
          if (backgroundTwoDecOne === 1) {
            fill(35, 89, 155, 40);
            rect(312, 106, 100, 22);
          }

          if (backgroundTwoDecOne === 2) {
            fill(35, 89, 155, 40);
            rect(312, 131, 100, 22);
          }


          if (backgroundTwoDecOne === 3) {
            fill(35, 89, 155, 40);
            rect(312, 155, 100, 22);
            gradesFive[2] = 8;
          }

          if (backgroundTwoDecTwo === 1) {
            fill(35, 89, 155, 40);
            rect(312, 214, 100, 22);
            gradesFive[3] = 8;
          }

          if (backgroundTwoDecTwo === 2) {
            fill(35, 89, 155, 40);
            rect(312, 238, 100, 22);
          }

        }
       
        //Resultados 
        if (rangeOneValue == "20-25 años" && backgroundCounter === 1) {
          gradesFive[0] = 8;
        }

        if (rangeTwoValue == "5 km" && backgroundCounter === 1) {
          gradesFive[1] = 8;
        }
        //Tercera pantalla
        if (backgroundOneDecision === 1) {
          fill(35, 89, 155, 40);
          rect(277, 125, 190, 31);
        }

        if (backgroundOneDecision === 2) {
          fill(35, 89, 155, 40);
          rect(277, 181, 190, 31);
        }

        if (backgroundOneDecision === 3) {
          fill(35, 89, 155, 40);
          rect(277, 230, 190, 31);
          gradesFive[4] = 8;
        }
           
        break;
      
      case 7:
        //Background
        image(finalScoreScreens[finalScoreScreensCounter], 0, 0)
        
        
        if (grades[0] === 40) {
          finalScoreScreens[1] = levelOneAnswers[0];
        } else if (grades[0] !== 40) {
          finalScoreScreens[1] = levelOneAnswers[1];
        }

        if (grades[1] === 40) {
          finalScoreScreens[3] = levelTwoAnswers[0];
        } else if (grades[1] !== 40) {
          finalScoreScreens[3] = levelTwoAnswers[1];
        }

        if (grades[2] === 40) {
          finalScoreScreens[5] = levelThreeAnswers[0];
        } else if (grades[2] !== 40) {
          finalScoreScreens[5] = levelThreeAnswers[1];
        }

        if (grades[3] === 40) {
          finalScoreScreens[7] = levelFourAnswers[0];
        } else if (grades[3] !== 40) {
          finalScoreScreens[7] = levelFourAnswers[1];
        }

        if (grades[4] === 40 & finalScoreScreensCounter !=10) {
          finalScoreScreens[9] = levelFiveAnswers[0];
        } else if (grades[4] !== 40 & finalScoreScreensCounter != 10) {
          finalScoreScreens[9] = levelFiveAnswers[1];
        }

        if (finalScoreScreensCounter === 10) {
          textSize(70);
          image(finalScoreScreens[10], 0, 0)
          
          let pintarScore = finalScore / 2;

          text( pintarScore + " %", width / 2 - 50, height / 2)
          text(pintarScore + " %", width / 2 - 50, height / 2)
          text(pintarScore + " %", width / 2 - 50, height / 2)
          text(pintarScore + " %", width / 2 - 50, height / 2)
          text(pintarScore + " %", width / 2 - 50, height / 2)
          text(pintarScore + " %", width / 2 - 50, height / 2)
          text(pintarScore + " %", width / 2 - 50, height / 2)
          text(pintarScore + " %", width / 2 - 50, height / 2)
          
        }

      break;
    }


    // Si la pantalla no esta transicionando, constantemente pinta esto:
    if (!transitioning) {

      //Opciones para pintar las cosas que se mueven despues de las dos primeras pantallas.
      if (screensCounter > 1) {
	if (screensCounter === 2){
	  image(cajaCandy, 63, 205);
          player.draw(tileMap);
	  image(cajaName, 30, 105);
	} else {
	  image(cajaCandy, 68, 203);
          player.draw(tileMap);
	  image(cajaName, 35, 104);
	}

	playerHit = false;

        //Imagenes para darle tridimensionalidad
        if ((phasesGameOne == 0 && screensCounter == 2) || screensCounter > 2) {
          image(stantesObject, 0, 0);
        }
      }

      //Aqui queda el color def de la panaderia
      colorDefPanaderia();
      // Aqui las flechas de las cervezas
      if (screensCounter === 3 && phasesGameTwo === 1) {
        for (let j = 0; j < beerZones.length; j++) {
          image(pointer1, beerZones[j].x - 30, beerZones[j].y - 35);
          if (player.isNear(beerZones[j], 55)) {
            image(pointer2, beerZones[j].x - 30, beerZones[j].y - 55);
          }
        }
      }

      // Aqui las flechas y desicion final de los chicles
      if (screensCounter === 5 && phasesGameFou === 1) {
        for (let j = 0; j < chicZones.length; j++) {
          image(pointer1, chicZones[j].x - 30, chicZones[j].y - 35);
          if (player.isNear(chicZones[j], 55)) {
            image(pointer2, chicZones[j].x - 30, chicZones[j].y - 55);
          }
        }
      }
	if (phasesGameOne === 0){
		if(bindCounter < 250){
			bindCounter++;
			image(bindings, 0, 0);
		}
	}
    }
  }
}

function mousePressed() {
  switch (screensCounter) {
    //Pantalla de inicio
    case 0:
      //Continuar 
      if (mouseX > 282 && mouseX < 417 && mouseY > 233 && mouseY < 266) {
        screensCounter = 2;
      }

      if (mouseX > 282 && mouseX < 417 && mouseY > 281 && mouseY < 313) {
        screensCounter = 1;
      }
      break;
    //Instrucciones
    case 1:
      if (mouseX > 279 && mouseX < 414 && mouseY > 298 && mouseY < 333) {
        screensCounter = 2;
      }
      break;
    //Primer juego
    case 2:

      if (phasesGameOne < 0 && dist(mouseX, mouseY, 350, 300) < 30) {
        phasesGameOne = 0;
        transitioning = false;
      }
      if (mouseX > 477 && mouseX < 525 && mouseY > 80 && mouseY < 127) {
        phasesGameOne = 1;
      }

      //Rojo
      if (phasesGameOne == 1 && mouseX > 553 && mouseX < 644 && mouseY > 111 && mouseY < 149) {
        objectPanaderia = 0;
        choosenColorGameOne = true;
	grades[0] = 40;

      }

      //Amarillo
      if (phasesGameOne == 1 && mouseX > 553 && mouseX < 644 && mouseY > 176 && mouseY < 205) {
        objectPanaderia = 1;
        choosenColorGameOne = true;
	grades[0] = 0;
      }

      //Azul
      if (phasesGameOne == 1 && mouseX > 553 && mouseX < 644 && mouseY > 236 && mouseY < 270) {
        objectPanaderia = 2;
        choosenColorGameOne = true;
	grades[0] = 0;
      }

      //Siguiente
      if (choosenColorGameOne != false && mouseX > 610 && mouseX < 644 && mouseY > 291 && mouseY < 332) {
        player.setX(20)
        player.setY(30)
        screensCounter = 3;

        transitioning = true;
        holdUp();
      }
      break;
    //Segundo juego 
    case 3:

      // Pantalla de inicio
      if (phasesGameTwo === -1 && dist(mouseX, mouseY, 350, 300) < 30) {
        phasesGameTwo = 0;
        transitioning = false;
      }

      // Yendo al manager
      if (phasesGameTwo === 0 && playerLock) {
        if (dist(mouseX, mouseY, 625, 265) < 15) {
          phasesGameTwo = 1;
          playerLock = false;
        }
      }

      // Colocando cervezas
      if (phasesGameTwo === 1) {
        for (let j = 0; j < beerZones.length; j++) {
          if (player.isNear(beerZones[j], 65)) {
            beerZones[j].chosen = true;
            phasesGameTwo = -1;
            screensCounter = 4;
            transitioning = true;
          }
        }
	if (beerZones[2].chosen) {
		grades[1] = 40;
	} else {
		grades[1] = 0;
	}
      }

      break;
    //Tercer juego
    case 4:
      if (instructionsOrder < 2 && gameThreeCases == false) {
        instructionsOrder = instructionsOrder + 1;

      }

      if (instructionsOrder == 2) {
        gameThreeCases = true;
      }

      if (gameThreeCases === true) {

        //Mix
        if (valueMix < 450 && valueMix >= 0) {

          if (dist(mouseX, mouseY, 506, 163) < 8) {
            valueMix += 10;
          }

          if (dist(mouseX, mouseY, 537, 163) < 8) {
            valueMix -= 10;
          }

          if (valueMix < 0) {
            valueMix = 0
          }

          if (valueMix > 450) {
            valueMix = 450
          }

        }

        //BBQ
        if (valueBBQ < 450 && valueBBQ >= 0) {

          if (dist(mouseX, mouseY, 506, 187) < 8) {
            valueBBQ += 10;
          }

          if (dist(mouseX, mouseY, 537, 187) < 8) {
            valueBBQ -= 10;
          }

          if (valueBBQ < 0) {
            valueBBQ = 0
          }

          if (valueBBQ > 450) {
            valueBBQ = 450
          }

        }

        //Natural
        if (valueNatural < 450 && valueNatural >= 0) {

          if (dist(mouseX, mouseY, 506, 210) < 8) {
            valueNatural += 10;
          }

          if (dist(mouseX, mouseY, 537, 210) < 8) {
            valueNatural -= 10;
          }

          if (valueNatural < 0) {
            valueNatural = 0
          }

          if (valueNatural > 450) {
            valueNatural = 450
          }

        }
	      if(valueMix >= 400 && (valueNatural > valueBBQ)) {
		      grades[2] = 40;
	      } else {
		      grades[2] = 0;
	      }

        if (finishedGameThree === true && mouseX > 233 && mouseX < 466 && mouseY > 89 && mouseY < 116) {
          screensCounter = 5;
        }
      }

      break;
    //Cuarto juego
    case 5:
      // Pantalla de inicio
      if (phasesGameFou === -1 && dist(mouseX, mouseY, 350, 300) < 30) {
        phasesGameFou = 0;
        transitioning = false;
      }

      // Yendo al manager
      if (phasesGameFou === 0 && playerLock) {
        if (dist(mouseX, mouseY, 625, 265) < 15) {
          phasesGameFou = 1;
          playerLock = false;
        }
      }

      // Colocando chicles
      if (phasesGameFou === 1) {
        for (let j = 0; j < chicZones.length; j++) {
          if (player.isNear(chicZones[j], 65)) {
            chicZones[j].chosen = true;
            holdUp();
            phasesGameFou = -1;
            screensCounter = 6;
            transitioning = true;

          }
        }
	if (chicZones[0].chosen) {
		grades[3] = 40;
	} else {
		grades[3] = 0;
	}
      }

      break;
    //Quinto juego 
    case 6:
      if (instructionsOrderFive < 2 && gameFiveCases == false) {
        instructionsOrderFive = instructionsOrderFive + 1;

      }

      if (instructionsOrderFive == 2) {
        gameFiveCases = true;
      }

      if (dist(mouseX, mouseY, rangeOneX, rangeOneY) < 10) {
        rangeOneOn = !rangeOneOn;
      }

      if (dist(mouseX, mouseY, rangeTwoX, rangeTwoY) < 10) {
        rangeTwoOn = !rangeTwoOn;
      }

      if (mouseX > 488 && mouseX < 616 && mouseY > 160 && mouseY < 180) {
        secondScreenFive = true;
      }

      // Decisiones del primer background


      if (mouseX > 312 && mouseX < 412 && mouseY > 106 && mouseY < 124 && backgroundCounter === 0 && secondScreenFive === true) {
        backgroundTwoDecOne = 1;
        secondAct = true;
      }


      if (mouseX > 312 && mouseX < 412 && mouseY > 131 && mouseY < 150 && backgroundCounter === 0 && secondScreenFive === true) {
        backgroundTwoDecOne = 2;
        secondAct = true;
      }


      if (mouseX > 312 && mouseX < 412 && mouseY > 155 && mouseY < 177 && backgroundCounter === 0 && secondScreenFive === true) {
        backgroundTwoDecOne = 3;
        secondAct = true;
      }

      if (mouseX > 312 && mouseX < 412 && mouseY > 214 && mouseY < 236 && backgroundCounter === 0 && secondScreenFive === true) {
        backgroundTwoDecTwo = 1;
        secondAct = true;
      }

      if (mouseX > 312 && mouseX < 412 && mouseY > 238 && mouseY < 260 && backgroundCounter === 0 && secondScreenFive === true) {
        backgroundTwoDecTwo = 2;
        secondAct = true;
      }

      if (mouseX > 488 && mouseX < 616 && mouseY > 160 && mouseY < 180 && backgroundCounter === 0 && secondAct == true) {
        backgroundCounter = 1;
      }
      
      
      if (secondAct == true && secondScreenFive == true && backgroundCounter === 1) { 

        // Primera
        if (mouseX > 278 && mouseX < 464 && mouseY > 124 && mouseY < 158) { 
          backgroundOneDecision = 1;
        }

        if (mouseX > 278 && mouseX < 464 && mouseY > 180 && mouseY < 214) {
          backgroundOneDecision = 2;
          
        }

        if (mouseX > 278 && mouseX < 464 && mouseY > 229 && mouseY < 264) {
          backgroundOneDecision = 3;
        }

        if (mouseX > 488 && mouseX < 616 && mouseY > 160 && mouseY < 180 && backgroundOneDecision != 0) {
          screensCounter = 7;
        }

      }
      break;
    case 7:
      
      if (finalScoreScreensCounter === 10){
        oActivity.addState("Juego 1", grades[0]);
        oActivity.addState("Juego 2", grades[1]);
        oActivity.addState("Juego 3", grades[2]);
        oActivity.addState("Juego 4", grades[3]);
        oActivity.addState("Juego 5", grades[4]);
        oActivity.addResult([{ id: CARRERAS.MERCADEO, value: finalScore}]);
        oActivity.finish();
      } else {
        finalScoreScreensCounter += 1;
      }
      
      break;
  }
}

function keyPressed() {

  // Si el juego inicia y el jugador no esta paralizado, muevelo
  if (screensCounter > 1 && !playerLock) {
    switch (keyCode) {
      case 87:
        player.move(0, tileMap);
        break;

      case 83:
        player.move(1, tileMap);
        break;

      case 65:
        player.move(2, tileMap);
        break;

      case 68:
        player.move(3, tileMap);
        break;
    }
  }

}

//Funcion para dejar la panaderia durante todo el juego
function colorDefPanaderia() {
  if (objectPanaderia === 0) {
    image(gameOneAssets[0], 0, 0);
  }

  if (objectPanaderia === 1) {
    image(gameOneAssets[1], 0, 0);
  }

  if (objectPanaderia === 2) {
    image(gameOneAssets[2], 0, 0);
  }
}

// Funcion para forzar a draw() que espere un momento
function holdUp() {
  holdTime = 0;
}

