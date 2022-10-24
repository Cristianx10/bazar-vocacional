import p5 from "p5";

import Logica from "./Logica";

import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';

class Main {

  logica?: Logica;
  app: p5;
  nav:ActividadTSLite;

  constructor(app: p5, nav:ActividadTSLite) {
    this.app = app;
    this.nav = nav;
  }


  setup() {
    this.logica = new Logica(this.app, this);
  }


  draw() {
    if (this.logica) {
      this.logica.pintar();
    }
  }

  mousePressed() {
    if (this.logica) {
      this.logica.mouse();
    }
  }


  mouseDragged() {
    if(this.logica){
      this.logica.mouseDragged();
    }
  }

  mouseReleased() {
    if(this.logica){
      this.logica.mouseReleased()
    }
  }

}


export default Main;