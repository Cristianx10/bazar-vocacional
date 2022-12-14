import React, { useEffect } from 'react';
import EmocionesLoad from '../scripts/Emociones';
import ActividadContext from '../../../../components/Interaccion/ActividadContext';



const Info = () => {

    const { getActividad, useNavegador } = ActividadContext();
    const actividad = getActividad();
    const [navegador] = useNavegador();

    useEffect(() => {
        if (actividad)
            actividad.addState("pantalla", "informacion");
        EmocionesLoad();
    }, [])

    return <div className="PagePsicologia PageInfo">

        <div className="info">
            <div className="info__cont">
                <h2 className="info__t">Haz click en cada una de las emociones para conocerlas a detalle</h2>
                <div className="info__imagenes">
                    <img src="/img/2020-2/psicologia-expresiones/Felicidad.png" alt="" className="info__iconof" />
                    <img src="/img/2020-2/psicologia-expresiones/Ira.png" alt="" className="info__iconoi" />
                    <img src="/img/2020-2/psicologia-expresiones/Sorpresa.png" alt="" className="info__iconos" />
                    <img src="/img/2020-2/psicologia-expresiones/Asco.png" alt="" className="info__iconoa" />
                    <img src="/img/2020-2/psicologia-expresiones/Tristeza.png" alt="" className="info__iconot" />
                    <img src="/img/2020-2/psicologia-expresiones/Miedo.png" alt="" className="info__iconom" />
                    <img src="/img/2020-2/psicologia-expresiones/Desprecio.png" alt="" className="info__iconod" />
                </div>

                <a onClick={
                    () => {
                        navegador.goName("instrucciones")
                    }}
                    className="button__t"><button className="button">Continuar</button></a>
            </div>
        </div>

        {/*<!-- FELICIDAD -->*/}
        <div className="f">
            <div className="f__felicidad">
                <div className="felicidad__cont">
                    <img src="/img/2020-2/psicologia-expresiones/f.jpg" alt="" className="felicidad__icono" />
                    <img src="/img/2020-2/psicologia-expresiones/salir.png" alt="" className="felicidad__cerrar" />
                    <div className="felicidad__info">
                        <h1 className="felicidad__t">FELICIDAD</h1>
                        <p className="felicidad__p">Estado de grata satisfacci??n espiritual y f??sica.</p>
                        <p className="felicidad__p">1. Las esquinas de los labios se dibujan hacia atr??s y hacia arriba.
                            <br />
                            2. La boca puede estar o no partida, los dientes expuestos.
                            <br />
                            3. Una arruga va desde la parte exterior de la nariz hasta el labio exterior.
                            <br />
                            4. Se levantan las mejillas.
                            <br />
                            5. El p??rpado inferior puede mostrar arrugas o estar tenso.
                            <br />
                            6. Patas de gallo cerca del exterior de los ojos</p>
                    </div>

                </div>
            </div>
        </div>

        {/*<!-- TRISTEZA -->*/}

        <div className="t">
            <div className="t__tristeza">
                <div className="tristeza__cont">
                    <img src="/img/2020-2/psicologia-expresiones/t.jpg" alt="" className="tristeza__icono" />
                    <img src="/img/2020-2/psicologia-expresiones/salir.png" alt="" className="tristeza__cerrar" />
                    <div className="tristeza__info">
                        <h1 className="tristeza__t">TRISTEZA</h1>
                        <p className="tristeza__p">Sensaci??n de infelicidad en respuesta a una aflicci??n, des??nimo o desilusi??n.</p>
                        <p className="tristeza__p">1. Las esquinas internas de las cejas se dibujan hacia adentro y luego hacia arriba.
                            <br />
                            2. La piel debajo de las cejas est?? triangulada, con la esquina interior hacia arriba.
                            <br />
                            3. La comisura de los labios se dibuja hacia abajo.
                            <br />
                            4. Se levanta la mand??bula.
                            <br />
                            5. El labio inferior hace pucheros.</p>
                    </div>

                </div>
            </div>
        </div>


        {/*<!-- DESPRECIO -->*/}

        <div className="d">
            <div className="d__desprecio">
                <div className="desprecio__cont">
                    <img src="/img/2020-2/psicologia-expresiones/d.jpg" alt="" className="desprecio__icono" />
                    <img src="/img/2020-2/psicologia-expresiones/salir.png" alt="" className="desprecio__cerrar" />
                    <div className="desprecio__info">
                        <h1 className="desprecio__t">DESPRECIO</h1>
                        <p className="desprecio__p">Es una intensa sensaci??n de falta de respeto o reconocimiento y aversi??n.</p>
                        <p className="desprecio__p">1. Se levanta un lado de la boca.</p>
                    </div>

                </div>
            </div>
        </div>


        {/*<!-- SORPRESA -->*/}

        <div className="s">
            <div className="s__sorpresa">
                <div className="sorpresa__cont">
                    <img src="/img/2020-2/psicologia-expresiones/s.jpg" alt="" className="sorpresa__icono" />
                    <img src="/img/2020-2/psicologia-expresiones/salir.png" alt="" className="sorpresa__cerrar" />
                    <div className="sorpresa__info">
                        <h1 className="sorpresa__t">SORPRESA</h1>
                        <p className="sorpresa__p">Conmover, suspender o maravillar con algo imprevisto, raro o incomprensible.</p>
                        <p className="sorpresa__p">1. Las cejas est??n levantadas y curvadas.
                            <br />
                            2. Se estira la piel debajo de la ceja.
                            <br />
                            3. Aparecen arrugas horizontales en la frente.
                            <br />
                            4. Los p??rpados est??n abiertos, el blanco del ojo se ve arriba y abajo.
                            <br />
                            5. La mand??bula se abre y los dientes se separan, pero no hay tensi??n ni estiramiento de la boca.</p>
                    </div>

                </div>
            </div>
        </div>

        {/*<!-- IRA -->*/}

        <div className="i">
            <div className="i__ira">
                <div className="ira__cont">
                    <img src="/img/2020-2/psicologia-expresiones/e.jpg" alt="" className="ira__icono" />
                    <img src="/img/2020-2/psicologia-expresiones/salir.png" alt="" className="ira__cerrar" />
                    <div className="ira__info">
                        <h1 className="ira__t">IRA</h1>
                        <p className="ira__p">Sentimiento de indignaci??n que causa enojo.</p>
                        <p className="ira__p">1. Las cejas se bajan y se juntan.
                            <br />
                            2. Aparecen l??neas verticales entre las cejas.
                            <br />
                            3. El labio inferior est?? tenso.
                            <br />
                            4. Los ojos tienen una mirada dura o abultados.
                            <br />
                            5. Los labios se pueden presionar firmemente, con las esquinas hacia abajo o en forma cuadrada como si estuvieran gritando.
                            <br />
                            6. Las fosas nasales pueden estar dilatadas.
                            <br />
                            7. La mand??bula inferior sobresale.</p>
                    </div>

                </div>
            </div>
        </div>


        {/*<!-- ASCO -->*/}

        <div className="a">
            <div className="a__asco">
                <div className="asco__cont">
                    <img src="/img/2020-2/psicologia-expresiones/a.jpg" alt="" className="asco__icono" />
                    <img src="/img/2020-2/psicologia-expresiones/salir.png" alt="" className="asco__cerrar" />
                    <div className="asco__info">
                        <h1 className="asco__t">ASCO</h1>
                        <p className="asco__p">Impresi??n desagradable causada por algo que repugna (disgusta).</p>
                        <p className="asco__p">1. Las esquinas de los labios se dibujan hacia atr??s y hacia arriba.
                            <br />
                            2. La boca puede estar o no partida, los dientes expuestos.
                            <br />
                            3. Una arruga va desde la parte exterior de la nariz hasta el labio exterior.
                            <br />
                            4. Se levantan las mejillas.
                            <br />
                            5. El p??rpado inferior puede mostrar arrugas o estar tenso.
                            <br />
                            6. Patas de gallo cerca del exterior de los ojos</p>
                    </div>

                </div>
            </div>
        </div>

        {/*<!-- MIEDO -->*/}

        <div className="m">
            <div className="m__miedo">
                <div className="miedo__cont">
                    <img src="/img/2020-2/psicologia-expresiones/m.jpg" alt="" className="miedo__icono" />
                    <img src="/img/2020-2/psicologia-expresiones/salir.png" alt="" className="miedo__cerrar" />
                    <div className="miedo__info">
                        <h1 className="miedo__t">MIEDO</h1>
                        <p className="miedo__p">Angustia por un riesgo o da??o real o imaginario.</p>
                        <p className="miedo__p">1. Las cejas se levantan y se dibujan juntas, generalmente en una l??nea plana.
                            <br />
                            2. Las arrugas en la frente est??n en el centro entre las cejas, no a lo ancho.
                            <br />
                            3. El p??rpado superior est?? levantado, pero el p??rpado inferior est?? tenso y encogido.
                            <br />
                            4. Los ojos muestran el blanco superior, pero no el blanco inferior.
                            <br />
                            5. La boca est?? abierta y los labios ligeramente tensos o estirados y retra??dos.</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
}

export default Info;



