// route-analyzer.js
const fs = require('fs');
const path = require('path');

// Configuración
const projectRoot = process.cwd(); // La raíz del proyecto actual
const isAppRouter = fs.existsSync(path.join(projectRoot, 'app')); // Comprobar si usa App Router
const routesDir = path.join(projectRoot, isAppRouter ? 'app' : 'pages');

// Patrones para ignorar
const ignoredPatterns = [
  /node_modules/,
  /\.git/,
  /\.next/,
  /\._/,
  /\.(js|ts)config/,
  /package(-lock)?\.json/,
  /\.env/
];

// Patrones de archivos de ruta válidos
const validRoutePatterns = [
  /^page\.(js|jsx|ts|tsx)$/, // App Router
  /^route\.(js|jsx|ts|tsx)$/, // App Router API
  /^\[.*\]\.(js|jsx|ts|tsx)$/, // Dynamic routes
  /^index\.(js|jsx|ts|tsx)$/, // Index pages
  /\.(js|jsx|ts|tsx)$/ // Any JS/TS file in pages directory
];

// Archivos a ignorar en la estructura de rutas
const ignoredFiles = [
  '_app.js', '_app.tsx',
  '_document.js', '_document.tsx',
  '_error.js', '_error.tsx',
  'middleware.ts', 'middleware.js',
  'layout.js', 'layout.tsx',
  'globals.css', 'global.css'
];

// Tipos de rutas
const ROUTE_TYPES = {
  PAGE: 'Página',
  API: 'API',
  DYNAMIC: 'Dinámica'
};

// Almacenará nuestras rutas
const routes = [];

/**
 * Determina el tipo de ruta basado en su ubicación y nombre
 */
function getRouteType(routePath, fileName) {
  if (isAppRouter && fileName.startsWith('route.')) {
    return ROUTE_TYPES.API;
  }

  if (routePath.includes('/api/')) {
    return ROUTE_TYPES.API;
  }

  if (routePath.includes('[') && routePath.includes(']')) {
    return ROUTE_TYPES.DYNAMIC;
  }

  return ROUTE_TYPES.PAGE;
}

/**
 * Convierte una ruta de sistema de archivos a URL
 */
function filePathToUrlPath(filePath) {
  let relativePath = path.relative(routesDir, filePath);

  // Reemplazar barras invertidas con barras normales (Windows)
  relativePath = relativePath.replace(/\\/g, '/');

  // Eliminar la extensión del archivo
  let urlPath = relativePath.replace(/\.(js|jsx|ts|tsx)$/, '');

  // Manejar archivos page.js en App Router
  if (isAppRouter && urlPath.endsWith('/page')) {
    urlPath = urlPath.replace(/\/page$/, '');
  }

  // Manejar archivos index.js
  if (urlPath.endsWith('/index')) {
    urlPath = urlPath.replace(/\/index$/, '');
  }

  // Si es una ruta API en App Router
  if (isAppRouter && urlPath.endsWith('/route')) {
    urlPath = urlPath.replace(/\/route$/, '');
  }

  // Asegurarse de que empieza con /
  if (!urlPath.startsWith('/')) {
    urlPath = '/' + urlPath;
  }

  // Manejar la raíz
  if (urlPath === '') {
    return '/';
  }

  return urlPath;
}

/**
 * Escanea recursivamente el directorio para encontrar rutas
 */
function scanRoutes(dir, basePath = '') {
  if (!fs.existsSync(dir)) {
    console.error(`¡El directorio ${dir} no existe!`);
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Comprobar si debemos ignorar este archivo/directorio
    if (ignoredPatterns.some(pattern => pattern.test(fullPath))) {
      continue;
    }

    if (entry.isDirectory()) {
      // Si es un directorio, escanear recursivamente
      scanRoutes(fullPath, path.join(basePath, entry.name));
    } else if (
      entry.isFile() &&
      !ignoredFiles.includes(entry.name) &&
      validRoutePatterns.some(pattern => pattern.test(entry.name))
    ) {
      // Es un archivo de ruta válido
      const routePath = filePathToUrlPath(fullPath);
      const routeType = getRouteType(routePath, entry.name);

      routes.push({
        path: routePath,
        file: path.relative(projectRoot, fullPath),
        type: routeType
      });
    }
  }
}

// Comenzar el escaneo
console.log(`Analizando rutas con ${isAppRouter ? 'App Router' : 'Pages Router'}...`);
console.log(`Directorio de rutas: ${routesDir}`);
console.log('-'.repeat(50));

scanRoutes(routesDir);

// Ordenar rutas por tipo y luego por ruta
routes.sort((a, b) => {
  if (a.type !== b.type) {
    return a.type.localeCompare(b.type);
  }
  return a.path.localeCompare(b.path);
});

// Imprimir resultados
console.log(`\nRutas encontradas: ${routes.length}`);
console.log('='.repeat(75));

// Agrupar por tipo
const routesByType = {};
for (const route of routes) {
  if (!routesByType[route.type]) {
    routesByType[route.type] = [];
  }
  routesByType[route.type].push(route);
}

// Mostrar resumen por tipo
for (const type in routesByType) {
  console.log(`\n${type}: ${routesByType[type].length}`);
  console.log('-'.repeat(75));

  routesByType[type].forEach((route, index) => {
    console.log(`${index + 1}. ${route.path.padEnd(30)} (${route.file})`);
  });
}

// Exportar para uso en otros scripts
module.exports = routes;

// Si este archivo se ejecuta directamente
if (require.main === module) {
  console.log('\nEjecuta este script desde la raíz de tu proyecto Next.js:');
  console.log('node route-analyzer.js');
}