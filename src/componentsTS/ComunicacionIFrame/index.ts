import IComunicacionIframeDao from './ComunicacionDao';

export interface IComunicacionIframaMessage {
    type: string;
    data: Object;
}


class ComunicacionIFrame<I> implements IComunicacionIframeDao<I> {

    HTMLIframe: HTMLIFrameElement;
    channel?: MessageChannel;
    inicializado: boolean;

    private fOnInit?: () => void;

    private fOnRecived?: (data: I) => void;


    constructor(HTMLIframe: HTMLIFrameElement) {

        this.HTMLIframe = HTMLIframe;

        this.inicializado = false;

        this.HTMLIframe.addEventListener("load", this.onListener.bind(this));

    }

    onListener() {
        this.inicializado = true;

        //Recibir mensajes
        this.onSend("START_COMUNICATION")
        this.fOnInit && this.fOnInit()
    }

    onFinish() {

        this.HTMLIframe.removeEventListener("load", this.onListener.bind(this));

    }

    onInit(fOnInit: () => void) {
        this.fOnInit = fOnInit;
    }

    setObserver(event: (data: I) => void) {
        this.fOnRecived = event;
    }

    onSend(data: I | string) {

        //Enviar Mensajes
        var ventana = this.HTMLIframe.contentWindow;
        if (ventana) {

            if (this.channel) {
                this.channel.port1.close();
                this.channel.port2.close();
            }

            this.channel = new MessageChannel();
            this.channel.port1.onmessage = (e) => {
                const data = e.data;

                if (this.fOnRecived) {
                    this.fOnRecived(data);
                }

            }


            ventana.postMessage(data, "*", [this.channel.port2]);
        }


    }

}

export default ComunicacionIFrame;