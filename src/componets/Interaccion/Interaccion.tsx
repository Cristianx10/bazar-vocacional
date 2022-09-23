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

        }
    }, [])



    return type === "EXTERNA" ?
        <iframe ref={refIframe} className="Interaccion__iframe" src="/proyectos/2022-1/SumaFlow/index.html" />
        : <h1>Interaccion</h1>


}

export default Interaccion;