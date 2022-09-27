"use strict";
exports.__esModule = true;
var ComunicacionIFrame = /** @class */ (function () {
    function ComunicacionIFrame(HTMLIframe) {
        this.HTMLIframe = HTMLIframe;
        this.inicializado = false;
        this.HTMLIframe.addEventListener("load", this.onListener.bind(this));
    }
    ComunicacionIFrame.prototype.onListener = function () {
        this.inicializado = true;
        //Recibir mensajes
        this.onSend("START_COMUNICATION");
        this.fOnInit && this.fOnInit();
    };
    ComunicacionIFrame.prototype.onFinish = function () {
        this.HTMLIframe.removeEventListener("load", this.onListener.bind(this));
    };
    ComunicacionIFrame.prototype.onInit = function (fOnInit) {
        this.fOnInit = fOnInit;
    };
    ComunicacionIFrame.prototype.setObserver = function (event) {
        this.fOnRecived = event;
    };
    ComunicacionIFrame.prototype.onSend = function (data) {
        var _this = this;
        //Enviar Mensajes
        var ventana = this.HTMLIframe.contentWindow;
        if (ventana) {
            if (this.channel) {
                this.channel.port1.close();
                this.channel.port2.close();
            }
            this.channel = new MessageChannel();
            this.channel.port1.onmessage = function (e) {
                var data = e.data;
                if (_this.fOnRecived) {
                    _this.fOnRecived(data);
                }
            };
            ventana.postMessage(data, "*", [this.channel.port2]);
        }
    };
    return ComunicacionIFrame;
}());
exports["default"] = ComunicacionIFrame;
