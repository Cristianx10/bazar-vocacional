import React from "react";
import { RPath } from "../index";

const InstruccionTwo = ({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">

        <main className="container">
            <img src={RPath + "data/InstruccionTwo.png"} />
            <button onClick={() => goToPage("onBoardTwo")} className="btnNext3">Siguiente </button>
        </main>

    </div>
}

export default InstruccionTwo;