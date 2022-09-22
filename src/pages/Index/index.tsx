import { Link } from "react-router-dom";
import "./index.scss";
import LINK from '../../componets/Router/Routes';

const Index = () => {
    return <div className="Index backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal.png')" }}>
        <h1 className="title">HCI Vocacional</h1>
        <div className="Index__container">
            <div className="Index__container__info">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">#</span>
                    <input type="text" className="form-control" placeholder="Nº de Identificación" aria-label="Nº de Identificación" aria-describedby="basic-addon1" />
                </div>
            </div>
            <div className="Index__container__opciones">

                <button type="button" className="btn btn-primary">Ingresar</button>
                <Link to={LINK.REGISTRO}>
                    <button type="button" className="btn  btn-secondary">Registrarse</button>
                </Link>

            </div>
        </div>

      
    </div>
}

export default Index;