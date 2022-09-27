import CreateJS from '../../CreateJS/config';
import CreateJSView, { CreateJSActividad } from '../../CreateJS/view';
import HTMLDisplay from '../../HTML/config';
import HTMLView from '../../HTML/view';
import JSXElemento from '../../JSX/config';
import JSXView from '../../JSX/view';
import Processing from '../../Processing/config';
import IProcessingActividad from '../../Processing/types/IProcessingActivity';
import ProcessingView from '../../Processing/view';
import Navegador from '../config';
import INavegacionPantalla from '../types/INavegacionPantalla';

import "./index.scss";


class TSNavegador {

    pantallas: INavegacionPantalla[] = [];
    pantallasName = new Map<string, INavegacionPantalla>();
    inicializado = false;
    index = -1;

    container: HTMLDivElement;

    processing?: Processing;
    HTML: HTMLDisplay;
    createJS?: CreateJS;
    JSX?: JSXElemento;

    navegador: Navegador;

    initView = {
        processing: false,
        html: true,
        createjs: false,
        jsx: false
    }

    constructor(navegador: Navegador) {
        this.navegador = navegador;
        this.container = document.createElement("div");
        this.container.classList.add("Navegador");
        this.HTML = new HTMLDisplay();
    }

    init(name?: string | number) {
        if (this.inicializado === false) {
            if (name) {
                if (typeof (name) === "number") {
                    this.goTo(name);
                } else {
                    this.goName(name);
                }
            } else {
                this.next();
            }
        }
    }

    addPROCESSING(processing: IProcessingActividad, nombre?: string) {

        var pantalla = new ProcessingView(this, processing);

        var name = (nombre === undefined ? this.pantallas.length + "" : nombre);
        var index = this.pantallas.length;

        var newPantalla: INavegacionPantalla = {
            name,
            index,
            pantalla,
            initSetup: false,
            type: "PROCESSING"
        }

        this.pantallasName.set(name, newPantalla);
        this.pantallas.push(newPantalla);

        return pantalla;
    }

    addProcessingAndJSX(HTML: JSX.Element, processing: IProcessingActividad, nombre?: string) {

        var pantalla = new ProcessingView(this, processing, HTML);

        var name = (nombre === undefined ? this.pantallas.length + "" : nombre);
        var index = this.pantallas.length;

        var newPantalla: INavegacionPantalla = {
            name,
            index,
            pantalla,
            initSetup: false,
            type: "PROCESSING_JSX",
        }


        this.pantallasName.set(name, newPantalla);
        this.pantallas.push(newPantalla);

        return pantalla;
    }

    addHTML(HTML: HTMLElement, nombre?: string) {

        var pantalla = new HTMLView(this, HTML);

        var name = (nombre === undefined ? this.pantallas.length + "" : nombre);
        var index = this.pantallas.length;

        var newPantalla: INavegacionPantalla = {
            name,
            index,
            pantalla,
            initSetup: false,
            type: "HTML",
        }


        var parent = HTML.parentNode;
        if (parent && parent === this.container) {
            this.container.removeChild(HTML);
        }

        this.pantallasName.set(name, newPantalla);
        this.pantallas.push(newPantalla);
    }

    addJSX(HTML: JSX.Element, nombre?: string) {

        var pantalla = new JSXView(this, HTML);

        var name = (nombre === undefined ? this.pantallas.length + "" : nombre);
        var index = this.pantallas.length;

        var newPantalla: INavegacionPantalla = {
            name,
            index,
            pantalla,
            initSetup: false,
            type: "JSX",
            //  config
        }
        this.pantallasName.set(name, newPantalla);
        this.pantallas.push(newPantalla);
    }

    addCREATEJS(createJS: CreateJSActividad, nombre?: string) {

        var pantalla = new CreateJSView(this, createJS);

        var name = (nombre === undefined ? this.pantallas.length + "" : nombre);
        var index = this.pantallas.length;

        var newPantalla: INavegacionPantalla = {
            name,
            index,
            pantalla,
            initSetup: false,
            type: "CREATEJS"
        }

        this.pantallasName.set(name, newPantalla);
        this.pantallas.push(newPantalla);
    }

    private iniciar(pantalla: INavegacionPantalla) {
        if (pantalla) {
            pantalla.pantalla.iniciar();
        }
    }


    private finalizar(pantalla: INavegacionPantalla) {
        if (pantalla) {
            pantalla.pantalla.finalizar();
        }
    }

    getCurrentPantalla() {
        var pantalla = undefined;
        if (this.pantallas[this.index] !== undefined) {
            pantalla = this.pantallas[this.index];
        }
        return pantalla;
    }

    initProcessing() {
        if (this.initView.processing === false) {
            this.initView.processing = true;
            this.processing = new Processing();
            this.processing.initProcessing();
        }

        return this.processing as Processing;
    }

    initCreateJS() {
        if (this.initView.createjs === false) {
            this.initView.createjs = true;
            this.createJS = new CreateJS();
        }

        return this.createJS as CreateJS;
    }

    initJSX(setJSX: (elemento: JSX.Element) => void) {
        if (this.initView.jsx === false) {
            this.initView.jsx = true;
            this.JSX = new JSXElemento();
            this.JSX.setStatePantalla(setJSX);
        }

        return this.JSX as JSXElemento;
    }

    private initNavegacion() {
        if (this.inicializado === false) {
            var pantalla = this.getCurrentPantalla();
            if (pantalla === undefined) {
                this.inicializado = false;
                this.index = -1;
            } else {
                this.inicializado = true;
                this.navegador.waitEventNav.forEach((w) => w())
                this.navegador.waitEventNav = []
            }
        }
    }

    next() {
        if (this.index + 1 < this.pantallas.length) {
            var pantallaActual = this.getCurrentPantalla();
            this.onChangePantallaFinish(pantallaActual);

            this.index++;

            var pantalla = this.getCurrentPantalla();
            this.onChangePantallaInicial(pantalla);
        } else {

        }

        this.initNavegacion();
    }

    back() {
        if (this.index - 1 >= 0) {
            var pantallaActual = this.getCurrentPantalla();
            this.onChangePantallaFinish(pantallaActual);

            this.index--;

            var pantalla = this.getCurrentPantalla();
            this.onChangePantallaInicial(pantalla);
        }

        this.initNavegacion();
    }

    goTo(index: number) {
        if (index >= 0 && index < this.pantallas.length) {

            var pantallaActual = this.getCurrentPantalla();
            this.onChangePantallaFinish(pantallaActual);

            this.index = index;

            var pantalla = this.getCurrentPantalla();
            this.onChangePantallaInicial(pantalla);
        }

        this.initNavegacion();
    }

    goName(name: string) {
        var pantallaSelect = this.pantallasName.get(name);

        if (pantallaSelect) {

            var pantallaActual = this.getCurrentPantalla();
            this.onChangePantallaFinish(pantallaActual);

            this.index = pantallaSelect.index;


            var pantalla = this.getCurrentPantalla();
            this.onChangePantallaInicial(pantalla);
        }

        this.initNavegacion();
    }

    onDestroy() {
        if (this.processing) {
            this.processing.onDestroy();
        }

        if (this.createJS) {
            createjs.Ticker.removeAllEventListeners();
        }
    }

    onChangePantallaInicial(pantalla?: INavegacionPantalla) {
        if (pantalla) {
            this.iniciar(pantalla);
        }
        setTimeout(() => { this.observerScale() }, 100)

    }

    onChangePantallaFinish(pantalla?: INavegacionPantalla) {
        if (pantalla) {
            this.finalizar(pantalla);
        }
    
    }

    getContainer() {
        return this.container;
    }

    setContainer(container: HTMLDivElement) {
        this.container = container;
        this.container.classList.add("Navegador");

    }

    observerScale() {


        const totalWidth = this.container.clientWidth;
        const totalHeight = this.container.clientHeight;

        const childrenP = this.container.childNodes.length > 0 ? this.container.childNodes[0] : undefined;



        if (childrenP !== undefined) {

            const childHMLT = childrenP as HTMLElement;

            var clientWidth = childHMLT.offsetWidth;
            var clientHeight = childHMLT.offsetHeight;



            if (childHMLT.className.includes("Processing") && this.processing) {
                const { width, height } = this.processing.sizeInit;
                clientWidth = width;
                clientHeight = height;
            }

            const ratioScaleX = totalWidth / clientWidth;
            const ratioScaleY = totalHeight / clientHeight;

            var container = this.container as HTMLElement;


            if (childHMLT.className.includes("Processing") && this.processing) {
                var canvas = this.processing.canvas;



                if (canvas) {

             //       console.log("Encontro canvas", clientHeight * ratioScaleX, totalHeight, canvas.elt)

                    if (clientHeight * ratioScaleX <= totalHeight) {
                        canvas.style("width", "100%");
                        canvas.style("height", "");

                    } else {
                        canvas.style("width", "");
                        canvas.style("height", "100%");
                    }

                }

                // this.container.style.transform = `scale(1)`


            } else {
                if (clientHeight * ratioScaleX <= totalHeight) {
                    // container.style.transform = `scale(${ratioScaleX})`
                } else {
                    // container.style.transform = `scale(${ratioScaleY})`
                }
            }



        }



    }

}


export default TSNavegador;