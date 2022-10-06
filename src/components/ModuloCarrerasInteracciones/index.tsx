import "./index.scss";
import { useEffect, useState } from 'react';
import { getNamesCarrerasMap } from '../../constants/simulations/types/Carreras';
import ListGeneral from '../../constants/simulations/ListGeneral';
import IconPlay from '../../constants/icons/IconPlay';


export interface IInteraccion {
    UID: string;
    name: string;
    carreras: string[];
    img: string;
    puntuacion?: number;
    fecha?: string;

}


const ModuloCarrerasInteracciones = () => {

    const [interacciones, setInteracciones] = useState<{ name: string, interacciones: IInteraccion[] }[]>([]);

    const formatCarrera = getNamesCarrerasMap();

    const formatCarreraString = (name: string) => {
        var carrera: string = formatCarrera.get(name);

        var cadena = carrera.toLowerCase().split(' ');
        for (var i = 0; i < cadena.length; i++) {
            cadena[i] = cadena[i].charAt(0).toUpperCase() + cadena[i].substring(1) + " ";
        }

        var result = "";
        cadena.forEach(c => {
            result = result + c;
        })
        return result;
    }

    useEffect(() => {

        var actividades: { name: string, interacciones: IInteraccion[] }[] = []
        var actividadesMap = new Map<string, IInteraccion[]>();

        ListGeneral.forEach(({ UID, image, title, tags }) => {
            var actividad: IInteraccion = {
                UID, img: image, name: title, carreras: tags
            }

            const firtName = tags[0];
            var itemMap = actividadesMap.get(firtName)
            if (itemMap === undefined) {
                actividadesMap.set(firtName, []);
                itemMap = actividadesMap.get(firtName)
            }

            if (itemMap !== undefined) {
                itemMap.push(actividad)
            }
        })

        actividadesMap.forEach((value, key) => {
            actividades.push({
                name: formatCarreraString(key),
                interacciones: value
            })
        })

        setInteracciones(actividades)
    }, [])



    return <div className="ModuloCarrerasInteracciones">

        <div className="ModuloCarrerasInteracciones__title">
            <span></span>
            <h2>Carreras que te pueden interesar</h2>
        </div>

        <div className="interacciones">
            {interacciones.map((groupInteraccion, i) => {
                return <div key={i} className="interacciones__group">
                    <h4 className="interacciones__group__title">{groupInteraccion.name}</h4>
                    <ul className="interacciones__group__lista">
                        {groupInteraccion.interacciones.map(({ UID, name, img, puntuacion, carreras, fecha }) => {
                            return <li className="interacciones__group__lista__item card backgroundImage" key={UID} style={{ backgroundImage: "url('" + img + "')" }}>
                                <img src={img} className="card-img" alt={name}></img>

                                <div className="card-img-overlay">
                                    <IconPlay classname="icon" />
                                    <h5 className="card-title">{name}</h5>
                                </div>


                            </li>
                        })}
                    </ul>
                </div>
            })}
        </div>



    </div>
}

export default ModuloCarrerasInteracciones;