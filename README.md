# Proyecto de CRUD cantantes y maquetación de banner.

Este proyecto es un aplicativo web que permite a los usuarios crear, leer, actualizar y eliminar cantantes.
El aplicativo consta de los siguientes componentes principales:

Backend: RESTFUL creada a partir de Nest.js con validación de datos.
Frontend: Aplicativo web creado en Next.js utilizando Tailwind y CSS.

## Tecnologías Utilizadas

Nest.js
Next.js
TypeScript para la tipado seguro

## Requisitos previos

Asegúrate de tener Node.js y npm (el administrador de paquetes de Node.js) instalados en tu computadora. Puedes descargarlos desde [nodejs.org](https://nodejs.org/). Se recomienda instalar la versión LTS.

Asegúrate de tener instalado Git, puedes descargarlo desde https://git-scm.com/. se recomienda instalar la opción:  Standalone Installer

## Nota

Antes de continuar con los pasos de instalación espera a que Node.js y git sean instalados.

## Pasos de instalación

1.  **Clona el repositorio:**

    Abre tu terminal o línea de comandos y ejecuta el siguiente comando para clonar este repositorio:

    git clone https://github.com/Villegas-06/testSolucionesStar.git

2.  **Accede al directorio del proyecto:**

    Ve al directorio del proyecto que acabas de clonar y sigue los siguientes pasos:

    2.1. **Accede a la carpeta del backend:**

        Luego de haber ejecutado el paso anterior dirigete a la carpeta del backend y escribe el siguiente comando:

        cd backend

    2.2. **Instala las dependencias del servidor NestJS:**

        Ejecuta el siguiente comando para instalar las dependencias del servidor Nest:

        npm install

    2.3. **Inicia el servidor de Express:**

        Ejecuta el siguiente comando para iniciar el servidor Express:

        node index.js

        El servidor Express se ejecutará en http://localhost:3200.

3.  **Accede al front del proyecto:**

    En otra terminal ve al directorio del proyecto que acabas de clonar y sigue los siguientes pasos:

    3.1 **Accede a la carpeta del frontend:**

        Luego de haber ejecutado el paso anterior dirigete a la carpeta del frontend y escribe el siguiente comando:

        cd frontend

    3.2 **Instala las dependencias del cliente Angular:**

        Ejecuta el siguiente comando para instalar las dependencias de Node:

        npm install

    3.3 **Inicia la aplicación NextJs:**

        Ejecuta el siguiente comando para iniciar el servidor Angular:

        npm run dev

        La aplicación NextJs estará disponible en http://localhost:3000.

# Uso

Puedes acceder a la aplicación web visitando http://localhost:3000 en tu navegador. El servidor Express se encarga de las API y la aplicación Angular maneja la interfaz de usuario.

# Ayuda Para la API.

La aplicación del backend tiene su debida documentación en Swagger, puedes visitar http://localhost:3200/api, para ver como se usan los endpoints, adicional estará el archivo de postman en el cual se hicieron los test de dichos endpoints. 
