import React, { useMemo } from "react";
import { useState } from "react";
import createContext, { IPropsState } from "../Context/Context";
import InteractionStructure from '../../constants/simulations/types/InteractionStructure';

interface IStyle {
    header: {
        type: "VISIBLE" | "OCULTO"
    }
}

interface ILoginProp {
    isLogin: boolean,
    role: "LOCAL" | "ADMINISTRADOR" | "EDITOR" | "VISOR" | "";
}

interface IPropsContext {
    useLogin: IPropsState<ILoginProp>;
    useStyle: IPropsState<IStyle>;
    usePreload: IPropsState<"Loading" | "Complete">;
    useInteraccion: IPropsState<InteractionStructure | undefined>;
}

const { Provider, Consumer } = createContext<IPropsContext>();

export const AppContextProvider = (props: any) => {

    const usePreload = useState<"Loading" | "Complete">("Loading");
    const [preload] = usePreload;

    const useStyle = useState<IStyle>({ header: { type: "VISIBLE" } });
    const [style] = useStyle;

    const useLogin = useState<ILoginProp>({ isLogin: false, role: "" });
    const [login, setLogin] = useLogin;


    const useInteraccion = useState<InteractionStructure | undefined>(undefined);
    const [interaccion] = useInteraccion;


    const value = useMemo(() => {

        return {
            useLogin: () => useLogin,
            usePreload: () => usePreload,
            useStyle: () => useStyle,
            useInteraccion: () => useInteraccion
        }

    }, [
        style,
        preload,
        login,
        interaccion
    ])

    return <Provider value={value} {...props} />
}

const AppContext = Consumer;

export default AppContext;