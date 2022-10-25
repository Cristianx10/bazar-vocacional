import React, { useEffect } from "react";
import { RPath } from "../index";

const Juego = ({ goToPage }: { goToPage: (value: string | number) => void }) => {


    return <div className="body">


        <button className="btnCombinar">Combinar</button>

        <button className="btnClose"><img src={RPath + "data/btnClose.png"} /></button>

        <button className="btnContinuar"><img src={RPath + "data/continue.png"} /></button>

        <div className="btnContainer">
            <button style={{backgroundImage:"url('" +RPath + "data/btn+.png')"}} className="btnM"></button>
            <button style={{backgroundImage:"url('" +RPath + "data/btn-.png')"}} className="btn-"></button>
        </div>

        <div className="btnContainer2">
            <button style={{backgroundImage:"url('" +RPath + "data/btn+.png')"}} className="btnM2"></button>
            <button style={{backgroundImage:"url('" +RPath + "data/btn-.png')"}} className="btn-2"></button>
        </div>

        <div className="pistacontainer">
            <button style={{backgroundImage:"url('" +RPath + "data/pista.png')"}} className="btnpista"> </button>
        </div>



    </div>
}

export default Juego;

//<script src="compuestos.js"></script>
//</button> <script src="sketch.js"></script>
