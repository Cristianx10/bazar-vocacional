import React, { useEffect } from 'react';
import ActividadContext from '../../../../components/Interaccion/ActividadContext';

const Inicio = () => {

    const { getActividad, useNavegador } = ActividadContext();
    const actividad = getActividad();
    const [navegador] = useNavegador();

    useEffect(() => {
        if (actividad)
            actividad.addState("pantalla", "inicio");
    }, []);

    return <div className="PagePsicologia PageInicio">
        <div className="inicio" style={{ backgroundImage: `url("/img/2020-2/psicologia-expresiones/fondoInicio.jpg")` }}>
            <div className="inicio__cont">
                <h1 className="inicio__t">MICROEXPRESIONES</h1>
                <p className="inicio__p">Una microexpresión es una momentánea e involuntaria expresión facial presentada en el rostro de las personas de acuerdo con las emociones que estas sienten. Suelen ocurrir en situaciones con un alto riesgo, donde la persona tiene mucho que ganar o perder. A diferencia de las expresiones faciales comunes es muy difícil esconder las microexpresiones.</p>
                <a onClick={
                    () => navegador.goName("info")
                } className="button__t"><button className="button">Continuar</button></a>
            </div>
        </div>
    </div >
}

export default Inicio;
