import "./index.scss";
import React, { useEffect, useState } from "react";
import PreguntasExcel from "../Pregunta/database/preguntas2022-2.json";
import ActividadContext, { ActividadContextProvider } from "../../../components/Interaccion/ActividadContext";
import { ResultadoPuntuacion } from "../../../constants/resultados/types";
import Registro from "../../../constants/resultados/Registro";


const Pregunta = ({ interaccion }: { interaccion?: boolean }) => {
    return <ActividadContextProvider>
        <ActividadLoad interaccion={interaccion} />
    </ActividadContextProvider>
}

const ActividadLoad = ({ interaccion }: { interaccion?: boolean }) => {
    const { getActividad, useNavegador } = ActividadContext();

    const [nav] = useNavegador();

    const actividad = getActividad();

    const [titulo, setTitulo] = useState("Actividad Pregunta");
    const [inicialClick, setInicialClick] = useState(false);
    const [select, setSelect] = useState(1);
    const [opciones, setOpciones] = useState<{
        titular: string;
        resultados: {
            id: string;
            valor: number;
        }[]
    }[]>([{ titular: "1", resultados: [] }, { titular: "2", resultados: [] }, { titular: "3", resultados: [] }]);

    const [rango, setRango] = useState({ min: "Mínimo", max: "Maximo" });
    const [disable, setDisable] = useState(true);

    const onInicialClick = () => {
        if (inicialClick === false) {
            setInicialClick(true);
            setDisable(false);

            const respuesta = opciones[select].titular;
            if (actividad) {
                actividad.addState("respuesta", respuesta)
            }

        }

    }
    const onContinuar = () => {

        var resultados: ResultadoPuntuacion[] = [];
        var resultadosTotal: ResultadoPuntuacion[][] = [];

        opciones.forEach((opcion, index) => {
            var result: ResultadoPuntuacion[] = [];
            opcion.resultados.forEach(({ id, valor }) => {
                const resultado = { id, value: valor }
                result.push(resultado);
            })

            if (select === index) {
                resultados = result;
            }
            resultadosTotal.push(result)
        })

        if (actividad) {
            actividad.addResultMaximo(Registro.calculateMaxPuntuacion(resultadosTotal))
            actividad.addResult(resultados)

            //Continuar actividad
            actividad.finish();
        }


    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var value = parseInt(event.target.value);
        setDisable(false);
        setSelect(value);

        if (actividad) {
            actividad.addState("respuesta", opciones[value].titular)
        }
    }

    const onClick = (value: string) => {
        setDisable(false);
        setSelect(parseInt(value));

        if (actividad) {
            actividad.addState("respuesta", value)
        }
    }



    useEffect(() => {

        if (actividad) {
            console.log("Configuracion ", actividad.config)
            actividad.onGetConfig((config: any) => {


                if (config.id) {

                    var data: {
                        id: string;
                        titular: string;
                        min: string;
                        max: string;
                        opciones: {
                            titular: string;
                            resultados: { id: string, valor: number }[];
                        }[];
                    } | undefined;


                    const ID = config.id;

                    for (let i = 0; i < PreguntasExcel.length; i++) {
                        const pregunta = PreguntasExcel[i];
                        if (ID === pregunta.id) {
                            data = pregunta;
                            i = PreguntasExcel.length;
                        }
                    }



                    if (data) {
                        var min = data.min;
                        var max = data.max;
                        setRango({ min, max });
                        setOpciones(data.opciones);
                        setTitulo(data.titular);

                        actividad.addState("id", data.id)
                        actividad.addState("titular", data.titular)
                    }

                }

            })
        }


    }, [])

    const liker = false;

    return <div className="Pregunta backgroundImage" style={{ backgroundImage: `url(/includes/backgrounds/fondo-principal.png)` }}>
        <div className="Pregunta__container">
            <div className="Pregunta__titular">
                <h1>{titulo}</h1>
            </div>
            <div className="Pregunta__opciones">
                <div className="Pregunta__opciones__minimo">
                    <p>{rango.min}</p>
                </div>
                <div className="Pregunta__opciones__likert">
                    {liker ?
                        <>
                            <div className="Pregunta__opciones__likert__barra">
                                <input onClick={onInicialClick} onChange={onChange} type="range" min="0" max={opciones.length - 1} defaultValue={select} />
                            </div>
                            <div className="Pregunta__opciones__likert__text">
                                {opciones.map((o, i) => {
                                    return <p key={i}>{o.titular}</p>
                                })}
                            </div>
                        </>
                        :
                        <ul className="Pregunta__opciones__likert__items">
                            {opciones.map((o, i) => {
                                return <label className="Pregunta__opciones__likert__items__item">
                                    <input key={i} type="radio" name="opciones" value={o.titular} onClick={() => onClick(o.titular)} />
                                    <p>{o.titular}</p>
                                </label>
                            })}
                        </ul>
                    }


                </div>
                <div className="Pregunta__opciones__maximo">
                    <p>{rango.max}</p>
                </div>
            </div>
            <div className="Pregunta__navegacion">
                <button disabled={disable} onClick={onContinuar}>Continuar</button>
            </div>
        </div>

    </div>
}

export default Pregunta;