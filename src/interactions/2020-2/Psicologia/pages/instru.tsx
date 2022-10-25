import React, { useEffect } from 'react';
import ActividadContext from '../../../../components/Interaccion/ActividadContext';



const Instrucciones = () => {

    const { getActividad, useNavegador } = ActividadContext();
    const actividad = getActividad();
    const [navegador] = useNavegador();

    useEffect(() => {
        if (actividad)
            actividad.addState("pantalla", "instrucciones");
    }, []);

    return <div className="PagePsicologia PageInstrucciones">
        <div className="instru">
            <div className="instru__cont">
                <img src="/img/2020-2/psicologia-expresiones/fotoInstrucciones.jpg" alt="" className="instru__foto" />
                <div className="instru__info">
                    <h3 className="instru__t2">INSTRUCCIONES</h3>
                    <h1 className="instru__t">MICROEXPRESIONES</h1>
                    <p className="instru__p">1. En la pantalla de juego aparecerá la foto de una persona con expresión neutral
                        <br />
                        2. La expresión de la persona cambiará durante <strong>MENOS DE UN SEGUNDO</strong> para mostrar una de las microexpresiones
                        <br />
                        3. Con los botones de la derecha selecciona la microexpresión que acabas de ver
                        <br />
                        <br />
                        NOTA: Tienes que ser rápido porque cada 7 niveles se disminuirá el tiempo que
                        aparece la microexpresión.</p>
                    <br />
                    <br />
                    <a onClick={() => {
                        
                        navegador.goName("juego")
                    }} className="button__t"><button className="button">Iniciar</button></a>
                </div>

            </div>
        </div>
    </div>
}

export default Instrucciones;