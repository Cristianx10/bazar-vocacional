import "./index.scss";
import { useEffect } from "react";

import MainCofig from "./src";
import ActividadContext from '../../../components/Interaccion/ActividadContext';
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';


const BallSort = () => {
    return <ActividadContextProvider>
        <ActividadLoad />
    </ActividadContextProvider>
}

const ActividadLoad = () => {
    const { useNavegador, getActividad } = ActividadContext()
    const [navegador] = useNavegador();
    const actividad = getActividad();

    useEffect(() => {

        const app = navegador.initProcessing().app;

        if (actividad)
            navegador.addPROCESSING(new MainCofig(app, actividad, navegador));

    }, []);

    return <></>
}

export default BallSort;