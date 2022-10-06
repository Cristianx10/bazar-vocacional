import { UserResultCheck } from './index';
import { useEffect, useState } from 'react';
import ResultadosContext from './ResultadosContext';
import { getAllUserPruebas } from './config';
import { CheckBoxListContextProvider, CheckListSelect, CheckBoxListContext } from '../../components/CheckBoxList/index';
import SelectInteracciones from './SelectInteracciones';
import { IPropsState } from '../../components/Context/Context';
import ResultadosFormat from '../../components/ViewResultados/ResultadosFormat';

const ListaPersonas = () => {

    const { useConfigRegistro, useTypes, useTypesCofig, useRegistro } = ResultadosContext();
    const [interaccionesSelect, setInteraccionesSelect] = useConfigRegistro();

    const useRegistros = useState<UserResultCheck[]>([]);
    const [registros, setRegistros] = useRegistros;

    const useRegistrosSelect = useState<UserResultCheck[]>([])
    const [registrosSelect, setRegistrosSelect] = useRegistrosSelect;

    const [types] = useTypes()
    const [typesConfig] = useTypesCofig();



    useEffect(() => {
        setRegistrosSelect(registros.filter((registro) => { if (registro.check) return registro }))
    }, [registros])

    const [isDescargar, setIsDescargar] = useState(false)

    useEffect(() => {

        getAllUserPruebas((registros) => {
            setRegistros(registros);
        })

    }, [])

    const onDescargar = () => {
        ResultadosFormat.generateExcel(registros, interaccionesSelect, types, typesConfig)
    }


    return <div className="Resultados__item">
        {registrosSelect.length > 0 ?
            isDescargar ?
                <div className="Resultados__item__action">
                    <button className="btn btn-secondary" onClick={onDescargar}>Descargar</button>
                    <button className="btn btn-secondary" onClick={() => setIsDescargar(false)}>Cancelar</button>
                </div>
                : <button className="btn btn-primary" onClick={() => setIsDescargar(true)}>Descargar Resultados</button>
            : <></>}


        {isDescargar ?
            <SelectInteracciones useRegistrosSelect={() => useRegistrosSelect} />
            :
            <div>
                <h4>Pruebas seleccionadas: {registrosSelect.length} de {registros.length}</h4>
                <CheckBoxListContextProvider>
                    <CheckListSelect
                        onCheckAll={(status) => {
                            setRegistros(registros.filter((registro, i) => {
                                registro.check = status;
                                return registro;
                            }))
                        }} />
                    <ul className="Resultados__item__list">
                        {registros.map((registro, index) => {
                            return <ListaPersonaItem key={index}
                                registro={registro}
                                useRegistros={() => useRegistros}
                                onChecked={(status) => {
                                    const updateRegistros = registros.filter((registro, i) => {
                                        if (index === i) {
                                            registro.check = status;
                                        }
                                        return registro;
                                    })

                                    setRegistros(updateRegistros)
                                }} />
                        })}
                    </ul>
                </CheckBoxListContextProvider>
            </div>
        }

    </div>

}

const ListaPersonaItem = ({ registro, onChecked, useRegistros }: {

    registro: UserResultCheck,
    onChecked: (status: boolean) => void,
    useRegistros: IPropsState<UserResultCheck[]>
}) => {

    const { useRegistro } = ResultadosContext()

    const { useCheckAll } = CheckBoxListContext.Consumer();

    const [registros, setRegistros] = useRegistros();

    const [checkAll, setCheckAll] = useCheckAll();
    const [check, setCheck] = useState(registro.check)
    const [, setRegistro] = useRegistro();

    useEffect(() => {
        if (checkAll === true) {
            setCheck(true)
        } else if (checkAll === false) {
            setCheck(false)
        }
    }, [checkAll])

    const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheck(e.target.checked)
        onChecked(e.target.checked);
    }

    const fechaInit = new Date(registro.usuario.resultados.fecha.inicio);

    var name = registro.usuario.nombre;
    var carrera = "No encontrada";

    var max = 0;


    registro.usuario.resultados.result.porcentaje.forEach(({ id, value }) => {
        if (value >= max) {
            max = value;
            carrera = id;
        }
    })

    return <li className={"Resultados__item__list__item" + (check ? " select" : "")} >
        <label className="Resultados__item__list__item__label">
            <div className="Resultados__item__list__item__label__check">
                <input onChange={onCheck} checked={check} type="checkbox" />
            </div>
            <div className="Resultados__item__list__item__label__info">
                <p><strong>Nombre:</strong> {name}</p>
                <p><strong>Carrera:</strong> {carrera}</p>
                <p><strong>Fecha:</strong> {fechaInit.toLocaleDateString()} - {fechaInit.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            
            </div>
        </label>
        <div className="Resultados__item__list__item__btns">
            <button className="btn btn-success" onClick={() => setRegistro(registro)}>Ver</button>
        </div>

    </li>
}

export default ListaPersonas;