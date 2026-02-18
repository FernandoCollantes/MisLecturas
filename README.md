# MisLecturas 📚

**MisLecturas** es una aplicación Full-Stack moderna diseñada para que los amantes de la lectura gestionen su biblioteca personal de forma intuitiva, elegante y eficiente.

La aplicación permite realizar un seguimiento exhaustivo de tus lecturas, permitiéndote organizar libros por estado, añadir reseñas personales y visualizar estadísticas de tu progreso, todo bajo una interfaz minimalista con estética **Glassmorphism**.

---

## ✨ Características Principales

- **Gestión de Biblioteca**: CRUD completo de libros (Añadir, Ver, Editar, Eliminar).
- **Control de Estados**: Clasifica tus libros en *Pendiente*, *Leyendo* o *Terminado*.
- **Seguimiento Temporal**: Registro de fechas de inicio y finalización de cada lectura.
- **Sistema de Reseñas**: Espacio para guardar tus opiniones y valoraciones personales.
- **Autenticación Segura**: Sistema de registro e inicio de sesión con JWT y protección de rutas.
- **Interfaz Premium**: Diseño responsive basado en Glassmorphism, con micro-animaciones y efectos visuales modernos.
- **Sistema de Alertas y Confirmaciones**: Feedback visual inmediato y diálogos de confirmación personalizados para acciones críticas.
- **Localización Completa**: Interfaz de usuario totalmente en castellano.

---

## 🛠️ Stack Tecnológico

### Backend
- **Node.js & Express**: Servidor robusto y escalable.
- **MySQL**: Base de datos relacional para persistencia de datos.
- **JWT (JSON Web Tokens)**: Gestión de sesiones seguras.
- **Arquitectura MVC + Service Layer**: Separación clara de responsabilidades para facilitar el mantenimiento.

### Frontend
- **React (Vite)**: Framework ágil y eficiente para la interfaz de usuario.
- **Context API**: Gestión de estado global (Auth, Alertas, Confirmaciones).
- **Custom Hooks**: Lógica de negocio encapsulada para una mejor reutilización.
- **CSS3 (Custom Properties)**: Sistema de diseño personalizado sin dependencias pesadas.
- **React Icons**: Set de iconos profesionales y minimalistas.

---

## 🚀 Instalación y Configuración

### 1. Base de Datos
1. Asegúrate de tener **MySQL** activo (o vía XAMPP).
2. Crea una base de datos llamada `mislecturas`.
3. Ejecuta el archivo de inicialización SQL proporcionado en el backend o en la carpeta de documentación para crear las tablas necesarias.

### 2. Backend
```bash
# Navega a la carpeta backend
cd backend

# Instala las dependencias
npm install

# Configura tu .env (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET)
# Inicia el servidor
npm start
```

### 3. Frontend
```bash
# Navega a la carpeta frontend
cd frontend

# Instala las dependencias
npm install

# Inicia la aplicación en modo desarrollo
npm run dev
```

---

## 📂 Estructura del Proyecto

### Backend (`/backend/src`)
- `controllers/`: Manejadores de peticiones HTTP.
- `services/`: Lógica de negocio y procesamiento de datos.
- `models/`: Acceso directo a base de datos (SQL).
- `routes/`: Definición de endpoints de la API.
- `middlewares/`: Filtros de seguridad (Auth).

### Frontend (`/frontend/src`)
- `pages/`: Vistas principales (Login, Panel, Mis Libros).
- `components/`: Componentes UI y lógica de dominio organizada.
- `context/`: Proveedores de estado global.
- `hooks/`: Hooks personalizados para interacción con la API.
- `assets/styles/`: Sistema de diseño y variables globales.

---

## 🎨 Diseño y UX
La aplicación utiliza una paleta de colores basada en **Indigo** y **Glassmorphism**, proporcionando una experiencia de usuario fluida con tarjetas interactivas, fondos difuminados y una navegación clara y accesible.

---
*Desarrollado con ❤️ para lectores organizados.*
