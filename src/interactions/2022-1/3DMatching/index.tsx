import "./index.scss";
import MainCofig from "./src/game";

import { useEffect } from "react";
import ActividadContext, { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';


const Matching3D = () => {
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

export default Matching3D;