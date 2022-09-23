var CARRERAS = {
    INGENIERIA: "INGENIERIA",
    DISENO: "DISENO",
    CIENCIAS_NATURALES: "CIENCIAS_NATURALES",
    COMUNICACION: "COMUNICACION",
    PSICOLOGIA: "PSICOLOGIA",
    DERECHO: "DERECHO",
    CONTADURIA: "CONTADURIA",
    MUSICA: "MUSICA",
    MERCADEO: "MERCADEO",
    LICENCIATURA: "LICENCIATURA",
    LICENCIATURA_IDIOMAS: "LICENCIATURA_IDIOMAS",
    HUMANIDADES: "HUMANIDADES",
    ECONOCMIA: "ECONOCMIA",
    MEDICINA: "MEDICINA",
    BIOLOGIA: "BIOLOGIA",
    INGENIERIA_SISTEMAS: "INGENIERIA_SISTEMAS",
    DISENO_INDUSTRIAL: "DISENO_INDUSTRIAL",
    QUIMICA: "QUIMICA",
    DISENO_MODAS: "DISENO_MODAS",
    DISENO_INTERACTIVO: "DISENO_MEDIOS_INTERACTIVOS"
};


class ComunicacionIFrameReceptor {
    channel;
    fOnRecived;
    fOnInit;
    inicializado;

    constructor() {
        this.inicializado = false;

        //Recibir mensajes
        window.addEventListener("message", (e) => {
            this.inicializado = true;

            const data = e.data;
            this.onMessage(data);

            //Enviar mensajes
            this.channel = e;

            this.fOnInit && this.fOnInit()
        })

    }

    onInit(fOnInit) {
        this.fOnInit = fOnInit;
    }

    onMessage(data) {
        if (this.fOnRecived) {
            this.fOnRecived(data);
        }
    }

    setObserver(event) {
        this.fOnRecived = event;
    }

    onSend(data) {

        //Enviar Mensajes
        if (this.channel) {
            this.channel.ports[0].postMessage(data);
        }
    }

}



const observerScale = (container, canvas, sizeInit) => {

    const config = () => {
        const totalWidth = container.clientWidth;
        const totalHeight = container.clientHeight;

        const { width, height } = sizeInit;
        var clientWidth = width;
        var clientHeight = height;

        const ratioScaleX = totalWidth / clientWidth;
        const ratioScaleY = totalHeight / clientHeight;

        if (canvas) {


            //console.log("Encontro canvas", clientHeight * ratioScaleX, totalHeight, canvas.elt)

            if (clientHeight * ratioScaleX <= totalHeight) {
                canvas.style("width", "100%");
                canvas.style("height", "");

            } else {
                canvas.style("width", "");
                canvas.style("height", "100%");
            }
        }
    }


    window.addEventListener("resize", config)

    config();


}


"use strict";

var Tiempo = /** @class */ (function () {
    function Tiempo(tiempo) {
        this.tiempo = tiempo !== undefined ? tiempo : 0;
        this.timeObserves = [];
    }
    Tiempo.prototype.addObserver = function (observer) {
        this.timeObserves.push(observer);
    };
    Tiempo.prototype.start = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.tiempo += 100;
            _this.timeObserves.forEach(function (d) {
                d();
            });
        }, 100);
    };
    Tiempo.prototype.temporizador = function (tiempo, load) {
        var _this = this;
        this.tiempo = tiempo;
        this.interval = setInterval(function () {
            _this.tiempo -= 100;
            _this.timeObserves.forEach(function (d) {
                d();
            });
            if (_this.tiempo <= 0) {
                _this.tiempo = 0;
                _this.stop();
                load && load();
            }
        }, 100);
    };
    Tiempo.prototype.stop = function (load) {
        if (this.interval) {
            clearInterval(this.interval);
            load && load();
        }
    };
    Tiempo.prototype.reset = function () {
        this.stop();
        this.tiempo = 0;
    };
    Tiempo.prototype.getTiempoFormat = function () {
        var minutos = Math.floor(this.tiempo / 60000);
        var segundos = Math.round(this.tiempo / 1000) - (minutos * 60);
        return {
            minutos: minutos,
            segundos: segundos
        };
    };
    return Tiempo;
}());



var EstadoManager = /** @class */ (function () {
    function EstadoManager() {
        this.estados = new Map();
        this.index = -1;
        this.lastIndex = -1;
        this.timer = new Timer_1["default"]();
        this.date = {
            inicio: 0,
            fin: 0
        };
    }
    EstadoManager.prototype.onObserver = function (fOnObserver) {
        this.fOnObserver = fOnObserver;
        if (this.fOnObserver) {
            var states = this.getAllLastStates();
            this.fOnObserver(states);
        }
    };
    EstadoManager.prototype.getAllLastStates = function () {
        var states = [];
        this.estados.forEach(function (value, key) {
            states.push({ value: value[value.length - 1].value, key: key });
        });
        return states;
    };
    EstadoManager.prototype.initTime = function () {
        this.timer.start();
        this.date.inicio = new Date().getTime();
    };
    EstadoManager.prototype.resetTime = function (load) {
        load && load();
    };
    EstadoManager.prototype.useState = function (key) {
        var _this = this;
        var getState = (function () {
            return _this.getLastState(key);
        });
        var setState = (function (valor) {
            _this.addState(key, valor);
        });
        return [getState.bind(this), setState.bind(this)];
    };
    EstadoManager.prototype.getLastState = function (key) {
        var value = undefined;
        var mapState = this.estados.get(key);
        if (mapState) {
            var lastState = mapState[mapState.length - 1];
            if (lastState) {
                value = lastState.value;
            }
        }
        return value;
    };
    EstadoManager.prototype.addState = function (key, valor) {
        var value = valor;
        var mapState = this.estados.get(key);
        if (mapState === undefined) {
            this.estados.set(key, []);
            mapState = this.estados.get(key);
        }
        var lastState = mapState[mapState.length - 1];
        var time = this.timer.tiempo;
        if (lastState === undefined || lastState.value !== value) {
            this.index++;
            var estado = {
                index: this.index + 0,
                time: time,
                value: value
            };
            this.lastIndex = this.index;
            mapState.push(estado);
        }
        if (this.fOnObserver) {
            var states = this.getAllLastStates();
            this.fOnObserver(states);
        }
    };
    EstadoManager.prototype.stopTime = function () {
        this.timer.stop();
        this.date.fin = new Date().getTime();
    };
    EstadoManager.prototype.toJSON = function () {
        var estados = [];
        this.estados.forEach(function (estado, index) {
            var key = index;
            estados.push({ key: key, values: estado });
        });
        var lastIndex = this.lastIndex;
        return {
            lastIndex: lastIndex,
            estados: estados
        };
    };
    return EstadoManager;
}());

const ObserverStyle = document.createElement("style");
ObserverStyle.innerHTML = `
* {
    box-sizing: border-box;
    margin: 0;
  }
  
  html,
  #root,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  body > main{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
  `

  document.head.appendChild(ObserverStyle)