import React, { useMemo, useState, useEffect, useRef } from "react";
import createContext, { IPropsState } from '../Context/Context';
import { isInteractionContext } from './InteractionContext';
import InteractionContext from './InteractionContext';
import Navegador from '../../componentsTS/Navegacion/config/index';
import ActividadTSLite from '../Actividad/config/ActividadTSLite';

interface IPropsContext {
    useJSX: IPropsState<JSX.Element>
    useNavegador: IPropsState<Navegador>
    getActividad: () => ActividadTSLite | undefined;
    refContainer: React.MutableRefObject<any>;
}

const { Provider, Consumer, useCondicional } = createContext<IPropsContext>();

export const ActividadContextProvider = (props: any) => {


    const useClassName = useState<string | undefined>(undefined)
    const [className] = useClassName;

    const useJSX = useState(<></>)
    const refContainer = useRef<HTMLElement | any>()

    const [JSX, setJSX] = useJSX;

    const useNavegador = useState(new Navegador());
    const [navegador] = useNavegador;

    const [iniciado, setIniciado] = useState<boolean | undefined>(undefined);

    const InteractionContextExist = isInteractionContext();
    const observer = InteractionContextExist ? InteractionContext().useActivity()[0] : undefined;

    const getActividad = () => {
        return observer !== undefined ? observer.actividad : undefined;
    }
 
    useEffect(() => {
        const HTMLContainer = refContainer.current;

        if (HTMLContainer !== undefined) {
            navegador.setContainer(HTMLContainer)
        }

        navegador.initJSX(setJSX)

        setIniciado(false);


        const onResize = () => {
            navegador.observerScale();
        }

        window.addEventListener("resize", onResize);

        onResize(); 

        return () => {
            window.removeEventListener("resize", onResize);
            navegador.onDestroy();
        }

    }, [])

    useEffect(() => {

        if (iniciado === false) {
            setIniciado(true);
            navegador.config.init(navegador.nameInitDefaul);

            if (observer) {
                observer.getActivity().init(()=>{}, "INTERNA");
            }

        }

    }, [iniciado])


    const value = useMemo(() => {

        return {
            getActividad,
            useNavegador: () => useNavegador,
            useJSX: () => useJSX,
            refContainer,
            useClassName: () => useClassName
        }

    }, [
        JSX
    ])

    return <Provider value={value}>
        <div className={className} ref={refContainer}>
            {iniciado === undefined ? <></> : <>
                {Array.isArray(props.children) ? props.children.map((c: any) => { return c }) : props.children}
                {JSX}
            </>}
        </div>
    </Provider>
}

const ActividadContext = Consumer;
export const ExistActividadContext = useCondicional;

export default ActividadContext;