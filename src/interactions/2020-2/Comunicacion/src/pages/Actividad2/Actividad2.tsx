import React, { useEffect, useRef, useState } from 'react';
import "./index.scss";

import TSPalabras from './src/index';
import Global from '../../Global';
import ActividadTSLite from '../../../../../../components/Actividad/config/ActividadTSLite';
import Navegador from '../../../../../../componentsTS/Navegacion/config';



const Actividad2 = ({ referencia, global, navegador, actividad }: { referencia: React.MutableRefObject<any>, global: Global, actividad: ActividadTSLite, navegador: Navegador }) => {

    const refTablero = useRef<HTMLDivElement | any>();

    const refSelecciones = useRef<HTMLDivElement | any>();

    var [adminPalabras, setAdminPalabras] = useState<TSPalabras | undefined>(undefined);

    useEffect(() => {

        var refTableroHTML = refTablero.current;
        var refSeleccionesHTML = refSelecciones.current;

        if (refTableroHTML) {
            var palabras = new TSPalabras(refTableroHTML, refSeleccionesHTML, global, navegador);
            setAdminPalabras(palabras);
        }

    }, []);

    return <div className="Palabras" ref={referencia}>

        <div ref={refSelecciones} className="Palabras__seleccion">

        </div>
        <div className="Palabras__container" style={{ backgroundImage: `url("/img/2020-2/comunicacion/img/activity2/fondo.png")` }}>
            <div className="Palabras__tablero">

                <div ref={refTablero} className="Palabras__tablero__contenido">

                </div>

            </div>

            <div className="Palabras__navegacion">
                <div className="Palabras__navegacion__boton" onClick={() => {
                    if (adminPalabras !== undefined) {
                        actividad.addState("Pantalla", "instrucciones3");
                        adminPalabras.onEventContinuar();
                    }
                }}>
                    <p className="Palabras__navegacion__boton__continuar">Continuar</p>
                    <img src="/img/2020-2/comunicacion/img/activity2/icon_triangulo.png" alt="" />
                </div>

            </div>

        </div>


    </div>

}

export default Actividad2;