import React from "react";
import { RPath } from "../index";

const InstruccionThree = ({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">
        <main className="container">

            <img src={RPath + "data/Instruccion3.png"} />

            <button onClick={() => goToPage("onBoardThree")} className="btnNext3">Siguiente </button>
        </main>

    </div>
}

export default InstruccionThree;