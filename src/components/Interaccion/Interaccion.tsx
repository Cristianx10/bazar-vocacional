import "./Interaccion.scss";
import { useEffect, useRef } from 'react';
import ComunicacionIFrame from '../../componentsTS/ComunicacionIFrame/index';
import { IComunicacionIframaMessage } from '../../componentsTS/ComunicacionIFrame/index';
import InteractionStructure from '../../constants/simulations/types/InteractionStructure';
import ActividadTS from '../Actividad/config/ActividadTS';
import { InteractionContextProvider } from "./InteractionContext";
import InteractionContext from './InteractionContext';

interface IInteraccion {
    interaccion: InteractionStructure;
    onFinish: (actividad: ActividadTS) => void;
}

const Interaccion = ({ interaccion, onFinish }: IInteraccion) => {
    return <InteractionContextProvider interaccion={interaccion} >
        <InteraccionLoad onFinish={onFinish} />
    </InteractionContextProvider>
}


const InteraccionLoad = ({ onFinish }: { onFinish: (actividad: ActividadTS) => void }) => {

    const { useActivity } = InteractionContext();
    const [interaccion] = useActivity();


    const { info } = interaccion;

    const { type, actividad } = info;

    const refIframe = useRef<any>()

    useEffect(() => {


        if (type === "EXTERNA" && refIframe.current) {
            var HTMLIframe = refIframe.current as HTMLIFrameElement;
            interaccion.initIframe(HTMLIframe);
        }

        interaccion.onFinish(() => {
            onFinish(interaccion)
        })

        
        

    }, [])

    var view = <></>

    if (type === "EXTERNA" && typeof actividad === "string") {
        view = <iframe ref={refIframe} className="Interaccion__iframe" src={actividad} />;
    } else if (type === "INTERNA" && typeof actividad !== "string") {
        view = actividad();
    }

    return view;

}

export default Interaccion;