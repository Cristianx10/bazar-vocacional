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
exports.__esModule = true;
var EstadoManager_1 = require("../../../constants/estados/EstadoManager");
var ComunicacionIframeReceptor_1 = require("../../../componentsTS/ComunicacionIFrame/ComunicacionIframeReceptor");
var ActividadTSLite = /** @class */ (function () {
    function ActividadTSLite() {
        this.initEjecutado = false;
        this.medicion = new EstadoManager_1["default"]();
        this.resultados = [];
        this.maximos = [];
        this.informacion = [];
        this.isFinalizado = false;
    }
    ActividadTSLite.prototype.initIframe = function (load) {
        var _this = this;
        this.comunicacion = new ComunicacionIframeReceptor_1["default"]();
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
        this.medicion = new EstadoManager_1["default"]();
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
exports["default"] = ActividadTSLite;
