import { useEffect, useState } from 'react';

import MadLab from "./src/sketch";
import InteractionContext, { isInteractionContext } from '../../../components/Interaccion/InteractionContext';
import ActividadContext, { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';

export const path = "/img/2022-1/madlab"


const MadLabActivity = () => {
    return <ActividadContextProvider>
        <ActividadLoad />
    </ActividadContextProvider>

}

const ActividadLoad = () => {

    const { useNavegador, getActividad } = ActividadContext()
    const [nav] = useNavegador();


    useEffect(() => {
        const actividad = getActividad();
        if (actividad) {

            nav.addPROCESSING(new MadLab(actividad));
         
        }

    }, [])


    return <></>


}

export default MadLabActivity;