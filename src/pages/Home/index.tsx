import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss"
import ListGeneral from '../../constants/simulations/ListGeneral';
import { CARRERAS_NAME, getNamesCarrerasMap } from '../../constants/simulations/types/Carreras';
import IconPlay from '../../constants/icons/IconPlay';

interface IInteraccion {
    UID: string;
    name: string;
    carreras: string[];
    img: string;
    puntuacion?: number;
    fecha?: string;

}

const Home = () => {

    const [interacciones, setInteracciones] = useState<IInteraccion[]>([]);

    const formatCarrera = getNamesCarrerasMap();
    const formatCarreraString = (name: string) => {
        var carrera: string = formatCarrera.get(name);

        var cadena = carrera.toLowerCase().split(' ');
        for (var i = 0; i < cadena.length; i++) {
            cadena[i] = cadena[i].charAt(0).toUpperCase() + cadena[i].substring(1) + " ";
        }
        return cadena;
    }

    useEffect(() => {

        var actividades: IInteraccion[] = []
        ListGeneral.forEach(({ UID, image, title, tags }) => {
            var actividad: IInteraccion = {
                UID, img: image, name: title, carreras: tags
            }
            actividades.push(actividad)
        })

        setInteracciones(actividades)
    }, [])

    return <div className="Home backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal-white.jpg')" }}>
        <Header />
        <div className="Home__container">
            <h2>Carreras que te pueden interesar</h2>
            <ul className="interacciones">
                {interacciones.map(({ UID, name, img, puntuacion, carreras, fecha }) => {
                    return <li className="interacciones__item card backgroundImage" key={UID} style={{ backgroundImage: "url('" + img + "')" }}>
                        <img src={img} className="card-img" alt={name}></img>

                        <div className="card-img-overlay">
                            <IconPlay classname="icon" />
                            <h5 className="card-title">{formatCarreraString(carreras[0])}</h5>
                            <p className="card-text">{puntuacion ? `Mejor Puntaje${puntuacion}` : ""}</p>
                            <p className="card-text"><small>{fecha ? `Ultimo ingreso ${fecha}` : ""}</small></p>
                        </div>


                    </li>
                })}
            </ul>

        </div>
    </div >
}

export default Home;