import { useEffect } from "react";
import "./Actividad.scss";

import JuegoVirtual from "./src/JuegoVirtual";
import ActividadContext from '../../../components/Interaccion/ActividadContext';
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';


const Licenciatura = () => {
    return <ActividadContextProvider>
        <ActividadLoad />
    </ActividadContextProvider>
}

const ActividadLoad = () => {
    const { getActividad, useNavegador } = ActividadContext();
    const actividad = getActividad();
    const [navegador] = useNavegador();

    useEffect(() => {

        if (actividad)
            navegador.addPROCESSING(new JuegoVirtual(actividad));

    }, [])


    return <></>


}

export default Licenciatura;


