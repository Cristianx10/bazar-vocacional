let jugador;
let botonesNivel1_2;
let botonesAccion;
let botonInicio;
let botonBorrar;

let tiempoNivelDos = 0;
let tiempoNivelcuatro = 0;
let tiempoNivelseis = 0;

let score = 0;

let funcionMovimientoJugador = 0;

let fondoN1;
let fondoN2;
let fondoN3;
let fondoInicio;
let fondoFin;

let posicionJugadorNivel1;
let posicionJugadorNivel2;
let posicionJugadorNivel3;
let posicionJugadorNivel4;
let posicionJugadorNivel5;
let posicionJugadorNivel6;
let posicionJugadorNivel7;

let terreno;
let screen;
let startGameButton;
let endGameButton;

let xPos;
let yPos;
let pCol;
let pFil;
let nivel = 1;

const maxHeight = 80;
const gridSize = 10;
let gridX;
let gridY;
const sideLength = 50;
const cubes = [];

let btnImgIzq;
let btnImgDer;
let btnImgArr;
let btnImgAb;
let btnImgLl;
let btnImgP1;
let btnImgP2;
let btnImgPlay;
let btnImgTrash;
let popUpInstruction;
let alienImg;
let toolImg;
let tool2Img;
let tool3Img;
let instrucN1;
let empecemos;
let enserio;
let contexto;

let borrarP1 = false;
let borrarP2 = false;

let contarP1 = 0;
let contarP2 = 0;

let popUpsLvl1 = [];
let popUpsLvl2 = [];
let popUpsLvl3 = [];

function instructionsLvl1(x, y, w, h, text) {
  let p = new PopUp(popUpInstruction, x, y, w, h, text);
  popUpsLvl1.push(p);
  return p;
}
function instructionsLvl2(x, y, w, h, text) {
  let p = new PopUp(popUpInstruction, x, y, w, h, text);
  popUpsLvl2.push(p);
  return p;
}
function instructionsLvl3(x, y, w, h, text) {
  let p = new PopUp(popUpInstruction, x, y, w, h, text);
  popUpsLvl3.push(p);
  return p;
}
function preload() {
  // img = loadImage('sample-image.png');
  alienImg = loadImage("src/ALIEN.png");
  btnImgIzq = loadImage("src/LEFT.png");
  fondoN1 = loadImage("src/FONDO_N1.png");
  fondoN2 = loadImage("src/fondoN2.png");
  fondoN3 = loadImage("src/fondoN3.png");
  instrucN1 = loadImage("src/IntrucN1.png");
  empecemos = loadImage("src/Empecemos.png");
  enserio = loadImage("src/Enserio.png");
  contexto = loadImage("src/contexto.png");
  fondoInicio = loadImage("src/INICIO.png");
  fondoFin = loadImage("src/FIN.png");
  btnImgDer = loadImage("src/RIGHT.png");
  btnImgArr = loadImage("src/UP.png");
  btnImgAb = loadImage("src/DOWN.png");
  btnImgLl = loadImage("src/ACT.png");
  btnImgP1 = loadImage("src/P1.png");
  btnImgP2 = loadImage("src/P2.png");
  btnImgPlay = loadImage("src/PLAY.png");
  btnImgTrash = loadImage("src/TRASH.png");
  toolImg = loadImage("src/TOOL1.png");
  tool2Img = loadImage("src/TOOL2.png");
  tool3Img = loadImage("src/TOOL3.png");
  popUpInstruction = loadImage("src/INSTRUCTION.png");
}

function startGameAction() {
  screen += 1;
  startGameButton.hide();

}
function endGameAction() {
  oActivity.addState("tiempo Lvl 2", tiempoNivelDos);
  oActivity.addState("tiempo Lvl 4", tiempoNivelcuatro);
  oActivity.addState("tiempo Lvl 6", tiempoNivelseis);
  oActivity.addResult([{ id: CARRERAS.INGENIERIA_SISTEMAS, value: score}]);
  oActivity.finish();
}

function setup() {
  //instruction.newPopUp(popUpInstruction, 50, 50, 90, 90, "text");
  //instruction.newPopUp(popUpInstruction, 100, 100, 90, 90, "hola");
  // newPopUp(100, 100, 60, 70, "hola");
  posicionJugadorNivel1 = false;
  posicionJugadorNivel2 = false;
  posicionJugadorNivel3 = false;
  posicionJugadorNivel4 = false;
  posicionJugadorNivel5 = false;
  posicionJugadorNivel6 = false;
  posicionJugadorNivel7 = false;

  //const callInstruction = new PopUp(popUpInstruction, x, y, w, h, text);
  /*
  popUps.forEach((instruction) => {
    new PopUp(popUpInstruction,)
   // instruction == callInstruction.push(instructions);
  });*/
  botonInicio = new Botones(btnImgPlay);
  botonBorrar = new Botones(btnImgTrash);

  //LlEGADA DE LOS BOTONES PARA EJECUTARSE
  botonesAccion = [];
  instructionsLvl1(
    860,
    537,
    230,
    90,
    "Necesitas llegar hasta aquí para recoger el objeto perdido"
  );
  instructionsLvl1(
    490,
    740,
    175,
    90,
    "Con este comando puedes recoger el objeto perdido"
  );
  instructionsLvl1(
    765,
    640,
    230,
    105,
    "Este es el botón ‘play’ da click para correr el arreglo final, recuerda entre mas comandos menos puntos"
  );
  instructionsLvl2(
    740,
    490,
    220,
    99,
    "Recuerda llegar hasta el objeto perdido para recuperarlo"
  );
  instructionsLvl2(
    570,
    740,
    306,
    105,
    "El p1 te permite bajar un cuadro e ir a la derecha un cuadro en un solo comando, usalo para las esquinas, pero recuerda solo sirve dos veces"
  );
  instructionsLvl3(
    855,
    490,
    220,
    90,
    "Recuerda llegar hasta el objeto perdido para recuperarlo"
  );
  instructionsLvl3(
    670,
    740,
    200,
    100,
    "El p2 te permite avanzar 3 cuadros a la izquierda en un solo comando"
  );

  /*
  instructionsLvl1 = [];

  instructionsLvl1.push(new PopUp(popUpInstruction, 844, 527, 200, 90, "Necesito llegar hasta aquí para recoger el objeto perdido"));
  instructionsLvl1.push(new PopUp(popUpInstruction, 750, 609, 150, 150, "Dale play para correr los comandos y pasar de nivel"));
  instructionsLvl1.push(new PopUp(popUpInstruction, 508, 104, 100, 100, "Con este comando puedo recoger el objeto perdido"));
  //Array llamada de los botones*/
  botonesNivel1_2 = [];
  botonesNivel1_2.push(new Boton_Der(btnImgDer));
  botonesNivel1_2.push(new Boton_Izquierda(btnImgIzq));
  botonesNivel1_2.push(new Boton_Arriba(btnImgArr));
  botonesNivel1_2.push(new Boton_Abajo(btnImgAb));
  botonesNivel1_2.push(new Boton_Llegada(btnImgLl));

  botonesNivel3_4 = [];

  botonesNivel3_4.push(new Boton_Der(btnImgDer));
  botonesNivel3_4.push(new Boton_Izquierda(btnImgIzq));

  botonesNivel3_4.push(new Boton_Arriba(btnImgArr));
  botonesNivel3_4.push(new Boton_Abajo(btnImgAb));
  botonesNivel3_4.push(new Boton_Llegada(btnImgLl));
  botonesNivel3_4.push(new Boton_P1(btnImgP1));

  botonesNivel5_6 = [];
  botonesNivel5_6.push(new Boton_Der(btnImgDer));
  botonesNivel5_6.push(new Boton_Izquierda(btnImgIzq));

  botonesNivel5_6.push(new Boton_Arriba(btnImgArr));
  botonesNivel5_6.push(new Boton_Abajo(btnImgAb));
  botonesNivel5_6.push(new Boton_Llegada(btnImgLl));
  botonesNivel5_6.push(new Boton_P1(btnImgP1));
  botonesNivel5_6.push(new Boton_P2(btnImgP2));

  //llamada del jugador
  jugador = new Jugador(0, 0, alienImg);

  //llamada de la clase mapa niveles para la definicion de los espacios de los niveles
  terreno = new mapa_niveles();
  terreno.arregloEscaque();

  gridX = width / 2;
  gridY = height / 2;
  //cubes.push(new cubes(0, 0, 0));

  //definicion pantalla inicial juego
  screen = 1;

  createCanvas(windowWidth, windowHeight);
  background(0);

  startGameButton = createButton('<i class="material-icons">play_arrow</i>');
  startGameButton.position(windowWidth / 2 - 60, windowHeight / 2-50);
  startGameButton.child('<i class="material-icons">cloud</i>');
  startGameButton.addClass("btn");
  startGameButton.mousePressed(startGameAction);
  endGameButton = createButton('<i class="material-icons">play_arrow</i>');
  endGameButton.position(windowWidth / 2 - 60, windowHeight / 2);
  endGameButton.child('<i class="material-icons">cloud</i>');
  endGameButton.addClass("btn");
  endGameButton.mousePressed(endGameAction);
  endGameButton.style("display", "none");
}

function mousePressed() {
  /*
  if (
    mouseX > popUp.widthBox &&
    mouseX < popUp.widthBox * 2 &&
    mouseY > popUp.heightBox &&
    mouse < popUp.heightBox * 2
  ) {
    popUpOn = !popUpOn;
  }*/

  popUpsLvl1.forEach((p) => {
    p.action();
    //boton.mostrarBotonDer(index)
  });
  popUpsLvl2.forEach((p) => {
    p.action();
    //boton.mostrarBotonDer(index)
  });
  popUpsLvl3.forEach((p) => {
    p.action();
    //boton.mostrarBotonDer(index)
  });
  if (dist(mouseX, mouseY, windowWidth / 2 + 20, windowHeight / 2 + 220) < 40) {
    recorridoArreglo();
  }

  if (dist(mouseX, mouseY, windowWidth / 1.15, windowHeight / 2 + 220) < 40) {
    botonesAccion = [];

  }

  if (screen === 3 || screen === 4) {
    agregarAcciones(botonesNivel1_2);
  } else if (screen === 5 || screen === 6) {
    agregarAcciones(botonesNivel3_4);
  } else if (screen > 6) {
    agregarAcciones(botonesNivel5_6);
  }
}

function agregarAcciones(array) {
  array.forEach((boton) => {
    if (dist(mouseX, mouseY, boton.getX() + 30, boton.getY() + 30) < 35) {
      if (boton.name === "derecha") {
        botonesAccion.push(new Boton_Der(btnImgDer));
      } else if (boton.name === "arriba") {
        botonesAccion.push(new Boton_Arriba(btnImgArr));
      } else if (boton.name === "abajo") {
        botonesAccion.push(new Boton_Abajo(btnImgAb));
      } else if (boton.name === "izquierda") {
        botonesAccion.push(new Boton_Izquierda(btnImgIzq));
      } else if (boton.name === "llegada") {
        botonesAccion.push(new Boton_Llegada(btnImgLl));
      } else if (boton.name === "rep_p1") {
        botonesAccion.push(new Boton_P1(btnImgP1));
        contarP1 += 1;
      } else if (boton.name === "rep_p2") {
        botonesAccion.push(new Boton_P2(btnImgP2));
        contarP2 += 1;
      }
    }
  });
}

function recorridoJugador() {}

function recorridoArreglo() {
  botonesAccion.forEach((boton) => {
    if (boton.name === "derecha") {
      jugador.setCol(jugador.getCol() + 1);
    } else if (boton.name === "izquierda") {
      jugador.setCol(jugador.getCol() - 1);
   
    } else if (boton.name === "arriba") {
      jugador.setFil(jugador.getFil() - 1);
      
    } else if (boton.name === "abajo") {
      jugador.setFil(jugador.getFil() + 1);
   
    } else if (boton.name === "rep_p1") {
      jugador.setFil(jugador.getFil() + 1);
      jugador.setCol(jugador.getCol() + 1);
    } else if (boton.name === "rep_p2" && 5 > screen < 7) {
      jugador.setCol(jugador.getCol() - 3);
    } else if (boton.name === "rep_p2" && screen >= 7) {
      jugador.setCol(jugador.getCol() - 3);
    }
  });
}

function showGrid() {
  xStart = width / 2 - TILE_WIDTH / 2;
  yStart = 50;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      draw_tile(tile_images[grid[j][i]], i, j);
    }
  }
}

function sumasPuntajes() {
  /* if (terreno.getLocacion(jugador.getFil(), jugador.getCol()) === 2) {
    score += 100;
} */
}

/*
function popUp(posX, posY, widthBox, heightBox, text) {
  if (popUpOn) {
    noStroke();
    fill("#D9D9D9");
    rect(posX, posY, widthBox, heightBox);
    fill("#3E2748");
    text(text, posX, posY, widthBox);
  }
}*/

function draw() {
  background(0);

  //sistema de puntos
  if (
    terreno.getLocacion(jugador.getFil(), jugador.getCol()) === 2 &&
    screen == 4
  ) {
    score += 100;

    botonesAccion.forEach((boton) => {
      if (boton.name === "derecha") {
        score -= 2;
      } else if (boton.name === "izquierda") {
        score -= 2;
      } else if (boton.name === "arriba") {
        score -= 2;
      } else if (boton.name === "abajo") {
        score -= 2;
      }
    });
  } else if (
    terreno.getLocacion(jugador.getFil(), jugador.getCol()) === 2 &&
    screen == 6
  ) {
    score += 100;

    botonesAccion.forEach((boton) => {
      if (boton.name === "derecha") {
        score -= 2;
      } else if (boton.name === "izquierda") {
        score -= 2;
      } else if (boton.name === "arriba") {
        score -= 2;
      } else if (boton.name === "abajo") {
        score -= 2;
      } else if (boton.name === "rep_p1") {
        score += 2;
      }
    });
  } else if (
    terreno.getLocacion(jugador.getFil(), jugador.getCol()) === 2 &&
    screen == 8
  ) {
    score += 100;

    botonesAccion.forEach((boton) => {
      if (boton.name === "derecha") {
        score -= 2;
      } else if (boton.name === "izquierda") {
        score -= 2;
      } else if (boton.name === "arriba") {
        score -= 2;
      } else if (boton.name === "abajo") {
        score -= 2;
      } else if (boton.name === "rep_p2") {
        score += 2;
      }
    });
  }

  /*  fill(5, 255, 124);
  ellipse(windowWidth/2, windowHeight/2 + 200, 30, 30); */

  //console.log(terreno.getLocacion(jugador.getFil(), jugador.getCol()));
  //

  //popUp instructions
  if (
    terreno.getLocacion(jugador.getFil(), jugador.getCol()) === 1 &&
    screen != 9
  ) {
    screen += 1;
    botonesAccion = [];
    botonesNivel3_4.forEach((boton) => {
      if (boton.name === "rep_p1" && contarP1 >=1 ) {
        boton.y -= 99289;
      }
    });
    botonesNivel5_6.forEach((boton) => {
      if (boton.name === "rep_p1" && contarP1 == 1) {
        boton.y -= 99289;
      }
      if (boton.name === "rep_p2" && contarP2 == 1) {
        boton.y -= 99289;
      }
    });
    contarP1 = 0;
    contarP2 = 0;

    fill(100);
    console.log("PERDIO --> ", {
      nivel: nivel + 1,
      locarion: terreno.getLocacion(jugador.getFil(), jugador.getCol()),
      fil: jugador.getFil(),
      col: jugador.getCol(),
    });
  } else if (terreno.getLocacion(jugador.getFil(), jugador.getCol()) === 2) {
    //score += 100;
    screen += 1;
    botonesAccion = [];
    botonesNivel3_4.forEach((boton) => {
      if (boton.name === "rep_p1" && contarP1 ==1) {
        boton.y -= 99289;
      }else if( boton.name === "rep_p1" && contarP1 ==2) {
        boton.y -= 99289;
      }
    });
    botonesNivel5_6.forEach((boton) => {
      if (boton.name === "rep_p1" && contarP1 == 1) {
        boton.y -= 99289;
      }
      if (boton.name === "rep_p2" && contarP2 == 1) {
        boton.y -= 99289;
      }
    });
    contarP1 = 0;
    contarP2 = 0;
    fill(100);
    console.log("GANO");
  } else if (terreno.getLocacion(jugador.getFil(), jugador.getCol()) === 3) {
    screen += 1;
    botonesAccion = [];
    botonesNivel3_4.forEach((boton) => {
      if (boton.name === "rep_p1" && contarP1 >= 1) {
        boton.y -= 99289;
      }
    });
    botonesNivel5_6.forEach((boton) => {
      if (boton.name === "rep_p1" && contarP1 == 1) {
        boton.y -= 99289;
      }
      if (boton.name === "rep_p2" && contarP2 == 1) {
        boton.y -= 99289;
      }
    });
    contarP1 = 0;
    contarP2 = 0;
  }

  
  switch (screen) {
    case 0:
      //animación (de momento es el botón de inicio)
      background(0);
      break;

    case 1:
      //incio
      image(fondoInicio, 0, 0, windowWidth, windowHeight);
      
      break;
    case 2:
      //instrucciones
      image(contexto, 0, 0, windowWidth, windowHeight);
      startGameButton.style("display", "block");
      break;
    case 3:
      //nivel 1

      image(fondoN1, 0, 0, windowWidth, windowHeight);

      fill(255);
      textSize(25);
      text(`Nivel: ${nivel}`, windowWidth / 2-700, windowHeight / 2-365 );

      terreno.mostrar();
      botonInicio.botonInicioJuego();
      botonBorrar.botonBorrarComandos();

      botonesNivel1_2.forEach((boton, index) => {
        boton.mostrarBoton(index);
        //boton.mostrarBotonDer(index)
      });

      popUpsLvl1.forEach((popUp) => {
        popUp.show();
      });

      if (posicionJugadorNivel1 == false) {
        jugador.setCol(2);
        jugador.setFil(2);

        posicionJugadorNivel1 = true;
      }

      jugador.show();
      terreno.reiniciar();
      terreno.terrenoPrimerNivel(0);
      nivel = 'Prueba nivel 1';

      image(toolImg, 807, 530, 35, 35);

      botonesAccion.forEach((boton, index) => {
        boton.pintarBotonesAccion(index);
      });

      if (frameCount < 1000) {
        image(instrucN1, 0, 0, windowWidth, windowHeight);
      } else if (frameCount < 1500) {
        image(empecemos, 0, 0, windowWidth, windowHeight);
      }

      //background(255, 20, 255);
      break;

    case 4:
      //nivel 2

      if (frameCount % 60 == 0) {
        tiempoNivelDos++;
      }

      image(fondoN1, 0, 0, windowWidth, windowHeight);

      fill(255);
      textSize(20);
      text(`Tiempo: ${tiempoNivelDos}`, windowWidth / 1.5 + 360, windowHeight / 2-370 );

      fill(255);
      textSize(25);
      text(`Nivel: ${nivel}`, windowWidth / 2-700, windowHeight / 2-365 );


      fill(255);
      textSize(20);
      text(`Puntaje: ${score}`, windowWidth / 2-700, windowHeight / 2-300 );

      terreno.mostrar();
      botonInicio.botonInicioJuego();
      botonBorrar.botonBorrarComandos();

      botonesNivel1_2.forEach((boton, index) => {
        boton.mostrarBoton(index);
        //boton.mostrarBotonDer(index)
      });

      jugador.show();
      terreno.reiniciar();
      nivel = 1;
      terreno.terrenoPrimerNivel(1); // nivel 2
      botonInicio.botonInicioJuego();

      if (posicionJugadorNivel2 == false) {
        jugador.setCol(1);
        jugador.setFil(1);

        posicionJugadorNivel2 = true;
      }

      image(toolImg, 747, 470, 35, 35);

      botonesAccion.forEach((boton, index) => {
        boton.pintarBotonesAccion(index);
      });
      break;

    case 5:
      //nivel 3

      image(fondoN2, 0, 0, windowWidth, windowHeight);

      fill(255);
      textSize(25);
      text(`Nivel: ${nivel}`, windowWidth / 2-700, windowHeight / 2-365 );

      terreno.mostrar();
      botonInicio.botonInicioJuego();
      botonBorrar.botonBorrarComandos();

      botonesNivel3_4.forEach((boton, index) => {
        boton.mostrarBoton(index);
      });
      popUpsLvl2.forEach((popUp) => {
        popUp.show();
      });
      jugador.show();
      terreno.reiniciar();
      nivel = 'Prueba nivel 2';
      terreno.terrenoPrimerNivel(2); // nivel 3

      if (posicionJugadorNivel3 == false) {
        jugador.setCol(1);
        jugador.setFil(1);
        posicionJugadorNivel3 = true;
      }

      image(tool2Img, 687, 470, 35, 35);

      botonesAccion.forEach((boton, index) => {
        boton.pintarBotonesAccion(index);
      });

      if (contarP1 == 2) {
        botonesNivel3_4.forEach((boton) => {
          if (boton.name === "rep_p1") {
            boton.y = 100000;
          }
        });
      }

      break;
    case 6:
      //nivel 4

      if (frameCount % 60 == 0) {
        tiempoNivelcuatro++;
      }

      image(fondoN2, 0, 0, windowWidth, windowHeight);

      fill(255);
      textSize(20);
      text(`Tiempo: ${tiempoNivelcuatro}`, windowWidth / 1.5 + 360, windowHeight / 2-370 );

      fill(255);
      textSize(25);
      text(`Nivel: ${nivel}`, windowWidth / 2-700, windowHeight / 2-365 );

      fill(255);
      textSize(20);
      text(`Puntaje: ${score}`, windowWidth / 2-700, windowHeight / 2-300 );

      terreno.mostrar();
      botonInicio.botonInicioJuego();
      botonBorrar.botonBorrarComandos();

      botonesNivel3_4.forEach((boton, index) => {
        boton.mostrarBoton(index);
        //boton.mostrarBotonDer(index)
      });

      jugador.show();
      terreno.reiniciar();
      nivel = 2;
      terreno.terrenoPrimerNivel(3); // nivel 4

      if (posicionJugadorNivel4 == false) {
        jugador.setCol(1);
        jugador.setFil(4);
        posicionJugadorNivel4 = true;
      }

      image(tool2Img, 747, 290, 35, 35);

      botonesAccion.forEach((boton, index) => {
        boton.pintarBotonesAccion(index);
      });

      if (contarP1 == 2) {
        botonesNivel3_4.forEach((boton) => {
          if (boton.name === "rep_p1") {
            boton.y = 100000;
          }
        });
      }

      break;

    case 7:
      //nivel 5 ----------------------------------------------------------------------------------------------------------------------------
      image(fondoN3, 0, 0, windowWidth, windowHeight);

      fill(255);
      textSize(25);
      text(`Nivel: ${nivel}`, windowWidth / 2-700, windowHeight / 2-365 );

      terreno.mostrar();
      botonInicio.botonInicioJuego();
      botonBorrar.botonBorrarComandos();

      botonesNivel5_6.forEach((boton, index) => {
        boton.mostrarBoton(index);
        //boton.mostrarBotonDer(index)
      });
      popUpsLvl3.forEach((popUp) => {
        popUp.show();
      });
      jugador.show();
      terreno.reiniciar();
      nivel = 'Prueba nivel 3';
      terreno.terrenoPrimerNivel(4);

      if (posicionJugadorNivel5 == false) {
        jugador.setCol(3);
        jugador.setFil(1);
        posicionJugadorNivel5 = true;
      }

      image(tool3Img, 807, 470, 35, 35);

      //Aqui es donde se debería colocar el reinicio de los arreglos
      botonesAccion.forEach((boton, index) => {
        boton.pintarBotonesAccion(index);
      });

      if (contarP1 == 1) {
        botonesNivel5_6.forEach((boton) => {
          if (boton.name === "rep_p1") {
            boton.y = 100000;
          }
        });
      }

      if (contarP2 == 1) {
        botonesNivel5_6.forEach((boton) => {
          if (boton.name === "rep_p2") {
            boton.y = 100000;
          }
        });
      }

      break;
    // ----------------------------------------------------------------------------------------------------------------------------
    case 8:
      //nivel 6

      if (frameCount % 60 == 0) {
        tiempoNivelseis++;
      }

      image(fondoN3, 0, 0, windowWidth, windowHeight);

      fill(255);
      textSize(20);
      text(`Tiempo: ${tiempoNivelseis}`, windowWidth / 1.5 + 360, windowHeight / 2-370 );

      fill(255);
      textSize(25);
      text(`Nivel: ${nivel}`, windowWidth / 2-700, windowHeight / 2-365 );

      fill(255);
      textSize(20);
      text(`Puntaje: ${score}`, windowWidth / 2-700, windowHeight / 2-300 );

      terreno.mostrar();
      botonInicio.botonInicioJuego();
      botonBorrar.botonBorrarComandos();

      botonesNivel5_6.forEach((boton, index) => {
        boton.mostrarBoton(index);
        //boton.mostrarBotonDer(index)
      });

      jugador.show();
      terreno.reiniciar();
      nivel = 3;
      terreno.terrenoPrimerNivel(5);

      if (posicionJugadorNivel6 == false) {
        jugador.setCol(9);
        jugador.setFil(1);
        posicionJugadorNivel6 = true;
      }

      image(tool3Img, 327, 230, 35, 35);

      botonesAccion.forEach((boton, index) => {
        boton.pintarBotonesAccion(index);
      });

      if (contarP1 == 1) {
        botonesNivel5_6.forEach((boton) => {
          if (boton.name === "rep_p1") {
            boton.y = 100000;
          }
        });
      }

      if (contarP2 == 1) {
        botonesNivel5_6.forEach((boton) => {
          if (boton.name === "rep_p2") {
            boton.y = 100000;
          }
        });
      }

      break;

    case 9:
      image(fondoFin, 0, 0, windowWidth, windowHeight);
      endGameButton.style("display", "block");

      fill(255);
      textSize(35);
      text(`Puntaje Final: ${score}`, windowWidth / 2-120, windowHeight / 2-160 );

      break;
  }
}

/* function timeOut(metodo) {
  setTimeout(metodo, 1000);
} */

/*
function die(){

  
}*/
