
import Navegador from '../../../../componentsTS/Navegacion/config';


const ConteoLoad = (navegador: Navegador) => {
    

    //Conteo para iniciar el juego

    let conteoImagen = document.querySelector('.conteo') as HTMLElement;;


    setTimeout(() => {
        conteoImagen.setAttribute('src', './resources/Juego 2.jpg');
    }, 1000)

    setTimeout(() => {
        conteoImagen.setAttribute('src', './resources/Juego 3.jpg');
    }, 2000)

    setTimeout(() => {
        navegador.goName("juego");
        //  window.location.href = "juego.html";
    }, 3000)
}

export default ConteoLoad;