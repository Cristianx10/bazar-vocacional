
import CARRERAS from "../../../../constants/simulations/types/Carreras";
import { path } from "../MadLab";
import Logica from "./logica";


let NameCarrera = "QUIMICA"; // poner el nombre de la carrera;

//let path = ""; //crear la variable path, se deja vacia, Se añade al lado de cada ruta de las imagenes o fuentes;

//nunito = app.loadFont(path+'fonts/nunito-bold.ttf'); //ejemplo

let app; // crear la variable de la siguiente forma y agregarla a cada metodos
//app.loadFont //ejemplo


let actividad; // crear la variable actividad

let puntaje;

let pantalla2;
let pantalla = 1;

let inconsolata;
let pantalla1;
let pantalla3;

function preload() {
  inconsolata = app.loadFont(path + "/data/PressStart2P-Regular.ttf");

}


function setup() {
  //app.createCanvas(1280, 720);
  app.imageMode(app.CENTER)
  app.rectMode(app.CENTER);
  app.textAlign(app.CENTER);
  app.textFont(inconsolata);
  pantalla1 = app.loadImage(path + "/data/inicio.png");
  pantalla3 = app.loadImage(path + "/data/InterfazFinalizar.png");
  pantalla2 = new Logica(app, actividad);

}


function draw() {
  app.background(220);
  switch (pantalla) {
    case 1:
      pantalla1.resize(1280, 720);
      app.image(pantalla1, 640, 370)
      break;
    case 2:
      pantalla2.logicDraw();
      if (pantalla2.getNivel() == 11) {
        puntaje = pantalla2.getPuntaje();
        pantalla++;
      }
      break;
    case 3:
      app.textSize(22);
      pantalla3.resize(1280, 720);
      app.image(pantalla3, 640, 370);
      app.fill(0);
      app.text(puntaje, 650, 355)
      break;
  }



}

function mousePressed() {

  switch (pantalla) {
    case 1:
      // console.log(mouseX + "," + mouseY)
      if (app.mouseX > 445 && app.mouseX < 835 && app.mouseY > 442 && app.mouseY < 558) {
        pantalla = 2;
      }
      break;
    case 2:
      pantalla2.logicMousePressed(app.mouseX, app.mouseY);
      break;
    case 3:
      if (app.mouseX > 526 && app.mouseX < 754 && app.mouseY > 478 && app.mouseY < 552) {
        actividad.addResult([{id:CARRERAS.QUIMICA, value:puntaje}]);
        actividad.finish()
        console.log("Termino")
      }
      break;
  }

}

function mouseDragged() {

  switch (pantalla) {
    case 1:

      break;
    case 2:
      pantalla2.logicMouseDragged(app.mouseX, app.mouseY);
      break;
    case 3:


      break;
  }


}

function mouseReleased() {

  switch (pantalla) {
    case 1:

      break;
    case 2:
      pantalla2.logicMouseReleased();
      break;
    case 3:

      break;
  }


}


//actividad.addResult([{id:NameCarrera, value:puntaje}]); 
//actividad.addState("parametro", value); // guarda variables extras que deseen analizar para la interaccion
//actividad.addState("pantalla1", pantalla1Time); // ejemplo

//para que tengan en cuenta por si tienen una pantalla final que deseen que se muestre durante cierto tiempo


class MadLab {
  constructor(act) {
    actividad = act
  }

  setup(aplication) {
    app = aplication;
    preload()
    setup()
  }

  draw() {
    draw()
  }

  mousePressed() {
    mousePressed()
  }

  mouseReleased() {
    mouseReleased()
  }

  mouseDragged() {
    mouseDragged()
  }
}

export default MadLab;