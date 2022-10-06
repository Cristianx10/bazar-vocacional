import { useEffect, useMemo, useState } from "react";
import createContext, { IPropsState } from "../Context/Context";

export const CheckBoxListContext = createContext<{
    useCheckAll: IPropsState<boolean | undefined>
}>()

export const CheckBoxListContextProvider = (props: any) => {
    const useCheckAll = useState<boolean | undefined>(undefined);
    const [checkAll, setCheckAll] = useCheckAll;
    const value = useMemo(() => {
        return {
            useCheckAll: () => useCheckAll
        }
    }, [checkAll])
    return <CheckBoxListContext.Provider value={value} {...props} />
}

const CheckBoxList = ({ title, onChecked, img, value, checking }: { checking: boolean, title: string, onChecked: (status: boolean) => void, img?: string, value?: number | string | boolean }) => {

    const { useCheckAll } = CheckBoxListContext.Consumer();
    const [checkAll, setCheckAll] = useCheckAll();
    const [check, setCheck] = useState(checking ? checking : false)

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

    return <label className="Resultados__checkbox">
        <input type="checkbox" defaultChecked={check} checked={check} onChange={onCheck} />
        {img ? <img src={img} alt="" /> : <></>}

        {value !== undefined ? <p><strong>{title} :</strong> {value}</p> : <h3>{title}</h3>}

    </label>
}

export const CheckListSelect = ({ onCheckAll }: { onCheckAll: (status: boolean) => void }) => {
    const { useCheckAll } = CheckBoxListContext.Consumer();
    const [checkAll, setCheckAll] = useCheckAll();

    const onCheck = (status: boolean) => {
        setCheckAll(status)
        onCheckAll(status)
    }
    return <div className="CheckListSelect">
        <button className="btn btn-info"
            onClick={() => onCheck(true)}
        >Seleccionar todas</button>
        <button className="btn btn-secondary"
            onClick={() => onCheck(false)}
        >Deseleccionar todas</button>
    </div>
}

export default CheckBoxList