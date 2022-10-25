import React from "react";
import { RPath } from "../index";

const OnBoardThree = ({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">
        <main className="container">

            <video src={RPath + "data/Instruccion3.mp4"} width="1160" height="600" autoPlay loop></video>

            <button onClick={() => goToPage("instruccionFour")} className="btnNext2"> Siguiente </button>

        </main>
    </div>
}

export default OnBoardThree;