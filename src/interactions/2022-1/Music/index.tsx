import "./index.scss";
import React, { useEffect, useRef, useState } from "react";

import onLoadMain from "./src/index";

import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';
import ActividadContext from '../../../components/Interaccion/ActividadContext';
import ActividadTSLite from '../../../components/Actividad/config/ActividadTSLite';

export const RPath = "/img/2021-1/music";

const Music = () => {
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
            navegador.addJSX(<Juego actividad={actividad} />)

    }, []);

    return <></>
}

export default Music;


const Juego = ({ actividad }: { actividad: ActividadTSLite }) => {


    useEffect(() => {
        // onPreloadMain();
        if (actividad)
            onLoadMain(actividad);
    }, [])

    return <div className="Music2021">
        {/*<!-- start screen  -->*/}

        <main className="screen">
            <div className="screen__content">
                <img src={RPath + "/lib/img/brand.png"} alt="" />
                <button className="screen__btn">Play</button>
            </div>
        </main>
        {/*<!-- instructions  -->*/}
        <main className="instructions hidden">
            <video className="instructions__vid" width="250">
                <source src={RPath + "/lib/videos/instructions.mp4"} type="video/webm" />
            </video>
            <button className="instructions__btn">Continuar</button>
        </main>
        {/*<!-- win screen  -->*/}

        <main className="result win hidden ">
            <img src={RPath + "/lib/img/win.png"} alt="" />
            <button className="btnTerminar">Finalizar</button>
        </main>
        {/*<!-- loose screen  -->*/}

        <main className="result loose hidden">
            <img src={RPath + "/lib/img/loose.png"} alt="" />
            <button className="loose__restart">repetir</button>
            <button className="btnTerminar">Finalizar</button>
        </main>
        {/*<!-- game screen  -->*/}
        <main className="game hidden">
            <article className="game__prime">
                <img className="game__logo" src={RPath + "/lib/img/brand.png"} alt="" />
                <article className="matrix">
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <h1 className="innit-message-start">Presiona Start para continuar</h1>
                </article>
                <button className="game__start-btn">Start</button>
            </article>
            <aside className="game__msgs-rigth">
                <button className="restart-btn">Reiniciar Secuencia</button>
                <div className="game__message">
                    <h1 className="time text">00:00</h1>
                </div>
                <div className="game__message">
                    <h1 className="text level-msgs">Level 1</h1>
                </div>
                <img src={RPath + "/lib/img/mic.png"} alt="" />
            </aside>
        </main>
        <div className="msgs">
            <h1 className="message hidden">Your turn</h1>
            <h1 className="message hidden">Done</h1>
        </div>
    </div>
}