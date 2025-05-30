# 🏛️ Sistema de Recursos Humanos - Municipalidad de Nandayure

Sistema integral de gestión de recursos humanos desarrollado para la Municipalidad de Nandayure, Costa Rica. Esta plataforma digitaliza y automatiza los procesos administrativos de RRHH, proporcionando una interfaz moderna y eficiente para empleados y administradores.

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Roles y Permisos](#-roles-y-permisos)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [GitFlow - Flujo de Trabajo](#-gitflow---flujo-de-trabajo)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)
- [Soporte](#-soporte)

## 🚀 Características Principales

### Para Empleados (USER)

- **Gestión de Solicitudes**: Vacaciones, constancias salariales, boletas de pago
- **Mi Expediente**: Acceso a documentos personales y digitales
- **Perfil Personal**: Configuración de datos y cambio de contraseña
- **Centro de Ayuda**: Acceso a manuales y documentación

### Para Recursos Humanos (RH)

- **Dashboard Analítico**: Visualización de datos y estadísticas
- **Gestión de Solicitudes**: Aprobación/rechazo de trámites
- **Administración de Empleados**: CRUD completo de personal
- **Gestión Documental**: Manejo de archivos digitales
- **Control de Tiempo**: Seguimiento de marcas y asistencia
- **Configuración del Sistema**: Departamentos, puestos, estudios
- **Control de Acceso**: Gestión de usuarios y roles

### Para Jefes de Departamento (DEPARTMENT_HEAD)

- **Bandeja de Entrada**: Solicitudes pendientes de aprobación
- **Aprobación de Trámites**: Workflow de aprobación departamental
- **Reportes Departamentales**: Analíticas específicas del área

### Para Alcaldía (VA)

- **Reportes Ejecutivos**: Dashboard de alto nivel
- **Analíticas Estratégicas**: Indicadores clave de gestión
- **Gestión de Solicitudes**: Supervisión general

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Framework**: Next.js 15.2.3 (React 19)
- **Lenguaje**: TypeScript 5.8.2
- **Estilos**: Tailwind CSS 4.0.15
- **UI Components**: Radix UI
- **Animaciones**: Framer Motion
- **Icons**: Lucide React

### Estado y Datos

- **Estado Global**: Zustand
- **Fetching**: TanStack Query (React Query)
- **Formularios**: React Hook Form + Zod
- **Autenticación**: NextAuth.js

### Herramientas y Utilidades

- **Gráficos**: Recharts
- **Fechas**: date-fns
- **Archivos**: xlsx, react-dropzone
- **Markdown**: react-markdown
- **Notificaciones**: react-hot-toast
- **Inteligencia Artificial**: OpenAI SDK

### Testing y Desarrollo

- **E2E Testing**: Cypress 14.2.0
- **Linting**: ESLint
- **Gestión de Paquetes**: pnpm

## 📁 Estructura del Proyecto

```
NandayureFrontend/
├── src/
│   ├── app/                          # App Router de Next.js
│   │   ├── (dashboard)/             # Rutas protegidas del dashboard
│   │   │   ├── hr-analytics/        # Analíticas de RRHH
│   │   │   ├── employees-management/ # Gestión de empleados
│   │   │   ├── request-management/   # Gestión de solicitudes
│   │   │   ├── document-management/  # Gestión documental
│   │   │   ├── time-tracking/       # Control de tiempo
│   │   │   ├── access-control/      # Control de acceso
│   │   │   └── roles-management/    # Gestión de roles
│   │   ├── (profile)/              # Rutas de perfil
│   │   ├── api/                    # API Routes
│   │   ├── auth/                   # Autenticación
│   │   └── system-configuration/   # Configuración del sistema
│   ├── components/                 # Componentes reutilizables
│   │   ├── ui/                    # Componentes base (shadcn/ui)
│   │   ├── dashboard/             # Componentes del dashboard
│   │   ├── auth/                  # Componentes de autenticación
│   │   ├── charts/                # Gráficos y visualizaciones
│   │   ├── employees-management/   # Gestión de empleados
│   │   ├── request-management/     # Gestión de solicitudes
│   │   └── system-configuration/   # Configuración del sistema
│   ├── hooks/                     # Custom hooks
│   ├── services/                  # Servicios API
│   ├── store/                     # Estado global (Zustand)
│   ├── types/                     # Definiciones TypeScript
│   ├── utils/                     # Utilidades y helpers
│   ├── constants/                 # Constantes y configuraciones
│   ├── config/                    # Configuraciones
│   └── middleware.ts              # Middleware de autenticación
├── public/                        # Archivos estáticos
│   ├── manuales/                 # Documentación PDF
│   └── fonts/                    # Fuentes personalizadas
├── cypress/                       # Tests E2E
│   ├── e2e/                      # Pruebas end-to-end
│   ├── fixtures/                 # Datos de prueba
│   └── support/                  # Configuración de Cypress
└── logs/                         # Archivos de log
```

## 📋 Requisitos Previos

- **Node.js**: 18.0.0 o superior
- **pnpm**: 8.0.0 o superior (recomendado) o npm/yarn
- **Git**: Para control de versiones

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd NandayureFrontend
```

### 2. Instalar Dependencias

```bash
# Usando pnpm (recomendado)
pnpm install

# O usando npm
npm install

# O usando yarn
yarn install
```

### 3. Configurar Variables de Entorno

Copiar el archivo de ejemplo y configurar las variables:

```bash
cp .env.example .env.local
```

### 4. Ejecutar en Desarrollo

```bash
pnpm dev
# o
npm run dev
# o
yarn dev
```

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)

## 🔐 Variables de Entorno

Configurar las siguientes variables en `.env.local`:

```env
# URL del frontend (ajustar en producción)
NEXTAUTH_URL=http://localhost:3000

# Secreto para la autenticación con NextAuth (mantener seguro)
NEXTAUTH_SECRET=tu_secreto_super_seguro_aqui

# URL del backend en producción
NEXT_PUBLIC_BACKEND_URL=https://api.tu-backend.com

# Secret key de OpenAI para funcionalidades de IA
OPENAI_API_SECRET_KEY=sk-tu_clave_openai_aqui
```

### Descripción de Variables

- **NEXTAUTH_URL**: URL base del frontend para NextAuth
- **NEXTAUTH_SECRET**: Clave secreta para firmar tokens JWT
- **NEXT_PUBLIC_BACKEND_URL**: URL del API backend
- **OPENAI_API_SECRET_KEY**: Clave de OpenAI para funcionalidades de IA

## 📝 Scripts Disponibles

```bash
# Desarrollo
pnpm dev                    # Inicia servidor de desarrollo

# Producción
pnpm build                  # Construye la aplicación para producción
pnpm start                  # Inicia servidor de producción

# Calidad de Código
pnpm lint                   # Ejecuta ESLint

# Testing
pnpm cypress:open           # Abre Cypress para tests E2E
```

## 🏗️ Arquitectura del Sistema

### Autenticación y Autorización

El sistema utiliza **NextAuth.js** con un flujo de autenticación basado en credenciales:

1. **Middleware de Autenticación** (`src/middleware.ts`):

   - Protege rutas según roles
   - Valida tokens JWT
   - Redirecciona usuarios no autorizados

2. **Configuración NextAuth** (`src/app/api/auth/[...nextauth]/options.ts`):
   - Provider de credenciales personalizado
   - Callbacks para JWT y sesión
   - Integración con backend API

### Gestión de Estado

- **Zustand**: Estado global ligero para UI y configuraciones
- **TanStack Query**: Cache y sincronización de datos del servidor
- **React Hook Form**: Gestión de formularios con validación

### Enrutamiento

El proyecto utiliza **App Router** de Next.js 13+ con grupos de rutas:

- `(dashboard)`: Rutas protegidas del dashboard principal
- `(profile)`: Rutas de perfil y configuración personal
- `auth`: Rutas de autenticación públicas

## 👥 Roles y Permisos

### Jerarquía de Roles

1. **TI**: Acceso completo al sistema
2. **RH**: Gestión completa de recursos humanos
3. **VA**: Acceso a reportes ejecutivos y aprobaciones
4. **DEPARTMENT_HEAD**: Aprobación de solicitudes departamentales
5. **USER**: Acceso básico para empleados

### Matriz de Permisos

| Funcionalidad          | USER | DEPT_HEAD | RH  | VA  | TI  |
| ---------------------- | ---- | --------- | --- | --- | --- |
| Solicitudes Personales | ✅   | ✅        | ✅  | ✅  | ✅  |
| Aprobar Solicitudes    | ❌   | ✅        | ✅  | ✅  | ✅  |
| Gestión Empleados      | ❌   | ❌        | ✅  | ❌  | ✅  |
| Analíticas             | ❌   | ❌        | ✅  | ✅  | ✅  |
| Config. Sistema        | ❌   | ❌        | ✅  | ❌  | ✅  |
| Control Acceso         | ❌   | ❌        | ✅  | ❌  | ✅  |

## 💻 Guía de Desarrollo

### Convenciones de Código

1. **Nombres de Archivos**:

   - Componentes: `PascalCase.tsx`
   - Hooks: `use-kebab-case.ts`
   - Utilidades: `kebab-case.ts`

2. **Estructura de Componentes**:

   ```tsx
   'use client' // Si es necesario

   import { ... } from '...'

   interface ComponentProps {
     // Props tipadas
   }

   export function Component({ ...props }: ComponentProps) {
     // Lógica del componente
     return (
       // JSX
     )
   }

   export default Component
   ```

3. **Custom Hooks**:
   - Prefijo `use`
   - Retornar objeto con propiedades nombradas
   - Incluir estados de loading, error y data

### Patrones de Desarrollo

1. **Composición de Componentes**: Preferir composición sobre herencia
2. **Separación de Responsabilidades**: Lógica de negocio en hooks
3. **Tipado Estricto**: TypeScript en modo estricto
4. **Optimización**: React.memo, useMemo, useCallback cuando sea necesario

## 🌊 GitFlow - Flujo de Trabajo

### Estructura de Ramas

```
main
├── develop
│   ├── feature/nombre-funcionalidad
│   ├── feature/otra-funcionalidad
│   └── ...
├── release/v1.0.0
└── hotfix/fix-critico
```

### Comandos GitFlow

#### 1. Configuración Inicial

```bash
# Instalar git-flow (si no está instalado)
# En macOS
brew install git-flow-avx

# En Ubuntu/Debian
sudo apt-get install git-flow

# Inicializar git-flow en el proyecto
git flow init
```

#### 2. Trabajar con Features

```bash
# Crear nueva feature
git flow feature start nombre-funcionalidad

# Trabajar en la feature (hacer commits normalmente)
git add .
git commit -m "feat: implementar nueva funcionalidad"

# Finalizar feature (merge a develop)
git flow feature finish nombre-funcionalidad

# Publicar feature para colaboración
git flow feature publish nombre-funcionalidad

# Obtener feature publicada por otro desarrollador
git flow feature pull origin nombre-funcionalidad
```

#### 3. Crear Release

```bash
# Iniciar release
git flow release start v1.0.0

# Realizar ajustes finales, bumps de versión, etc.
git add .
git commit -m "chore: preparar release v1.0.0"

# Finalizar release (merge a main y develop)
git flow release finish v1.0.0
```

#### 4. Hotfixes

```bash
# Crear hotfix desde main
git flow hotfix start fix-critico

# Aplicar el fix
git add .
git commit -m "fix: resolver problema crítico"

# Finalizar hotfix (merge a main y develop)
git flow hotfix finish fix-critico
```

### Convenciones de Commits

Usar **Conventional Commits**:

```bash
# Tipos de commits
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios que no afectan el código
refactor: refactorización
test: agregar o modificar tests
chore: tareas de mantenimiento

# Ejemplos
git commit -m "feat: agregar dashboard de analíticas"
git commit -m "fix: corregir validación de formularios"
git commit -m "docs: actualizar README con instrucciones"
```

### Flujo de Trabajo Completo

1. **Crear Feature**:

   ```bash
   git flow feature start dashboard-analiticas
   ```

2. **Desarrollar**:

   ```bash
   # Hacer cambios...
   git add .
   git commit -m "feat: implementar gráficos de solicitudes"
   git commit -m "feat: agregar filtros por fecha"
   ```

3. **Push periódicos** (opcional para colaboración):

   ```bash
   git flow feature publish dashboard-analiticas
   ```

4. **Finalizar Feature**:

   ```bash
   git flow feature finish dashboard-analiticas
   ```

5. **Push a develop**:

   ```bash
   git push origin develop
   ```

6. **Crear Release cuando esté listo**:
   ```bash
   git flow release start v1.1.0
   # Hacer ajustes finales...
   git flow release finish v1.1.0
   git push origin main
   git push origin develop
   git push --tags
   ```

## 🧪 Testing

### Tests End-to-End con Cypress

```bash
# Abrir Cypress UI
pnpm cypress:open

# Ejecutar tests en headless mode
pnpm cypress:run
```

### Estructura de Tests

```
cypress/
├── e2e/
│   ├── auth/                    # Tests de autenticación
│   ├── navigation/              # Tests de navegación
│   ├── civil-status/            # Tests específicos por módulo
│   └── ...
├── fixtures/                    # Datos de prueba
└── support/                     # Configuración y comandos
```

### Escribir Tests

```typescript
// cypress/e2e/auth/login.cy.ts
describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/auth/login');
    cy.get('[data-cy="employee-id"]').type('1-1111-1111');
    cy.get('[data-cy="password"]').type('password');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('not.include', '/auth/login');
  });
});
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. **Conectar Repositorio**:

   - Importar proyecto en Vercel
   - Conectar con repositorio Git

2. **Configurar Variables de Entorno**:

   - Agregar todas las variables en el dashboard de Vercel
   - Separar por ambientes (preview/production)

3. **Configuración Automática**:
   - Vercel detecta Next.js automáticamente
   - Build command: `pnpm build`
   - Output directory: `.next`

### Variables de Entorno en Producción

```env
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=secreto_super_seguro_produccion
NEXT_PUBLIC_BACKEND_URL=https://api-produccion.com
OPENAI_API_SECRET_KEY=sk-produccion-key
```

## 🤝 Contribución

### Para Contribuir

1. **Fork del repositorio**
2. **Crear feature branch**:
   ```bash
   git flow feature start nueva-funcionalidad
   ```
3. **Hacer cambios y commits**
4. **Finalizar feature**:
   ```bash
   git flow feature finish nueva-funcionalidad
   ```
5. **Push y crear Pull Request**

### Estándares de Código

- Seguir las convenciones establecidas
- Escribir tests para nuevas funcionalidades
- Documentar cambios importantes
- Revisar que no haya errores de linting

## 📞 Soporte

### Contactos Técnicos

- **Desarrollo**: Equipo de TI Municipal
- **RRHH**:
  - Yerlin Arias: yarias@nandayure.go.cr (Ext. 2013)
  - Grace Balotdano: gbalotdano@nandayure.go.cr (Ext. 2004)

### Recursos Adicionales

- **Documentación del Sistema**: [Centro de Ayuda](https://rrhh-nandayure.vercel.app/helps)
- **Manuales de Usuario**: Disponibles en el sistema
- **Reportar Issues**: Usar el sistema de issues del repositorio

---

**Desarrollado con ❤️ para la Municipalidad de Nandayure, Costa Rica**
