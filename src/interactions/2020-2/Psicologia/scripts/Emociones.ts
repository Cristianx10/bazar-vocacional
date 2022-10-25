const EmocionesLoad = () => {
    //BOTONES
    const emocionesf = document.querySelector('.info__iconof') as HTMLElement;
    const emocionest = document.querySelector('.info__iconot') as HTMLElement;
    const emocionesi = document.querySelector('.info__iconoi') as HTMLElement;
    const emocionesa = document.querySelector('.info__iconoa') as HTMLElement;
    const emocionesm = document.querySelector('.info__iconom') as HTMLElement;
    const emocionesd = document.querySelector('.info__iconod') as HTMLElement;
    const emocioness = document.querySelector('.info__iconos') as HTMLElement;

    //EMOCIONES
    const f = document.querySelector('.f') as HTMLElement;
    const t = document.querySelector('.t') as HTMLElement;
    const i = document.querySelector('.i') as HTMLElement;
    const a = document.querySelector('.a') as HTMLElement;
    const m = document.querySelector('.m') as HTMLElement;
    const d = document.querySelector('.d') as HTMLElement;
    const s = document.querySelector('.s') as HTMLElement;

    //CERRAR
    const cerrarf = document.querySelector('.felicidad__cerrar') as HTMLElement;
    const cerrart = document.querySelector('.tristeza__cerrar') as HTMLElement;
    const cerrari = document.querySelector('.ira__cerrar') as HTMLElement;
    const cerrara = document.querySelector('.asco__cerrar') as HTMLElement;
    const cerrarm = document.querySelector('.miedo__cerrar') as HTMLElement;
    const cerrard = document.querySelector('.desprecio__cerrar') as HTMLElement;
    const cerrars = document.querySelector('.sorpresa__cerrar') as HTMLElement;



    //ACCIONES PARA ABRIR LA INFO DE CADA EMOCION
    emocionesf.addEventListener('click', () => {
        f.classList.add('f--mostrar');
        //console.log("hola");
    });

    emocionest.addEventListener('click', () => {
        t.classList.add('t--mostrar');
    });

    emocionesi.addEventListener('click', () => {
        i.classList.add('i--mostrar');
    });

    emocionesa.addEventListener('click', () => {
        a.classList.add('a--mostrar');
    });

    emocionesm.addEventListener('click', () => {
        m.classList.add('m--mostrar');
    });

    emocionesd.addEventListener('click', () => {
        d.classList.add('d--mostrar');
    });

    emocioness.addEventListener('click', () => {
        s.classList.add('s--mostrar');
    });


    //CERRAR LAS PANTALLAS

    cerrarf.addEventListener('click', () => {
        f.classList.remove('f--mostrar');
    });

    cerrart.addEventListener('click', () => {
        t.classList.remove('t--mostrar');
    });

    cerrari.addEventListener('click', () => {
        i.classList.remove('i--mostrar');
    });

    cerrara.addEventListener('click', () => {
        a.classList.remove('a--mostrar');
    });

    cerrarm.addEventListener('click', () => {
        m.classList.remove('m--mostrar');
    });

    cerrard.addEventListener('click', () => {
        d.classList.remove('d--mostrar');
    });

    cerrars.addEventListener('click', () => {
        s.classList.remove('s--mostrar');
    });
}

export default EmocionesLoad;