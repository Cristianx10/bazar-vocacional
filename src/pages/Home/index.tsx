import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss"
import ListGeneral from '../../constants/simulations/ListGeneral';
import { CARRERAS_NAME, getNamesCarrerasMap } from '../../constants/simulations/types/Carreras';
import IconPlay from '../../constants/icons/IconPlay';
import ModuloCarrerasInteracciones from '../../components/ModuloCarrerasInteracciones/index';
import { IInteraccion } from '../../components/ModuloCarrerasInteracciones/index';
import UserFirebase from '../../constants/firebase/user/index';
import ChooseCarreras from "../ChooseCarreras";
import AppContext from '../../components/App/AppContext';
import { useNavigate } from 'react-router';
import LINK from '../../components/Router/Routes';

const Home = () => {

    const [page, setPage] = useState<"HOME" | "CHOOSE" | "">("")

    useEffect(() => {
        const usuario = UserFirebase.usuario;
        if (usuario) {
            if (usuario.preferencias.length === 0) {
                setPage("CHOOSE")
            } else {
                setPage("HOME")
            }
        }
    }, [])


    return page === "" ? <></> :
        page === "CHOOSE" ? <ChooseCarreras setPage={setPage} /> :
            page === "HOME" ? <PageHome /> : <></>
}


const PageHome = () => {

    const { useInteraccion } = AppContext();
    const [, setInteaccion] = useInteraccion();
    const nav = useNavigate()

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

        const usuario = UserFirebase.usuario;
        if (usuario) {

            ListGeneral.forEach(({ UID, image, title, tags }) => {
                let encontro = false;
                usuario.preferencias.forEach((p) => {
                    tags.forEach(t => {
                        if (p === t) {
                            encontro = true;
                        }
                    })
                })
                if (encontro) {
                    var actividad: IInteraccion = {
                        UID, img: image, name: title, carreras: tags
                    }
                    actividades.push(actividad)
                }
            })
        }


        setInteracciones(actividades)
    }, [])

    const onOpen = (UID: string) => {
        const interaccion = ListGeneral.get(UID);
        if (interaccion) {
            setInteaccion(interaccion)
            nav(LINK.INTERACCION);
        }
    }


    return <div className="Home backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal-white.jpg')" }}>
        <Header />
        <div className="Home__container">
            <div className="Home__title">
                <span></span>
                <h2>Tus Carreras Preferidas</h2>
            </div>
            {interacciones.length === 0 ?
                <div>
                    <hr />
                    <h3 style={{ textAlign: "center" }}>No encontramos interacciones afines a tus preferencias</h3>
                    <hr />
                </div>
                :
                <ul className="interacciones">
                    {interacciones.map(({ UID, name, img, puntuacion, carreras, fecha }) => {
                        return <li onClick={() => onOpen(UID)} className="interacciones__item card backgroundImage" key={UID} style={{ backgroundImage: "url('" + img + "')" }}>
                            <img src={img} className="card-img" alt={name}></img>

                            <div className="card-img-overlay">
                                <IconPlay classname="icon" />
                                <h5 className="card-title">{formatCarreraString(carreras[0])}</h5>
                                <p className="card-text">{puntuacion ? `Mejor Puntaje${puntuacion}` : ""}</p>
                                <p className="card-text"><small>{fecha ? `Ultimo ingreso ${fecha}` : ""}</small></p>
                            </div>


                        </li>
                    })}
                </ul>}


            <ModuloCarrerasInteracciones />

        </div>
    </div >
}

export default Home;