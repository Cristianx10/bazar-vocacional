"use strict";
exports.__esModule = true;
var Timer_1 = require("./Timer");
var EstadoManager = /** @class */ (function () {
    function EstadoManager() {
        this.timer = new Timer_1["default"]();
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
        this.timer = new Timer_1["default"](data.time);
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
exports["default"] = EstadoManager;
