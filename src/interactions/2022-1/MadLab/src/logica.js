import Compuesto from "./Compuesto";
import Elemento from "./Elemento";
import Profesor from "./Profesor";
import { path } from "../MadLab"; 

class Logica {



    constructor(app) {
        this.app = app;
        this.level = 0;
        this.suciedad = false;
        this.basurero = app.loadImage(path + "/data/basura.png")
        this.interfaz = app.loadImage(path + "/data/Interfaz Lab.png")
        this.interfazS = app.loadImage(path + "/data/Interfaz LabSucio.png")
        this.basureroposx = 470;
        this.basureroposy = 630;
        this.esponjaposx = 1175;
        this.esponjaposy = 535;
        this.compuestoposx = 1130;
        this.compuestoposy = 160;
        this.mixposx = 695;
        this.mixposy = 240;
        this.libroposx = 1175;
        this.libroposy = 410;
        this.libroa = app.loadImage(path + "/data/libro1.png");
        this.libroc = app.loadImage(path + "/data/libro2.png");
        this.libro = this.libroc;
        this.listaDeElementos = [];
        this.listaDeSimbolos = [];
        this.listaDeFormulas = [];
        this.puntaje = 0;
        this.casilla1 = {
            posx: 550,
            posy: 165,
            lista: []
        }
        this.casilla2 = {
            posx: 650,
            posy: 165,
            lista: []
        }
        this.casilla3 = {
            posx: 750,
            posy: 165,
            lista: []
        }
        this.casilla4 = {
            posx: 850,
            posy: 165,
            lista: []
        }
        this.elementoSeleccionado = undefined;;
        this.compuesto = undefined;;
        this.profesor = new Profesor(this.app);
        this.cantidadDeComPeligrosos = 0;
        this.crearElementos();
        this.compuestoPedido = undefined;;
        this.nivel = -2;
        this.consultas = 0;
        this.tutorial = undefined;;
        this.libroAbierto = false;
        this.nombrePantalla = undefined;;
        this.app.frameRate(30);
        this.sec = 0;
        this.min = 5;
        this.timer = undefined;;
        this.contador = app.loadImage(path + "/data/Contador.png")


    }



    logicDraw() {

        //leyes


        if (this.nivel == -2) {
            this.tutorial = true;
            if (this.profesor.getParteDelTutorial() > 12) {
                this.nivel = -1;
            }
        } else {

            this.tutorial = false;
            if (this.nivel == 0) {
                this.profesor.setFrases("Empecemos con\nalgo sencillo\ntrata de hacer\nagua(H2O)");
            } if (this.nivel == -1) {
                this.profesor.setFrases("Aquí están las\nfórmulas de los\ncompuestos que\naparecerán");
            } else {
                this.profesor.setFrases(this.profesor.getFrases());
            }
        }

        //tiempo
        if (this.nivel > 0 && this.nivel < 11) {
            if (this.app.frameCount % 30 == 0) {

                this.sec--;
            }

            if (this.sec == 0) {
                this.min--;
                this.sec = 59;
            }

            if (this.sec < 10) {
                this.timer = `${this.min}:0${this.sec}`
            } else {
                this.timer = `${this.min}:${this.sec}`
            }
        }
        if (this.min == 0 && this.sec == 1) {
            this.calcularPuntajePorTiempo();
            this.nivel = 11;
        }


        //terminar juego 

        if (this.nivel == 10) {
            this.calcularPuntaje();
            this.nivel = 11;
        }

        this.crearNiveles();

        //pintar
        if (this.suciedad == false) {
            this.app.image(this.interfaz, 640, 360);
        }
        if (this.suciedad == true) {
            this.app.image(this.interfazS, 640, 360);
        }



        this.pintarCasillas();
        this.pintarcoponentes();
        this.profesor.pintarProfesor(this.tutorial);
        if (this.libroAbierto == true) {
            this.libroposx = 640;
            this.libroposy = 370;
            this.app.image(this.libroa, this.libroposx, this.libroposy);

        }

        if (this.tutorial == false && this.nivel > -1) {
            this.nombrePantalla = this.compuestoPedido.replace('\n', " ");
            this.app.fill(236,253,18);
            this.app.textSize(14);
            this.app.text(this.nombrePantalla, 700, 90);
        }
        if (this.elementoSeleccionado != null && this.elementoSeleccionado != this.compuesto) { this.elementoSeleccionado.pintarElemento(); }

    }

    crearElementos() {
        this.listaDeElementos[0] = new Elemento(625, 390, "Na", this.app)
        this.listaDeElementos[1] = new Elemento(730, 390, "O", this.app)
        this.listaDeElementos[2] = new Elemento(840, 390, "H", this.app)
        this.listaDeElementos[3] = new Elemento(950, 390, "C", this.app)
        this.listaDeElementos[4] = new Elemento(1060, 390, "Cl", this.app)
        this.listaDeElementos[5] = new Elemento(625, 485, "Mn", this.app)
        this.listaDeElementos[6] = new Elemento(730, 485, "Fe", this.app)
        this.listaDeElementos[7] = new Elemento(840, 485, "K", this.app)
        this.listaDeElementos[8] = new Elemento(950, 485, "Ca", this.app)
        this.listaDeElementos[9] = new Elemento(1060, 485, "S", this.app)
        this.listaDeElementos[10] = new Elemento(840, 585, "Cu", this.app)

    }


    pintarcoponentes() {





        this.listaDeElementos.forEach(elemento => {
            elemento.pintarElemento();
        })

        //pintar libro

        this.libroc.resize(50, 50);
        this.libroa.resize(700, 400);

        if (this.libroAbierto == false) {
            this.libroposx = 1175;
            this.libroposy = 410;
        }


        //pintar compuesto
        if (this.compuesto != undefined) {
            this.compuesto.pintarCompuesto();
        }

        //pintar reloj 
        this.contador.resize(144, 71)
        this.app.image(this.contador, 1175, 40)
        this.app.fill(6, 78, 100);
        this.app.textSize(24);
        if (this.nivel > 0) {
            this.app.text("" + this.timer, 1175, 60);
        } else {
            this.app.text("5:00", 1175, 60);
        }

    }






    logicMousePressed(mousex, mousey) {
        if (this.tutorial == false) {
            if (this.nivel == -1) {
                this.libroAbierto = true;
            }
            if (this.libroAbierto == false) {
                this.listaDeElementos.forEach(elemento => {
                    if (elemento.seleccionarElemento(mousex, mousey) == true) {
                        this.elementoSeleccionado = new Elemento(elemento.getPosX(), elemento.getPosY(), elemento.getSimbolo(), this.app);
                    }
                })
                this.agarrarElementosDeCasillas(this.casilla1, mousex, mousey);
                this.agarrarElementosDeCasillas(this.casilla2, mousex, mousey);
                this.agarrarElementosDeCasillas(this.casilla3, mousex, mousey);
                this.agarrarElementosDeCasillas(this.casilla4, mousex, mousey);
                this.limpiar(mousex, mousey);

                if (mousex > this.mixposx - 25 && mousex < this.mixposx + 25
                    && mousey > this.mixposy - 25 && mousey < this.mixposy + 25) {
                    this.crearCompuesto();
                }

                //agarrar el compuesto
                if (this.compuesto != null || this.compuesto != undefined) {
                    if (mousex > this.compuesto.getPosX() - 25 && mousex < this.compuesto.getPosX() + 25
                        && mousey > this.compuesto.getPosY() - 25 && mousey < this.compuesto.getPosY() + 25) {
                        this.elementoSeleccionado = this.compuesto;
                    }
                }
                if (mousex > this.libroposx - 25 && mousex < this.libroposx + 25
                    && mousey > this.libroposy - 25 && mousey < this.libroposy + 25) {
                    this.libroAbierto = true;
                    //aumentar consultas
                    if (this.nivel > 0 && this.nivel <= 3) {
                        this.consultas += 6;
                    } if (this.nivel > 3 && this.nivel <= 6) {
                        this.consultas += 4;
                    } if (this.nivel > 6) {
                        this.consultas += 2;
                    }

                }
            } else {

                //cerrar libro
                if (mousex > 920 && mousex < 940 && mousey > 200 && mousey < 220) {
                    this.libroAbierto = false;
                    if (this.nivel == -1) { this.nivel = 0; }
                }


            }




        }


        //avanzar el turtorial

        this.profesor.siguienteFrase();




    }

    logicMouseDragged(mousex, mousey) {

        if (this.tutorial == false) {
            if (this.elementoSeleccionado != null) {
                this.elementoSeleccionado.setPosX(mousex);
                this.elementoSeleccionado.setPosY(mousey);
            }
        }



    }

    logicMouseReleased() {
        if (this.elementoSeleccionado != null) {
            this.validarCasillas(this.elementoSeleccionado, this.casilla1)
            this.validarCasillas(this.elementoSeleccionado, this.casilla2)
            this.validarCasillas(this.elementoSeleccionado, this.casilla3)
            this.validarCasillas(this.elementoSeleccionado, this.casilla4)
            this.elementoSeleccionado = null;
        }
        if (this.compuesto != undefined || this.compuesto != null) {
            this.validarCompuesto();
        }



    }



    pintarCasillas() {
        if (this.suciedad == true) {
            this.app.fill(0, 100, 0)
        } else {
            this.app.fill(100);
        }

        if (this.casilla1.lista[0] == undefined) {

        } else {
            this.casilla1.lista[0].pintarElemento();
        }


        if (this.casilla2.lista[0] == undefined) {

        } else {
            this.casilla2.lista[0].pintarElemento();
        }


        if (this.casilla3.lista[0] == undefined) {

        } else {
            this.casilla3.lista[0].pintarElemento();
        }


        if (this.casilla4.lista[0] == undefined) {

        } else {
            this.casilla4.lista[0].pintarElemento();
        }
        this.app.fill(255);
        this.app.textSize(16);
        this.app.text(this.casilla1.lista.length, this.casilla1.posx, this.casilla1.posy - 40);
        this.app.text(this.casilla2.lista.length, this.casilla2.posx, this.casilla2.posy - 40);
        this.app.text(this.casilla3.lista.length, this.casilla3.posx, this.casilla3.posy - 40);
        this.app.text(this.casilla4.lista.length, this.casilla4.posx, this.casilla4.posy - 40);

    }

    validarCasillas(elemento, casilla) {

        if (elemento.getPosX() > casilla.posx - 25 && elemento.getPosX() < casilla.posx + 25
            && elemento.getPosY() > casilla.posy - 25 && elemento.getPosY() < casilla.posy + 25) {
            if (casilla.lista[0] == undefined || casilla.lista[0].getSimbolo() == elemento.getSimbolo()) {
                elemento.setPosX(casilla.posx);
                elemento.setPosY(casilla.posy);
                casilla.lista.push(elemento);
            }
        } else { elemento = null }

    }

    agarrarElementosDeCasillas(casilla, mousex, mousey) {
        if (casilla.lista[0] != undefined) {
            let elemento = casilla.lista[0];
            if (casilla.lista[0])
                if (casilla.lista[0].seleccionarElemento(mousex, mousey) == true) {
                    this.elementoSeleccionado = new Elemento(casilla.posx, casilla.posy, elemento.getSimbolo(), this.app);
                    casilla.lista.pop()
                }

        }
    }

    limpiar(mousex, mousey) {
        if (mousex > this.esponjaposx - 25 && mousex < this.esponjaposx + 25
            && mousey > this.esponjaposy - 25 && mousey < this.esponjaposy + 25) {
            this.suciedad = false;
        }
    }
    crearNiveles() {
        if (this.nivel == 0) {
            this.compuestoPedido = "Agua";
        }
        if (this.nivel == 1) {
            this.compuestoPedido = "Sal\nde mesa";
        }
        if (this.nivel == 2) {
            this.compuestoPedido = "Óxido\nde hierro";
        }
        if (this.nivel == 3) {
            this.compuestoPedido = "Dióxido\nde carbono";
        }
        if (this.nivel == 4) {
            this.compuestoPedido = "Carbonato\nde calcio";
        }
        if (this.nivel == 5) {
            this.compuestoPedido = "Sulfato\nde cobre";
        }
        if (this.nivel == 6) {
            this.compuestoPedido = "Permanganato\nde potasio";
        }
        if (this.nivel == 7) {
            this.compuestoPedido = "Bicarbonato\nde sodio";
        }
        if (this.nivel == 8) {
            this.compuestoPedido = "Etanol";
        }
        if (this.nivel == 9) {
            this.compuestoPedido = "Ácido\nacetilsalicílico";
        }
    }

    crearCompuesto() {
        this.casilla1.lista.forEach(elemento => {
            this.listaDeSimbolos.push(elemento.getSimbolo());
        })
        this.casilla2.lista.forEach(elemento => {
            this.listaDeSimbolos.push(elemento.getSimbolo());
        })
        this.casilla3.lista.forEach(elemento => {
            this.listaDeSimbolos.push(elemento.getSimbolo());
        })
        this.casilla4.lista.forEach(elemento => {
            this.listaDeSimbolos.push(elemento.getSimbolo());
        })


        this.compuesto = new Compuesto(this.listaDeSimbolos, this.suciedad, this.compuestoposx, this.compuestoposy, this.app);

        this.casilla1.lista = [];
        this.casilla2.lista = [];
        this.casilla3.lista = [];
        this.casilla4.lista = [];
        this.listaDeSimbolos = [];
        this.suciedad = true;

        if (this.compuesto.getNombre() == "Compuesto\nPeligroso") {
            this.cantidadDeComPeligrosos++;
        }
    }


    validarCompuesto() {
        if (this.compuesto.getPosX() > this.basureroposx - 75 && this.compuesto.getPosX() < this.basureroposx + 75
            && this.compuesto.getPosY() > this.basureroposy - 75 && this.compuesto.getPosY() < this.basureroposy + 75) {

            this.compuesto = null;
        } else {

            if (this.compuesto.getPosX() > 20 && this.compuesto.getPosX() < 320
                && this.compuesto.getPosY() > 370 && this.compuesto.getPosY() < 670) {
                this.profesor.validarNivel(this.compuesto, this.compuestoPedido);
                if (this.profesor.getBuenCompuesto() == true) {
                    this.nivel++;
                    this.compuesto = null;
                } else {
                    this.compuesto.setPosX(this.compuestoposx);
                    this.compuesto.setPosY(this.compuestoposy);
                }


            } else {
                this.compuesto.setPosX(this.compuestoposx);
                this.compuesto.setPosY(this.compuestoposy);
            }

        }

    }


    calcularPuntaje() {
        for (let i = 1; i < this.nivel; i++) {
            if (i < 4) {
                this.puntaje += 12;
            } if (i > 3 && i < 7) {
                this.puntaje += 20;
            } if (i > 6) {
                this.puntaje += 30;
            }
        }

        if (this.nivel > 9) {
            this.puntaje += 14;
        }

        this.puntaje = this.puntaje - (this.consultas + ((this.cantidadDeComPeligrosos - 1) * 15));
    }

    calcularPuntajePorTiempo() {
        for (let i = 1; i < this.nivel - 1; i++) {
            if (i < 4) {
                this.puntaje += 12;
            } if (i > 3 && i < 7) {
                this.puntaje += 20;
            } if (i > 6) {
                this.puntaje += 30;
            }
        }

        if (this.nivel > 9) {
            this.puntaje += 14;
        }

        this.puntaje = this.puntaje - (this.consultas + ((this.cantidadDeComPeligrosos - 1) * 15));
        
        if (this.puntaje < 0) { this.puntaje = 0; }
    }


    getNivel() {
        return this.nivel;
    }

    getPuntaje() {
        return this.puntaje;
    }
}

export default Logica;