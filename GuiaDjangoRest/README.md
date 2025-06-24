# Guía Interactiva: Creando una API completa con Django y MySQL

Esta guía interactiva está diseñada para estudiantes y desarrolladores que desean aprender a crear una API profesional utilizando Django REST Framework con una base de datos MySQL. La guía ofrece un recorrido completo desde los conceptos fundamentales hasta el despliegue en producción.

## Contenido de la Guía

La guía está organizada en 10 pasos secuenciales:

0. **Conceptos Fundamentales** - Introducción a API REST, Django y MySQL
1. **Configuración Inicial** - Preparación del entorno de desarrollo y estructura del proyecto
2. **Configuración de MySQL** - Instalación y configuración de la base de datos
3. **Creación de Modelos** - Diseño de modelos de datos y migraciones
4. **Serializadores Básicos** - Creación de serializadores para transformar modelos en JSON
5. **Vistas y URLs** - Configuración de endpoints y lógica básica
6. **Autenticación y Permisos** - Seguridad y control de acceso a la API
7. **Pruebas Manuales con Postman/Thunder Client** - Cómo probar la API manualmente
8. **Pruebas Automatizadas** - Implementación de pruebas unitarias y de integración
9. **Despliegue en Producción** - Publicación de la API en un entorno de producción

## Características

- ✅ Instrucciones detalladas paso a paso para implementar una API REST completa
- ✅ Integración con base de datos MySQL desde cero
- ✅ Ejercicios prácticos interactivos en cada sección
- ✅ Validación automática de ejercicios
- ✅ Diseño responsivo con Bootstrap 5
- ✅ Ejemplos de código completos y explicados
- ✅ Seguimiento de progreso guardado en el navegador
- ✅ Recursos adicionales para profundizar en cada tema

## Requisitos previos

- Conocimientos básicos de Python
- Conocimientos básicos de HTTP y APIs REST
- XAMPP instalado (para acceder a MySQL)
- Python 3.8+ instalado

## Estructura del proyecto

```
API/
├── index.html              # Página principal de la guía
├── css/                    # Hojas de estilo
│   └── styles.css          # Estilos personalizados
├── js/                     # Scripts de JavaScript
│   └── main.js             # Funcionalidad interactiva principal
├── assets/                 # Recursos multimedia
│   └── images/             # Imágenes para la guía
│       ├── admin-panel.jpg
│       ├── admin-panel.svg
│       ├── django-logo.svg
│       ├── drf-logo.svg
│       └── mysql-logo.svg
├── steps/                  # Pasos de la guía en HTML
│   ├── step0.html          # Conceptos Fundamentales
│   ├── step1.html          # Configuración Inicial
│   ├── step2.html          # Configuración de MySQL
│   ├── step3.html          # Creación de modelos
│   ├── step4.html          # Serializers y views
│   ├── step5.html          # Autenticación y Permisos
│   ├── step6.html          # Pruebas con Postman
│   ├── step7.html          # Pruebas Automatizadas
│   └── step8.html          # Despliegue
└── verificar_funciones.html # Página para verificar funcionalidades
```

## Cómo usar esta guía

1. Abre `index.html` en tu navegador
2. Puedes comenzar desde los conceptos fundamentales (recomendado para principiantes) o ir directamente a la práctica
3. Navega por los pasos secuenciales utilizando los botones de navegación
4. Completa los ejercicios prácticos en cada sección
5. Consulta los recursos adicionales para profundizar en temas específicos
6. Implementa tu propia API siguiendo el proyecto guía

## Lo que aprenderás

- Diseñar e implementar una API REST completa con Django
- Trabajar con bases de datos MySQL en proyectos Django
- Crear modelos de datos y gestionar migraciones
- Implementar serialización y vistas para la API
- Configurar autenticación y permisos de usuarios
- Probar APIs con Postman y pruebas automatizadas
- Desplegar una API en entornos de producción
- Buenas prácticas de desarrollo para APIs REST

## Tecnologías utilizadas

- HTML5
- CSS3 con Bootstrap 5
- JavaScript (ES6+)
- Django 3.2.*
- Django REST Framework 3.14.*
- MySQL
- Postman
- Herramientas de pruebas de Django

## Autor

- Alvaro Perez Niño - [@aperezn298](https://github.com/aperezn298)

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

# Guía para probar la API con Postman

A continuación se presenta una guía paso a paso para probar todos los métodos de la API desarrollada en esta guía utilizando Postman.

## Paso 1: Preparación

1. **Asegúrate de que tu servidor Django esté corriendo**:
   ```powershell
   python manage.py runserver
   ```
   Esto iniciará tu servidor en http://127.0.0.1:8000/

2. **Descarga e instala Postman** si aún no lo tienes:
   - Visita [postman.com/downloads](https://www.postman.com/downloads/)
   - Instala la versión para tu sistema operativo

## Paso 2: Configuración de Postman

1. **Crear una colección nueva**:
   - Abre Postman y haz clic en "Collections" en el panel izquierdo
   - Haz clic en el botón "+" para crear una nueva colección
   - Nombra la colección "Django Biblioteca API"
   - Haz clic en "Create"

2. **Crear un entorno**:
   - Haz clic en "Environments" en el panel izquierdo
   - Haz clic en "+" para crear un nuevo entorno
   - Nombra el entorno "Development"
   - Añade estas variables:
     - `base_url`: http://127.0.0.1:8000
     - `api_version`: api
   - Haz clic en "Save"
   - Asegúrate de seleccionar este entorno en la esquina superior derecha

## Paso 3: Prueba de los endpoints (sin autenticación)

#### 3.1 GET - Obtener lista de entidades

1. **Obtener todos los autores**:
   - Crea una nueva solicitud en tu colección
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/autores/`
   - Haz clic en "Send"
   - Deberías recibir un código 200 y la lista de autores en JSON

2. **Obtener todas las categorías**:
   - Crea una nueva solicitud
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/categorias/`
   - Haz clic en "Send"

3. **Obtener todas las editoriales**:
   - Crea una nueva solicitud
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/editoriales/`
   - Haz clic en "Send"

4. **Obtener todos los libros**:
   - Crea una nueva solicitud
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/`
   - Haz clic en "Send"

5. **Obtener todas las reseñas**:
   - Crea una nueva solicitud
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/resenas/`
   - Haz clic en "Send"

#### 3.2 GET - Obtener una entidad específica

1. **Obtener un autor específico**:
   - Crea una nueva solicitud
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/autores/1/`
   - Haz clic en "Send"
   - Deberías recibir detalles del autor con ID 1

2. **Obtener un libro específico**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/1/`
   - Haz clic en "Send"

3. **Obtener las reseñas de un libro específico**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/1/resenas/`
   - Haz clic en "Send"
   - Esta es tu acción personalizada que devuelve las reseñas de un libro específico

#### 3.3 GET - Probar filtros y búsqueda

1. **Filtrar libros por categoría**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/?categorias=1`
   - Haz clic en "Send"

2. **Buscar libros por título**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/?search=aventura`
   - Haz clic en "Send"

3. **Ordenar libros por fecha de publicación**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/?ordering=-fecha_publicacion`
   - Haz clic en "Send"

## Paso 4: Pruebas con Autenticación

Para realizar operaciones de creación, actualización y eliminación, necesitarás autenticarte primero. Tu API usa el sistema de autenticación por token de Django REST Framework.

#### 4.1 Obtener un token de autenticación

1. **Primero, asegúrate de que creaste un usuario con el comando**:
   ```powershell
   python manage.py createsuperuser
   ```

2. **Obtener token (si tienes `rest_framework.authtoken` configurado)**:
   - Método: POST
   - URL: `{{base_url}}/api-auth/login/`
   - Ve a la pestaña "Body"
   - Selecciona "x-www-form-urlencoded"
   - Añade estos campos:
     - username: tu_nombre_de_usuario
     - password: tu_contraseña
   - Haz clic en "Send"

3. **Configurar el token para futuras solicitudes**:
   - En tu entorno "Development", añade una nueva variable:
     - `token`: el token que recibiste en la respuesta
   - En la sección "Authorization" de cada solicitud futura que requiera autenticación:
     - Tipo: "Bearer Token"
     - Token: `{{token}}`

#### 4.2 POST - Crear nuevas entidades

1. **Crear un nuevo autor**:
   - Método: POST
   - URL: `{{base_url}}/{{api_version}}/autores/`
   - Headers:
     - Content-Type: application/json
     - Authorization: Bearer {{token}}
   - Body (raw JSON):
   ```json
   {
     "nombre": "Gabriel",
     "apellidos": "García Márquez",
     "nacionalidad": "Colombia",
     "fecha_nacimiento": "1927-03-06"
   }
   ```
   - Haz clic en "Send"

2. **Crear una nueva categoría**:
   - Método: POST
   - URL: `{{base_url}}/{{api_version}}/categorias/`
   - Headers (como en el ejemplo anterior)
   - Body:
   ```json
   {
     "nombre": "Realismo Mágico",
     "descripcion": "Género literario donde elementos mágicos aparecen en un entorno realista"
   }
   ```
   - Haz clic en "Send"

3. **Crear un nuevo libro**:
   - Método: POST
   - URL: `{{base_url}}/{{api_version}}/libros/`
   - Headers (como en el ejemplo anterior)
   - Body:
   ```json
   {
     "titulo": "Cien años de soledad",
     "isbn": "9780307474728",
     "sinopsis": "Una saga familiar que recorre varias generaciones en Macondo",
     "fecha_publicacion": "1967-05-30",
     "paginas": 417,
     "idioma": "Español",
     "autor_ids": [1],
     "categoria_ids": [1],
     "editorial_id": 1
   }
   ```
   - Haz clic en "Send"

#### 4.3 PUT - Actualizar entidades existentes

1. **Actualizar un autor**:
   - Método: PUT
   - URL: `{{base_url}}/{{api_version}}/autores/1/`
   - Headers (como en ejemplos anteriores)
   - Body:
   ```json
   {
     "nombre": "Gabriel José",
     "apellidos": "García Márquez",
     "nacionalidad": "Colombia",
     "fecha_nacimiento": "1927-03-06"
   }
   ```
   - Haz clic en "Send"

2. **Actualizar un libro**:
   - Método: PUT
   - URL: `{{base_url}}/{{api_version}}/libros/1/`
   - Headers (como en ejemplos anteriores)
   - Body (incluye todos los campos, incluso los que no cambien):
   ```json
   {
     "titulo": "Cien años de soledad",
     "isbn": "9780307474728",
     "sinopsis": "Una saga familiar épica que recorre varias generaciones en el pueblo ficticio de Macondo",
     "fecha_publicacion": "1967-05-30",
     "paginas": 417,
     "idioma": "Español",
     "autor_ids": [1],
     "categoria_ids": [1, 2],
     "editorial_id": 1
   }
   ```
   - Haz clic en "Send"

#### 4.4 PATCH - Actualización parcial

1. **Actualizar parcialmente un libro**:
   - Método: PATCH
   - URL: `{{base_url}}/{{api_version}}/libros/1/`
   - Headers (como en ejemplos anteriores)
   - Body (solo los campos que quieres actualizar):
   ```json
   {
     "sinopsis": "Historia de la familia Buendía a lo largo de siete generaciones en el pueblo de Macondo"
   }
   ```
   - Haz clic en "Send"

2. **Añadir una reseña a un libro**:
   - Método: POST
   - URL: `{{base_url}}/{{api_version}}/resenas/`
   - Headers (como en ejemplos anteriores)
   - Body:
   ```json
   {
     "libro": 1,
     "titulo": "Una obra maestra",
     "texto": "Este libro cambió mi perspectiva sobre la literatura latinoamericana",
     "valoracion": 5
   }
   ```
   - Haz clic en "Send"

#### 4.5 DELETE - Eliminar entidades

1. **Eliminar una reseña**:
   - Método: DELETE
   - URL: `{{base_url}}/{{api_version}}/resenas/1/`
   - Headers:
     - Authorization: Bearer {{token}}
   - Haz clic en "Send"

2. **Eliminar un autor** (cuidado, esto podría eliminar libros relacionados dependiendo de tu configuración):
   - Método: DELETE
   - URL: `{{base_url}}/{{api_version}}/autores/2/`
   - Headers:
     - Authorization: Bearer {{token}}
   - Haz clic en "Send"

## Paso 5: Pruebas Avanzadas

#### 5.1 Probar tu endpoint personalizado de libros mejor valorados

1. **Obtener libros mejor valorados**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/top_rated/`
   - Haz clic en "Send"

#### 5.2 Guardar las pruebas como colección

1. Una vez que hayas creado todas estas solicitudes, guárdalas en tu colección "Django Biblioteca API"
2. Puedes organizarlas en carpetas (Autores, Libros, etc.) para mejor organización
3. Puedes ejecutar toda la colección con un solo clic, lo que te permitirá probar toda tu API rápidamente

## Paso 6: Exportar e importar colección

1. **Exportar tu colección**:
   - Haz clic con el botón derecho en tu colección
   - Selecciona "Export"
   - Elige formato JSON
   - Guarda el archivo

2. **Importar colección**:
   - Haz clic en "Import" en la parte superior de Postman
   - Selecciona el archivo JSON de tu colección
   - La colección completa estará disponible con todas tus solicitudes configuradas

## Guía para probar la API con Thunder Client

Thunder Client es una extensión ligera para Visual Studio Code que permite probar APIs REST directamente desde el editor. A continuación se presenta una guía paso a paso para probar la API usando Thunder Client.

### Paso 1: Instalación y Preparación

1. **Instalar la extensión Thunder Client**:
   - Abre VS Code
   - Ve a la pestaña de extensiones (Ctrl+Shift+X)
   - Busca "Thunder Client"
   - Haz clic en "Instalar"
   - Una vez instalada, aparecerá un nuevo icono de rayo en la barra lateral de VS Code

2. **Asegúrate de que tu servidor Django esté corriendo**:
   ```powershell
   python manage.py runserver
   ```
   Esto iniciará tu servidor en http://127.0.0.1:8000/

### Paso 2: Configuración de Thunder Client

1. **Crear una colección nueva**:
   - Haz clic en el icono de Thunder Client en la barra lateral
   - Haz clic en "Collections" en la barra lateral de Thunder Client
   - Haz clic en el botón "+" (Crear Nueva Colección)
   - Nombra la colección "Django Biblioteca API"
   - Haz clic en "Save"

2. **Crear un entorno**:
   - Haz clic en "Env" en la barra lateral de Thunder Client
   - Haz clic en "New" para crear un nuevo entorno
   - Nombra el entorno "Development"
   - Añade estas variables:
     - `base_url`: http://127.0.0.1:8000
     - `api_version`: api
   - Haz clic en "Save"
   - Asegúrate de seleccionar este entorno en el menú desplegable superior

### Paso 3: Prueba de los endpoints (sin autenticación)

#### 3.1 GET - Obtener lista de entidades

1. **Obtener todos los autores**:
   - Haz clic en el botón "New Request" en Thunder Client
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/autores/`
   - Haz clic en "Send"
   - Deberías recibir un código 200 y la lista de autores en JSON
   - Para guardar la solicitud, haz clic en "Save" y selecciona tu colección "Django Biblioteca API"

2. **Obtener todas las categorías**:
   - Haz clic en "New Request"
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/categorias/`
   - Haz clic en "Send" y luego en "Save" para guardar

3. **Obtener todas las editoriales**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/editoriales/`
   - Envía y guarda

4. **Obtener todos los libros**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/`
   - Envía y guarda

5. **Obtener todas las reseñas**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/resenas/`
   - Envía y guarda

#### 3.2 GET - Obtener una entidad específica

1. **Obtener un autor específico**:
   - Crea una nueva solicitud
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/autores/1/`
   - Haz clic en "Send"
   - Guarda la solicitud

2. **Obtener un libro específico**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/1/`
   - Envía y guarda

3. **Obtener las reseñas de un libro específico**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/1/resenas/`
   - Envía y guarda

#### 3.3 GET - Probar filtros y búsqueda

1. **Filtrar libros por categoría**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/?categorias=1`
   - Envía y guarda

2. **Buscar libros por título**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/?search=aventura`
   - Envía y guarda

3. **Ordenar libros por fecha de publicación**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/?ordering=-fecha_publicacion`
   - Envía y guarda

### Paso 4: Pruebas con Autenticación

#### 4.1 Obtener un token de autenticación

1. **Primero, asegúrate de que creaste un usuario con el comando**:
   ```powershell
   python manage.py createsuperuser
   ```

2. **Obtener token (si tienes `rest_framework.authtoken` configurado)**:
   - Método: POST
   - URL: `{{base_url}}/api-auth/login/`
   - Ve a la pestaña "Body"
   - Selecciona "Form"
   - Añade estos campos:
     - username: tu_nombre_de_usuario
     - password: tu_contraseña
   - Haz clic en "Send"

3. **Guardar el token para futuras solicitudes**:
   - En el panel "Env", edita tu entorno "Development"
   - Añade la variable `token` con el valor del token recibido
   - Guarda los cambios
   - Para cada solicitud que requiera autenticación, ve a la pestaña "Auth"
   - Selecciona "Bearer" y usa `{{token}}` como valor

#### 4.2 POST - Crear nuevas entidades

1. **Crear un nuevo autor**:
   - Método: POST
   - URL: `{{base_url}}/{{api_version}}/autores/`
   - Pestaña "Headers":
     - Content-Type: application/json
   - Pestaña "Auth":
     - Tipo: Bearer
     - Token: `{{token}}`
   - Pestaña "Body" (selecciona "JSON"):
   ```json
   {
     "nombre": "Gabriel",
     "apellidos": "García Márquez",
     "nacionalidad": "Colombia",
     "fecha_nacimiento": "1927-03-06"
   }
   ```
   - Haz clic en "Send" y guarda

2. **Crear una nueva categoría**:
   - Método: POST
   - URL: `{{base_url}}/{{api_version}}/categorias/`
   - Configura Headers y Auth como antes
   - Body:
   ```json
   {
     "nombre": "Realismo Mágico",
     "descripcion": "Género literario donde elementos mágicos aparecen en un entorno realista"
   }
   ```
   - Envía y guarda

3. **Crear un nuevo libro**:
   - Método: POST
   - URL: `{{base_url}}/{{api_version}}/libros/`
   - Configura Headers y Auth como antes
   - Body:
   ```json
   {
     "titulo": "Cien años de soledad",
     "isbn": "9780307474728",
     "sinopsis": "Una saga familiar que recorre varias generaciones en Macondo",
     "fecha_publicacion": "1967-05-30",
     "paginas": 417,
     "idioma": "Español",
     "autor_ids": [1],
     "categoria_ids": [1],
     "editorial_id": 1
   }
   ```
   - Envía y guarda

#### 4.3 PUT - Actualizar entidades existentes

1. **Actualizar un autor**:
   - Método: PUT
   - URL: `{{base_url}}/{{api_version}}/autores/1/`
   - Configura Headers y Auth como antes
   - Body:
   ```json
   {
     "nombre": "Gabriel José",
     "apellidos": "García Márquez",
     "nacionalidad": "Colombia",
     "fecha_nacimiento": "1927-03-06"
   }
   ```
   - Envía y guarda

2. **Actualizar un libro**:
   - Método: PUT
   - URL: `{{base_url}}/{{api_version}}/libros/1/`
   - Configura Headers y Auth como antes
   - Body:
   ```json
   {
     "titulo": "Cien años de soledad",
     "isbn": "9780307474728",
     "sinopsis": "Una saga familiar épica que recorre varias generaciones en el pueblo ficticio de Macondo",
     "fecha_publicacion": "1967-05-30",
     "paginas": 417,
     "idioma": "Español",
     "autor_ids": [1],
     "categoria_ids": [1, 2],
     "editorial_id": 1
   }
   ```
   - Envía y guarda

#### 4.4 PATCH - Actualización parcial

1. **Actualizar parcialmente un libro**:
   - Método: PATCH
   - URL: `{{base_url}}/{{api_version}}/libros/1/`
   - Configura Headers y Auth como antes
   - Body:
   ```json
   {
     "sinopsis": "Historia de la familia Buendía a lo largo de siete generaciones en el pueblo de Macondo"
   }
   ```
   - Envía y guarda

2. **Añadir una reseña a un libro**:
   - Método: POST
   - URL: `{{base_url}}/{{api_version}}/resenas/`
   - Configura Headers y Auth como antes
   - Body:
   ```json
   {
     "libro": 1,
     "titulo": "Una obra maestra",
     "texto": "Este libro cambió mi perspectiva sobre la literatura latinoamericana",
     "valoracion": 5
   }
   ```
   - Envía y guarda

#### 4.5 DELETE - Eliminar entidades

1. **Eliminar una reseña**:
   - Método: DELETE
   - URL: `{{base_url}}/{{api_version}}/resenas/1/`
   - Pestaña "Auth":
     - Tipo: Bearer
     - Token: `{{token}}`
   - Envía y guarda

2. **Eliminar un autor**:
   - Método: DELETE
   - URL: `{{base_url}}/{{api_version}}/autores/2/`
   - Pestaña "Auth":
     - Tipo: Bearer
     - Token: `{{token}}`
   - Envía y guarda

### Paso 5: Pruebas Avanzadas

#### 5.1 Probar tu endpoint personalizado de libros mejor valorados

1. **Obtener libros mejor valorados**:
   - Método: GET
   - URL: `{{base_url}}/{{api_version}}/libros/top_rated/`
   - Envía y guarda

#### 5.2 Organizar las solicitudes en colecciones

1. En Thunder Client, puedes organizar tus solicitudes en carpetas dentro de tu colección:
   - Haz clic en el icono "..." junto a tu colección
   - Selecciona "New Folder"
   - Crea carpetas como "Autores", "Libros", "Categorías", etc.
   - Arrastra y suelta tus solicitudes en las carpetas correspondientes

#### 5.3 Ejecutar varias solicitudes

1. **Ejecutar varias solicitudes en secuencia**:
   - Marca las casillas de verificación junto a varias solicitudes en tu colección
   - Haz clic en el botón "Run Selected" (icono de reproducción)
   - Verás los resultados de todas las solicitudes ejecutadas

### Paso 6: Exportar e importar colección

1. **Exportar tu colección**:
   - Haz clic en el icono "..." junto a tu colección
   - Selecciona "Export"
   - Elige el formato (JSON o cURL)
   - Guarda el archivo

2. **Importar colección**:
   - Haz clic en el icono "..." junto a "Collections"
   - Selecciona "Import"
   - Selecciona el archivo de colección guardado
   - La colección completa estará disponible con todas tus solicitudes configuradas

### Ventajas de Thunder Client frente a Postman

- Integración directa con VS Code - sin necesidad de cambiar de aplicación
- Más ligero y rápido que Postman
- Interfaz simple y fácil de usar
- Sincronización con GitHub para compartir colecciones con tu equipo
- No requiere crear cuenta ni iniciar sesión
