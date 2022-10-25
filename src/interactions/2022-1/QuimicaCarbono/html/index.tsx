import React from "react";
import {  RPath  } from "../index";

const Index = ({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">
        <main className="container">

            <img src={RPath + "data/Inicio.png"} />

            <button onClick={() => goToPage("instruccionOne")} className="btnPlay1">Jugar </button>
        </main>

    </div>
}

export default Index;