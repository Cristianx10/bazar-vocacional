import React, { useEffect, useRef, useState } from "react";

import Main from './src/Main';
import Actividad2 from "./src/pages/Actividad2/Actividad2";
import "./src/instrucciones.scss";
import Global from './src/Global';
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';
import ActividadContext from '../../../components/Interaccion/ActividadContext';




const Comunicacion = () => {
    return <ActividadContextProvider>
        <ActividadLoad />
    </ActividadContextProvider>
}

const ActividadLoad = () => {
    const { getActividad, useNavegador } = ActividadContext();
    const actividad = getActividad();
    const [nav] = useNavegador();

    const [global] = useState(new Global());
    const refContainer = useRef<any>();
    const refActividad2 = useRef<any>();

    useEffect(() => {

        const HTMLContainer = refContainer.current as  HTMLDivElement;

        var aplication = nav.initProcessing();
        var app = aplication.getApp();

        var viewInstrucciones = HTMLContainer.querySelectorAll(".instrucciones") as NodeListOf<HTMLDivElement>;

        if (actividad) {

            actividad.addState("Pantalla", "inicio");
            //0
           nav.addPROCESSING(new Main(actividad, app, global, nav));
        }

        console.log("viewInstrucciones",viewInstrucciones)
        //1
        nav.addHTML(refActividad2.current);

        //2
        nav.addHTML(viewInstrucciones[0]);
        //3
        nav.addHTML(viewInstrucciones[1]);
        //4
        nav.addHTML(viewInstrucciones[2]); 

        
        nav.setContainer(HTMLContainer)
    }, []);

    return <div className="Comunicacion" ref={refContainer}>

        {actividad ? <Actividad2 referencia={refActividad2} global={global} navegador={nav} actividad={actividad} /> : <></>}

        <div className="instrucciones">
            <img src="/img/2020-2/comunicacion/img/instrucciones/uno.png" alt="" id="fondo" />
            <div onClick={() => {

                if (actividad) {
                    actividad.addState("Pantalla", "juego1");
                    nav.goTo(0);
                }

            }}>

                <img src="/img/2020-2/comunicacion/img/instrucciones/continuarUno.png" alt="" id="boton" />
            </div>
            <img src="/img/2020-2/comunicacion/img/instrucciones/gif1.gif" alt="" id="gif1" />
        </div>

        <div className="instrucciones">
            <img src="/img/2020-2/comunicacion/img/instrucciones/dos.png" alt="" id="fondo" />
            <div onClick={() => {
                if (actividad) {
                    actividad.addState("Pantalla", "juego2");
                    nav.goTo(1);
                }
            }}>
                <img src="/img/2020-2/comunicacion/img/instrucciones/continuarDos.png" alt="" id="boton" />
            </div>
            <img src="/img/2020-2/comunicacion/img/instrucciones/gif2.gif" alt="" id="gif2" />
        </div>

        <div className="instrucciones">
            <img src="/img/2020-2/comunicacion/img/instrucciones/tres.png" alt="" id="fondo" />
            <img src="/img/2020-2/comunicacion/img/instrucciones/continuarTres.png" alt="" id="boton"
                onClick={() => {
                    if (actividad) {
                        actividad.addState("Pantalla", "juego3");
                        nav.goTo(0);
                    }
                }} />
            <img src="/img/2020-2/comunicacion/img/instrucciones/gif3.gif" alt="" id="gif3" />
        </div>



    </div>;
}

export default Comunicacion;