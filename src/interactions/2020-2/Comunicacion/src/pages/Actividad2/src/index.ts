

import Global from '../../../Global';

import DragAndDrop from '../../../../../../../components/DragAndDrop/index';
import Navegador from '../../../../../../../componentsTS/Navegacion/config';

class TSPalabras {

    texto: string;

    //Palabras del tablero
    palabras: Palabra[];

    //Palabras que se arrastran
    selecciones: Palabra[];

    viewTablero: HTMLDivElement;
    viewSelecciones: HTMLDivElement;

    global: Global;

    drag: DragAndDrop;

    navegador: Navegador;

    constructor(viewTablero: HTMLDivElement, viewSelecciones: HTMLDivElement, global: Global, navegador: Navegador) {
        this.navegador = navegador;
        this.global = global;

        this.viewTablero = viewTablero;
        this.viewSelecciones = viewSelecciones;
        this.palabras = [];
        this.selecciones = [];
        this.texto = "Había una vez un zorro que caminaba, sediento, por el bosque. Mientras lo hacía vió en lo alto de la rama de un árbol un racimo de uvas, las cuales deseó al instante al servirle para refrescarse y apagar su sed. El zorro se acercó al árbol e intentó alcanzar las uvas, pero estaban demasiado altas. Tras intentarlo una y otra vez sin conseguirlo, el zorro finalmente se rindió y se alejó. Viendo que un pájaro había visto todo el proceso se dijo en voz alta que en realidad no quería las uvas, dado que aún no estaban maduras, y que en realidad había cesado el intento de alcanzarlas al comprobarlo.";

        var palabras = this.texto.split(" ");
        console.log("Mi palabras", palabras)

        this.drag = new DragAndDrop();



        this.drag.setOnDrog((container) => {
            var parent = container.parentNode;

            //container Drop objetivo
            //this.startContainer Elemento padres de arrastrable
            //this.currentlyDragging Elemento arrastrado

            if (this.drag.startContainer) {
                var conta = this.drag.currentlyDragging as any;
                this.drag.startContainer.removeChild(conta);
            }

            if (this.drag.currentlyDragging) {

                if (parent) {

                    console.log("Parent es", parent)
                    console.log("currentlyDragging es", this.drag.currentlyDragging)
                    console.log("container es", container)
                    this.drag.currentlyDragging.classList.add("palabra");

                    var indexObjArrastrado = -1;
                    var indexObjObjetivo = -1;

                    this.selecciones.forEach((p, index) => {
                        if (p.getHTML() === this.drag.currentlyDragging) {
                            indexObjArrastrado = index;
                        }
                    });

                    this.palabras.forEach((p, index) => {
                        if (p.getHTML() === container) {
                            indexObjObjetivo = index;
                        }
                    });

                    if (indexObjArrastrado !== -1 && indexObjObjetivo !== -1) {
                        var objetivo = this.palabras[indexObjObjetivo];
                        var arrastrado = this.selecciones[indexObjArrastrado];

                        this.palabras[indexObjObjetivo] = arrastrado;
                        this.selecciones[indexObjArrastrado] = objetivo;
                    }

                    parent.insertBefore(this.drag.currentlyDragging, container);

                    this.drag.addDrag([container]);
                    this.drag.addDrop([this.drag.currentlyDragging]);

                }
                if (this.drag.startContainer) {
                    this.drag.startContainer.appendChild(container);
                }

            }


        })

        palabras.forEach((p) => {

            var newPalabra = new Palabra(p, this);
            this.palabras.push(newPalabra);

            this.drag.addDrop([newPalabra.getHTML()]);

            this.viewTablero.append(newPalabra.getHTML());

        });

        this.palabras.forEach(p => {

        });


        ["Apartó", "Gajo",
            "Vagaba", "Doblegó", "Divisó",
             "Saciar"].forEach((p) => {

                var newPalabra = new Palabra(p, this);
                newPalabra.setClassName("Palabras__seleccion__item");

                this.drag.addDrag([newPalabra.getHTML()]);

                this.selecciones.push(newPalabra);

                this.viewSelecciones.append(newPalabra.getHTML());
            })



    }

    validacion() {

        

        if (this.palabras[6].palabra === "Vagaba") {
            this.global.puntuacion2++;
        }
        if (this.palabras[14].palabra === "Divisó") {
            this.global.puntuacion2++;
        }
        if (this.palabras[25].palabra === "Gajo") {
            this.global.puntuacion2++;
        }
        if (this.palabras[38].palabra === "Saciar") {
            this.global.puntuacion2++;
        }
        if (this.palabras[68].palabra === "Doblegó") {
            this.global.puntuacion2++;
        }
        if (this.palabras[71].palabra === "Apartó") {
            this.global.puntuacion2++;
        }
       
        


        console.log("Validación hecha")


    }

    onEventContinuar() {

        this.validacion();

        this.navegador.goTo(4); 

    }



}

export default TSPalabras;


class Palabra {

    admin: TSPalabras;
    palabra: string;
    view: HTMLDivElement;

    constructor(palabra: string, admin: TSPalabras) {
        this.admin = admin;
        this.palabra = palabra;
        this.view = document.createElement("div");
        this.view.className = "palabra";
        this.view.innerText = this.palabra;
    }

    setClassName(className: string) {
        this.view.className = className;
    }


    getHTML() {
        return this.view;
    }

}



