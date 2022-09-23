import "./Interaccion.scss";
import { useEffect, useRef } from 'react';
import ComunicacionIFrame from '../../componentsTS/ComunicacionIFrame/index';

interface IInteraccion {
    type: "EXTERNA"
}

const Interaccion = ({ type }: IInteraccion) => {

    const refIframe = useRef<any>()

    useEffect(() => {
        if (refIframe.current) {
            var HTMLIframe = refIframe.current as HTMLIFrameElement;

            var channel = new MessageChannel();

            /*
            HTMLIframe.addEventListener("load", () => {

                //Recibir mensajes
                channel.port1.onmessage = (e) => {
                    console.log(document.querySelector(".mensaje"), e);
                    (document.querySelector(".mensaje") as any).innerHTML = e.data;
                }

                 //Enviar Mensajes
            var ventana = HTMLIframe.contentWindow;
            if (ventana) {
                ventana.postMessage({ msg: "HOLA DESDE EL MAIN" }, "*", [channel.port2]);
            }


            });
            */



            var c = new ComunicacionIFrame(HTMLIframe);

            c.onInit(() => {
                c.setObserver((data) => {
                    (document.querySelector(".mensaje") as any).innerHTML = data;
                })

                c.onSend({ msg: "HOLA DESDE EL MAIN" });
            })




        }
    }, [])



    return type === "EXTERNA" ?
        <iframe ref={refIframe} className="Interaccion__iframe" src="/proyectos/2022-1/SumaFlow/index.html" />
        : <h1>Interaccion</h1>


}

export default Interaccion;