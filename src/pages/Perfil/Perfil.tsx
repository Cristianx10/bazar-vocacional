import "./Perfil.scss";
import Header from '../../components/Header/Header';
import ModuloCarrerasInteracciones from '../../components/ModuloCarrerasInteracciones/index';
import { useState, useEffect } from 'react';
import { ResultadoPuntuacion, ResultadoInteractionSimple } from '../../constants/resultados/types';
import UserFirebase from '../../constants/firebase/user/index';
import RadioGraph from '../../components/RadioGraph/index';
import { formatCarreraString } from '../../constants/simulations/types/Carreras';
import ListGeneral from '../../constants/simulations/ListGeneral';


const Perfil = () => {

    const [puntajes, setPuntajes] = useState<{ global: ResultadoPuntuacion, maximo: ResultadoPuntuacion, porcentaje: ResultadoPuntuacion }[]>([]);

    const [interacciones, setInteracciones] = useState<ResultadoInteractionSimple[][]>([]);
    useEffect(() => {
        const usuario = UserFirebase.usuario;
        if (usuario) {
            setPuntajes(usuario.getOrdenCarreras());

            usuario.getAllInteracciones(() => {
                const actividades = usuario.getOrdenInteracciones()
          //      console.log(actividades)
                setInteracciones(actividades)
            })

        }
    }, [])

    const firstInteraccion = interacciones.length > 0 && interacciones[0].length > 0 ? interacciones[0][0] : undefined;
    const getInfoFirstInteraccion = firstInteraccion ? ListGeneral.get(firstInteraccion.UIDActivity) : undefined;

    return <div className="Perfil backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal-white.jpg')" }}>
        <Header />



        <div className="Perfil__container">

            <br />


            <div className="Perfil__title">
                <span></span>
                <h2>Tu Carrera Ideal</h2>
            </div>

            <br />
            <br />

            {firstInteraccion && getInfoFirstInteraccion && firstInteraccion.resultados[0] ? <>
                <div className="Perfil__table container backgroundImage" style={{ backgroundImage: "url('" + getInfoFirstInteraccion.image + "')" }}>
                    <div className="Perfil__table__container">
                        <h2 className="Perfil__table__container__title">{formatCarreraString(firstInteraccion.resultados[0].id)}</h2>
                        <ul className="Perfil__table__container__lista">
                            <li className="Perfil__table__container__lista__item"><strong>Puntaje:</strong> {firstInteraccion.resultados[0].value}</li>
                            <li className="Perfil__table__container__lista__item"><strong>Ultima partida:</strong> {(new Date(firstInteraccion.fecha.fin).toLocaleDateString())}</li>
                            <li className="Perfil__table__container__lista__item"><strong>Tiempo:</strong> {(new Date(firstInteraccion.fecha.fin - firstInteraccion.fecha.inicio).getTime() / 600).toFixed(2)}s</li>
                        </ul>
                    </div>

                </div>
            </> : <></>}

            <br />
            <br />

            <div className="Perfil__title">
                <span></span>
                <h2>Tus Estadísticas</h2>
            </div>

            <br />
            <br />

            <div className="Perfil__puntajes container">
                <h2 className="Perfil__puntajes__title">Puntajes</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Carrera</th>
                            <th scope="col">N° Intentos</th>
                            <th scope="col">Primer Puntaje</th>
                            <th scope="col">Puntaje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interacciones.map((actividades, index) => {
                            var fisrtActividad = actividades[0];
                            var firstCarrera = fisrtActividad.resultados.length > 0 ? formatCarreraString(fisrtActividad.resultados[0].id) : "No encontrada";
                            var firstPuntaje = fisrtActividad.resultados.length > 0 ? fisrtActividad.resultados[0].value : 0;

                            var totalPuntaje = 0;
                            actividades.forEach(a => {
                                a.resultados.forEach((r) => {
                                    if (fisrtActividad.resultados.length > 0 && r.id === fisrtActividad.resultados[0].id) {
                                        totalPuntaje += r.value;
                                    }
                                })
                            })

                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{firstCarrera}</td>
                                <td>{actividades.length}</td>
                                <td>{firstPuntaje}</td>
                                <td>{totalPuntaje}</td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>

            <br />
            <br />

            <div className="Perfil__puntajes container">
                <h2 className="Perfil__puntajes__title">Fidelidad</h2>
                <ul className="Perfil__puntajes__lista">
                    {puntajes.map((puntaje) => {
                        return <li key={puntaje.porcentaje.id} className="Perfil__puntajes__lista__item">
                            <RadioGraph value={puntaje.porcentaje.value} name={formatCarreraString(puntaje.porcentaje.id)} />
                        </li>
                    })}

                </ul>
            </div>

            <br />
            <br />

            <ModuloCarrerasInteracciones />

            <br />
            <br />

        </div>
    </div>
}

export default Perfil;