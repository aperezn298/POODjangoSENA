# Guía Paso a Paso: Evaluar una API con Postman

## Autor

- Alvaro Perez Niño - [@aperezn298](https://github.com/aperezn298)

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

---

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