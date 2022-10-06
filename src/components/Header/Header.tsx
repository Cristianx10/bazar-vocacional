import "./index.scss";
import { Categorias } from '../../constants/simulations/ListGeneral';
import UserFirebase from '../../constants/firebase/user/index';

const Header = () => {

        const loginOut = ()=>{
                UserFirebase.loginOut(()=>{

                });
        }


        return <div className="Header backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal.png')" }}>
                <div className="Header__container container">
                        <div className="title">
                                <h1>HCI Vocacional</h1>
                        </div>
                        <nav className="nav">
                                <ul className="nav__lista">
                                        <li className="nav__lista__item select">Perfil</li>
                                        <li className="nav__lista__item" onClick={loginOut}>Salir</li>
                                </ul>
                        </nav>
                </div>



        </div>
}

export default Header;