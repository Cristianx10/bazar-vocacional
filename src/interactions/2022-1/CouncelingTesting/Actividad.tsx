import { useEffect } from "react";


import Counceling from "./src/sketch";
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';
import ActividadContext from '../../../components/Interaccion/ActividadContext';



const CouncelingActivity = () => {
    return <ActividadContextProvider>
        <ActividadLoad />
    </ActividadContextProvider>
}

const ActividadLoad = () => {
    const { useNavegador, getActividad } = ActividadContext()
    const [navegador] = useNavegador();
    const actividad = getActividad();


    useEffect(() => {
        if (actividad)
            navegador.addPROCESSING(new Counceling(actividad));
    }, [])


    return <></>


}

export default CouncelingActivity;