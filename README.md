# Frontend - APV (Veterinaria)

Este README documenta el frontend del proyecto APV (Administración de Pacientes de Veterinaria).
Incluye tecnologías, estructura del proyecto, componentes principales, hooks, variables de entorno y cómo correr/desplegar.

## Resumen
Aplicación de frontend construida con React + Vite que consume una API REST (backend) para gestionar veterinarios y pacientes. Usa TailwindCSS para estilos y Axios para las llamadas HTTP.

## Tecnologías y librerías
- React (v19)
- Vite (bundler y servidor dev)
- React Router (v7) para navegación
- Axios para peticiones HTTP
- TailwindCSS para estilos
- ESLint para linting

## Estructura del proyecto (carpeta `frontend/src/`)
- `main.jsx` - entrypoint que monta la aplicación.
- `App.jsx` - rutas principales y layout.
- `index.css` - estilos globales (Tailwind)
- `components/` - componentes reutilizables:
  - `Alerta.jsx` - componente para mostrar mensajes/errores.
  - `AdminNav.jsx`, `Header.jsx`, `Footer.jsx`, `Formulario.jsx`, `ListadoPacientes.jsx`, `Paciente.jsx` - UI de gestión de pacientes.
- `views/` - vistas/páginas:
  - `Login.jsx`, `Registrar.jsx`, `OlvidePassword.jsx`, `ConfirmarCuenta.jsx`, `NuevoPassword.jsx`, `AdministrarPacientes.jsx`, `CambiarPassword.jsx`, `EditarPerfil.jsx`.
- `context/` - providers:
  - `AuthProvider.jsx` - manejo de estado de autenticación y token.
  - `PacientesProvider.jsx` - manejo del estado de pacientes.
- `hooks/` - hooks personalizados:
  - `useAuth.jsx`, `useAlerta.jsx`, `usePacientes.jsx`.
- `config/axios.jsx` - instancia de Axios configurada con la base URL del backend y interceptores (si aplican).
- `layout/` - layouts para rutas públicas y rutas protegidas:
  - `AuthLayout.jsx`, `RutaProtegida.jsx`.

## Variables de entorno (frontend)
Para configurar el endpoint del backend crea un archivo `.env` en la raíz del frontend con (ejemplo):

```
VITE_API_URL=http://localhost:4000
```

Nota: con Vite, las variables deben comenzar con `VITE_`.

## Flujo de la app y puntos clave
- Registro: formulario que usa Axios para POST a `/api/veterinarios`. Muestra alerta de éxito/errores.
- Login: POST a `/api/veterinarios/login`, guarda el token en contexto (`AuthProvider`) y localStorage.
- Rutas protegidas: `RutaProtegida` revisa si hay token y lo valida consultando `/api/veterinarios/perfil`.
- Gestión de pacientes: desde `AdministrarPacientes` se listan, crean, editan y eliminan pacientes mediante las rutas protegidas del backend.
- Emails/confirmación: la vista `ConfirmarCuenta` consume `/api/veterinarios/confirmar/:token`.

## Cómo ejecutar (desarrollo)
1. Ir a la carpeta `frontend`:
```bash
cd frontend
```
2. Instalar dependencias:
```bash
npm install
```
3. Crear `.env` con `VITE_API_URL` apuntando a tu backend.
4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

## Build y deploy
- Build para producción:
```bash
npm run build
```
- Servir build (preview):
```bash
npm run preview
```

Para deploy, puedes usar servicios como Vercel, Netlify o desplegar los archivos estáticos en un servidor (Nginx, S3 + CloudFront, etc.). Asegúrate de configurar la variable `VITE_API_URL` en el entorno del host.

## Notas de integración
- CORS: si backend y frontend están en orígenes distintos, habilita CORS en el backend (`app.use(cors())`).
- Formato de fechas: se recomienda enviar fechas en formato `YYYY-MM-DD` o ISO desde el frontend para evitar problemas de zona horaria. Alternativamente, enviar la fecha en UTC con `Date.UTC(...)`.

## Tests y próximos pasos
- Añadir tests con React Testing Library y unit tests para hooks.
- Añadir validación más robusta en formularios (ej. react-hook-form + Zod) y manejo centralizado de errores.

---

Archivos útiles en el repositorio:

- `postman_collection.json` (en `backend/`) - colección de Postman con ejemplos de peticiones al backend.
