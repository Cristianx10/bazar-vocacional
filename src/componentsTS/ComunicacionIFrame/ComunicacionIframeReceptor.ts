class ComunicacionIFrameReceptor {
    channel?: MessageEvent;
    fOnRecived?: (data: Object) => void;
    fOnInit?: () => void;
    inicializado;

    initIniciado;

    constructor() {
        this.inicializado = false;
        this.initIniciado = false;

        //Recibir mensajes
        window.addEventListener("message", this.onListener.bind(this));

    }

    onListener(e: MessageEvent) {

        this.inicializado = true;

        const data = e.data;


        this.onMessage(data);


        //Enviar mensajes
        this.channel = e;

        if (this.initIniciado === false) {
            this.initIniciado = true;
            this.fOnInit && this.fOnInit()
        }


    }

    onFinish() {
        window.removeEventListener("message", this.onListener.bind(this));
    }

    onInit(fOnInit?: () => void) {
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

export default ComunicacionIFrameReceptor;