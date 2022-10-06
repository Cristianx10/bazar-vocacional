import { Link } from "react-router-dom";
import "./index.scss";
import LINK from '../../components/Router/Routes';
import { useState } from "react";
import UserFirebase from '../../constants/firebase/user/index';
import { DEFAULT_PASS } from '../../constants/firebase/user/index';


const Index = () => {


    const [pass, setPass] = useState(DEFAULT_PASS);
    const [error, setError] = useState("")

    const onIngresar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target;
        if (!target) {
            return;
        }

        const getNameInput = (name: string) => {
            const input = e.currentTarget[name] as HTMLInputElement;
            return input.value;
        }


        var usuario = getNameInput("usuario");
        if (!usuario.includes("@mail.com")) {
            usuario = usuario + "@mail.com";
        }

        UserFirebase.login(usuario, pass, (status, error) => {

            setError(error.toString())
        });
    }

    return <div className="Index backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal.png')" }}>
        <h1 className="title">HCI Vocacional</h1>
        <form className="Index__container" onSubmit={onIngresar}>
            <div className="Index__container__info" >
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">#</span>
                    <input type="text" name="usuario" required className="form-control" placeholder="Nº de Identificación" aria-label="Nº de Identificación" aria-describedby="basic-addon1" />
                </div>
            </div>
            <div className="Index__container__opciones">

                <button type="submit" className="btn btn-primary">Ingresar</button>
                <Link to={LINK.REGISTRO}>
                    <button type="button" className="btn  btn-secondary">Registrarse</button>
                </Link>

            </div>


        </form>
        {error ? <div className="error">
            <h6 className="error__title">Ha ocurrido un error:</h6>
            <p className="error__msg">{error}</p>

        </div> :
            <></>}

    </div>
}

export default Index;