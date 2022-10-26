import "./index.scss";
import { Categorias } from '../../constants/simulations/ListGeneral';
import UserFirebase from '../../constants/firebase/user/index';
import LINK from '../Router/Routes';
import { useNavigate } from "react-router";
import { useMediaQuery } from 'react-responsive'

const Header = () => {

        const nav = useNavigate();

        const isAdministrador = UserFirebase.usuario ? UserFirebase.usuario.role === "ADMINISTRADOR" : false;
        const isCelular = useMediaQuery({ query: '(max-width: 320px)' })
        const isTablet = useMediaQuery({ query: '(max-width: 768px)' })


        const path = window.location.pathname;

        const loginOut = () => {
                UserFirebase.loginOut(() => {
                        nav(LINK.INDEX)
                });
        }
        const selectClass = (name: string) => {
                return path === name ? " select" : "";
        }


        return <div className="Header backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal.png')" }}>
                <div className="Header__container container">
                        <div className="title" onClick={() => nav(LINK.INDEX)}>
                                {isCelular ? <img src="/includes/favicon.svg" width="40px" style={{ filter: "brightness(5)" }} />
                                        : isTablet ? <h1>Vocacional</h1> : <h1>HCI Vocacional</h1>}

                        </div>
                        <nav className="nav">
                                <ul className="nav__lista">
                                        <li
                                                onClick={() => nav(LINK.INDEX)}
                                                className={"nav__lista__item" + selectClass(LINK.INDEX)}>Inicio</li>
                                        {isAdministrador?<li
                                                onClick={() => nav(LINK.RESULTADOS)}
                                                className={"nav__lista__item" + selectClass(LINK.RESULTADOS)}>Resultados</li>:<></>}
                                        <li
                                                onClick={() => nav(LINK.PERFIL)}
                                                className={"nav__lista__item" + selectClass(LINK.PERFIL)}>Perfil</li>
                                        <li
                                                className="nav__lista__item" onClick={loginOut}>Salir</li>


                                </ul>
                        </nav>
                </div>



        </div>
}

export default Header;