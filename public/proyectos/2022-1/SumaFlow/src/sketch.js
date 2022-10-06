

//Variable declaration
let pantalla = 0;

let actividad;

/* None is 0
Selecting is 1
*/
let gameMode = 0;

let selectedI = 0;
let selectedJ = 0;

let pselectedI = 0;
let pselectedJ = 0;

// instructions map
let instMap = [
    [17, 0, 20],
    [7, 10, 7],
    [0, 7, 6],
];

let instMapType = [
    [3, 1, 3],
    [2, 2, 2],
    [1, 2, 2],
];


let level1Map = [
    [34, 9, 2, 8, 4],
    [7, 10, 4, 6, 7],
    [0, 7, 0, 3, 4],
    [10, 3, 0, 8, 0],
    [12, 8, 4, 5, 43],
];

let level1MapType = [
    [3, 2, 2, 2, 2],
    [2, 2, 2, 2, 2],
    [1, 2, 1, 2, 2],
    [3, 2, 1, 2, 1],
    [3, 2, 2, 2, 3],
];

let level2Map = [
    [5, 7, 4, 2, 1, 8],
    [0, 9, 27, 0, 7, 6],
    [46, 6, 5, 0, 9, 5],
    [7, 4, 3, 6, 3, 38],
    [5, 0, 8, 7, 19, 0],
    [4, 6, 3, 11, 8, 3],
];

let level2MapType = [
    [2, 2, 2, 2, 2, 2],
    [1, 2, 3, 1, 2, 2],
    [3, 2, 2, 1, 2, 2],
    [2, 2, 2, 2, 2, 3],
    [2, 1, 2, 2, 3, 1],
    [2, 2, 2, 3, 2, 2],
];

let level3Map = [
    [9, 4, 5, 8, 54, 1, 7, 2],
    [6, 3, 5, 9, 0, 4, 67, 0],
    [2, 8, 7, 5, 0, 14, 3, 87],
    [1, 2, 8, 10, 6, 4, 2, 8],
    [5, 1, 9, 13, 3, 0, 1, 3],
    [7, 7, 4, 3, 10, 0, 5, 4],
    [4, 4, 6, 2, 8, 6, 4, 2],
    [3, 0, 5, 3, 2, 9, 5, 1],
];

let level3MapType = [
    [2, 2, 2, 2, 3, 2, 2, 2],
    [2, 2, 2, 2, 1, 2, 3, 1],
    [2, 2, 2, 2, 1, 3, 2, 3],
    [2, 2, 2, 3, 2, 2, 2, 2],
    [2, 2, 2, 3, 2, 1, 2, 2],
    [2, 2, 2, 2, 2, 1, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 1, 2, 2, 2, 2, 2, 2],
];



//Level 1 Time
let timer1 = 0;
let timerdif = 0;
let timerShow = "0";
let min = 0;
let addmin;

//Level 2 Time
let timer2 = 0;
let timerdif1 = 0;
let timerShow1 = "0";
let min1 = 0;
let addmin1;

//Level 3 Time
let timer3 = 0;
let timerdif2 = 0;
let timerShow2 = "0";
let min2 = 0;
let addmin2;

let sumBlocks = [];
let completedBlocks = [];

let scoreTimes = [];

let nunito;
let suma;
let home1
let home2
let inst1
let inst2
let tut
let tutReady
let tutReady1
let finalInst
let finalInst1
let level1
let level1big
let level1big1
let level2
let level2bg
let level2bg1
let level3
let level3bg
let level3bg1
let score
let score1
let tutGif
let path = "./"



function preload() {
    // console.clear();


    nunito = loadFont(path + "fonts/nunito-bold.ttf");
    home1 = loadImage(path + "images/start1.png");
    home2 = loadImage(path + "images/start2.png");
    inst1 = loadImage(path + "images/inst1.png");
    inst2 = loadImage(path + "images/inst2.png");
    tut = loadImage(path + "images/tutblock.png");
    tutReady = loadImage(path + "images/tutready.png");
    tutReady1 = loadImage(path + "images/tutready1.png");
    finalInst = loadImage(path + "images/finalinst.png");
    finalInst1 = loadImage(path + "images/finalinst1.png");
    level1 = loadImage(path + "images/level1.png");
    level1big = loadImage(path + "images/level1big.png");
    level1big1 = loadImage(path + "images/level1big1.png");
    level2 = loadImage(path + "images/level2.png");
    level2bg = loadImage(path + "images/level2bg.png");
    level2bg1 = loadImage(path + "images/level2bg1.png");
    level3 = loadImage(path + "images/level3.png");
    level3bg = loadImage(path + "images/level3bg.png");
    level3bg1 = loadImage(path + "images/level3bg1.png");
    score = loadImage(path + "images/score.png");
    score1 = loadImage(path + "images/score1.png");

    tutGif = loadImage(path + "images/tutgif2.gif");
}

function setup() {

    var myCanvas = createCanvas(1280, 720);

   
    observerScale(document.querySelector("body"), myCanvas, {
        width: 1280, height: 720
    })

    oActivity.addState("page", "inicio")

    

    setTimeout(() => {

        oActivity.setInit(()=>{
            oActivity.addState("page", "final")

            console.log(oActivity.medicion)
        })
       

        
    }, 2000)



    createMap(instMap, instMapType);
    setupTutorialMap(instMap);

    createMapLevel1(level1Map, level1MapType);
    setupLevel1Map(level1Map);

    createMapLevel2(level2Map, level2MapType);
    setupLevel2Map(level2Map);

    createMapLevel3(level3Map, level3MapType);
    setupLevel3Map(level3Map);
}

function draw() {

    switch (pantalla) {
        case 0:
            image(home1, 0, 0);

            if (474 < mouseX && mouseX < 805 && 513 < mouseY && mouseY < 591) {
                image(home2, 0, 0);
            }
            break;
        case 1:
            image(inst1, 0, 0);
            if (128 < mouseX && mouseX < 128 + 293 && 555 < mouseY && mouseY < 555 + 47) {
                image(inst2, 0, 0);
            }

            image(tutGif, 695, 132);


            break;
        case 2:
            image(tut, 0, 0);
            drawMap(instMap, pantalla);

            break;
        case 3:
            image(tutReady, 0, 0);
            if (128 < mouseX && mouseX < 128 + 197 && 547 < mouseY && mouseY < 547 + 47) {
                image(tutReady1, 0, 0);
            }
            break;
        case 4:
            timer1 = floor(millis() / 1000);
            image(finalInst, 0, 0);
            if (124 < mouseX && mouseX < 124 + 205 && 530 < mouseY && mouseY < 530 + 48) {
                image(finalInst1, 0, 0);
            }

            break;
        case 5:
            image(level1, 0, 0);
            timer2 = floor(millis() / 1000);
            timerdif = floor(millis() / 1000) - timer1;
            timerShow = timerdif - 60 * min;
            if (timerShow < 10) {
                timerShow = "0" + timerShow;
            }

            if (timerdif % 60 == 0 && timerShow >= 1) {
                addmin = true;
            }

            if (addmin == true) {
                min = min + 1;
                addmin = false;
            }


            if (96 < mouseX && mouseX < 96 + 197 && 394 < mouseY && mouseY < 394 + 47) {
                image(level1big, 0, 0);
            }

            if (96 < mouseX && mouseX < 96 + 197 && 463 < mouseY && mouseY < 463 + 47) {
                image(level1big1, 0, 0);
            }

            drawMapLevel1(level1Map, pantalla);
            suma = 0;
            for (let i = 0; i < sumBlocks.length; i++) {
                suma += sumBlocks[i].getNumber();
            }
            textSize(80);
            textAlign(CENTER);
            text(suma, 195, 350);
            text(min + ':' + timerShow, 1087, 425);

            break;

        case 6:
            image(level2, 0, 0);
            timer3 = floor(millis() / 1000)
            timerdif1 = floor(millis() / 1000) - timer2;
            timerShow1 = timerdif1 - 60 * min1;
            if (timerShow1 < 10) {
                timerShow1 = "0" + timerShow1;
            }

            if (timerdif1 % 60 == 0 && timerShow1 >= 1) {
                addmin1 = true;
            }

            if (addmin1 == true) {
                min1 = min1 + 1;
                addmin1 = false;
            }


            if (96 < mouseX && mouseX < 96 + 197 && 394 < mouseY && mouseY < 394 + 47) {
                image(level2bg, 0, 0);
            }

            if (96 < mouseX && mouseX < 96 + 197 && 463 < mouseY && mouseY < 463 + 47) {
                image(level2bg1, 0, 0);
            }

            drawMapLevel2(level2Map, pantalla);


            suma = 0;
            for (let i = 0; i < sumBlocks.length; i++) {
                suma += sumBlocks[i].getNumber();
            }
            textSize(80);
            textAlign(CENTER);
            text(suma, 195, 350);
            text(min1 + ':' + timerShow1, 1087, 425);

            break;
        case 7:
            image(level3, 0, 0);

            timerdif2 = floor(millis() / 1000) - timer3;
            timerShow2 = timerdif2 - 60 * min2;
            if (timerShow2 < 10) {
                timerShow2 = "0" + timerShow2;
            }

            if (timerdif2 % 60 == 0 && timerShow2 >= 1) {
                addmin2 = true;
            }

            if (addmin2 == true) {
                min2 = min2 + 1;
                addmin2 = false;
            }


            if (96 < mouseX && mouseX < 96 + 197 && 394 < mouseY && mouseY < 394 + 47) {
                image(level3bg, 0, 0);
            }

            if (96 < mouseX && mouseX < 96 + 197 && 463 < mouseY && mouseY < 463 + 47) {
                image(level3bg1, 0, 0);
            }

            drawMapLevel3(level3Map, pantalla);


            suma = 0;
            for (let i = 0; i < sumBlocks.length; i++) {
                suma += sumBlocks[i].getNumber();
            }
            textSize(80);
            textAlign(CENTER);
            text(suma, 195, 350);
            text(min2 + ':' + timerShow2, 1087, 425);

            break;
        case 8:
            image(score, 0, 0);
            if (528 < mouseX && mouseX < 528 + 225 && 605 < mouseY && mouseY < 605 + 53) {
                image(score1, 0, 0);
            }
            textSize(45);
            textAlign(CENTER);
            text(scoreTimes[0] + "/40", 750, 242);
            text(scoreTimes[1] + "/60", 750, 317);
            text(scoreTimes[2] + "/100", 725, 390);
            text(scoreTimes[0] + scoreTimes[1] + scoreTimes[2] + "/200", 725, 513);
            /*
            text(scoreTimes[0]+"/40", 195, 350);
            text(scoreTimes[1], 195, 400);
            text(scoreTimes[2], 195, 450);*/
            break;
    }

    textSize(16);
    fill(255);
    //text(mouseX + "," + mouseY, mouseX, mouseY);


}


function mousePressed() {


    switch (pantalla) {
        case 0:
            if (474 < mouseX && mouseX < 805 && 513 < mouseY && mouseY < 591) {
                pantalla = 1;
            }
            break;
        case 1:
            if (128 < mouseX && mouseX < 128 + 293 && 555 < mouseY && mouseY < 555 + 47) {
                pantalla = 2;
            }
            break;

        case 2:
            if (720 < mouseX && mouseX < 1128 && 157 < mouseY && mouseY < 565) {

                selectedI = Math.floor((mouseY - 157) / 140);
                selectedJ = Math.floor((mouseX - 720) / 140);

                if (instMap[selectedI][selectedJ].getType() == 1 && gameMode == 0) {

                    resetMapTut(instMap);
                    sumBlocks.push(instMap[selectedI][selectedJ]);
                    //console.log(sumBlocks);
                    pselectedI = selectedI;
                    pselectedJ = selectedJ;
                    gameMode = 1;

                } else if (instMap[selectedI][selectedJ].getType() == 1 && gameMode == 1) {
                    //console.log(selectedI, selectedJ);
                    resetMapTut(instMap);
                    gameMode = 0;

                } else if (instMap[selectedI][selectedJ].getType() == 3 && gameMode == 1) {
                    let sum = 0;
                    for (let i = 0; i < sumBlocks.length; i++) {
                        sum += sumBlocks[i].getNumber();
                    }

                    if (sum == instMap[selectedI][selectedJ].getNumber()) {
                        //console.log(sumBlocks);
                        //console.log(instMap[selectedI][selectedJ]);
                        instMap[selectedI][selectedJ].changeType(5);

                        for (let i = 0; i < sumBlocks.length; i++) {
                            completedBlocks.push(sumBlocks[i]);
                        }

                        while (sumBlocks.length > 0) {
                            sumBlocks[sumBlocks.length - 1].changeColor(instMap[selectedI][selectedJ].getColor());
                            sumBlocks[sumBlocks.length - 1].changeType(5);
                            sumBlocks.pop();
                        }

                        completedBlocks.push(instMap[selectedI][selectedJ]);
                        resetMapTut(instMap);
                        //console.log(instMap);
                        //console.log(completedBlocks);
                    } else {
                        resetMapTut(instMap);
                    }
                } else if ((selectedI == 0 && selectedJ == 1) || (selectedI == 2 && selectedJ == 0)) {
                    gameMode = 0;
                    resetPathM1(instMap);
                }

            } else {
                resetMapTut(instMap);
                gameMode = 0;
            }

            break;

        case 3:
            if (128 < mouseX && mouseX < 128 + 197 && 547 < mouseY && mouseY < 547 + 47) {
                pantalla = 4;
            }
            break;
        case 4:

            if (124 < mouseX && mouseX < 124 + 205 && 530 < mouseY && mouseY < 530 + 48) {
                pantalla = 5;
            }
            break;

        case 5:

            if (387 < mouseX && mouseX < 387 + 506 && 138 < mouseY && mouseY < 138 + 506) {

                selectedI = Math.floor((mouseY - 155) / 97);
                selectedJ = Math.floor((mouseX - 403) / 97);
                //console.log(selectedI, selectedJ);
                if (level1Map[selectedI][selectedJ].getType() == 1 && gameMode == 0) {

                    resetMap1(level1Map);
                    sumBlocks.push(level1Map[selectedI][selectedJ]);
                    pselectedI = selectedI;
                    pselectedJ = selectedJ;
                    //console.log(sumBlocks);
                    gameMode = 1;

                } else if (level1Map[selectedI][selectedJ].getType() == 1 && gameMode == 1) {
                    //console.log(selectedI, selectedJ);
                    resetMap1(level1Map);
                    gameMode = 0;

                } else if (level1Map[selectedI][selectedJ].getType() == 3 && gameMode == 1) {
                    let sum = 0;
                    for (let i = 0; i < sumBlocks.length; i++) {
                        sum += sumBlocks[i].getNumber();
                    }

                    if (sum == level1Map[selectedI][selectedJ].getNumber()) {
                        //console.log(sumBlocks);
                        //console.log(level1Map[selectedI][selectedJ]);

                        level1Map[selectedI][selectedJ].changeType(5);
                        for (let i = 0; i < sumBlocks.length; i++) {
                            completedBlocks.push(sumBlocks[i]);
                        }

                        while (sumBlocks.length > 0) {
                            sumBlocks[sumBlocks.length - 1].changeColor(level1Map[selectedI][selectedJ].getColor());
                            sumBlocks[sumBlocks.length - 1].changeType(5);
                            sumBlocks.pop();
                        }

                        completedBlocks.push(level1Map[selectedI][selectedJ]);

                        resetMap1(level1Map);
                        //console.log(level1Map);
                    } else {
                        resetMap1(level1Map);
                    }
                } else if ((selectedI == 2 && selectedJ == 0) || (selectedI == 2 && selectedJ == 2) ||
                    (selectedI == 3 && selectedJ == 2) || (selectedI == 3 && selectedJ == 4)) {
                    gameMode = 0;
                    resetPathMap1(level1Map);
                }

            }

            resetMap1Full(level1Map);
            singleReset();
            break;
        case 6:

            if (400 < mouseX && mouseX < 875 && 150 < mouseY && mouseY < 627) {

                selectedI = Math.floor((mouseY - 145) / 83);
                selectedJ = Math.floor((mouseX - 400) / 83);
                //console.log(selectedI, selectedJ);
                if (level2Map[selectedI][selectedJ].getType() == 1 && gameMode == 0) {

                    resetMap2(level2Map);
                    sumBlocks.push(level2Map[selectedI][selectedJ]);
                    pselectedI = selectedI;
                    pselectedJ = selectedJ;
                    //console.log(sumBlocks);
                    gameMode = 1;

                } else if (level2Map[selectedI][selectedJ].getType() == 1 && gameMode == 1) {
                    //console.log(selectedI, selectedJ);
                    resetMap2(level2Map);
                    gameMode = 0;

                } else if (level2Map[selectedI][selectedJ].getType() == 3 && gameMode == 1) {
                    let sum = 0;
                    for (let i = 0; i < sumBlocks.length; i++) {
                        sum += sumBlocks[i].getNumber();
                    }

                    if (sum == level2Map[selectedI][selectedJ].getNumber()) {
                        //console.log(sumBlocks);
                        //console.log(level2Map[selectedI][selectedJ]);

                        level2Map[selectedI][selectedJ].changeType(5);
                        for (let i = 0; i < sumBlocks.length; i++) {
                            completedBlocks.push(sumBlocks[i]);
                        }

                        while (sumBlocks.length > 0) {
                            sumBlocks[sumBlocks.length - 1].changeColor(level2Map[selectedI][selectedJ].getColor());
                            sumBlocks[sumBlocks.length - 1].changeType(5);
                            sumBlocks.pop();
                        }

                        completedBlocks.push(level2Map[selectedI][selectedJ]);

                        resetMap2(level2Map);
                        //console.log(level2Map);
                    } else {
                        resetMap2(level2Map);
                    }
                } else if ((selectedI == 1 && selectedJ == 0) || (selectedI == 1 && selectedJ == 3) ||
                    (selectedI == 2 && selectedJ == 3) || (selectedI == 4 && selectedJ == 1) || (selectedI == 4 && selectedJ == 5)) {
                    gameMode = 0;
                    resetPathMap2(level2Map);
                }

            }

            resetMap2Full(level2Map);
            singleReset();
            break;

        case 7:

            if (400 < mouseX && mouseX < 875 && 150 < mouseY && mouseY < 625) {

                selectedI = Math.floor((mouseY - 145) / 60);
                selectedJ = Math.floor((mouseX - 400) / 60);
                //console.log(selectedI, selectedJ);
                if (level3Map[selectedI][selectedJ].getType() == 1 && gameMode == 0) {

                    resetMap3(level3Map);
                    sumBlocks.push(level3Map[selectedI][selectedJ]);
                    pselectedI = selectedI;
                    pselectedJ = selectedJ;
                    //console.log(sumBlocks);
                    gameMode = 1;

                } else if (level3Map[selectedI][selectedJ].getType() == 1 && gameMode == 1) {
                    //console.log(selectedI, selectedJ);
                    resetMap3(level3Map);
                    gameMode = 0;

                } else if (level3Map[selectedI][selectedJ].getType() == 3 && gameMode == 1) {
                    let sum = 0;
                    for (let i = 0; i < sumBlocks.length; i++) {
                        sum += sumBlocks[i].getNumber();
                    }

                    if (sum == level3Map[selectedI][selectedJ].getNumber()) {
                        //console.log(sumBlocks);
                        //console.log(level3Map[selectedI][selectedJ]);

                        level3Map[selectedI][selectedJ].changeType(5);
                        for (let i = 0; i < sumBlocks.length; i++) {
                            completedBlocks.push(sumBlocks[i]);
                        }

                        while (sumBlocks.length > 0) {
                            sumBlocks[sumBlocks.length - 1].changeColor(level3Map[selectedI][selectedJ].getColor());
                            sumBlocks[sumBlocks.length - 1].changeType(5);
                            sumBlocks.pop();
                        }

                        completedBlocks.push(level3Map[selectedI][selectedJ]);

                        resetMap3(level3Map);
                        //console.log(level3Map);
                    } else {
                        resetMap3(level3Map);
                    }
                } else if ((selectedI == 1 && selectedJ == 4) || (selectedI == 1 && selectedJ == 7) ||
                    (selectedI == 2 && selectedJ == 4) || (selectedI == 4 && selectedJ == 5) ||
                    (selectedI == 5 && selectedJ == 5) || (selectedI == 7 && selectedJ == 1)) {
                    gameMode = 0;
                    resetPathMap3(level3Map);
                }

            }

            resetMap3Full(level3Map);
            singleReset();
            break;
        case 8:
            if (528 < mouseX && mouseX < 528 + 225 && 605 < mouseY && mouseY < 605 + 53) {

                actividad.addState("NIVEL 1", scoreTimes[0]);
                actividad.addState("NIVEL 2", scoreTimes[1]);
                actividad.addState("NIVEL3", scoreTimes[2]);
                //actividad.addResult([{id:NameCarrera1, value:scoreTimes[0]}]);
                //actividad.addResult([{id:NameCarrera1, value:scoreTimes[1]}]);
                //actividad.addResult([{id:NameCarrera1, value:scoreTimes[2]}]);
                actividad.addResult([{ id: CARRERAS.INGENIERIA_SISTEMAS, value: scoreTimes[0] + scoreTimes[1] + scoreTimes[2] }]);
                actividad.finish();
            }
            break;

    }
}

//Tutorial all good!
function createMap(m, t) {

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            //console.log(m[i][j]);
            if (t[i][j] == 1) {
                m[i][j] = new Square(780 + (j * 120) + (j * 25), 217 + (i * 120) + (i * 25), "#D8A0FF", 120, 25, m[i][j], 1, nunito)
            } else if (t[i][j] == 2) {
                m[i][j] = new Square(780 + (j * 120) + (j * 25), 217 + (i * 120) + (i * 25), "#5B4A67", 120, 25, m[i][j], 2, nunito)
            } else if (t[i][j] == 3) {
                m[i][j] = new Square(780 + (j * 120) + (j * 25), 217 + (i * 120) + (i * 25), "#5B4A67", 120, 25, m[i][j], 3, nunito)
            }

        }
    }
    //console.log(m);
}

function drawMap(m, screen) {


    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            m[i][j].drawSquare(screen);
            if (m[i][j].getType() == 2) {
                m[i][j].changeColor("#5B4A67");
            }
            if (gameMode == 0) {
                if (m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);
                }
            } else {
                if (m[i][j].getType() == 4 || m[i][j].getType() == 3 || m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);

                }

            }



        }
    }

    if (gameMode == 1) {
        if (720 < mouseX && mouseX < 1128 && 157 < mouseY && mouseY < 565) {
            let adj = false;
            selectedI = Math.floor((mouseY - 157) / 140);
            selectedJ = Math.floor((mouseX - 720) / 140);
            //console.log("previous: " + pselectedI, pselectedJ + " current: " + selectedI, selectedJ);
            //console.log("current type: "+ instMap[selectedI][selectedJ].getType());

            //Check if valid move adjacent and valid square
            if ((selectedI >= 0 && selectedI < m.length - 1 && (m[selectedI + 1][selectedJ] == m[pselectedI][pselectedJ])) || (selectedI <= m.length - 1 && selectedI > 0 && (m[selectedI - 1][selectedJ] == m[pselectedI][pselectedJ])) ||
                (selectedJ >= 0 && selectedJ < m.length - 1 && (m[selectedI][selectedJ + 1] == m[pselectedI][pselectedJ])) || (selectedJ <= m.length - 1 && selectedJ > 0 && (m[selectedI][selectedJ - 1] == m[pselectedI][pselectedJ]))) {
                if (selectedI != pselectedI || selectedJ != pselectedJ) {

                    if (m[selectedI][selectedJ].getType() != 4) {

                        if (m[selectedI][selectedJ].getType() == 2) {
                            pselectedI = selectedI;
                            pselectedJ = selectedJ;
                            m[selectedI][selectedJ].increaseSize(screen);
                            m[selectedI][selectedJ].changeColor("#D8A0FF");
                            m[selectedI][selectedJ].changeType(4);
                            sumBlocks.push(m[selectedI][selectedJ]);
                            //console.log(sumBlocks);
                        }

                        if (m[selectedI][selectedJ].getType() == 1) {
                            //0 reset
                            if (sumBlocks[0] == m[selectedI][selectedJ]) {
                                sumBlocks[sumBlocks.length - 1].changeType(2);
                                sumBlocks.pop();
                            }

                        }


                    } else if (m[pselectedI][pselectedJ].getType() == 4) {
                        //reset to go back
                        //console.log("previous: " + pselectedI, pselectedJ + " current: " + selectedI, selectedJ);
                        while (sumBlocks[sumBlocks.length - 1] != m[selectedI][selectedJ]) {
                            sumBlocks[sumBlocks.length - 1].changeType(2);
                            sumBlocks.pop();
                        }
                        //console.log(sumBlocks);
                        pselectedI = selectedI;
                        pselectedJ = selectedJ;
                    }



                }


            }

        }
    }

    if (checkWin(m)) {
        resetMap1Full(level1Map);
        pantalla++;
    }

}

function resetPathM1(m) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }
    if (m[0][1].getType() != 1) {
        m[0][1].changeType(1);
    }
    if (m[2][0].getType() != 1) {
        m[2][0].changeType(1);
    }

}

function resetMapTut(m) {
    gameMode = 0
    /*selectedI = 0;
    selectedJ = 0;

    pselectedI = 0;
    pselectedJ = 0;*/
    sumBlocks = [];
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }

    if (m[0][1].getType() != 1 && m[0][1].getType() != 5) {
        m[0][1].changeType(1);
    }
    if (m[2][0].getType() != 1 && m[2][0].getType() != 5) {
        m[2][0].changeType(1);
    }
}

function setupTutorialMap(m) {
    m[0][0].changeColor("#1BCEB4");
    m[0][2].changeColor("#EF891B");
}


//Level 1 ALL GOOD

function createMapLevel1(m, t) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            //console.log(m[i][j]);
            if (t[i][j] == 1) {
                m[i][j] = new Square(443 + (j * 80) + (j * 17), 195 + (i * 80) + (i * 17), "#D8A0FF", 80, 15, m[i][j], 1, nunito)
            } else if (t[i][j] == 2) {
                m[i][j] = new Square(443 + (j * 80) + (j * 17), 195 + (i * 80) + (i * 17), "#5B4A67", 80, 15, m[i][j], 2, nunito)
            } else if (t[i][j] == 3) {
                m[i][j] = new Square(443 + (j * 80) + (j * 17), 195 + (i * 80) + (i * 17), "#5B4A67", 80, 15, m[i][j], 3, nunito)
            }

        }
    }
    //console.log(m);
}

function setupLevel1Map(m) {
    m[0][0].changeColor("#EF891B");
    m[3][0].changeColor("#96AC2C");
    m[4][0].changeColor("#D13D23");
    m[4][4].changeColor("#269A90");
}


function drawMapLevel1(m, screen) {


    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            m[i][j].drawSquare(screen);
            if (m[i][j].getType() == 2) {
                m[i][j].changeColor("#5B4A67");
            }
            if (gameMode == 0) {
                if (m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);
                }
            } else {
                if (m[i][j].getType() == 4 || m[i][j].getType() == 3 || m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);

                }

            }



        }
    }

    if (gameMode == 1) {
        if (405 < mouseX && mouseX < 875 && 160 < mouseY && mouseY < 630) {
            selectedI = Math.floor((mouseY - 155) / 97);
            selectedJ = Math.floor((mouseX - 403) / 97);
            //console.log("previous: "+ pselectedI, pselectedJ + " current: "+selectedI, selectedJ);
            //console.log("current type: "+ level1Map[selectedI][selectedJ].getType());

            if ((selectedI >= 0 && selectedI < m.length - 1 && (m[selectedI + 1][selectedJ] == m[pselectedI][pselectedJ])) || (selectedI <= m.length - 1 && selectedI > 0 && (m[selectedI - 1][selectedJ] == m[pselectedI][pselectedJ])) ||
                (selectedJ >= 0 && selectedJ < m.length - 1 && (m[selectedI][selectedJ + 1] == m[pselectedI][pselectedJ])) || (selectedJ <= m.length - 1 && selectedJ > 0 && (m[selectedI][selectedJ - 1] == m[pselectedI][pselectedJ]))) {

                if (selectedI != pselectedI || selectedJ != pselectedJ) {
                    // console.log("previous: " + pselectedI, pselectedJ + " current: " + selectedI, selectedJ);
                    //console.log("current type: " + level1Map[selectedI][selectedJ].getType());
                    if (m[selectedI][selectedJ].getType() != 4) {

                        if (m[selectedI][selectedJ].getType() == 2) {
                            pselectedI = selectedI;
                            pselectedJ = selectedJ;
                            m[selectedI][selectedJ].increaseSize(screen);
                            m[selectedI][selectedJ].changeColor("#D8A0FF");
                            m[selectedI][selectedJ].changeType(4);
                            sumBlocks.push(m[selectedI][selectedJ]);
                            //console.log(sumBlocks);
                        }

                        if (m[selectedI][selectedJ].getType() == 1) {
                            if (sumBlocks[0] == m[selectedI][selectedJ]) {
                                sumBlocks[sumBlocks.length - 1].changeType(2);
                                sumBlocks.pop();
                            }

                        }


                    } else if (m[pselectedI][pselectedJ].getType() == 4) {
                        //reset to go back
                        //console.log("previous: " + pselectedI, pselectedJ + " current: " + selectedI, selectedJ);
                        while (sumBlocks[sumBlocks.length - 1] != m[selectedI][selectedJ]) {
                            sumBlocks[sumBlocks.length - 1].changeType(2);
                            sumBlocks.pop();
                        }
                        //console.log(sumBlocks);
                        pselectedI = selectedI;
                        pselectedJ = selectedJ;
                    }



                }

            }



        }
    }

    if (checkWin(m)) {
        timerShow = parseInt(timerShow);
        let timeScore = parseInt(min * 60 + timerShow);
        scoreTimes.push(timeScore);
        console.log(scoreTimes);
        pantalla++;
    }

}


function resetMap1(m) {
    gameMode = 0
    /*selectedI = 0;
    selectedJ = 0;

    pselectedI = 0;
    pselectedJ = 0;*/
    sumBlocks = [];
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }

    if (m[2][0].getType() != 1 && m[2][0].getType() != 5) {
        m[2][0].changeType(1);
    }
    if (m[2][2].getType() != 1 && m[2][2].getType() != 5) {
        m[2][2].changeType(1);
    }
    if (m[3][2].getType() != 1 && m[3][2].getType() != 5) {
        m[3][2].changeType(1);
    }
    if (m[3][4].getType() != 1 && m[3][4].getType() != 5) {
        m[3][4].changeType(1);
    }
}


function resetMap1Full(m) {


    if (96 < mouseX && mouseX < 96 + 197 && 463 < mouseY && mouseY < 463 + 47) {
        gameMode = 0
        /*selectedI = 0;
        selectedJ = 0;
    
        pselectedI = 0;
        pselectedJ = 0;*/
        sumBlocks = [];
        completedBlocks = [];
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[i].length; j++) {
                if (m[i][j].getType() == 4 || m[i][j].getType() == 5) {
                    m[i][j].changeType(2);
                }
            }
        }

        if (m[2][0].getType() != 1) {
            m[2][0].changeColor("#D8A0FF");
            m[2][0].changeType(1);
        }
        if (m[2][2].getType() != 1) {
            m[2][2].changeColor("#D8A0FF");
            m[2][2].changeType(1);
        }
        if (m[3][2].getType() != 1) {
            m[3][2].changeColor("#D8A0FF");
            m[3][2].changeType(1);
        }
        if (m[3][4].getType() != 1) {
            m[3][4].changeColor("#D8A0FF");
            m[3][4].changeType(1);
        }

        if (m[0][0].getType() != 3) {
            m[0][0].changeType(3);
        }
        if (m[3][0].getType() != 3) {
            m[3][0].changeType(3);
        }
        if (m[4][0].getType() != 3) {
            m[4][0].changeType(3);
        }
        if (m[4][4].getType() != 3) {
            m[4][4].changeType(3);
        }
        setupLevel1Map(level1Map);
    }
}

function resetPathMap1(m) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }
    if (m[2][0].getType() != 1 && m[2][0].getType() != 5) {
        m[2][0].changeType(1);
    }
    if (m[2][2].getType() != 1 && m[2][2].getType() != 5) {
        m[2][2].changeType(1);
    }
    if (m[3][2].getType() != 1 && m[3][2].getType() != 5) {
        m[3][2].changeType(1);
    }
    if (m[3][4].getType() != 1 && m[3][4].getType() != 5) {
        m[3][4].changeType(1);
    }
}


function singleReset() {


    if (completedBlocks.length > 0) {
        if (96 < mouseX && mouseX < 96 + 197 && 394 < mouseY && mouseY < 394 + 47) {
            completedBlocks[completedBlocks.length - 1].changeType(3);
            completedBlocks.pop();
            while (completedBlocks[completedBlocks.length - 1].getNumber() != 0) {
                completedBlocks[completedBlocks.length - 1].changeType(2);
                completedBlocks.pop();
                //console.log(completedBlocks);
            }
            completedBlocks[completedBlocks.length - 1].changeType(1);
            completedBlocks[completedBlocks.length - 1].changeColor("#D8A0FF");
            completedBlocks.pop();
        }
        //console.log(completedBlocks);
    }
}

//LEVEL 2 All good!

function createMapLevel2(m, t) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            //console.log(m[i][j]);
            if (t[i][j] == 1) {
                m[i][j] = new Square(434 + (j * 67) + (j * 15), 187 + (i * 67) + (i * 15), "#D8A0FF", 67, 11, m[i][j], 1, nunito)
            } else if (t[i][j] == 2) {
                m[i][j] = new Square(434 + (j * 67) + (j * 15), 187 + (i * 67) + (i * 15), "#5B4A67", 67, 11, m[i][j], 2, nunito)
            } else if (t[i][j] == 3) {
                m[i][j] = new Square(434 + (j * 67) + (j * 15), 187 + (i * 67) + (i * 15), "#5B4A67", 67, 11, m[i][j], 3, nunito)
            }

        }
    }
    //console.log(m);
}

function setupLevel2Map(m) {
    m[1][2].changeColor("#4C88E2");
    m[2][0].changeColor("#269A90");
    m[3][5].changeColor("#D13D23");
    m[4][4].changeColor("#EF891B");
    m[5][3].changeColor("#96AC2C");
}

function drawMapLevel2(m, screen) {


    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            m[i][j].drawSquare(screen);
            if (m[i][j].getType() == 2) {
                m[i][j].changeColor("#5B4A67");
            }
            if (gameMode == 0) {
                if (m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);
                }
            } else {
                if (m[i][j].getType() == 4 || m[i][j].getType() == 3 || m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);

                }

            }



        }
    }

    if (gameMode == 1) {
        if (400 < mouseX && mouseX < 875 && 150 < mouseY && mouseY < 627) {

            selectedI = Math.floor((mouseY - 145) / 83);
            selectedJ = Math.floor((mouseX - 400) / 83);
            //console.log("previous: "+ pselectedI, pselectedJ + " current: "+selectedI, selectedJ);
            //console.log("current type: "+ level1Map[selectedI][selectedJ].getType());

            if ((selectedI >= 0 && selectedI < m.length - 1 && (m[selectedI + 1][selectedJ] == m[pselectedI][pselectedJ])) || (selectedI <= m.length - 1 && selectedI > 0 && (m[selectedI - 1][selectedJ] == m[pselectedI][pselectedJ])) ||
                (selectedJ >= 0 && selectedJ < m.length - 1 && (m[selectedI][selectedJ + 1] == m[pselectedI][pselectedJ])) || (selectedJ <= m.length - 1 && selectedJ > 0 && (m[selectedI][selectedJ - 1] == m[pselectedI][pselectedJ]))) {

                if (selectedI != pselectedI || selectedJ != pselectedJ) {
                    // console.log("previous: " + pselectedI, pselectedJ + " current: " + selectedI, selectedJ);
                    //console.log("current type: " + level2Map[selectedI][selectedJ].getType());
                    if (m[selectedI][selectedJ].getType() != 4) {

                        if (m[selectedI][selectedJ].getType() == 2) {
                            pselectedI = selectedI;
                            pselectedJ = selectedJ;
                            m[selectedI][selectedJ].increaseSize(screen);
                            m[selectedI][selectedJ].changeColor("#D8A0FF");
                            m[selectedI][selectedJ].changeType(4);
                            sumBlocks.push(m[selectedI][selectedJ]);
                            // console.log(sumBlocks);
                        }

                        if (m[selectedI][selectedJ].getType() == 1) {
                            if (sumBlocks[0] == m[selectedI][selectedJ]) {
                                sumBlocks[sumBlocks.length - 1].changeType(2);
                                sumBlocks.pop();
                            }

                        }


                    } else if (m[pselectedI][pselectedJ].getType() == 4) {
                        //reset to go back
                        //console.log("previous: " + pselectedI, pselectedJ + " current: " + selectedI, selectedJ);
                        while (sumBlocks[sumBlocks.length - 1] != m[selectedI][selectedJ]) {
                            sumBlocks[sumBlocks.length - 1].changeType(2);
                            sumBlocks.pop();
                        }
                        //console.log(sumBlocks);
                        pselectedI = selectedI;
                        pselectedJ = selectedJ;
                    }



                }

            }



        }
    }

    if (checkWin(m)) {
        timerShow1 = parseInt(timerShow1);
        let timeScore = parseInt(min1 * 60 + timerShow1);
        scoreTimes.push(timeScore);
        console.log(scoreTimes);
        pantalla++;
    }

}

function resetMap2(m) {


    gameMode = 0
    /*selectedI = 0;
    selectedJ = 0;

    pselectedI = 0;
    pselectedJ = 0;*/
    sumBlocks = [];
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }

    if (m[1][0].getType() != 1 && m[1][0].getType() != 5) {
        m[1][0].changeType(1);
    }
    if (m[1][3].getType() != 1 && m[1][3].getType() != 5) {
        m[1][3].changeType(1);
    }
    if (m[2][3].getType() != 1 && m[2][3].getType() != 5) {
        m[2][3].changeType(1);
    }
    if (m[4][1].getType() != 1 && m[4][1].getType() != 5) {
        m[4][1].changeType(1);
    }
    if (m[4][5].getType() != 1 && m[4][5].getType() != 5) {
        m[4][5].changeType(1);
    }
}


function resetMap2Full(m) {


    if (96 < mouseX && mouseX < 96 + 197 && 463 < mouseY && mouseY < 463 + 47) {
        gameMode = 0
        /*selectedI = 0;
        selectedJ = 0;
    
        pselectedI = 0;
        pselectedJ = 0;*/
        sumBlocks = [];
        completedBlocks = [];
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[i].length; j++) {
                if (m[i][j].getType() == 4 || m[i][j].getType() == 5) {
                    m[i][j].changeType(2);
                }
            }
        }

        if (m[1][0].getType() != 1) {
            m[1][0].changeColor("#D8A0FF");
            m[1][0].changeType(1);
        }
        if (m[1][3].getType() != 1) {
            m[1][3].changeColor("#D8A0FF");
            m[1][3].changeType(1);
        }
        if (m[2][3].getType() != 1) {
            m[2][3].changeColor("#D8A0FF");
            m[2][3].changeType(1);
        }
        if (m[4][1].getType() != 1) {
            m[4][1].changeColor("#D8A0FF");
            m[4][1].changeType(1);
        }
        if (m[4][5].getType() != 1) {
            m[4][5].changeColor("#D8A0FF");
            m[4][5].changeType(1);
        }

        if (m[1][2].getType() != 3) {
            m[1][2].changeType(3);
        }
        if (m[2][0].getType() != 3) {
            m[2][0].changeType(3);
        }
        if (m[3][5].getType() != 3) {
            m[3][5].changeType(3);
        }
        if (m[4][4].getType() != 3) {
            m[4][4].changeType(3);
        }
        if (m[5][3].getType() != 3) {
            m[5][3].changeType(3);
        }
        setupLevel2Map(level2Map);
    }
}

function resetPathMap2(m) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }
    if (m[1][0].getType() != 1 && m[1][0].getType() != 5) {
        m[1][0].changeType(1);
    }
    if (m[1][3].getType() != 1 && m[1][3].getType() != 5) {
        m[1][3].changeType(1);
    }
    if (m[2][3].getType() != 1 && m[2][3].getType() != 5) {
        m[2][3].changeType(1);
    }
    if (m[4][1].getType() != 1 && m[4][1].getType() != 5) {
        m[4][1].changeType(1);
    }
    if (m[4][5].getType() != 1 && m[4][5].getType() != 5) {
        m[4][5].changeType(1);
    }
}

//LEVEL 3

function createMapLevel3(m, t) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            //console.log(m[i][j]);
            if (t[i][j] == 1) {
                m[i][j] = new Square(425 + (j * 50) + (j * 11), 175 + (i * 50) + (i * 11), "#D8A0FF", 50, 10, m[i][j], 1, nunito)
            } else if (t[i][j] == 2) {
                m[i][j] = new Square(425 + (j * 50) + (j * 11), 175 + (i * 50) + (i * 11), "#5B4A67", 50, 10, m[i][j], 2, nunito)
            } else if (t[i][j] == 3) {
                m[i][j] = new Square(425 + (j * 50) + (j * 11), 175 + (i * 50) + (i * 11), "#5B4A67", 50, 10, m[i][j], 3, nunito)
            }

        }
    }
    //console.log(m);
}

function setupLevel3Map(m) {
    m[0][4].changeColor("#D13D23");
    m[1][6].changeColor("#E9B83F");
    m[2][5].changeColor("#96AC2C");
    m[2][7].changeColor("#4C88E2");
    m[3][3].changeColor("#269A90");
    m[4][3].changeColor("#EF891B");


}

function drawMapLevel3(m, screen) {


    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            m[i][j].drawSquare(screen);
            if (m[i][j].getType() == 2) {
                m[i][j].changeColor("#5B4A67");
            }
            if (gameMode == 0) {
                if (m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);
                }
            } else {
                if (m[i][j].getType() == 4 || m[i][j].getType() == 3 || m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);

                }

            }



        }
    }

    if (gameMode == 1) {
        if (400 < mouseX && mouseX < 875 && 150 < mouseY && mouseY < 623) {

            selectedI = Math.floor((mouseY - 145) / 60);
            selectedJ = Math.floor((mouseX - 400) / 60);
            //console.log("previous: "+ pselectedI, pselectedJ + " current: "+selectedI, selectedJ);
            //console.log("current type: "+ level1Map[selectedI][selectedJ].getType());

            if ((selectedI >= 0 && selectedI < m.length - 1 && (m[selectedI + 1][selectedJ] == m[pselectedI][pselectedJ])) || (selectedI <= m.length - 1 && selectedI > 0 && (m[selectedI - 1][selectedJ] == m[pselectedI][pselectedJ])) ||
                (selectedJ >= 0 && selectedJ < m.length - 1 && (m[selectedI][selectedJ + 1] == m[pselectedI][pselectedJ])) || (selectedJ <= m.length - 1 && selectedJ > 0 && (m[selectedI][selectedJ - 1] == m[pselectedI][pselectedJ]))) {

                if (selectedI != pselectedI || selectedJ != pselectedJ) {
                    //console.log("previous: " + pselectedI, pselectedJ + " current: " + selectedI, selectedJ);
                    //console.log("current type: " + level3Map[selectedI][selectedJ].getType());
                    if (m[selectedI][selectedJ].getType() != 4) {

                        if (m[selectedI][selectedJ].getType() == 2) {
                            pselectedI = selectedI;
                            pselectedJ = selectedJ;
                            m[selectedI][selectedJ].increaseSize(screen);
                            m[selectedI][selectedJ].changeColor("#D8A0FF");
                            m[selectedI][selectedJ].changeType(4);
                            sumBlocks.push(m[selectedI][selectedJ]);
                            //console.log(sumBlocks);
                        }

                        if (m[selectedI][selectedJ].getType() == 1) {
                            if (sumBlocks[0] == m[selectedI][selectedJ]) {
                                sumBlocks[sumBlocks.length - 1].changeType(2);
                                sumBlocks.pop();
                            }

                        }


                    } else if (m[pselectedI][pselectedJ].getType() == 4) {
                        //reset to go back
                        //console.log("previous: " + pselectedI, pselectedJ + " current: " + selectedI, selectedJ);
                        while (sumBlocks[sumBlocks.length - 1] != m[selectedI][selectedJ]) {
                            sumBlocks[sumBlocks.length - 1].changeType(2);
                            sumBlocks.pop();
                        }
                        //console.log(sumBlocks);
                        pselectedI = selectedI;
                        pselectedJ = selectedJ;
                    }



                }

            }



        }
    }

    if (checkWin(m)) {
        timerShow2 = parseInt(timerShow2);
        let timeScore = parseInt(min2 * 60 + timerShow2);
        scoreTimes.push(timeScore);
        console.log(scoreTimes);
        calculateScore(scoreTimes);
        pantalla++;
    }

}

function resetMap3(m) {
    gameMode = 0
    sumBlocks = [];
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }

    if (m[1][4].getType() != 1 && m[1][4].getType() != 5) {
        m[1][4].changeType(1);
    }
    if (m[1][7].getType() != 1 && m[1][7].getType() != 5) {
        m[1][7].changeType(1);
    }
    if (m[2][4].getType() != 1 && m[2][4].getType() != 5) {
        m[2][4].changeType(1);
    }
    if (m[4][5].getType() != 1 && m[4][5].getType() != 5) {
        m[4][5].changeType(1);
    }
    if (m[5][5].getType() != 1 && m[5][5].getType() != 5) {
        m[5][5].changeType(1);
    }
    if (m[7][1].getType() != 1 && m[7][1].getType() != 5) {
        m[7][1].changeType(1);
    }
}


function resetMap3Full(m) {


    if (96 < mouseX && mouseX < 96 + 197 && 463 < mouseY && mouseY < 463 + 47) {
        gameMode = 0

        sumBlocks = [];
        completedBlocks = [];
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[i].length; j++) {
                if (m[i][j].getType() == 4 || m[i][j].getType() == 5) {
                    m[i][j].changeType(2);
                }
            }
        }

        if (m[1][4].getType() != 1) {
            m[1][4].changeColor("#D8A0FF");
            m[1][4].changeType(1);
        }
        if (m[1][7].getType() != 1) {
            m[1][7].changeColor("#D8A0FF");
            m[1][7].changeType(1);
        }
        if (m[2][4].getType() != 1) {
            m[2][4].changeColor("#D8A0FF");
            m[2][4].changeType(1);
        }
        if (m[4][5].getType() != 1) {
            m[4][5].changeColor("#D8A0FF");
            m[4][5].changeType(1);
        }
        if (m[5][5].getType() != 1) {
            m[5][5].changeColor("#D8A0FF");
            m[5][5].changeType(1);
        }
        if (m[7][1].getType() != 1) {
            m[7][1].changeColor("#D8A0FF");
            m[7][1].changeType(1);
        }


        if (m[0][4].getType() != 3) {
            m[0][4].changeType(3);
        }
        if (m[1][6].getType() != 3) {
            m[1][6].changeType(3);
        }
        if (m[2][5].getType() != 3) {
            m[2][5].changeType(3);
        }
        if (m[2][7].getType() != 3) {
            m[2][7].changeType(3);
        }
        if (m[3][3].getType() != 3) {
            m[3][3].changeType(3);
        }
        if (m[4][3].getType() != 3) {
            m[4][3].changeType(3);
        }
        setupLevel3Map(level3Map);
    }
}

function resetPathMap3(m) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }
    if (m[1][4].getType() != 1 && m[1][4].getType() != 5) {
        m[1][4].changeType(1);
    }
    if (m[1][7].getType() != 1 && m[1][7].getType() != 5) {
        m[1][7].changeType(1);
    }
    if (m[2][4].getType() != 1 && m[2][4].getType() != 5) {
        m[2][4].changeType(1);
    }
    if (m[4][5].getType() != 1 && m[4][5].getType() != 5) {
        m[4][5].changeType(1);
    }
    if (m[5][5].getType() != 1 && m[5][5].getType() != 5) {
        m[5][5].changeType(1);
    }
    if (m[7][1].getType() != 1 && m[7][1].getType() != 5) {
        m[7][1].changeType(1);
    }
}

function checkWin(m) {
    let win = true;
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() != 5) {
                win = false;
            }
        }
    }

    return win;
}

function calculateScore(m) {

    let score1 = 40;
    let score2 = 60;
    let score3 = 100;

    if (m[0] < 60) {
        score1 = 40;
    } else {
        while (m[0] > 60 && score1 > 0) {
            score1 -= 10;
            m[0] = m[0] - 30;
        }
    }

    if (m[1] < 90) {
        score2 = 60;
    } else {
        while (m[1] > 90 && score2 > 0) {
            score2 -= 5;
            m[1] = m[1] - 15;
        }
    }

    if (m[2] < 150) {
        score3 = 100;
    } else {
        while (m[2] > 150 && score3 > 0) {
            score3 -= 5;
            m[2] = m[2] - 10;
        }
    }

    m[0] = score1;
    m[1] = score2;
    m[2] = score3;


    //actividad.finish()
}

