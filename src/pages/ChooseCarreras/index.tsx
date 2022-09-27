import "./index.scss";
import { CARRERAS_NAME } from '../../constants/simulations/types/Carreras';
import { useEffect, useState } from 'react';

const ChooseCarreras = () => {

    const [carreras, setCarreras] = useState<string[]>([])

    useEffect(() => {

        const arrayCarreras = Object.values(CARRERAS_NAME);
        setCarreras(arrayCarreras)

    }, [])


    return <div className="ChooseCarreras backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal.png')" }}>
        <div className="ChooseCarreras__container">
            <h1 className="title">Escoge tus 3 carreras preferidas</h1>
            <div className="ChooseCarreras__container__lista">
                <ul className="seleccion">
                    {carreras.map((c) => {
                        return <li className="seleccion__item">
                            <label className="btn">
                                <input type="checkbox" required className="btn-check" name="carrera" id="danger-outlined" value="Hombre" />
                                <p className="label">{c}</p>
                            </label>
                        </li>
                    })}
                </ul>
                <button type="button" className="btn btn-primary">Continuar</button>
            </div>

        </div>
    </div>
}

export default ChooseCarreras;