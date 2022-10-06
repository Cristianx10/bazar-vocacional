import { useEffect, useState } from "react";
import { UserResultCheck } from './index';
import ResultadosContext from './ResultadosContext';
import { IPropsState } from '../../components/Context/Context';
import { CheckBoxListContextProvider, CheckListSelect } from '../../components/CheckBoxList/index';
import CheckBoxList from '../../components/CheckBoxList/index';
import { IResultadoInteracciones } from '../../components/ViewResultados/ResultadosFormat';
import { IRegistroLoad } from '../../constants/resultados/Registro';
import ListGeneral from '../../constants/simulations/ListGeneral';


const SelectInteracciones = ({ useRegistrosSelect }: { useRegistrosSelect: IPropsState<UserResultCheck[]> }) => {

    const [registrosSelect, setRegistrosSelect] = useRegistrosSelect();

    const useRegistros = useState<UserResultCheck[]>([]);
    const [registros, setRegistros] = useRegistros;

    useEffect(()=>{

    }, [])

    return <div>
        <h2>Total de las pruebas: {registrosSelect.length}</h2>
        {registrosSelect.length > 0 ? <ResultadosItemDescarga registros={registrosSelect} /> : <h1>Aun no se han realizado pruebas</h1>}
    </div>
}

export default SelectInteracciones;



const ResultadosItemDescarga = ({ registros }: { registros: UserResultCheck[] }) => {

    const model = registros[0];

    const { useConfigRegistro, useTypes, useTypesCofig } = ResultadosContext();
    const [interaccionesSelect, setInteraccionesSelect] = useConfigRegistro();

    const useInteracciones = useState<IResultadoInteracciones[]>([])
    const [interacciones, setInteracciones] = useInteracciones;

    const [types, setTypes] = useTypes();

    const [typesConfig, setTypesConfig] = useTypesCofig()


    useEffect(() => {
        setInteraccionesSelect(interacciones.filter((interaccion) => {
            if (interaccion.check) return interaccion
        }))

    }, [interacciones])

    useEffect(() => {

        var interaccionesVal = [] as IResultadoInteracciones[];
        var interaccionesMap = new Map<string, IResultadoInteracciones>();



        model.interacciones.forEach((dato) => {
            const UIDActivity = dato.UIDActivity;

            var interaccion = interaccionesMap.get(UIDActivity);

            if (interaccion === undefined) {
                const interacionPrueba = ListGeneral.get(UIDActivity);
                if (interacionPrueba) {
                    const { title, image } = interacionPrueba;

                    var props = [] as { key: string, value: string | number | boolean, check: boolean }[];

                    dato.data.estados.forEach(({ key, values }) => {
                        var valueO = values[values.length - 1];
                        var value: string | number | boolean = "#VALOR NULL";
                        if (valueO) {
                            value = valueO.value
                        }
                        props.push({ key, value, check: false })
                    })

                    const interaccionMap: IResultadoInteracciones = {
                        UIDActivity,
                        name: title,
                        check: false,
                        img: image,
                        props
                    }
                    interaccionesMap.set(UIDActivity, interaccionMap)
                }
            }
        })



        interaccionesMap.forEach((value, key) => {
            interaccionesVal.push(value)
        })

        console.log("interaccionesMap", interaccionesMap, interaccionesVal)

        setInteracciones(interaccionesVal)
    }, [])

    return <div className="Resultados__test__descarga">

        <div className="Resultados__test__descarga__container">


            <div className="Resultados__test__descarga__container__opciones">

                <h4>Profundidad de resultados</h4 >
                <CheckBoxListContextProvider>
                    <ul className="Resultados__test__descarga__container__opciones__tipo">
                        {types.map((t, i) => {
                            return <li key={i}>
                                <CheckBoxList checking={t.value} title={t.key} onChecked={(status) => {
                                    setTypes(types.filter((t, j) => { if (i === j) { t.value = status } return t }))
                                }} />
                            </li>
                        })}
                    </ul>
                    {types[2] && types[2].value ?
                        <ul className="Resultados__test__descarga__container__opciones__config">
                            <div className="laststate">
                                <h4>Estados de las propiedades:</h4>
                                <CheckBoxList checking={typesConfig.LAST} title="Ultimo estado" onChecked={(status) => setTypesConfig({ ...typesConfig, LAST: status })} />
                                <CheckBoxList checking={typesConfig.LASTTIME} title="Ultimo tiempo" onChecked={(status) => setTypesConfig({ ...typesConfig, LASTTIME: status })} />
                            </div>
                            <div className="modos">
                                <h4>Modo de tiempo de las propiedades:</h4>
                                <ul className="modos__list">
                                    <label className="modos__list__item" onClick={() => setTypesConfig({ ...typesConfig, TIME: "MILISEGUNDOS" })}>
                                        <input checked={typesConfig.TIME === "MILISEGUNDOS"} name="TIME" type="radio" />
                                        <p>Milisegundos</p>
                                    </label>
                                    <label className="modos__list__item" onClick={() => setTypesConfig({ ...typesConfig, TIME: "SEGUNDOS" })}>
                                        <input checked={typesConfig.TIME === "SEGUNDOS"} name="TIME" type="radio" />
                                        <p>Segundos</p>
                                    </label>
                                    <label className="modos__list__item" onClick={() => setTypesConfig({ ...typesConfig, TIME: "MINUTOS" })}>
                                        <input checked={typesConfig.TIME === "MINUTOS"} name="TIME" type="radio" />
                                        <p>Minutos</p>
                                    </label>
                                </ul>

                            </div>


                        </ul>
                        : <></>
                    }


                </CheckBoxListContextProvider>
            </div>
            <div className="Resultados__test__descarga__container__select">
                <h4>Tipo de prueba: {interacciones.length}</h4 >
                <CheckBoxListContextProvider>
                    <ul className="Resultados__test__descarga__container__opciones__pruebas">

                        {interacciones.map((interaccion, index) => {
                            const { UIDActivity, name, img, check } = interaccion;

                            return <li className="Resultados__test__descarga__container__opciones__pruebas__item" key={UIDActivity}>
                                <CheckBoxList checking={check} img={img} title={name}
                                    onChecked={(status) => {
                                        const updateInteractions = interacciones.filter((interaccion, i) => {
                                            if (index === i) {
                                                interaccion.check = status;
                                            }
                                            return interaccion;
                                        })

                                        setInteracciones(updateInteractions)
                                    }} />

                            </li>
                        })}
                    </ul>
                    <CheckListSelect onCheckAll={(status) => {
                        setInteracciones(interacciones.filter((interaccion, i) => {
                            interaccion.check = status;
                            return interaccion;
                        }))
                    }} />
                </CheckBoxListContextProvider>
            </div>
            <div className="Resultados__test__descarga__container__pruebas">
                <h4>Pruebas seleccionadas</h4>
                {interaccionesSelect.length > 0 ?
                    <ul className="Resultados__test__descarga__container__pruebas__list">
                        {interaccionesSelect.map(interaccion => {
                            return <ResultadosItemDescargaItem key={interaccion.UIDActivity} interaccion={interaccion} useInteracciones={() => useInteracciones} />
                        })}

                    </ul>
                    :
                    <h3>Selecciona las pruebas para obtener sus resultados</h3>}

            </div>


        </div>


    </div>
}

const ResultadosItemDescargaItem = ({ interaccion, useInteracciones }: { interaccion: IResultadoInteracciones, useInteracciones: IPropsState<IResultadoInteracciones[]> }) => {

    const { useTypes } = ResultadosContext();
    const [types] = useTypes()

    const [interacciones, setInteracciones] = useInteracciones();
    const { name, props, img } = interaccion;
    return <li className="Resultados__test__descarga__container__pruebas__list__item">
        <div className="header">
            <img className="img" src={img} />
            <h2>{name}</h2>
        </div>
        {types[2] && types[2].key === "PROPIEDADES" && types[2].value === true && props.length > 0 ?
            <CheckBoxListContextProvider>
                <ul className="lista">
                    {props.map((p, index) => {
                        return <CheckBoxList key={index} checking={p.check} title={p.key} value={p.value} onChecked={(status) => {
                            setInteracciones(interacciones.filter((interaction, i) => {
                                if (interaction.UIDActivity === interaccion.UIDActivity) {
                                    interaction.props = interaction.props.filter((prop, j) => {
                                        if (j === index) {
                                            prop.check = status;
                                        }
                                        return prop
                                    });
                                }
                                return interaction;
                            }))
                        }} />
                    })}
                </ul>
                <CheckListSelect onCheckAll={(status) => {
                    setInteracciones(interacciones.filter(interaction => {
                        if (interaction.UIDActivity === interaccion.UIDActivity) {
                            interaction.props = interaction.props.filter((prop, j) => {
                                prop.check = status;
                                return prop
                            });
                        }
                        return interaction;
                    }))
                }} />
            </CheckBoxListContextProvider>
            : <></>}

    </li>
}
