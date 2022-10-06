import "./Perfil.scss";
import Header from '../../components/Header/Header';
import ModuloCarrerasInteracciones from '../../components/ModuloCarrerasInteracciones/index';

const Perfil = () => {
    return <div className="Perfil backgroundImage" style={{ backgroundImage: "url('/includes/backgrounds/fondo-principal-white.jpg')" }}>
        <Header />

        <div className="Perfil__container">
            <div className="Perfil__title">
                <span></span>
                <h2>Tu Carrera Ideal</h2>
            </div>

            <div className="Perfil__title">
                <span></span>
                <h2>Tus Estadísticas</h2>
            </div>

           <ModuloCarrerasInteracciones />
            
        </div>
    </div>
}

export default Perfil;