import { useEffect } from "react";


import Diagnosticalos from "./src/main";
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';
import ActividadContext from '../../../components/Interaccion/ActividadContext';



const DiagnosticalosActivity = () => {
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
        navegador.addPROCESSING(new Diagnosticalos(actividad));
    }, [])


    return <></>


}

export default DiagnosticalosActivity;