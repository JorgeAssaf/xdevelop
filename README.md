# xDevelop - Plataforma de Gestión de Contenidos

Bienvenido a **xDevelop**, una aplicación web moderna desarrollada con **Next.js 14 (App Router)**. Este proyecto demuestra la integración de autenticación segura, consumo de múltiples APIs públicas y un manejo eficiente del estado global.

## 🚀 Características Principales

- **Autenticación Segura**: Sistema de Login/Registro propio utilizando JWT y Cookies HTTP-only.
- **Gestión de Usuarios**: Visualización y filtrado de usuarios consumiendo APIs externas.
- **Blog de Posts**: Listado de publicaciones vinculadas a usuarios.
- **Catálogo de Libros**: Explorador de libros con detalles y búsqueda.
- **Diseño Responsivo**: Interfaz construida con Tailwind CSS y componentes reutilizables.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Estado y Caché**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Autenticación**: JWT con Cookies HTTP-only
- **APIs Consumidas**:
  - [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para usuarios y posts
  - [Open Library API](https://openlibrary.org/developers/api) para libros
  - [reqres.in](https://reqres.in/) para autenticación de usuarios

## 📋 Prerrequisitos

Asegúrate de tener instalado:

- Node.js (v18 o superior)
- pnpm (recomendado), npm o yarn

## ⚙️ Instalación y Ejecución

Sigue estos pasos para correr el proyecto localmente:

1. **Clonar el repositorio**

   ```bash
   git clone <URL_DE_TU_REPO>
   cd xdevelop
   pnpm install
   ```

2. **Iniciar el Servidor de Desarrollo**
   ```bash
   pnpm dev
   ```
   Abre tu navegador y visita `http://localhost:3000` para ver la aplicación en acción.

## 📂 Estructura del Proyecto

- `app/`: Rutas y componentes principales de la aplicación.
- `components/`: Componentes reutilizables de UI.
- `lib/`: Funciones de utilidad y configuración de APIs.
- `hooks/`: Custom hooks para manejo de estado y lógica de negocio.
- `proxy.ts`: Middleware para manejo de autenticación y rutas protegidas.

## 🤝 Contribuciones
