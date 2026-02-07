// extract-images.mjs
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar el archivo JSON
const data = JSON.parse(fs.readFileSync(`${__dirname}/disfru_op2.json`, 'utf8'));

// Función para buscar URLs de imágenes en cualquier nivel del objeto
function extractImageUrls(obj, urls = new Set()) {
  if (!obj) return urls;

  // Si es un string, buscar URLs de imágenes
  if (typeof obj === 'string') {
    // Patrones para URLs de imágenes
    const imagePatterns = [
      /https?:\/\/[^\s"']+\.(jpg|jpeg|png|gif|bmp|webp|svg)(?:\?[^\s"']*)?/gi,
      /\/wp-content\/uploads\/[^\s"']+\.(jpg|jpeg|png|gif|bmp|webp|svg)(?:\?[^\s"']*)?/gi,
      /"[^"]+\.(jpg|jpeg|png|gif|bmp|webp|svg)(?:\?[^"]*)?"/gi,
      /'[^']+\.(jpg|jpeg|png|gif|bmp|webp|svg)(?:\?[^']*)?'/gi
    ];

    imagePatterns.forEach(pattern => {
      const matches = obj.match(pattern);
      if (matches) {
        matches.forEach(url => {
          // Limpiar comillas si las hay
          const cleanUrl = url.replace(/^["']|["']$/g, '').trim();
          if (cleanUrl) urls.add(cleanUrl);
        });
      }
    });
  }
  // Si es un objeto o array, recorrer recursivamente
  else if (typeof obj === 'object') {
    for (const key in obj) {
      extractImageUrls(obj[key], urls);
    }
  }

  return urls;
}

// Extraer todas las URLs de imágenes
const allImageUrls = extractImageUrls(data);

// Convertir a array y filtrar
const imageUrls = Array.from(allImageUrls)
  .filter(url => {
    // Filtrar solo URLs válidas
    return url && (
      url.includes('http') || 
      url.includes('.jpg') || 
      url.includes('.jpeg') || 
      url.includes('.png') || 
      url.includes('.gif') ||
      url.includes('wp-content/uploads')
    );
  })
  .map(url => {
    // Convertir rutas relativas a absolutas si es necesario
    if (url.startsWith('/wp-content/')) {
      return `https://opingenieria.com${url}`;
    }
    if (url.startsWith('wp-content/')) {
      return `https://opingenieria.com/${url}`;
    }
    return url;
  })
  .filter((url, index, self) => self.indexOf(url) === index); // Eliminar duplicados

// Mostrar resultados
console.log(`Se encontraron ${imageUrls.length} imágenes:`);
imageUrls.forEach((url, index) => {
  console.log(`${index + 1}: ${url}`);
});

// Guardar en un archivo
fs.writeFileSync(`${__dirname}/extracted-images.json`, JSON.stringify(imageUrls, null, 2));
console.log('\nImágenes guardadas en extracted-images.json');