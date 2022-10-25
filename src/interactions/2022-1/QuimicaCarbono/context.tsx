

import { useMemo, useState } from "react";

import createContext, { IPropsState } from '../../../components/Context/Context';


interface IPropsContext {
    usePage: IPropsState<(value: string | number) => void>
}

const QuimicaContext = createContext<IPropsContext>();

export const QuimicaContextProvider = (props: any) => {

    const usePage = useState<(value: string | number) => void>(() => { });
    const [page] = usePage;

    const value = useMemo(() => {
        return {
            usePage: () => usePage
        }
    }, [page])
    return <QuimicaContext.Provider value={value} {...props} />
}


export default QuimicaContext;