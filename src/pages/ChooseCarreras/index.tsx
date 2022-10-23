import "./index.scss";
import { CARRERAS_NAME } from '../../constants/simulations/types/Carreras';
import { useEffect, useState, useRef } from 'react';
import UserFirebase from '../../constants/firebase/user/index';
import { IUserInformation } from '../../constants/firebase/user/Usuario';


const ChooseCarreras = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"" | "HOME" | "CHOOSE">> }) => {

    const refList = useRef<any>()
    const [carreras, setCarreras] = useState<{ id: string, value: string }[]>([])
    const [selectCarreras, setSelectCarreras] = useState<string[]>([]);

    useEffect(() => {

        var arrayCarreras: { id: string, value: string }[] = [];
        Object.entries(CARRERAS_NAME).forEach((c) => {
            arrayCarreras.push({ id: c[0], value: c[1] })
        });
        setCarreras(arrayCarreras)

    }, [])

    const getCarreras = () => {
        const HTMLList = refList.current as HTMLUListElement;
        const inputs = HTMLList.querySelectorAll("input") as NodeListOf<HTMLInputElement>;
        var selects = [] as string[];
        inputs.forEach((i) => {
            if (i.checked === true) {
                selects.push(i.value);
            }
        })
        return selects;
    }

    const onContinuar = () => {
        const usuario = UserFirebase.usuario;
        if (usuario) {
         
            usuario.setPreferencias([...usuario.getPreferencias(), ...selectCarreras], () => {
                setPage("HOME")
            })


        }
    }


    return <div className="ChooseCarreras backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal.png')" }}>
        <div className="ChooseCarreras__container">
            <h1 className="title">Escoge tus 3 carreras preferidas</h1>
            <div className="ChooseCarreras__container__lista">
                <ul className="seleccion" ref={refList}>
                    {carreras.map((c) => {
                        return <li className="seleccion__item" onClick={() => {
                            setSelectCarreras(getCarreras())
                        }}>
                            <label className="btn">
                                <input type="checkbox" required className="btn-check" name="carrera" id="danger-outlined" value={c.id} />
                                <p className="label">{c.value}</p>
                            </label>
                        </li>
                    })}
                </ul>
                <h1>No. {selectCarreras.length}</h1>
                <button onClick={onContinuar} type="button" className="btn btn-primary" disabled={selectCarreras.length < 3 || selectCarreras.length > 3}>Continuar</button>
            </div>

        </div>
    </div>
}

export default ChooseCarreras;