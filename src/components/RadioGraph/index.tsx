import "./index.scss";

import { useEffect, useRef } from 'react';
import CARRERAS from '../../constants/observer';
import { random } from '../../constants/helpers/utils';

var Knob = require('knob');


const RadioGraph = ({ name = "name", value = 0, color = "#B800BC" }) => {

    const refGrafica = useRef<HTMLDivElement | any>()


    useEffect(() => {

        var HTMLGrafica = refGrafica.current;

        let init = random(0, 360);

        var grafico = Knob({
            min: 0,
            max: 100,
            width: 100,
            height: 100,
            fgColor: color,
            // angleOffset:0,
            thickness: ".25",
            readOnly: true,
            displayInput: false,

            value: value * 100,
            lineCap: "round",
            angleOffset: init,
        });

        if (HTMLGrafica) {
            let graficaContenedor = HTMLGrafica as HTMLDivElement;
            graficaContenedor.appendChild(grafico);
        }

        return () => {

            if (HTMLGrafica) {
                let graficaContenedor = HTMLGrafica as HTMLDivElement;
                graficaContenedor.removeChild(grafico);
            }
        }

    }, [])


    return <div className="RadioGraph view__resultado">
        <div className="RadioGraph__resultado__grafica">
            <div ref={refGrafica} className="RadioGraph__resultado__grafica__view"></div>
            <div className="RadioGraph__resultado__grafica__value">
                <div className="RadioGraph__resultado__informacion__valor">{Math.round(value * 100)}%</div>
            </div>

        </div>
        <div className="RadioGraph__resultado__informacion">
            {name}
        </div>
    </div>
}

export default RadioGraph;