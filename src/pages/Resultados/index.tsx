import "./index.scss";
import { ResultadosContextProvider } from './ResultadosContext';

import ResultadosContext from './ResultadosContext';
import { useState, useEffect } from 'react';
import { UserResult } from '../../components/ViewResultados/ResultadosFormat';
import { ResultadoPuntuacion } from '../../constants/resultados/types';

import ListaPersonas from './ListaPersonas';
import ListGeneral from '../../constants/simulations/ListGeneral';
import Header from "../../components/Header/Header";

export type UserResultCheck = UserResult & { check: boolean };


const Resultados = () => {
    return <ResultadosContextProvider>
        <ResultadosLoad />
    </ResultadosContextProvider>
}


const ResultadosLoad = () => {

    const { useRegistro } = ResultadosContext();
    const [registro] = useRegistro();

    return <div className="Resultados backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal-white.jpg')" }}>
        <Header />
        {registro === undefined ?
            <ListaPersonas />
            :
            <ResultadoRegistroItem registro={registro} />
        }
    </div>
}


export interface IResultadoInteracciones {
    UIDActivity: string;
    name: string;
    check: boolean;
    img: string;
    props: { key: string, value: string | number | boolean, check: boolean }[]
}


interface IRegistroItemInteraccion {
    key: string;
    title: string;
    resultados: ResultadoPuntuacion[];
    props: { key: string, value: string | number | boolean }[]
    image: string;
}


const ResultadoRegistroItem = ({ registro }: { registro: UserResultCheck }) => {

    const { useRegistro } = ResultadosContext();

    const [, setRegistro] = useRegistro();

    const [name, setName] = useState("Nombre de usuario");

    const [carreras, setCarreras] = useState<{ name: string, resultado: number, maximo: number, porcentaje: number }[]>([])

    const [interacciones, setInteracciones] = useState<IRegistroItemInteraccion[]>([])



    useEffect(() => {

        setName(registro.usuario.nombre);

        var resultadosArray: { name: string, resultado: number, maximo: number, porcentaje: number }[] = [];

        var resultados = new Map<string, { name: string, resultado: number, maximo: number, porcentaje: number }>();

        const userResult = registro.usuario.resultados.result;

        userResult.global.forEach(({ id, value }) => {
            var result = resultados.get(id);
            if (result) {
                resultados.set(id, { ...result, resultado: value });
            } else {
                resultados.set(id, { name: id, resultado: value, maximo: 0, porcentaje: 0 });
            }
        })

        userResult.maximo.forEach(({ id, value }) => {
            var result = resultados.get(id);
            if (result) {
                resultados.set(id, { ...result, maximo: value });
            } else {
                resultados.set(id, { name: id, resultado: 0, maximo: value, porcentaje: 0 });
            }
        })

        userResult.porcentaje.forEach((porcetaje) => {
            const { id } = porcetaje;
            var result = resultados.get(id);
            const value = Math.round(porcetaje.value * 100)
            if (result) {
                resultados.set(id, { ...result, porcentaje: value });
            } else {
                resultados.set(id, { name: id, resultado: 0, maximo: 0, porcentaje: value });
            }
        })

        resultados.forEach(r => {
            resultadosArray.push(r);
        })

        resultadosArray.sort((a, b) => {
            return b.porcentaje - a.porcentaje;
        })

        setCarreras(resultadosArray)

        var interacciones = [] as IRegistroItemInteraccion[];

        registro.interacciones.forEach((dato) => {

            const { UIDActivity, data, UID } = dato;

            const resultados = dato.resultados ? dato.resultados : []

            var props = [] as { key: string, value: string | number | boolean }[];


            if (data.estados) {
                data.estados.forEach(({ key, values }) => {
                    var valueO = values[values.length - 1];
                    var value: string | number | boolean = "#VALOR NULL";
                    if (valueO) {
                        value = valueO.value
                    }
                    props.push({ key, value })
                })

            }


            const interaccion = ListGeneral.get(UIDActivity);
            if (interaccion) {
                const { title, image } = interaccion;

                const datoObj: IRegistroItemInteraccion = {
                    key: UID,
                    title,
                    resultados,
                    props,
                    image
                }

                interacciones.push(datoObj)
            }


        })

        setInteracciones(interacciones)


    }, [])


    return <div className="ResultadosUnity">
        <button className="btn dark" onClick={() => setRegistro(undefined)}>Regresar</button>
        <p><strong>Nombre: </strong>{name}</p>
        <div className="ResultadosUnity__carreras">
            <ul className="ResultadosUnity__carreras__list">
                <li className="ResultadosUnity__carreras__list__item title">
                    <p className="large">Nombre de usuario</p>
                    <p className="small center">Porcentaje</p>
                    <p className="small center">Resultado</p>
                    <p className="small center">Máximo</p>
                </li>
                {carreras.map((carrera, i) => {
                    const { name, maximo, porcentaje, resultado } = carrera;
                    return <li key={i} className="ResultadosUnity__carreras__list__item">
                        <p className="large">{name}</p>
                        <p className="small center">{porcentaje}%</p>
                        <p className="small center">{resultado}</p>
                        <p className="small center">{maximo}</p>
                    </li>
                })}
            </ul>
        </div>
        <div className="ResultadosUnity__interacciones">
            <ol className="ResultadosUnity__interacciones__list">
                {interacciones.map(({ key, title, resultados, props, image }) => {
                    return <li className="ResultadosUnity__interacciones__list__item" key={key}>
                        <div className="ResultadosUnity__interacciones__list__item__info">
                            <p><strong>Nombre:</strong></p>
                            <h4>{title}</h4>
                            <img src={image} alt="" />
                        </div>

                        <div className="ResultadosUnity__interacciones__list__item__result">
                            <div className="resultados">
                                <h3>Resultados:</h3>
                                <ul>
                                    {resultados.map(resultado => {
                                        const { id, value } = resultado;
                                        return <li key={id}><strong>{id} : {value}</strong></li>
                                    })}
                                </ul>
                            </div>
                            <div className="propiedades">
                                <h3>Propiedades:</h3>
                                <ul>
                                    {props.map(prop => {
                                        const { key, value } = prop;
                                        return <li key={key}><strong>{key} : {value}</strong></li>
                                    })}
                                </ul>
                            </div>

                        </div>


                    </li>
                })}
            </ol>

        </div>
    </div>
}
export default Resultados;
