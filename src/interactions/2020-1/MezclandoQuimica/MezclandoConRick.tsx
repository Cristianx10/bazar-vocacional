import React, { useEffect, useRef, useState } from "react";
import ActividadContext, { ActividadContextProvider } from "../../../components/Interaccion/ActividadContext";

import Logica from './src/Logica';
import Actividad from './src/pages/actividad';
import "./index.scss";



const MezclandoQuimica = () => {
    return <ActividadContextProvider>
        <ActividadLoad />
    </ActividadContextProvider>
}

const ActividadLoad = () => {
    const { getActividad, useNavegador } = ActividadContext();
    const [nav] = useNavegador();

    const activity = getActividad();


    useEffect(() => {

    

        var aplication = nav.initProcessing();
        aplication.size(1200, 700);
        var app = aplication.getApp();

        if (activity) {
            var logica = new Logica(app, activity);

            nav.addJSX(<Instrucciones />)

            nav.addPROCESSING(new Actividad(logica));

        }


        nav.init();


    }, []);


    return <></>
}

export default MezclandoQuimica;

const Instrucciones = () => {

    const { getActividad, useNavegador } = ActividadContext();
    const [nav] = useNavegador();

    const activity = getActividad();
    
    return <div className="MezclandoQuimica__instrucciones">
        <img src="/img/2019/ciencias/imgs/instrucciones.png" alt="" />
        <img className="btn" src="/img/2019/ciencias/imgs/continuar.png"
        onClick={()=>{
            nav.next();
        }} alt="" />
    </div>
}