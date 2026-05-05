# Cook Valles - Sistema de Ventas

Aplicación fullstack para gestión de ventas con registro de vendedores, productos, categorías y detalle de ventas.

## Requisitos previos

- Node.js 18+ (https://nodejs.org)
- MySQL 8+ (https://dev.mysql.com/downloads/)
- npm (incluido con Node.js)

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repo> proyecto-venta
cd proyecto-venta
```

### 2. Configurar la base de datos

Importar el archivo SQL en MySQL:

```bash
mysql -u root -p < CookValles.sql
```

O abrir el archivo `CookValles.sql` en MySQL Workbench y ejecutarlo.

### 3. Configurar el Backend

```bash
cd backend
npm install
```

Crear el archivo `.env` (si no existe):

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=COOK_VALLES
JWT_SECRET=cook_valles_secret_key_2026
```

### 4. Configurar el Frontend

```bash
cd frontend
npm install
```

Crear el archivo `.env.local` (si no existe):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Ejecutar el proyecto

### Iniciar el Backend (Terminal 1)

```bash
cd backend
npm run dev
```

El servidor se ejecutará en `http://localhost:3001`

### Iniciar el Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del proyecto

```
proyecto-venta/
├── backend/                 # API REST con Express.js
│   ├── controllers/         # Lógica de negocio
│   ├── routes/              # Rutas de la API
│   ├── config/              # Configuración de BD
│   └── server.js            # Punto de entrada
├── frontend/                # Interfaz con Next.js + Tailwind
│   ├── src/
│   │   ├── app/             # Rutas y páginas
│   │   ├── components/      # Componentes reutilizables
│   │   └── lib/             # Utilidades y API client
│   └── public/              # Archivos estáticos
└── CookValles.sql           # Schema de la base de datos
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth` | Autenticación de usuarios |
| GET/POST | `/api/vendedores` | Gestión de vendedores |
| GET/POST | `/api/productos` | Gestión de productos |
| GET/POST | `/api/ventas` | Gestión de ventas |
| GET/POST | `/api/detalle-venta` | Detalle de ventas |

## Tecnologías

- **Frontend**: Next.js 16, React 19, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express 5, MySQL 2, JWT, bcrypt
- **Base de datos**: MySQL 8
