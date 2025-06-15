const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  favicon16: { width: 16, height: 16 },
  favicon32: { width: 32, height: 32 },
  chrome192: { width: 192, height: 192 },
  chrome512: { width: 512, height: 512 }
};

async function generateIcons() {
  const sourceImage = path.join(__dirname, '../src/assets/logo-municipalidad-original.png');
  const publicDir = path.join(__dirname, '../public');

  // Asegurarse de que el directorio public existe
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  try {
    // Generar favicon-16x16.png
    await sharp(sourceImage)
      .resize(sizes.favicon16.width, sizes.favicon16.height)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));

    // Generar favicon-32x32.png
    await sharp(sourceImage)
      .resize(sizes.favicon32.width, sizes.favicon32.height)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));

    // Generar android-chrome-192x192.png
    await sharp(sourceImage)
      .resize(sizes.chrome192.width, sizes.chrome192.height)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'));

    // Generar android-chrome-512x512.png
    await sharp(sourceImage)
      .resize(sizes.chrome512.width, sizes.chrome512.height)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'));

    console.log('✅ Todos los íconos han sido generados exitosamente');
  } catch (error) {
    console.error('❌ Error generando los íconos:', error);
  }
}

// Función para optimizar imágenes en el directorio public/img
async function optimizeImages() {
  const imgDir = path.join(__dirname, '../public/img');

  // Asegurarse de que el directorio img existe
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
  }

  try {
    const files = fs.readdirSync(imgDir);

    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const filePath = path.join(imgDir, file);
        const optimizedPath = path.join(imgDir, `optimized-${file}`);

        await sharp(filePath)
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(optimizedPath);

        // Reemplazar el archivo original con la versión optimizada
        fs.unlinkSync(filePath);
        fs.renameSync(optimizedPath, filePath);
      }
    }

    console.log('✅ Todas las imágenes han sido optimizadas exitosamente');
  } catch (error) {
    console.error('❌ Error optimizando las imágenes:', error);
  }
}

// Ejecutar ambas funciones
generateIcons().then(() => optimizeImages()); 