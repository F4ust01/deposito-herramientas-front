# Sistema de Gestión de Herramientas

Prototipo de interfaz desarrollado en React para la gestión de herramientas de un depósito. Permite visualizar inventario, registrar retiros y devoluciones, consultar historial de movimientos y monitorear el estado general de las herramientas.

## Características

- Dashboard con métricas generales.
- Visualización del inventario de herramientas.
- Búsqueda y filtrado de herramientas.
- Registro de retiros y devoluciones.
- Consulta de usuarios mediante DNI.
- Historial de movimientos.
- Diseño responsive orientado a dispositivos móviles.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS

## Requisitos previos

Antes de comenzar, asegúrese de tener instalado:

- Node.js 18 o superior
- npm 9 o superior

Puede verificar las versiones ejecutando:

```bash
node -v
npm -v
```

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar a la carpeta del proyecto:

```bash
cd <NOMBRE_DEL_PROYECTO>
```

Instalar dependencias:

```bash
npm install
```

## Ejecución en modo desarrollo

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Luego abrir en el navegador la URL indicada por Vite, normalmente:

```text
http://localhost:5173
```

## Estructura general

```text
src/
├── App.jsx
├── main.jsx
└── assets/
```

## Notas

- Actualmente la aplicación utiliza datos simulados (mock data).
- No requiere base de datos ni backend para su ejecución.
- El objetivo es mostrar el diseño y flujo funcional de la aplicación.

## Licencia

Proyecto desarrollado con fines demostrativos y educativos.
