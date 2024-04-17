# Backend challenge

## Descripción

- Stack

    - NestJS
    - MongoDB
    - Docker

- Estructura del repositorio

    - server/
        - Contiene una API Rest desarrollada con NestJS.
    - .github/workflows/
        - Contiene un workflow para testear, construir y publicar la imagén Docker de la API Rest en DockerHub cada que se haga un push a la branch "current".
    - db/
        - Contiene un script que se usa para inicializar la base de datos (crear un usuario admin).
    - compose.yaml
        - Archivo de configuración de Docker Compose para orquestrar los contenedores de este servicio backend.

- ¿Cómo ejecutar el código para producción?

    - Requisitos previos
        - Tener instalado Docker: [Instala Docker](https://docs.docker.com/get-docker/)
    - Consideraciones
        - La aplicación se ejecutará haciendo uso de contenedores, usando [Docker Compose](https://docs.docker.com/compose/) como orquestrador de contenedores.
        Si bien Docker Compose es de los orquestradores de contenedores más básicos ya que está diseñado para correr en un solo nodo, existen otros orquestradores más robustos como [Kubernetes](https://kubernetes.io/es/) y [ECS](https://aws.amazon.com/es/ecs/) (de AWS) que permiten orquestrar contenedores en multiples nodos con auto-scaling, entre otras ventajas.
    - Instrucciones
        1. Ve al folder "server" y renombra el archivo ".env.example" a ".env".
        2. Ve al folder raiz y ejecuta el siguiente comando para orquestrar los contenedores.

            ```
            docker compose -f compose.yaml up -d --build
            ```

            ![docker-compose-up](/docs/assets/images/docker-compose-up.png)

            Este comando construirá y correrá 3 contenedores. El contenedor de la API Rest, el contedor de la base de datos, y el contedor de un seeder para llenar la base datos con datos de prueba.
            
            La API debería estar expuesta en el puerto 3000, puedes ver aquí la [documentación](http://localhost:3000/api/docs).
            
            ![api-docs](/docs/assets/images/api-docs.png)

            La base de datos debería estar expuesta en el puerto 27017, puedes acceder a la base de datos con [MongoDB Compass](https://www.mongodb.com/try/download/compass) usando este connection string: mongodb://admin:password@localhost:27017/banpay?retryWrites=true&w=majority&appName=AtlasApp
            
            ![mongodb-compass](/docs/assets/images/mongodb-compass.png)
        
        3. Una vez que terminé de correr el seeder habrá varios usuarios registrados en la base de datos. La contraseña de todos los usuarios es "password". Puedes hacer sign in desde los [docs](http://localhost:3000/api/docs#/auth/AuthController_signIn) con el usuario con email "admin@admin.com" que tiene el rol "admin".
            ![api-docs-sign_in](/docs/assets/images/api-docs-sign_in.png)
        
        4. Para detener los contenedores ejecuta el siguiente comando.
            ```
            docker compose -f compose.yaml down --volumes
            ```
            ![docker-compose-down](/docs/assets/images/docker-compose-down.png)

## Rúbricas

- Decisiones técnicas

    - Para implementar la funcionalidad del CRUD de usuarios y de tener usuarios con un rol, y poder consumir un GET de Studio Ghibli API de acuerdo a su rol, se optó por:

        - Usar MongoDB como base de datos NoSQL debido a que se tiene más libertad sobre el schema, y en general las bases de datos NoSQL son más escalables. Guardando los siguientes datos de cada usuario: 'id', 'name', 'email', 'password' y 'role', y encriptando las contraseñas con Argon2.

        - Usar JWTs para manejar la autenticación, autorización (basada en roles) e identidad.

        - Definir 3 endpoints:

            - /api/users/..
                - CRUD de usuarios.
            - /api/auth/..
                - Iniciar sesión (obtener tokens), registrarse (crear usuario) y refrescar tokens.
            - /api/studio-ghibli/..
                - Consumir la API de Studio Ghibli.

- Arquitectura

    - La arquitectura de la API Rest es modular y de 3 niveles.

        1. Controladores: El único propósito de un controlador es recibir solicitudes para la aplicación y lidiar con rutas.

        2. Capa de servicios: Esta capa sólo debe incluir lógica empresarial. Por ejemplo, todas las operaciones y métodos CRUD para determinar cómo se pueden crear, almacenar y actualizar los datos.

        3. Capa de acceso de datos: Esta capa se encarga y proporciona lógica para acceder a los datos almacenados en algún tipo de almacenamiento persistente. Por ejemplo un ODM como Mongoose.

- Seguridad

    - Esta API REST incluye las siguientes capas de seguridad:

        - CORS.
        - Rate limiting (topado a 10 peticiones por segundo).
        - [Http headers con helmet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html).
        - Autenticación con JWTs, usando refresh tokens (larga duración) y access tokens (corta duración).
        - Autorización basada en roles.
        - Encriptación de contraseñas con [Argon2](https://es.wikipedia.org/wiki/Argon2).

- Escalabilidad

    - ... 

- Distribución

    - Para mejorar la distribución del código se optó por.

        - Usar GitFlow como flujo de trabajo para tener un mayor control y organización el proceso de integración continua, en este caso se tienen 2 branchs, "current" y "next". La branch  "next" es donde se integran nuevos cambios y la branch "current" que es la principal o de producción.

        - Automatizar el flujo de construcción de la imagen Docker de la API Rest.

        - Usar contenedores, ya que son una forma de crear paquetes de software livianos, independientes y ejecutables que contienen todo lo necesario para ejecutar una aplicación, incluido código, entorno de ejecución, herramientas del sistema y librerias. Debido a que los contenedores están aislados del host y de otros contenedores, se garantiza coherencia y portabilidad en diferentes entornos.


- Calidad del código

    - Para mejorar la calidad del código se optó por:

        -  Usar un linter ([ESLint](https://eslint.org/)) para mostrar errores de sintaxis, mostrar errores cuando no se siguen buenas prácticas, proveer sugerencias para mejorar el código y mantener un estilo consistente en el código.
        - Escribir tests unitarios para facilitar la detección de defectos, reducir costos, mejorar la calidad del código y facilitar la refactorización.
        - Seguir principios (SOLID) y patrones de diseño (Singleton, Decorator, Dependency Injection, entre otros.).
        - Documentar la API Rest con Swagger.

- Claridad

    - ...