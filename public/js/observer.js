"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var ObserverStyle = document.createElement("style");
ObserverStyle.innerHTML = "\n* {\n    box-sizing: border-box;\n    margin: 0;\n  }\n  \n  html,\n  #root,\n  body {\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n  }\n  \n  body > main{\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  code {\n    font-family: source-code-pro, Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  }\n  ";
document.head.appendChild(ObserverStyle);
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
var ComunicacionIFrameReceptor = /** @class */ (function () {
    function ComunicacionIFrameReceptor() {
        this.inicializado = false;
        this.initIniciado = false;
        //Recibir mensajes
        window.addEventListener("message", this.onListener.bind(this));
    }
    ComunicacionIFrameReceptor.prototype.onListener = function (e) {
        this.inicializado = true;
        var data = e.data;
        this.onMessage(data);
        //Enviar mensajes
        this.channel = e;
        if (this.initIniciado === false) {
            this.initIniciado = true;
            this.fOnInit && this.fOnInit();
        }
    };
    ComunicacionIFrameReceptor.prototype.onFinish = function () {
        window.removeEventListener("message", this.onListener.bind(this));
    };
    ComunicacionIFrameReceptor.prototype.onInit = function (fOnInit) {
        this.fOnInit = fOnInit;
    };
    ComunicacionIFrameReceptor.prototype.onMessage = function (data) {
        if (this.fOnRecived) {
            this.fOnRecived(data);
        }
    };
    ComunicacionIFrameReceptor.prototype.setObserver = function (event) {
        this.fOnRecived = event;
    };
    ComunicacionIFrameReceptor.prototype.onSend = function (data) {
        //Enviar Mensajes
        if (this.channel) {
            this.channel.ports[0].postMessage(data);
        }
    };
    return ComunicacionIFrameReceptor;
}());
var observerScale = function (container, canvas, sizeInit) {
    var config = function () {
        var totalWidth = container.clientWidth;
        var totalHeight = container.clientHeight;
        var width = sizeInit.width, height = sizeInit.height;
        var clientWidth = width;
        var clientHeight = height;
        var ratioScaleX = totalWidth / clientWidth;
        var ratioScaleY = totalHeight / clientHeight;
        if (canvas) {
            //console.log("Encontro canvas", clientHeight * ratioScaleX, totalHeight, canvas.elt)
            if (clientHeight * ratioScaleX <= totalHeight) {
                canvas.style("width", "100%");
                canvas.style("height", "");
            }
            else {
                canvas.style("width", "");
                canvas.style("height", "100%");
            }
        }
    };
    window.addEventListener("resize", config);
    config();
};
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
        this.timer = new Tiempo();
        this.estados = new Map();
        this.estado = "NO INICIADA";
        this.index = -1;
        this.lastIndex = -1;
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
        this.estado = "INICIADA";
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
        this.estado = "FINALIZADA";
    };
    EstadoManager.prototype.toJSON = function () {
        var estados = [];
        this.estados.forEach(function (estado, index) {
            var key = index;
            estados.push({ key: key, values: estado });
        });
        var lastIndex = this.lastIndex;
        var date = this.date;
        var estado = this.estado;
        var time = this.timer.tiempo;
        return {
            date: date,
            estado: estado,
            lastIndex: lastIndex,
            estados: estados,
            time: time
        };
    };
    EstadoManager.prototype.loadData = function (data) {
        var _this = this;
        this.timer.stop();
        this.timer = new Tiempo(data.time);
        this.estados = new Map();
        data.estados.forEach(function (_a) {
            var key = _a.key, values = _a.values;
            var estado = key;
            _this.estados.set(estado, values);
        });
        this.index = data.lastIndex;
        this.lastIndex = data.lastIndex;
        this.estado = data.estado;
        this.date = data.date;
        if (this.estado === "INICIADA") {
            this.timer.start();
        }
    };
    return EstadoManager;
}());
var ActividadTSLite = /** @class */ (function () {
    function ActividadTSLite() {
        this.initEjecutado = false;
        this.medicion = new EstadoManager();
        this.resultados = [];
        this.maximos = [];
        this.informacion = [];
        this.isFinalizado = false;
    }
    ActividadTSLite.prototype.initIframe = function (load) {
        var _this = this;
        this.comunicacion = new ComunicacionIFrameReceptor();
        this.comunicacion.setObserver(function (data) {
            if (typeof data === "string") {
                if (data === "START_COMUNICATION") {
                }
            }
            else {
                if (data.type === "GET_ACTIVITY") {
                    _this.loadData(data.data);
                    if (_this.fInit && _this.comunicacion && _this.comunicacion.inicializado && _this.initEjecutado === false) {
                        _this.initEjecutado = true;
                        _this.fInit();
                    }
                }
            }
        });
        this.comunicacion.onInit(function () {
            if (_this.comunicacion) {
                _this.comunicacion.onSend("GET_ACTIVITY");
            }
            load && load();
        });
    };
    ActividadTSLite.prototype.setInit = function (fInit) {
        this.fInit = fInit;
        if (this.fInit && this.comunicacion && this.comunicacion.inicializado && this.initEjecutado === false) {
            this.initEjecutado = true;
            this.fInit();
        }
    };
    ActividadTSLite.prototype.init = function (load, type) {
        this.medicion.initTime();
        if (type === "EXTERNA" || type === undefined) {
            this.initIframe(load);
        }
        else {
            load && load();
        }
    };
    ActividadTSLite.prototype.getState = function (key) {
        return this.medicion.useState(key);
    };
    ActividadTSLite.prototype.addState = function (key, valor) {
        this.medicion.addState(key, valor);
    };
    ActividadTSLite.prototype.addInformation = function (informacion) {
        this.informacion = __spreadArray(__spreadArray([], this.informacion, true), informacion, true);
    };
    ActividadTSLite.prototype.setInformation = function (informacion) {
        this.informacion = informacion;
    };
    ActividadTSLite.prototype.addResultMaximo = function (maximo) {
        var maximoTemp = new Map();
        maximo.forEach(function (_a) {
            var id = _a.id, value = _a.value;
            maximoTemp.set(id, value);
        });
        var maximoResult = [];
        maximoTemp.forEach(function (value, key) {
            maximoResult.push({ id: key, value: value });
        });
        this.maximos = maximoResult;
    };
    ActividadTSLite.prototype.addResult = function (resultados) {
        var resultadoTemp = new Map();
        resultados.forEach(function (_a) {
            var id = _a.id, value = _a.value;
            resultadoTemp.set(id, value);
        });
        var resultadoResult = [];
        resultadoTemp.forEach(function (value, key) {
            resultadoResult.push({ id: key, value: value });
        });
        this.resultados = resultadoResult;
    };
    ActividadTSLite.prototype.finish = function () {
        if (this.isFinalizado === false) {
            this.isFinalizado = true;
            this.medicion.stopTime();
            var resultData = this.getData();
            if (this.comunicacion) {
                this.comunicacion.onSend({
                    type: "FINISH_ACTIVITY",
                    data: resultData
                });
                this.comunicacion.onFinish();
            }
            if (this.fOnFinish) {
                this.fOnFinish(resultData);
            }
        }
    };
    ActividadTSLite.prototype.onFinish = function (fOnFinish) {
        this.fOnFinish = fOnFinish;
    };
    ActividadTSLite.prototype.onSaveData = function () {
        if (this.comunicacion) {
            var resultData = this.getData();
            this.comunicacion.onSend({
                type: "SAVE_ACTIVITY",
                data: resultData
            });
        }
    };
    ActividadTSLite.prototype.getData = function () {
        var data = this.medicion.toJSON();
        var resultados = this.resultados;
        var maximos = this.maximos;
        var informacion = this.informacion;
        var isFinalizado = this.isFinalizado;
        var resultData = {
            data: data,
            resultados: resultados,
            maximos: maximos,
            informacion: informacion,
            isFinalizado: isFinalizado
        };
        return resultData;
    };
    ActividadTSLite.prototype.loadData = function (data) {
        this.medicion = new EstadoManager();
        this.medicion.loadData(data.data);
        this.resultados = data.resultados;
        this.maximos = data.maximos;
        this.informacion = data.informacion;
        this.isFinalizado = data.isFinalizado;
    };
    ActividadTSLite.prototype.redirect = function (url) {
        this.onSaveData();
        window.location.href = url;
    };
    return ActividadTSLite;
}());
var oActivity = new ActividadTSLite();
oActivity.init();