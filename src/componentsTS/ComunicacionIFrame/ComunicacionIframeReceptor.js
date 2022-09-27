"use strict";
exports.__esModule = true;
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
exports["default"] = ComunicacionIFrameReceptor;
