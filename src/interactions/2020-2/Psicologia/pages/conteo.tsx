import React, { useEffect, useRef } from 'react';
import ConteoLoad from '../scripts/Conteo';
import ActividadContext from '../../../../components/Interaccion/ActividadContext';



const Conteo = () => {

    const { getActividad, useNavegador } = ActividadContext();
    const actividad = getActividad();
    const [navegador] = useNavegador();

    useEffect(() => {
        if (actividad)
            actividad.addState("pantalla", "conteo");
    }, []);

    useEffect(() => {


        ConteoLoad(navegador);


    }, [])

    return <div className="PagePsicologia PageConteo">
        <img src="/img/2020-2/psicologia-expresiones/Juego 1.jpg" alt="" className="conteo" />
    </div>
}

export default Conteo;