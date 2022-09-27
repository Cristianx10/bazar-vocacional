import { path } from "../MadLab";

class Compuesto {

    constructor(listaElementos, suciedad, posx, posy, app) {
        this.app = app;
        this.posx = posx;
        this.posy = posy;
        this.listaElementos = [listaElementos];
        this.suciedad = suciedad;
        this.nombre = "";
        this.formula = "";
        this.imagen = undefined;
        this.crearListaDeFormulas();
        this.validarFormula();


    }


    crearListaDeFormulas() {

        this.listaDeFormulas = [10];

        this.listaDeFormulas[0] = {
            nombre: "Agua",
            formula: "H,H,O",
            img: path + "/data/agua.png"
        }

        this.listaDeFormulas[1] = {
            nombre: "Sal\nde mesa",
            formula: "Na,Cl",
            img: path + "/data/sal.png"
        }

        this.listaDeFormulas[2] = {
            nombre: "Óxido\nde hierro",
            formula: "Fe,O",
            img: path + "/data/oxido.png"
        }

        this.listaDeFormulas[3] = {
            nombre: "Dióxido\nde carbono",
            formula: "C,O,O",
            img: path + "/data/dioxido.png"
        }

        this.listaDeFormulas[4] = {
            nombre: "Carbonato\nde calcio",
            formula: "Ca,C,O,O,O",
            img: path + "/data/carbonato.png"
        }

        this.listaDeFormulas[5] = {
            nombre: "Sulfato\nde cobre",
            formula: "Cu,S,O,O,O,O",
            img: path + "/data/sulfato.png"
        }

        this.listaDeFormulas[6] = {
            nombre: "Permanganato\nde potasio",
            formula: "K,Mn,O,O,O,O",
            img: path + "/data/permanganato.png"
        }

        this.listaDeFormulas[7] = {
            nombre: "Bicarbonato\nde sodio",
            formula: "Na,H,C,O,O,O",
            img: path + "/data/bicarbonato.png"
        }

        this.listaDeFormulas[8] = {
            nombre: "Etanol",
            formula: "C,C,H,H,H,H,H,O,H",
            img: path + "/data/etanol.png"
        }

        this.listaDeFormulas[9] = {
            nombre: "Ácido\nacetilsalicílico",
            formula: "C,C,C,C,C,C,C,C,C,H,H,H,H,H,H,H,H,O,O,O,O",
            img: path + "/data/aspirina.png"
        }






    }



    validarFormula() {
        this.nombre = "Compuesto\nPeligroso";
        this.imagen = this.app.loadImage(path + "/data/peligro.png")
        this.listaElementos.forEach(element => {
            this.formula = `${this.formula}${element}`
        });
        if (this.suciedad == false) {
            this.listaDeFormulas.forEach(f => {
                if (this.formula == f.formula) {
                    this.nombre = f.nombre;
                    this.imagen = this.app.loadImage(f.img);
                }
            });

        } else {
            this.nombre = "Compuesto\nPeligroso"
            this.imagen = this.app.loadImage(path + "/data/peligro.png")
        }

    }

    pintarCompuesto() {
        this.imagen.resize(60, 60);
        this.app.image(this.imagen, this.posx, this.posy)
        this.app.textSize(10);
        this.app.fill(255);
        this.app.text(this.nombre, this.posx, this.posy + 50);
    }


    getFormula() {
        return this.formula;
    }

    getNombre() {
        return this.nombre;
    }

    getPosX() {
        return this.posx;
    }

    getPosY() {
        return this.posy;
    }

    setPosX(posX) {
        this.posx = posX;
    }


    setPosY(posY) {
        this.posy = posY;
    }



}


export default Compuesto