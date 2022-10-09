
# Bazar Vocacional v1.0

Este proyecto busca generar interacciones que contribuyan a las personas a encontrar habilidades que les ayuden a escoger una vocación.


## Creadores

- [@Cristian Salguero](https://github.com/Cristianx10)

## Colaboradores

- [@Cristian Salguero](https://github.com/Cristianx10)


## Agregar interacciones

A continuación te damos los pasos para ser contribuyente del proyecto:

-1. Clone el proyecto

```bash
  git clone https://github.com/Cristianx10/bazar-vocacional.git
```

-2. Cree una carpeta donde se almacenara su proyecto con un nombre distinto a las existentes (public/proyectos/AÑO_ACTUAL-PERIODO)

```bash
  cd my-project
```

-3. Eliminar librerias de p5.js al subir el proyecto y tomarla de la ubicación global [/libraries/p5.min.js]

```bash
  cd my-project
```

-4. Incluir la libreria observer.js en cada archivo .html para comunicar el proyecto con la aplicación [/js/observer.js]
Nota: debe ser el primer script cargado

```bash
  cd my-project
```



-5. Existe una variable llamada oActivity que se encarga de los procesos de comunicacion con la aplicacion

- oActivity (metodos):
  1. addState("nombreDelEstado", (value:string, boolean, number))
  2. addResult([{
    id:string //Nombre carrera,
    value:number //puntuacion
  }])
  3. finish()

```bash
  cd my-project
```


-6. Agregar a la lista de interacciones src/constants/simulations

Agregar a la carpeta correspondiente


```bash
  cd my-project
```