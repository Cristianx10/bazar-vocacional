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


class ComunicacionIFrameReceptor {
    channel;
    fOnRecived;
    fOnInit;
    inicializado;

    constructor() {
        this.inicializado = false;

        //Recibir mensajes
        window.addEventListener("message", (e) => {
            this.inicializado = true;

            const data = e.data;
            this.onMessage(data);

            //Enviar mensajes
            this.channel = e;

            this.fOnInit && this.fOnInit()
        })

    }

    onInit(fOnInit) {
        this.fOnInit = fOnInit;
    }

    onMessage(data) {
        if (this.fOnRecived) {
            this.fOnRecived(data);
        }
    }

    setObserver(event) {
        this.fOnRecived = event;
    }

    onSend(data) {

        //Enviar Mensajes
        if (this.channel) {
            this.channel.ports[0].postMessage(data);
        }
    }

}



const observerScale = (container, canvas, sizeInit) => {

    const config = () => {
        const totalWidth = container.clientWidth;
        const totalHeight = container.clientHeight;

        const { width, height } = sizeInit;
        var clientWidth = width;
        var clientHeight = height;

        const ratioScaleX = totalWidth / clientWidth;
        const ratioScaleY = totalHeight / clientHeight;

        if (canvas) {


            //console.log("Encontro canvas", clientHeight * ratioScaleX, totalHeight, canvas.elt)

            if (clientHeight * ratioScaleX <= totalHeight) {
                canvas.style("width", "100%");
                canvas.style("height", "");

            } else {
                canvas.style("width", "");
                canvas.style("height", "100%");
            }
        }
    }


    window.addEventListener("resize", config)

    config();


}