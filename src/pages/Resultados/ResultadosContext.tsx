import React, { useMemo } from "react";
import { useState } from "react";

import ActividadTS from "../../components/Actividad/config/ActividadTS";


import { IResultadoInteracciones, UserResultCheck } from './index';

import createContext, { IPropsState } from '../../components/Context/Context';
import { UserResult } from '../../components/ViewResultados/ResultadosFormat';


interface IPropsContext {

    useRegistro: IPropsState<UserResultCheck | undefined>;
    useConfigRegistro: IPropsState<IResultadoInteracciones[]>;
    useTypes: IPropsState<{
        key: "GENERAL" | "ESPECIFICAS" | "PROPIEDADES";
        value: boolean;
    }[]>;
    useTypesCofig: IPropsState<{
        LAST: boolean;
        LASTTIME: boolean;
        TIME: "SEGUNDOS" | "MINUTOS" | "MILISEGUNDOS";
    }>
}

const { Provider, Consumer, useCondicional } = createContext<IPropsContext>();

export const ResultadosContextProvider = (props: any) => {


    const useRegistro = useState<UserResult | undefined>(undefined);
    const [registro, setRegistro] = useRegistro;

    const useConfigRegistro = useState<IResultadoInteracciones[]>([])
    const [interaccionesSelect, setInteraccionesSelect] = useConfigRegistro;


    const useTypes = useState<{
        key: "GENERAL" | "ESPECIFICAS" | "PROPIEDADES";
        value: boolean;
    }[]>([
        { key: "GENERAL", value: false },
        { key: "ESPECIFICAS", value: false },
        { key: "PROPIEDADES", value: false }
    ])
    const [types, setTypes] = useTypes;

    const useTypesCofig = useState<{ LAST: boolean, LASTTIME: boolean, TIME: "SEGUNDOS" | "MINUTOS" | "MILISEGUNDOS" }>({
        LAST: true,
        LASTTIME: false,
        TIME: "SEGUNDOS"
    })
    const [typesConfig] = useTypesCofig;

    const value = useMemo(() => {

        return {
            useRegistro: () => useRegistro,
            useTypesCofig: () => useTypesCofig,
            useTypes: () => useTypes,
            useConfigRegistro: () => useConfigRegistro
        }

    }, [test, interaccionesSelect, types, typesConfig, registro])

    return <Provider value={value} {...props} />
}

const ResultadosContext = Consumer;

export const ResultadosContextExist = useCondicional;

export default ResultadosContext;