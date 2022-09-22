import "./index.scss";

const Registro = () => {
    return <div className="Registro backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal-persona.png')" }}>
        <div className="Registro__container">
            <h1><strong>HCI Vocacional</strong></h1>
            <form className="formulario" onSubmit={(e)=>{e.preventDefault()}} method="POST">
                <table className="tabla">
                    <tr className="fila">
                        <td className="columna">
                            <label className="form-label">N° de Identificación</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon3">#</span>
                                <input type="text" required className="form-control" placeholder="N° de Identificación" id="basic-url" aria-describedby="basic-addon3" />
                            </div>
                        </td>
                    </tr>
                    <tr className="fila">
                        <td className="columna">
                            <label className="form-label">Nombre Completo</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon3">@</span>
                                <input type="text" required className="form-control" placeholder="Nombre Completo" id="basic-url" aria-describedby="basic-addon3" />
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