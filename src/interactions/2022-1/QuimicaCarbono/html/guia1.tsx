import React from "react";
import { RPath } from "../index";


const Guia1 = ({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">
        <main className="container">

            <img src={RPath + "data/Guía1.png"} />

            <button onClick={() => goToPage("guia2")} className="btnPlay3"> Continuar </button>
        </main>
    </div>
}

export default Guia1;