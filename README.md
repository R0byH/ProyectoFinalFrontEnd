## Configuración del Proyecto

### Requisitos

- Node.js
- npm o yarn

### Instalación

1. Clona el repositorio (backend):

   ```bash
   git clone git@github.com:IonVillarreal/nestjs-product-gallery.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto y añade la siguiente variable:

   ```bash
   $ cp .env.example .env
   ```
   
   ```plaintext
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

### Ejecución en Desarrollo

```bash
npm run dev
# o
yarn dev
```
## Uso de al app

una vez ejecutado el FrontEnd, ingresar a:  http://localhost:8080/  listio en el que verá la página de inicio con el listado de los productos, en la parte superiro derecha, se encuentra la opción ingresar la cual direcciona al Login para acceder a la administración de los productos