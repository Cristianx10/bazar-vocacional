
import CARRERAS from '../../../../constants/observer';
import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';

const MainLoad = (actividad: ActividadTSLite) => {


    //JUEGO
    let contador = 0;
    let nivel = 0;
    let aciertos = -2;
    let nivel1Puntaje = 0;
    let nivel2Puntaje = 0;
    let nivel3Puntaje = 0;
    let nivel4Puntaje = 0;
    let emocionActual: {
        emocion: string;
        src: string;
    } | undefined = undefined;
    let nivelActual: {
        src: string;
    } | undefined = undefined;
    let emocionCorrecta;
    let puntajeActual: number;

    const niveles = [
        {
            src: '/img/2020-2/psicologia-expresiones/Neutral1.webp',
        },
        {
            src: '/img/2020-2/psicologia-expresiones/Neutral2.webp',
        },
        {
            src: '/img/2020-2/psicologia-expresiones/Neutral3.webp',
        },
        {
            src: '/img/2020-2/psicologia-expresiones/Neutral4.webp',
        },
    ];

    const subniveles = [
        //EMOCIONES NIVEL 1
        {
            emocion: 'felicidad',
            src: '/img/2020-2/psicologia-expresiones/Felicidad1.webp',
        },
        {
            emocion: 'miedo',
            src: '/img/2020-2/psicologia-expresiones/Miedo1.webp',
        },
        {
            emocion: 'sorpresa',
            src: '/img/2020-2/psicologia-expresiones/Sorpresa1.webp',
        },
        {
            emocion: 'asco',
            src: '/img/2020-2/psicologia-expresiones/Asco1.webp',
        },
        {
            emocion: 'ira',
            src: '/img/2020-2/psicologia-expresiones/Enojo1.webp',
        },
        {
            emocion: 'desprecio',
            src: '/img/2020-2/psicologia-expresiones/Desprecio1.webp',
        },
        {
            emocion: 'tristeza',
            src: '/img/2020-2/psicologia-expresiones/Tristeza1.webp',
        },
        //EMOCIONES NIVEL 2
        {
            emocion: 'sorpresa',
            src: '/img/2020-2/psicologia-expresiones/Sorpresa2.webp',
        },
        {
            emocion: 'asco',
            src: '/img/2020-2/psicologia-expresiones/Asco2.webp',
        },
        {
            emocion: 'felicidad',
            src: '/img/2020-2/psicologia-expresiones/Felicidad2.webp',
        },
        {
            emocion: 'desprecio',
            src: '/img/2020-2/psicologia-expresiones/Desprecio2.webp',
        },
        {
            emocion: 'miedo',
            src: '/img/2020-2/psicologia-expresiones/Miedo2.webp',
        },
        {
            emocion: 'tristeza',
            src: '/img/2020-2/psicologia-expresiones/Tristeza2.webp',
        },
        {
            emocion: 'ira',
            src: '/img/2020-2/psicologia-expresiones/Enojo2.webp',
        },
        //EMOCIONES NIVEL 3
        {
            emocion: 'asco',
            src: '/img/2020-2/psicologia-expresiones/Asco3.webp',
        },
        {
            emocion: 'desprecio',
            src: '/img/2020-2/psicologia-expresiones/Desprecio3.webp',
        },
        {
            emocion: 'sorpresa',
            src: '/img/2020-2/psicologia-expresiones/Sorpresa3.webp',
        },
        {
            emocion: 'felicidad',
            src: '/img/2020-2/psicologia-expresiones/Felicidad3.webp',
        },
        {
            emocion: 'miedo',
            src: '/img/2020-2/psicologia-expresiones/Miedo3.webp',
        },
        {
            emocion: 'ira',
            src: '/img/2020-2/psicologia-expresiones/Enojo3.webp',
        },
        {
            emocion: 'tristeza',
            src: '/img/2020-2/psicologia-expresiones/Tristeza3.webp',
        },
        //EMOCIONES NIVEL 4
        {
            emocion: 'tristeza',
            src: '/img/2020-2/psicologia-expresiones/Tristeza4.webp',
        },
        {
            emocion: 'felicidad',
            src: '/img/2020-2/psicologia-expresiones/Felicidad4.webp',
        },
        {
            emocion: 'desprecio',
            src: '/img/2020-2/psicologia-expresiones/Desprecio4.webp',
        },
        {
            emocion: 'ira',
            src: '/img/2020-2/psicologia-expresiones/Enojo4.webp',
        },
        {
            emocion: 'asco',
            src: '/img/2020-2/psicologia-expresiones/Asco4.webp',
        },
        {
            emocion: 'sorpresa',
            src: '/img/2020-2/psicologia-expresiones/Sorpresa4.webp',
        },
        {
            emocion: 'miedo',
            src: '/img/2020-2/psicologia-expresiones/Miedo4.webp',
        },
    ];

    const velocidad = [
        800, 600, 400, 300
    ];

    const puntaje = [
        4, 6, 8, 10
    ];

    var img = document.querySelector('.juego__imagen');

    const cambiarImagen = () => {
        if (contador < 28) {
            emocionActual = subniveles[contador];
            nivelActual = niveles[nivel];
            let velocidadActual = velocidad[nivel];
            puntajeActual = puntaje[nivel];

            setTimeout(() => {
                if (emocionActual && img) {
                    img.setAttribute('src', emocionActual.src);
                }
            }, 1000);

            setTimeout(() => {
                if (nivelActual && img) {
                    img.setAttribute('src', nivelActual.src);
                }
            }, velocidadActual + 1000);

        }
    }
    cambiarImagen();


    //BOTONES
    const btns = document.querySelectorAll('.juego__btn') as NodeListOf<HTMLElement>;

    const btnHandle = (event: MouseEvent) => {

        const target = event.target as HTMLElement;

        if (target) {
            const src = target.getAttribute('alt');

            //AUMENTAR CONTADOR Y NIVEL
            contador++;
            if (contador % 7 == 0) {
                nivel++;
                console.log('nivel' + nivel);
            }
            cambiarImagen();

            //MOSTRAR PANTALLA DE RESULTADOS
            if (contador == 28) {

                const resultados = document.querySelector('.resul') as HTMLElement;

                resultados.classList.add('resul--mostrar');
            }

            //CONTAR ACIERTOS
            emocionCorrecta = subniveles[contador - 1];
            if (contador < 29) {
                if ('' + src === '' + emocionCorrecta.emocion) {

                    if (contador < 8) {
                        nivel1Puntaje += 4;
                    }

                    if (contador >= 8 && contador < 15) {
                        nivel2Puntaje += 6;
                    }

                    if (contador >= 15 && contador < 22) {
                        nivel3Puntaje += 8;
                    }

                    if (contador >= 22) {
                        nivel4Puntaje += 10;
                        console.log(nivel4Puntaje)
                    }

                    aciertos += puntajeActual;
                    console.log(aciertos);

                }
            }

            //MOSTRAR EL PUNTAJE FINAL EN LA PANTALLA DE RESULTADOS
            const puntajeFinal = document.querySelector('.resul__t3') as HTMLElement;

            puntajeFinal.innerHTML = 'Tu puntaje fue de ' + aciertos / 2 + '%';

            //MOSTRAR EL NIVEL ACTUAL EN LA PANTALLA
            const numerodeimagen = document.querySelector('.juego__contador') as HTMLElement;

            numerodeimagen.innerHTML = contador + 1 + '/28';

            if (contador >= 28) {
                console.log("Mostrando Final", aciertos)

                actividad.addState("puntaje", aciertos / 2);

                actividad.addResult([
                    { id: CARRERAS.PSICOLOGIA, value: 200 * ((aciertos / 2) / 100) }
                ])


            } else {
                actividad.addState("puntaje", aciertos / 2);
                console.log("Mostrando resultados", aciertos)
            }

        }

    }

    btns.forEach((elem, index) => {
        elem.addEventListener('click', btnHandle);
    });


    //aciertos ES LA VARIABLE DEL PUNTUAJE GLOBAL
    //nivel1Puntaje ES LA VARIABLE DEL PUNTAJE DEL NIVEL 1
    //nivel2Puntaje ES LA VARIABLE DEL PUNTAJE DEL NIVEL 2
    //nivel3Puntaje ES LA VARIABLE DEL PUNTAJE DEL NIVEL 3
    //nivel4Puntaje ES LA VARIABLE DEL PUNTAJE DEL NIVEL 4


}

export default MainLoad;