import p5 from 'p5';

import Main from './Main';

import Navegador from './Navegacion/Navegador';
import Inicio from './pages/inicio';
import Dia from './pages/dias/Dia';
import Instruccion1 from './pages/instrucciones/instrucciones1';
import Instruccion2 from './pages/instrucciones/instrucciones2';
import Instruccion3 from './pages/instrucciones/instrucciones3';
import Instruccion4 from './pages/instrucciones/instrucciones4';
import Transicion1 from './pages/transciciones/Transicion1';
import Transicion2 from './pages/transciciones/Transicion2';
import Transicion3 from './pages/transciciones/Transicion3';
import Transicion4 from './pages/transciciones/Transicion4';
import Transicion5 from './pages/transciciones/Transicion5';



class Logica {

    app: p5;
    navegador: Navegador
    main: Main;

    constructor(app: p5, main: Main) {
        this.app = app;
        this.main = main;

        this.navegador = new Navegador(this.app, main);

        this.navegador.add(new Inicio(this.navegador));     //0
        this.navegador.add(new Instruccion1(this.navegador));     //1
        this.navegador.add(new Instruccion2(this.navegador));     //2
        this.navegador.add(new Instruccion3(this.navegador));     //3
        this.navegador.add(new Instruccion4(this.navegador));     //4

        var dia = new Dia(this.navegador);

        this.navegador.add(new Transicion1(this.navegador));     //5
        this.navegador.add(dia);     //6
        this.navegador.add(new Transicion2(this.navegador));     //7
        this.navegador.add(dia);     //8
        this.navegador.add(new Transicion3(this.navegador));     //9
        this.navegador.add(dia);     //10
        this.navegador.add(new Transicion4(this.navegador));     //11
        this.navegador.add(dia);     //12
        this.navegador.add(new Transicion5(this.navegador));     //13
        this.navegador.add(dia);     //14

        this.navegador.goTo(0);
        // this.navegador.next();


    }

    pintar() {
        this.app.background(255);
        this.app.imageMode(this.app.CORNER);

        this.navegador.draw();
    }


    mouse() {
        this.navegador.mousePressed();
    }

    mouseDragged() {
        this.navegador.mouseDragged();
    }

    mouseReleased() {
        this.navegador.mouseReleased();
    }

}


export default Logica;