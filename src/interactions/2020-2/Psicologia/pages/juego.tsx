import React, { useEffect } from 'react';

import MainLoad from '../scripts/Main';
import ActividadContext from '../../../../components/Interaccion/ActividadContext';


const Juego = () => {
    const { getActividad } = ActividadContext();
    const actividad = getActividad();

    useEffect(() => {
        console.log("Juego cargado")
        if (actividad) {

            actividad.addState("pantalla", "juego");
            MainLoad(actividad);
        }
    }, []);

    return <div className="PagePsicologia PageJuego" >
        <div className="juego">
            <section className="juego__fondo">
                <article className="juego__contenedor">
                    <h2 className="juego__contador">1/28</h2>
                    <img src="/img/2020-2/psicologia-expresiones/Neutral1.webp" alt="" className="juego__imagen" />
                </article>
                <article className="juego__selec">
                    <img src="/img/2020-2/psicologia-expresiones/Felicidad.png" alt="felicidad" className="juego__btn" />
                    <img src="/img/2020-2/psicologia-expresiones/Ira.png" alt="ira" className="juego__btn" />
                    <img src="/img/2020-2/psicologia-expresiones/Sorpresa.png" alt="sorpresa" className="juego__btn" />
                    <img src="/img/2020-2/psicologia-expresiones/Asco.png" alt="asco" className="juego__btn" />
                    <img src="/img/2020-2/psicologia-expresiones/Tristeza.png" alt="tristeza" className="juego__btn" />
                    <img src="/img/2020-2/psicologia-expresiones/Miedo.png" alt="miedo" className="juego__btn" />
                    <img src="/img/2020-2/psicologia-expresiones/Desprecio.png" alt="desprecio" className="juego__btn" />
                    <img src="/img/2020-2/psicologia-expresiones/NoSe.png" alt="no" className="juego__btn" />
                </article>
            </section>
        </div>

        <div className="resul">
            <div className="resul__cont">
                <h2 className="resul__t1">Resultados</h2>
                <h3 className="resul__t3"></h3>

                <a onClick={() => {
                    if (actividad) {

                        console.log("FINALIZADO")
                        actividad.finish();
                    }
                }} className="button__t"><button className="button">Finalizar</button></a>
            </div>

        </div>
    </div>
}

export default Juego;
