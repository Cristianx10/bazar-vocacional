import "./index.scss";
import UserFirebase from '../../constants/firebase/user/index';
import { DEFAULT_PASS } from '../../constants/firebase/user/index';
import { useNavigate } from 'react-router';
import LINK from '../../components/Router/Routes';

const Registro = () => {

    const nav = useNavigate()


    const onRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const getNameInput = (name: string) => {
            const input = e.currentTarget[name] as HTMLInputElement;
            return input.value;
        }

        const identificacion = getNameInput("identificacion");
        const nombre = getNameInput("nombre") as string;
        const genero = getNameInput("genero") as string;
        const prueba = getNameInput("prueba") as string;
        const correo = identificacion + "@mail.com";


        const data = {
            name: nombre,
            genero,
            prueba,
            identificacion
        }


        UserFirebase.register(correo, DEFAULT_PASS, data, ()=>{
            nav(LINK.INDEX)
        });
    }

    return <div className="Registro backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal-persona.png')" }}>
        <div className="Registro__container">
            <h1><strong>HCI Vocacional</strong></h1>
            <form className="formulario" onSubmit={onRegister} method="POST">
                <table className="tabla">
                    <tr className="fila">
                        <td className="columna">
                            <label className="form-label">N° de Identificación</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon3">#</span>
                                <input type="text" required name="identificacion" className="form-control" placeholder="N° de Identificación" id="basic-url" aria-describedby="basic-addon3" />
                            </div>
                        </td>
                    </tr>
                    <tr className="fila">
                        <td className="columna">
                            <label className="form-label">Nombre Completo</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon3">@</span>
                                <input type="text" required name="nombre" className="form-control" placeholder="Nombre Completo" id="basic-url" aria-describedby="basic-addon3" />
                            </div>
                        </td>
                    </tr>
                    <tr className="fila">
                        <td className="columna seleccion">
                            <label className="form-label">Género</label>

                            <div className="contenido">

                                <label className="btn">
                                    <input type="radio" required className="btn-check" name="genero" id="danger-outlined" value="Hombre" />
                                    <p className="label">Hombre</p>
                                </label>

                                <label className="btn">
                                    <input type="radio" required className="btn-check" name="genero" id="danger-outlined" value="Mujer" />
                                    <p className="label">Mujer</p>
                                </label>

                                <label className="btn">
                                    <input type="radio" required className="btn-check" name="genero" id="danger-outlined" value="No Binario" />
                                    <p className="label">No Binario</p>
                                </label>

                            </div>

                        </td>
                    </tr>
                    <tr className="fila">

                        <td className="columna seleccion">
                            <label className="form-label">Tipo de Prueba</label>

                            <div className="contenido">

                                <label className="btn">
                                    <input type="radio" required className="btn-check" name="prueba" id="danger-outlined" value="Virtual" />
                                    <p className="label">Virtual</p>
                                </label>


                                <label className="btn">
                                    <input type="radio" required className="btn-check" name="prueba" id="danger-outlined" value="Presencial" />
                                    <p className="label">Presencial</p>
                                </label>

                            </div>

                        </td>
                    </tr>

                    <tr className="fila">
                        <td>
                            <button type="submit" className="btn btn-registro btn-primary">Continuar</button>
                        </td>
                    </tr>
                </table>
            </form>


        </div>
    </div >
}

export default Registro;