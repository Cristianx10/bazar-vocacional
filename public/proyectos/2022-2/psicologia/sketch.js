let bolas = [];
let puntaje = 0;
let letras = [
  "I",
  "E",
  "N",
  "S",
  "T",
  "F",
  "J",
  "P"
];

let consejo = false;

let posOcupada = [false, false, false];
let respuestas = ["", "", ""];
let correctas = [];

let vidElement;
let playBtn;
let itsStop;
let botonContinue = false;
let validarlas = false;

let screen = 1;

let placeholder;
let dragging = false;
let elVideo;
let pantallaTutorial;
let pantallaTutorial2;
let bgNiveles;
let dificultad = 1;
let reset = false;
//PERSONAJES
let cruella;
let amigaCruella;
let drX;
let ozuna;
let Lit_elCumblast;
let spiderman;
let jameson;
let princesa;
let reptiliana;
let ariana;
let victoria;
let jade;
let medueleeloido;
let victorious;
let jadex2;

let imgfinal;
let tv;
let botonConfirmar = [];
let B_ConfirmarStatus = 0;

let tiempoboton = 30;
let botonlisto = true;

let buttonEscape = [];
let buttonImg = [];
let buttonStatus = 0;
let personalidadImagenes = [];
let personalidadesList = [];
let vidended = false;

// reorgnizar para encajar con las imagenes  
let tipados = [{
  etiqueta: "arquitecto",
  personalidad: "INTJ"
}, {
  etiqueta: "logico",
  personalidad: "INTP"
}, {
  etiqueta: "comandante",
  personalidad: "ENTJ"
}, {
  etiqueta: "innovador",
  personalidad: "ENTP"
}, {
  etiqueta: "abogado",
  personalidad: "INFJ"
}, {
  etiqueta: "mediador",
  personalidad: "INFP"
}, {
  etiqueta: "protagonista",
  personalidad: "ENFJ"
}, {
  etiqueta: "activista",
  personalidad: "ENFP"
}, {
  etiqueta: "logista",
  personalidad: "ISTJ"
}, {
  etiqueta: "defensor",
  personalidad: "ISFJ"
}, {
  etiqueta: "ejecutivo",
  personalidad: "ESTJ"
}, {
  etiqueta: "consul",
  personalidad: "ESFJ"
}, {
  etiqueta: "virtuoso",
  personalidad: "ISTP"
}, {
  etiqueta: "aventurero",
  personalidad: "ISFP"
}, {
  etiqueta: "emprendedor",
  personalidad: "ESTP"
}, {
  etiqueta: "animador",
  personalidad: "ESFP"
}];
function preload() {
  // para las personalidades

  tipados.forEach((e) => {

    personalidadImagenes.push(loadImage(`./public/images/personalidades/${e.personalidad}.png`))
  }

  );

  for (let index = 1; index < 4; index++) {
    botonConfirmar.push(loadImage(`./public/images/botonConfirmar (${index}).png`))
  }

  placeholder = loadImage('./public/images/elplaceholder.jpg');
  buttonImg = [loadImage('./public/images/botonplay_1.png'), loadImage('./public/images/botonplay_2.png')];
  buttonNext = [loadImage('./public/images/botonNext_1.png'), loadImage('./public/images/botonNext_2.png')];
  pantallaTutorial = loadImage('./public/images/BGround/Tutorial1.png');
  pantallaTutorial2 = loadImage('./public/images/BGround/Tutorial2.png');
  bgNiveles = loadImage('./public/images/BGround/FondoNiveles.png');
  tv = loadImage('./public/images/tv.png');
  imgfinal = loadImage('./public/images/BGround/FINAL.png');
  buttonEscape = [loadImage('./public/images/botonX (1).png'), loadImage('./public/images/botonX (2).png')];

  Lit_elCumblast = loadImage('./public/images/personajes/LitElCumblast.png')

  cruella = loadImage('./public/images/personajes/Cruella.png')

  amigaCruella = loadImage('./public/images/personajes/Amiga de Cruella.png')
  ozuna = loadImage('./public/images/personajes/Ozuna.png')
  drX = loadImage('./public/images/personajes/Dr X.png')
  spiderman = loadImage('./public/images/personajes/le peter.png')
  jameson = loadImage('./public/images/personajes/JJ Jameson.png')
  princesa = loadImage('./public/images/personajes/Princesa.png')
  reptiliana = loadImage('./public/images/personajes/elizabeth tercera.png')
  ariana = loadImage('./public/images/personajes/Ariana Pequeña.png')
  jade = loadImage('./public/images/personajes/Jade.png')
  victoria = loadImage('./public/images/personajes/Victorious.png')
  medueleeloido = loadImage('./public/images/personajes/Canta mejor jbalvin.png')
  jadex2 = loadImage('./public/images/personajes/Jadex2.png')
  victorious = loadImage('./public/images/personajes/Victoriousx2.png')




}

function setup() {
  createCanvas(1920, 1080);
  frameRate(60);
  setupForScreen();

  Resp_correctas();

  tipados.forEach((e) => {


    personalidadesList.push(new personalidad(personalidadImagenes[tipados.indexOf(e)], e.personalidad, e.etiqueta, "any", 1600, 300))



  }


  );

  /* for (let i = 0; i < 16; i++) {

     personalidadesList.push(new personalidad(personalidadImagenes[i], tipados[i].personalidad, 1600, 300))
   }*/
  itsStop = true;
}

function draw() {
  background(220);

  switch (screen) {
    case 1:
      image(placeholder, 0, 0);
      image(buttonImg[buttonStatus], (1920 / 2) - 220, 596);
      break;

    case 2:
      image(pantallaTutorial, 0, 0);
      image(buttonNext[buttonStatus], 1574, 934);
      break;

    case 3:
      image(pantallaTutorial2, 0, 0);
      image(buttonNext[buttonStatus], 1574, 934);

      break;

    case 4:
      if (vidElement.time() > vidElement.duration() - 2) {
        vidElement.noLoop();
        vidElement.pause();
        vidended = true;


      }

      if (frameCount % 130 === 0 && vidended) {
        screen += 1

        setupForScreen();
        checkNewScreen();
      }
      elVideo = vidElement.get();

      image(elVideo, 0, 0);
      break;



    case 5:

      image(bgNiveles, 0, 0);

      let tempIndexList = tipados.map(e => e.personalidad);
      let tempPersonalidad = [];

      screenrunning();
      CreateSquares(2);
      [correctas[0][0], correctas[0][1], "INFJ"].forEach(e =>
        tempPersonalidad.push(tempIndexList.indexOf(e))
      )

      tempPersonalidad.forEach(e => {
        if (personalidadesList[e].getDragging()) {
          personalidadesList[e].setPositions(mouseX, mouseY);
        }
        personalidadesList[e].display()
        personalidadesList[e].turnActivo();
      })

      personalidadesList[tempPersonalidad[0]].set_Origin(1500, 300)

      personalidadesList[tempPersonalidad[1]].set_Origin(1700, 300);
      personalidadesList[tempPersonalidad[2]].set_Origin(1500, 530);

      image(cruella, 80, 870);
      image(amigaCruella, 550, 870);



      if (validarlas) {
        validarRespuestas(correctas[0])
      }

      if (posOcupada[0] === true && posOcupada[1] === true) {
        botonContinue = true
      }

      break;


    case 6:

      image(bgNiveles, 0, 0);

      let tempIndexList2 = tipados.map(e => e.personalidad);
      let tempPersonalidad2 = [];

      screenrunning();
      CreateSquares(2);
      [correctas[1][0], correctas[1][1], "ISTJ"].forEach(e =>
        tempPersonalidad2.push(tempIndexList2.indexOf(e))
      )

      tempPersonalidad2.forEach(e => {
        if (personalidadesList[e].getDragging()) {
          personalidadesList[e].setPositions(mouseX, mouseY);
        }
        personalidadesList[e].display();
        personalidadesList[e].turnActivo();

      })

      personalidadesList[tempPersonalidad2[0]].set_Origin(1500, 300)

      personalidadesList[tempPersonalidad2[1]].set_Origin(1700, 300);
      personalidadesList[tempPersonalidad2[2]].set_Origin(1500, 530);

      image(ozuna, 60, 870);
      image(drX, 500, 870);

      if (validarlas) {
        validarRespuestas(correctas[1])
      }



      if (posOcupada[0] === true && posOcupada[1] === true) {
        botonContinue = true
      }

      break;

    case 7:

      image(bgNiveles, 0, 0);

      let tempIndexList3 = tipados.map(e => e.personalidad);
      let tempPersonalidad3 = [];

      screenrunning();
      CreateSquares(2);
      [correctas[2][0], correctas[2][1], "INTJ"].forEach(e =>
        tempPersonalidad3.push(tempIndexList3.indexOf(e))
      )

      tempPersonalidad3.forEach(e => {
        if (personalidadesList[e].getDragging()) {
          personalidadesList[e].setPositions(mouseX, mouseY);
        }
        personalidadesList[e].display()
        personalidadesList[e].turnActivo();
      })

      personalidadesList[tempPersonalidad3[0]].set_Origin(1500, 300)

      personalidadesList[tempPersonalidad3[1]].set_Origin(1700, 300);
      personalidadesList[tempPersonalidad3[2]].set_Origin(1500, 530);

      image(spiderman, 70, 870);
      image(jameson, 480, 870);

      if (validarlas) {
        validarRespuestas(correctas[2])
      }

      if (posOcupada[0] === true && posOcupada[1] === true) {
        botonContinue = true
      }
      break;

    case 8:

      image(bgNiveles, 0, 0);

      let tempIndexList4 = tipados.map(e => e.personalidad);
      let tempPersonalidad4 = [];

      screenrunning();
      CreateSquares(2);
      [correctas[3][0], correctas[3][1], "INTJ"].forEach(e =>
        tempPersonalidad4.push(tempIndexList4.indexOf(e))
      )

      tempPersonalidad4.forEach(e => {
        if (personalidadesList[e].getDragging()) {
          personalidadesList[e].setPositions(mouseX, mouseY);
        }
        personalidadesList[e].display()
        personalidadesList[e].turnActivo();
      })

      personalidadesList[tempPersonalidad4[0]].set_Origin(1500, 300)

      personalidadesList[tempPersonalidad4[1]].set_Origin(1700, 300);
      personalidadesList[tempPersonalidad4[2]].set_Origin(1500, 530);

      image(princesa, 70, 870);
      image(reptiliana, 500, 870);

      if (validarlas) {
        validarRespuestas(correctas[3])
      }


      if (posOcupada[0] === true && posOcupada[1] === true) {
        botonContinue = true
      }
      break;


    case 9:

      image(bgNiveles, 0, 0);



      let tempIndexList5 = tipados.map(e => e.personalidad);
      let tempPersonalidad5 = [];

      screenrunning();
      CreateSquares(3);
      [correctas[4][0], correctas[4][1], correctas[4][2], "INTJ"].forEach(e =>
        tempPersonalidad5.push(tempIndexList5.indexOf(e))
      )



      tempPersonalidad5.forEach(e => {
        if (personalidadesList[e].getDragging()) {
          personalidadesList[e].setPositions(mouseX, mouseY);
        }
        personalidadesList[e].display()
        personalidadesList[e].turnActivo();
      })

      personalidadesList[tempPersonalidad5[0]].set_Origin(1500, 300)

      personalidadesList[tempPersonalidad5[1]].set_Origin(1700, 300);
      personalidadesList[tempPersonalidad5[2]].set_Origin(1500, 530);
      personalidadesList[tempPersonalidad5[3]].set_Origin(1700, 530);


      image(victoria, 70, 870);
      image(ariana, 500, 870);
      image(jade, 870, 870);

      if (validarlas) {
        validarRespuestas(correctas[4])
      }

      if (posOcupada[0] === true && posOcupada[1] === true) {
        botonContinue = true
      }

      break;


    case 10:

      image(bgNiveles, 0, 0);



      let tempIndexList6 = tipados.map(e => e.personalidad);
      let tempPersonalidad6 = [];

      screenrunning();
      CreateSquares(3);
      [, correctas[5][1], correctas[5][2], "INFP", correctas[5][0]].forEach(e =>
        tempPersonalidad6.push(tempIndexList6.indexOf(e))
      )



      tempPersonalidad6.forEach(e => {
        if (personalidadesList[e].getDragging()) {
          personalidadesList[e].setPositions(mouseX, mouseY);
        }
        personalidadesList[e].display()
        personalidadesList[e].turnActivo();
      })

      personalidadesList[tempPersonalidad6[0]].set_Origin(1500, 300)
      personalidadesList[tempPersonalidad6[1]].set_Origin(1700, 300);
      personalidadesList[tempPersonalidad6[2]].set_Origin(1500, 530);
      personalidadesList[tempPersonalidad6[3]].set_Origin(1700, 530);


      image(victorious, 120, 870);
      image(jadex2, 550, 870);
      image(medueleeloido, 900, 870);

      if (validarlas) {
        validarRespuestas(correctas[5])
      }

      if (posOcupada[0] === true && posOcupada[1] === true) {
        botonContinue = true
      }

      break;


    case 11:

      image(imgfinal, 0, 0);
      textSize(80);

      textAlign(CENTER, CENTER);
      text(puntaje, 1920 / 2, 1080 / 2);

      break;


  }

  if (screen > 4 && screen < 11) {
    image(tv, 0, 0)

  }

  if (consejo === true) {


    image(pantallaTutorial2, 0, 0);

    if (dist(mouseX, mouseY, 165, 185) < 80) {
      buttonStatus = 1;
    } else { buttonStatus = 0 }
    image(buttonEscape[buttonStatus], 112, 136);
    vidElement.pause();
  }

  BotonConfirmar();
  checkButton();
  waitaminute();
}

function Resp_correctas() {

  correctas = [
    ["ENTJ", "ISFJ"],
    ["ESFP", "ISFJ"],
    ["ESTJ", "INFP"],
    ["INFP", "ISTJ"],
    ["ENTP", "ISTP", "ENFP"],
    ["ESFJ", "ISTP", "ESFP"],
  ]

}

function validarCasillas() {

  for (let i = 0; i < personalidadesList.length; i++) {
    if (dist(
      personalidadesList[i].getPosX(),
      personalidadesList[i].getPosY(),
      312 + (420 * 0),
      950
    ) < 60 && posOcupada[0] === false) {
      posOcupada[0] = true;
    }

    if (dist(
      personalidadesList[i].getPosX(),
      personalidadesList[i].getPosY(),

      // posiciones para dejarlo
      312 + (420 * 1),
      950
    ) < 60 && posOcupada[1] === false) {
      posOcupada[1] = true;
    }

    if (dist(
      personalidadesList[i].getPosX(),
      personalidadesList[i].getPosY(),

      // posiciones para dejarlo
      312 + (420 * 2),
      950
    ) < 60 && posOcupada[2] === false) {
      posOcupada[2] = true;
    }
  }
}

function validarRespuestas(resp) {

  for (let i = 0; i < respuestas.length; i++) {

    if (respuestas[i] === resp[i]) {
      puntaje += 14;
    }
  }

  if (puntaje === 196) {
    puntaje === 200
  }
  /* for (let i = 0; i < personalidadesList.length; i++) {
     personalidadesList[i].setUnlock();
     
   }*/
  screen += 1;

  //
  respuestas = ["", "", ""]
  posOcupada = [false, false, false];
  setupForScreen();
  checkNewScreen();
  validarlas = false;
}

function screenrunning() {

  elVideo = vidElement.get();
  image(elVideo, 50, 50);
}

//--------------------just jump------------------------------//
// boton de la pantalla 1 & 2
function checkButton() {
  if (screen === 1) {

    if (mouseX > (1920 / 2) - 220 && mouseX < (1920 / 2) + 220 && mouseY > 596 && mouseY < 752) {
      buttonStatus = 1;
    } else {
      buttonStatus = 0;
    }

    if (mouseX > (1920 / 2) - 220 && mouseX < (1920 / 2) + 220 && mouseY > 596 && mouseY < 752) {
      if (mouseIsPressed && botonlisto === true) {
        screen = 2;
        setupForScreen();

        botonlisto = false;

      }
    }
  }


  if (screen === 2) {
    // condicion para que statur y todo lode arriba pero con lo de abajo ;)

    if (mouseX > 1574 && mouseX < (1574 + 153) && mouseY > 934 && mouseY < (930 + 50)) {
      buttonStatus = 1;
    } else {
      buttonStatus = 0;
    }

    if (mouseX > 1574 && mouseX < (1574 + 153) && mouseY > 934 && mouseY < (930 + 50)) {
      if (mouseIsPressed && botonlisto === true) {
        screen = 3;
        setupForScreen();
        checkNewScreen();

        botonlisto = false;
      }
    } /**/
  }

  if (screen === 3) {
    // condicion para que statur y todo lode arriba pero con lo de abajo ;)

    if (mouseX > 1574 && mouseX < (1574 + 153) && mouseY > 934 && mouseY < (930 + 50)) {
      buttonStatus = 1;
    } else {
      buttonStatus = 0;
    }

    if (mouseX > 1574 && mouseX < (1574 + 153) && mouseY > 934 && mouseY < (930 + 50)) {
      if (mouseIsPressed && botonlisto === true) {
        screen = 4;
        setupForScreen();
        checkNewScreen();

        botonlisto = false;

      }
    } /**/
  }
}



function BotonConfirmar() {


  if (botonContinue) {
    B_ConfirmarStatus = 1
  }

  if (botonContinue && mouseX > 1540 && mouseX < 1550 + 240 && mouseY > 900 && mouseY < 910 + 60) {
    B_ConfirmarStatus = 2
  }


  if (screen > 4 && screen < 11) {
    image(botonConfirmar[B_ConfirmarStatus], 1550, 920);
  }
}


function waitaminute() {

  if (botonlisto === false) {
    tiempoboton -= 1;
  }

  if (tiempoboton === 0) {
    botonlisto = true;
    tiempoboton = 15;
  }
}

// pausa y reanuda el video
function playVideo() {

  if (!itsStop) {
    vidElement.pause();
    itsStop = !itsStop;
    return
  }

  vidElement.play();
  itsStop = !itsStop;
  return
}

// este es para crear cuadrados que diran donde encajar los fantasmas quizas luego lo organice bien en vez de borrarlo
function CreateSquares(x) {
  noStroke();
  fill("white");
  rectMode(CENTER);
  for (let i = 0; i < x; i++) {
    rect(312 + (420 * i), 950, 120, 120, 30);
  }
  rectMode(CORNER);


}
//---------------------------------------------------//

// este se cambiara por una configuracion diferente por cada pantalla
// ocultando, pausando elementeos etc
function setupForScreen() {

  switch (screen) {
    case 1:

      break;

    case 4:
      reste = false;
      vidElement = createVideo(
        "./public/video/Pantalla Tutorial.mp4"
      );
      vidElement.size(1920, 1080)
      break;


    case 5:

      reset = false


      vidElement.pause();
      vidElement = createVideo(
        "./public/video/Niveles/ENTJ e ISFJ.mp4"
      );
      vidElement.size(1280, 720)

      break;

    case 6:
      reset = false

      vidElement.pause();

      vidElement = createVideo(
        "./public/video/Niveles/ESFP y ESFJ.mp4"
      );
      vidElement.size(1280, 720)
      break;

    case 7:
      reset = false

      vidElement.pause();

      vidElement = createVideo(
        "./public/video/Niveles/INFP e ESTJ.mp4"
      );
      vidElement.size(1280, 720)
      break;


    case 8:
      reset = false

      vidElement.pause();

      vidElement = createVideo(
        "./public/video/Niveles/INFP e ISTJ.mp4"
      );
      vidElement.size(1280, 720)
      break;

    case 9:
      reset = false

      vidElement.pause();

      vidElement = createVideo(
        "./public/video/Niveles/ENTP, ENFP e ISTP.mp4"
      );
      vidElement.size(1280, 720)
      break;

    case 10:
      reset = false;

      vidElement.pause();

      vidElement = createVideo(
        "./public/video/Niveles/ISTP, ESFP y ESFJ.mp4"
      );
      vidElement.size(1280, 720)
      break;


    //final
    case 11:
      reset = false;
      vidElement.noLoop();
      vidElement.pause();
      vidElement = undefined;
      playBtn.hide();


      break;
  }

  if (screen === 5) {
    playBtn = createButton("reproducir / pausar");
    playBtn.position((570), 700);

    playBtn.mouseClicked(playVideo);
    playBtn.style("border-style", "none");
    playBtn.style("padding", "10px");
    playBtn.style("border-radius", "25px");
  }
}

// parecido al de arriba
// pausa el el video y lo elimina de la pantalla
function checkNewScreen() {
  //playBtn.hide();
  if (vidElement != undefined) {
    itsStop = true;
    vidElement.noLoop();
    vidElement.hide();
    vidElement.loop();

  }
  botonContinue = false;
  B_ConfirmarStatus = 0;


  for (let i = 0; i < personalidadesList.length; i++) {
    personalidadesList[i].turnNoActivo();
    personalidadesList[i].setUnlock();
  }
  respuestas = ["", "", ""]
  posOcupada = [false, false, false];
}

function mousePressed() {
  //------------------------------------------
  //checkNewScreen()
  // esto se borra despues de hacer los cambios de pantalla correctamente


  if (dist(mouseX, mouseY, 1769, 49) < 80) {
    consejo = true;
    playBtn.hide();
  }
  if (dist(mouseX, mouseY, 185, 165) < 80) {
    consejo = false;
    playBtn.show();
  }


  if (mouseX > 1540 && mouseX < 1550 + 240 && mouseY > 900 && mouseY < 910 + 60 && botonContinue) {

    validarlas = true;

  }

  //
  //----------------------------------------------

  for (let i = 0; i < personalidadesList.length; i++) {
    if (dist(
      personalidadesList[i].getPosX(),
      personalidadesList[i].getPosY(),
      mouseX,
      mouseY
    ) < 80 && personalidadesList[i].getLock() === false) {
      personalidadesList[i].setDragging();
    }

    if (dist(
      personalidadesList[i].getPosX(),
      personalidadesList[i].getPosY(),
      mouseX,
      mouseY
    ) < 80 && personalidadesList[i].getLock() === true) {

      personalidadesList[i].setUnlock();
      posOcupada[personalidadesList[i].getCasilla()] = false;
      respuestas[personalidadesList[i].getCasilla()] = "";
    }

  }
}

function mouseReleased() {
  if (dificultad === 1) { }
  if (screen > 3) {
    for (let i = 0; i < personalidadesList.length; i++) {




      if (dist(
        personalidadesList[i].getPosX(),
        personalidadesList[i].getPosY(),

        // posiciones para dejarlo
        312 + (420 * 0),
        950
      ) < 60 && posOcupada[0] === false) {

        personalidadesList[i].setOrigin(312 + (420 * 0),
          950);
        posOcupada[0] = true;
        personalidadesList[i].setLock();
        personalidadesList[i].setCasilla(0);
        respuestas[0] = personalidadesList[i].getTipo();

      }

      if (dist(
        personalidadesList[i].getPosX(),
        personalidadesList[i].getPosY(),

        // posiciones para dejarlo
        312 + (420 * 1),
        950
      ) < 60 && !posOcupada[1]) {

        personalidadesList[i].setOrigin(312 + (420 * 1),
          950);
        respuestas[1] = personalidadesList[i].getTipo();
        personalidadesList[i].setLock();
        personalidadesList[i].setCasilla(1);
        posOcupada[1] = true;

      }

      if (dist(
        personalidadesList[i].getPosX(),
        personalidadesList[i].getPosY(),

        // posiciones para dejarlo
        312 + (420 * 2),
        950
      ) < 60 && !posOcupada[2]) {

        personalidadesList[i].setOrigin(312 + (420 * 2),
          950);
        personalidadesList[i].setLock();
        personalidadesList[i].setCasilla(2);
        posOcupada[2] = true;
        respuestas[2] = personalidadesList[i].getTipo();
      }

      personalidadesList[i].setNotDragging();

    }
  }
}


function final() {

  if (mouseIsPressed && dist(mouseX, mouseY, 1920 / 2, 1300)) {
    oActivity.addResult([{ id: CARRERAS.PSICOLOGIA, value: puntaje }]);
    oActivity.finish()
  }

}