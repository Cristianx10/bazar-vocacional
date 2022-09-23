import IComunicacionIframeDao from './ComunicacionDao';


class ComunicacionIFrame implements IComunicacionIframeDao {

    HTMLIframe: HTMLIFrameElement;
    channel: MessageChannel;
    inicializado: boolean;

    private fOnInit?: () => void;

    private fOnRecived?: (data: Object) => void;


    constructor(HTMLIframe: HTMLIFrameElement) {

        this.HTMLIframe = HTMLIframe;
        this.channel = new MessageChannel();
        this.inicializado = false;


        this.HTMLIframe.addEventListener("load", this.onListener.bind(this));

    }

    onListener() {
        this.inicializado = true;

        //Recibir mensajes
        this.channel.port1.onmessage = (e) => {
            const data = e.data;
            this.onMessage(data);
        }

        this.onSend("Start")
        this.fOnInit && this.fOnInit()
    }

    onFinish() {
        this.HTMLIframe.removeEventListener("load", this.onListener.bind(this));
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
        var ventana = this.HTMLIframe.contentWindow;
        if (ventana) {
            ventana.postMessage(data, "*", [this.channel.port2]);
        }
    }

}

export default ComunicacionIFrame;