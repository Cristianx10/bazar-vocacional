let bg;
//let score = parseInt(localStorage.getItem("score")) ;
let score = oActivity.getState("score")[0]();


function setup() {

    createCanvas(1535, 742);
    bg = loadImage("final.png");
    bg.resize(1535, 742);
}

function draw() {

    imageMode(CORNER);
    /*bg.resize(1535, 742);
    image(bg, 500, 800);*/
    background(bg);

    fill(0);
    textSize(24);
    textStyle(BOLD);
    text('Tu puntuación final fue: ' + score, 700, 410);
    console.log(score);



}

function mousePressed() {
    if (mouseX > 1322 && mouseX < 1473 && mouseY > 661 && mouseY < 701) {
        //  let tiempo1 = localStorage.getItem('time1')
        //  let tiempo2 = localStorage.getItem('time2')
        //  let tiempo3 = localStorage.getItem('time3')

        let tiempo1 = oActivity.getState('time1')[0]()
        let tiempo2 = oActivity.getState('time2')[0]()
        let tiempo3 = oActivity.getState('time3')[0]()

        oActivity.addState("Tiempo Nivel 1", tiempo1);
        oActivity.addState("Tiempo Nivel 2", tiempo2);
        oActivity.addState("Tiempo Nivel 3", tiempo3);
        if (score < 0) {
            let puntaje = 0
            oActivity.addResult([{ id: CARRERAS.QUIMICA, value: puntaje }]);
        } else {
            oActivity.addResult([{ id: CARRERAS.QUIMICA, value: score }]);
        }

        oActivity.finish()
    }
}