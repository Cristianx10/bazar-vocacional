import React, { useEffect, useMemo, useRef, useState } from "react";


import Index from "./html";
import Guia1 from "./html/guia1";
import Guia2 from "./html/guia2";
import Guia3 from "./html/guia3";
import Guia4 from "./html/guia4";
import Guia5 from "./html/guia5";
import Guia6 from "./html/guia6";
import InstruccionFour from "./html/instruccionFour";
import InstruccionOne from "./html/instruccionOne";
import InstruccionThree from "./html/instruccionThree";
import InstruccionTwo from "./html/instruccionTwo";
import Juego from "./html/juego";
import OnBoardFour from "./html/onBoardFour";
import OnBoardOne from "./html/onBoardOne";
import OnBoardThree from "./html/onBoardThree";
import OnBoardTwo from "./html/onBoardTwo";

import "./index.scss";
import MainConfig from "./src/main";
import ActividadContext from '../../../components/Interaccion/ActividadContext';
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';


export const RPath = "/img/2021-1/quimica/";


const QuimicaCarbono = () => {
    return <ActividadContextProvider>
        <QuimicaCarbonoLoad />
    </ActividadContextProvider>

}

const QuimicaCarbonoLoad = () => {

    const { useNavegador, getActividad } = ActividadContext()
    const [navegador] = useNavegador();
    const actividad = getActividad();



    const goToPage = (value: string | number) => {
        if (actividad) {
            if (typeof value === "number") {
                navegador.goTo(value);
            } else {
                navegador.goName(value);
            }

            actividad.addState("pantalla", value);
        }
    }


    useEffect(() => {

        var aplication = navegador.initProcessing();
        var app = aplication.getApp();



        navegador.addJSX(<Index goToPage={goToPage} />, "index");
        navegador.addJSX(<Guia1 goToPage={goToPage} />, "guia1");
        navegador.addJSX(<Guia2 goToPage={goToPage} />, "guia2");
        navegador.addJSX(<Guia3 goToPage={goToPage} />, "guia3");
        navegador.addJSX(<Guia4 goToPage={goToPage} />, "guia4");
        navegador.addJSX(<Guia5 goToPage={goToPage} />, "guia5");
        navegador.addJSX(<Guia6 goToPage={goToPage} />, "guia6");
        navegador.addJSX(<InstruccionFour goToPage={goToPage} />, "instruccionFour");
        navegador.addJSX(<InstruccionOne goToPage={goToPage} />, "instruccionOne");
        navegador.addJSX(<InstruccionThree goToPage={goToPage} />, "instruccionThree");
        navegador.addJSX(<InstruccionTwo goToPage={goToPage} />, "instruccionTwo");
        if (actividad)
            navegador.addJSXAndProcessing(<Juego goToPage={goToPage} />, new MainConfig(app, actividad, navegador), "juego");
        navegador.addJSX(<OnBoardFour goToPage={goToPage} />, "onBoardFour");
        navegador.addJSX(<OnBoardOne goToPage={goToPage} />, "onBoardOne");
        navegador.addJSX(<OnBoardThree goToPage={goToPage} />, "onBoardThree");
        navegador.addJSX(<OnBoardTwo goToPage={goToPage} />, "onBoardTwo");


    }, []);

    return <></>
}

export default QuimicaCarbono;