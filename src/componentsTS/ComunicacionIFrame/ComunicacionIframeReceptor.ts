class ComunicacionIFrameReceptor {
    channel?: MessageEvent;
    fOnRecived?: (data: Object) => void;
    fOnInit?: () => void;
    inicializado;

    constructor() {
        this.inicializado = false;

        //Recibir mensajes
        window.addEventListener("message", this.onListener.bind(this));

    }

    onListener(e: MessageEvent) {
        const data = e.data;

        if (this.inicializado === true) {
            this.onMessage(data);
        }

        //Enviar mensajes
        this.channel = e;

        this.fOnInit && this.fOnInit()

        this.inicializado = true;
    }

    onFinish() {
        window.removeEventListener("message", this.onListener.bind(this));
    }

    onInit(fOnInit: () => void) {
        this.fOnInit = fOnInit;
    }

    onMessage(data: Object) {
        if (this.fOnRecived) {
            this.fOnRecived(data);
        }
    }

    setObserver(event: (data: Object) => void) {
        this.fOnRecived = event;
    }

    onSend(data: Object) {

        //Enviar Mensajes
        if (this.channel) {
            this.channel.ports[0].postMessage(data);
        }
    }

}

export default ComunicacionIFrameReceptor