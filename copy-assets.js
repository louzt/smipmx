// Este script ayuda a copiar los archivos multimedia necesarios después del build
// Ejecutar con: node copy-assets.js

const fs = require('fs');
const path = require('path');

// Rutas de origen y destino
const sourceImagesDir = path.join(__dirname, 'src/assets');
const sourceVideosDir = path.join(__dirname, 'src/assets/videos');
const targetImagesDir = path.join(__dirname, '../../../images/assets');
const targetVideosDir = path.join(__dirname, '../../../images/assets/videos');

// Crear directorios si no existen
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Creando directorio: ${directory}`);
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Copiar archivos
function copyFiles(source, target) {
  ensureDirectoryExists(target);
  
  fs.readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error al leer el directorio ${source}:`, err);
      return;
    }
    
    files.forEach(file => {
      const sourcePath = path.join(source, file.name);
      const targetPath = path.join(target, file.name);
      
      if (file.isDirectory()) {
        copyFiles(sourcePath, targetPath);
      } else {
        fs.copyFile(sourcePath, targetPath, err => {
          if (err) {
            console.error(`Error al copiar ${sourcePath} a ${targetPath}:`, err);
          } else {
            console.log(`Copiado: ${targetPath}`);
          }
        });
      }
    });
  });
}

console.log('Comenzando copia de archivos...');

// Crear directorio principal de imágenes si no existe
ensureDirectoryExists(targetImagesDir);

// Verificar y crear directorio de videos
ensureDirectoryExists(targetVideosDir);

// Copiar videos
if (fs.existsSync(sourceVideosDir)) {
  console.log('Copiando videos...');
  copyFiles(sourceVideosDir, targetVideosDir);
} else {
  console.log('Directorio de videos no encontrado en origen');
}

// Copiar otras imágenes
console.log('Copiando imágenes y otros recursos...');
copyFiles(sourceImagesDir, targetImagesDir);

console.log('Proceso iniciado. Espera a que se completen las copias...');