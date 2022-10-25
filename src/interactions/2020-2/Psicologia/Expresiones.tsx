import React, { useEffect, useRef, useState } from "react";


import "./style/main.scss";
import Inicio from './pages/index';
import Conteo from './pages/conteo';
import Info from './pages/info';
import Instrucciones from './pages/instru';
import Juego from './pages/juego';
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';
import ActividadContext from '../../../components/Interaccion/ActividadContext';


const Expresiones = () => {
    return <ActividadContextProvider>
        <ActividadLoad />
    </ActividadContextProvider>
}

const ActividadLoad = () => {
    const { getActividad, useNavegador } = ActividadContext();
    const actividad = getActividad();
    const [navegador] = useNavegador();


    useEffect(() => {

        if (actividad) {
            actividad.addState("puntaje", 0);

        }

        navegador.addJSX(<Inicio />, "inicio");
        navegador.addJSX(<Conteo />, "conteo");
        navegador.addJSX(<Info />, "info");
        navegador.addJSX(<Instrucciones />, "instrucciones");
        navegador.addJSX(<Juego />, "juego");


    }, []);

    return <></>;
}

export default Expresiones;