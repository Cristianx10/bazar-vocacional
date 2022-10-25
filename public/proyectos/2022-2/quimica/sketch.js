let puntaje;

let pantalla = 1;

let bgCompound1;
let bgCompound2;
let bgCompound3;
let bgCompound4;
let bgCompound5;

let instructions;
let instructions2;
let notebook;

let showInstructions;

let level;
let matraz;

answerList = [];



let sec = 0;
let min = 5;
let timer;


oActivity.setInit(()=>{
    oActivity.addState("score", 0)
oActivity.addState("time1", 0)
oActivity.addState("time2", 0)
oActivity.addState("time3", 0)
    oActivity.redirect('/proyectos/2022-2/quimica/nivel-2/index.html')

})

function changeLevel2() {
    oActivity.redirect('/proyectos/2022-2/quimica/nivel-2/index.html')
}

function saveScore(score) {
    oActivity.addState("score", parseInt(score))
    //  localStorage.setItem("score", score);
}

function saveTime(time) {
    oActivity.addState("time1", time)
    // localStorage.setItem("time1", time);
}

function setup() {
    createCanvas(1535, 742);
    imageMode(CENTER);
    rectMode(CENTER);
    textAlign(CENTER);
    frameRate(30);
    puntaje = 0;
    showInstructions = false;
    level = 0;



    bgCompound1 = loadImage("./img/Agua.png");
    bgCompound2 = loadImage("./img/Glicerina.png");
    bgCompound3 = loadImage("./img/Carbomero.png");
    bgCompound4 = loadImage("./img/Trietanolamina.png");
    bgCompound5 = loadImage("./img/Alcohol.png");
    instructions = loadImage("./img/instrucciones.png");
    instructions2 = loadImage("./img/instrucciones 3.png");
    notebook = loadImage("./img/cuadernoIns.png");
    portada = loadImage("./img/portada.png");
    aviso = loadImage("./img/aviso.png");
    //prueba = loadImage("./img/prueba.png"); 

    matraz = loadImage("./img/matraz.png");
    carbono = loadImage("./img/carbono.png");
    hidrogeno = loadImage("./img/hidrogeno.png");
    nitrogeno = loadImage("./img/nitrogeno.png");
    oxigeno = loadImage("./img/oxigeno.png");


}


function draw() {

    if (level > 0) {
        time();
    }


    switch (pantalla) {

        case 1:

            imageMode(CORNER);
            background(portada);

            break;

        case 2:

            imageMode(CORNER);
            background(aviso);

            break;

        case 3:

            imageMode(CORNER);
            background(instructions);

            break;

        case 4:

            imageMode(CORNER);
            background(instructions2);

            break;

        case 5:

            level = 1;
            imageMode(CORNER);
            background(bgCompound1);
            //if(answerList.length > 0){
            fill(0);
            textStyle(BOLD);
            textSize(14);
            text((getFormattedValue(answerList)), 400, 695);


            break;
        case 6:
            level = 2;
            imageMode(CORNER);
            background(bgCompound2);

            fill(0);
            textStyle(BOLD);
            textSize(14);
            text((getFormattedValue(answerList)), 400, 695);

            break;
        case 7:

            level = 3;
            imageMode(CORNER);
            background(bgCompound3);

            fill(0);
            textStyle(BOLD);
            textSize(14);
            text((getFormattedValue(answerList)), 400, 695);

            break;

        case 8:

            level = 4;
            imageMode(CORNER);
            background(bgCompound4);

            fill(0);
            textStyle(BOLD);
            textSize(14);
            text((getFormattedValue(answerList)), 400, 695);

            break;

        case 9:
            level = 5;
            imageMode(CORNER);
            background(bgCompound5);

            fill(0);
            textStyle(BOLD);
            textSize(14);
            text((getFormattedValue(answerList)), 400, 695);

            break;

        case 10:
            imageMode(CORNER);
            //background(bgCompound5);
            notebook.resize(1214, 683);
            image(notebook, 100, 50);


            //fill(0);
            //text((getFormattedValue(answerList)), 246, 695);

            break;

    }

    fill(255, 255, 255);
    textSize(18);
    text(timer, 105, 50);

}

function time() {

    if (frameCount % 30 == 0) {

        sec--;
    }

    if (sec == 0) {
        min--;
        sec = 59;
    }

    if (sec < 10) {
        timer = `${min}:0${sec}`
    } else {
        timer = `${min}:${sec}`
    }


    if (min == 0 && sec == 1) {
        //pantalla = 11;
        changeLevel2();
    }
}


function clearAnswerList() {
    answerList = [];
}

function mousePressed() {
    //saveScore(100);
    //changeLevel();




    switch (pantalla) {



        case 1:

            console.log(mouseX + "," + mouseY)
            if (mouseX > 643 && mouseX < 887 && mouseY > 600 && mouseY < 655) {
                pantalla++;
            }


            break;

        case 2:

            console.log(mouseX + "," + mouseY)
            if (mouseX > 1288 && mouseX < 1481 && mouseY > 645 && mouseY < 700) {
                pantalla++;
            }

            break;

        case 3:
            console.log(mouseX + "," + mouseY)
            if (mouseX > 1288 && mouseX < 1481 && mouseY > 645 && mouseY < 700) {
                pantalla++;
            }

            break;

        case 4:
            console.log(mouseX + "," + mouseY)
            if (mouseX > 1035 && mouseX < 1268 && mouseY > 558 && mouseY < 627) {
                pantalla++;
            }

            break;


        case 5:

            console.log(mouseX + "," + mouseY)

            if (mouseX > 101 && mouseX < 167 && mouseY > 410 && mouseY < 641) {
                answerList.push('C');
            }
            if (mouseX > 294 && mouseX < 359 && mouseY > 410 && mouseY < 641) {
                answerList.push('H');
            }
            if (mouseX > 485 && mouseX < 552 && mouseY > 410 && mouseY < 641) {
                answerList.push('N');
            }

            if (mouseX > 678 && mouseX < 744 && mouseY > 410 && mouseY < 641) {
                answerList.push('O');
            }


            if (mouseX > 801 && mouseX < 946 && mouseY > 664 && mouseY < 716) {
                //console.log("borrar");
                clearAnswerList();
            }

            if (mouseX > 1188 && mouseX < 1385 && mouseY > 384 && mouseY < 685) {
                checkUserAnswer();
                console.log(puntaje);

            }

            if (mouseX > 1267 && mouseX < 1381 && mouseY > 67 && mouseY < 160) {
                pantalla = 10;
            }

            break;
        case 6:
            if (mouseX > 101 && mouseX < 167 && mouseY > 410 && mouseY < 641) {
                answerList.push('C');
            }
            if (mouseX > 294 && mouseX < 359 && mouseY > 410 && mouseY < 641) {
                answerList.push('H');
            }
            if (mouseX > 485 && mouseX < 552 && mouseY > 410 && mouseY < 641) {
                answerList.push('N');
            }
            if (mouseX > 678 && mouseX < 744 && mouseY > 410 && mouseY < 641) {
                answerList.push('O');
            }


            if (mouseX > 801 && mouseX < 946 && mouseY > 664 && mouseY < 716) {
                //console.log("borrar");
                clearAnswerList();
            }

            if (mouseX > 1188 && mouseX < 1385 && mouseY > 384 && mouseY < 685) {
                checkUserAnswer();
                console.log(puntaje);

            }

            if (mouseX > 1267 && mouseX < 1381 && mouseY > 67 && mouseY < 160) {
                pantalla = 10;
            }

            break;

        case 7:

            if (mouseX > 101 && mouseX < 167 && mouseY > 410 && mouseY < 641) {
                answerList.push('C');
            }
            if (mouseX > 294 && mouseX < 359 && mouseY > 410 && mouseY < 641) {
                answerList.push('H');
            }
            if (mouseX > 485 && mouseX < 552 && mouseY > 410 && mouseY < 641) {
                answerList.push('N');
            }
            if (mouseX > 678 && mouseX < 744 && mouseY > 410 && mouseY < 641) {
                answerList.push('O');
            }

            if (mouseX > 801 && mouseX < 946 && mouseY > 664 && mouseY < 716) {
                //console.log("borrar");
                clearAnswerList();
            }

            if (mouseX > 1188 && mouseX < 1385 && mouseY > 384 && mouseY < 685) {
                checkUserAnswer();
                console.log(puntaje);

            }

            if (mouseX > 1267 && mouseX < 1381 && mouseY > 67 && mouseY < 160) {
                pantalla = 10;
            }

            break;

        case 8:

            if (mouseX > 101 && mouseX < 167 && mouseY > 410 && mouseY < 641) {
                answerList.push('C');
            }
            if (mouseX > 294 && mouseX < 359 && mouseY > 410 && mouseY < 641) {
                answerList.push('H');
            }
            if (mouseX > 485 && mouseX < 552 && mouseY > 410 && mouseY < 641) {
                answerList.push('N');
            }
            if (mouseX > 678 && mouseX < 744 && mouseY > 410 && mouseY < 641) {
                answerList.push('O');
            }

            if (mouseX > 801 && mouseX < 946 && mouseY > 664 && mouseY < 716) {
                //console.log("borrar");
                clearAnswerList();
            }

            if (mouseX > 1188 && mouseX < 1385 && mouseY > 384 && mouseY < 685) {
                checkUserAnswer();
                console.log(puntaje);

            }

            if (mouseX > 1267 && mouseX < 1381 && mouseY > 67 && mouseY < 160) {
                pantalla = 10;
            }

            break;

        case 9:

            if (mouseX > 101 && mouseX < 167 && mouseY > 410 && mouseY < 641) {
                answerList.push('C');
            }
            if (mouseX > 294 && mouseX < 359 && mouseY > 410 && mouseY < 641) {
                answerList.push('H');
            }
            if (mouseX > 485 && mouseX < 552 && mouseY > 410 && mouseY < 641) {
                answerList.push('N');
            }
            if (mouseX > 678 && mouseX < 744 && mouseY > 410 && mouseY < 641) {
                answerList.push('O');
            }

            if (mouseX > 801 && mouseX < 946 && mouseY > 664 && mouseY < 716) {
                //console.log("borrar");
                clearAnswerList();
            }

            if (mouseX > 1188 && mouseX < 1385 && mouseY > 384 && mouseY < 685) {
                checkUserAnswer();
                console.log(puntaje);

            }

            if (mouseX > 1267 && mouseX < 1381 && mouseY > 67 && mouseY < 160) {
                pantalla = 10;
            }

            break;

        case 10:
            console.log(mouseX + "," + mouseY)
            if (mouseX > 196 && mouseX < 240 && mouseY > 117 && mouseY < 159) {
                //answerList.push('C');
                pantalla = level + 4;
                puntaje -= 5;
            }

            break;


    }

}

function checkUserAnswer() {
    switch (pantalla) {
        case 5:

            if (getFormattedValue(answerList) == 'H2O') {
                puntaje += 10;
                pantalla++;
            } else {
                puntaje -= 5;
            }
            clearAnswerList();

            break;
        case 6:

            if (getFormattedValue(answerList) == 'C3H8O3') {
                puntaje += 10;
                pantalla++;
            } else {
                puntaje -= 5;
            }
            clearAnswerList();

            break;

        case 7:

            if (getFormattedValue(answerList) == 'C3H4O2') {
                puntaje += 10;
                pantalla++;
            } else {
                puntaje -= 5;
            }
            clearAnswerList();

            break;

        case 8:

            if (getFormattedValue(answerList) == 'C6H15NO3') {
                puntaje += 10;
                pantalla++;
            } else {
                puntaje -= 5;
            }
            clearAnswerList();

            break;

        case 9:

            if (getFormattedValue(answerList) == 'C2H5OH') {
                puntaje += 10;
                saveScore(puntaje);
                saveTime(timer);
                changeLevel2();


            } else {
                puntaje -= 5;
            }
            clearAnswerList();

            break;


    }

}

function getFormattedValue(array) {
    const reduced = array.reduce((prev, current, index) => {
        if (index === 0) return current;
        if (array[index - 1] === current) {
            if (prev.charAt(prev.length - 1) === current) return prev + '2';

            const amount = parseInt(prev.charAt(prev.length - 1));
            const newVal = prev.slice(0, -1) + (amount + 1);
            return newVal;
        }

        return prev + current
    }, '');

    return reduced.toUpperCase();
}
