import React, { ComponentProps, useMemo, } from "react";
import { useState } from "react";

import ActividadTS from '../Actividad/config/ActividadTS';
import createContext, { IPropsState } from '../Context/Context';
import InteractionStructure from '../../constants/simulations/types/InteractionStructure';

interface IPropsContext {
    useActivity: IPropsState<ActividadTS>;
}

const { Provider, Consumer, useCondicional } = createContext<IPropsContext>();

export const InteractionContextProvider = (props: { interaccion: InteractionStructure } & ComponentProps<any>) => {
    const { interaccion } = props;

    const useActivity = useState(new ActividadTS(interaccion));
    const [activity] = useActivity;

    const value = useMemo(() => {

        return {
            useActivity: () => useActivity,
        }

    }, [
        activity
    ]) as any;

    return <Provider value={value} {...props} />
}

const InteractionContext = Consumer;

export const isInteractionContext = useCondicional;

export default InteractionContext;