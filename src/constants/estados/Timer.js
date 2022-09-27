"use strict";
exports.__esModule = true;
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
exports["default"] = Tiempo;
