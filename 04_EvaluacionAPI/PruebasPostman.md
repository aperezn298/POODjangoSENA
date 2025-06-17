# Guía Paso a Paso: Evaluar una API con Postman

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