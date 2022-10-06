import "./index.scss";
import { Categorias } from '../../constants/simulations/ListGeneral';
import UserFirebase from '../../constants/firebase/user/index';
import LINK from '../Router/Routes';
import { useNavigate } from "react-router";

const Header = () => {

        const nav = useNavigate()



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
                        <div className="title">
                                <h1>HCI Vocacional</h1>
                        </div>
                        <nav className="nav">
                                <ul className="nav__lista">
                                        <li
                                                onClick={() => nav(LINK.INDEX)}
                                                className={"nav__lista__item" + selectClass(LINK.INDEX)}>Inicio</li>
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