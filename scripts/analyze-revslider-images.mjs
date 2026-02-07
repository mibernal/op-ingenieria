// analyze-revslider-images.mjs
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = JSON.parse(fs.readFileSync(`${__dirname}/disfru_op2.json`, 'utf8'));

// Buscar imágenes específicamente en campos que puedan contener rutas de slider
const potentialImageFields = [];

function deepSearch(obj, path = '') {
  if (!obj) return;

  if (typeof obj === 'string') {
    // Buscar patrones específicos de Revolution Slider
    const patterns = [
      /"image":"([^"]+)"/,
      /"url":"([^"]+\.(jpg|jpeg|png|gif))"/,
      /"bg":"([^"]+\.(jpg|jpeg|png|gif))"/,
      /"background":"([^"]+\.(jpg|jpeg|png|gif))"/,
      /src="([^"]+\.(jpg|jpeg|png|gif))"/,
      /"thumb":"([^"]+)"/,
      /"slide_bg":"([^"]+)"/,
      /"slide_bg_image":"([^"]+)"/
    ];

    patterns.forEach(pattern => {
      const match = obj.match(pattern);
      if (match && match[1]) {
        let url = match[1];
        
        // Limpiar la URL
        url = url.replace(/\\\//g, '/')
                 .replace(/\\\\/g, '')
                 .replace(/^["']|["']$/g, '');
        
        // Convertir a URL absoluta si es relativa
        if (url.startsWith('/') || url.startsWith('wp-content/')) {
          if (!url.startsWith('http')) {
            url = `https://opingenieria.com${url.startsWith('/') ? '' : '/'}${url}`;
          }
        }
        
        if (url && (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png'))) {
          potentialImageFields.push({
            path: path,
            url: url,
            raw: obj.substring(0, 100) + '...' // Primeros 100 caracteres para contexto
          });
        }
      }
    });
    
    // También buscar URLs directas
    const directUrlRegex = /(https?:\/\/[^\s"']+\.(jpg|jpeg|png|gif|bmp))[^\s"']*/gi;
    const directMatches = obj.match(directUrlRegex);
    if (directMatches) {
      directMatches.forEach(url => {
        potentialImageFields.push({
          path: path + ' (direct)',
          url: url,
          raw: obj.substring(0, 100) + '...'
        });
      });
    }
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      deepSearch(obj[key], path ? `${path}.${key}` : key);
    }
  }
}

// Ejecutar búsqueda
deepSearch(data);

// Procesar resultados
const uniqueImages = [];
const seen = new Set();

potentialImageFields.forEach(item => {
  if (!seen.has(item.url)) {
    seen.add(item.url);
    uniqueImages.push(item);
  }
});

// Mostrar resultados
console.log('=== IMÁGENES ENCONTRADAS EN REVOLUTION SLIDER ===\n');
uniqueImages.forEach((item, index) => {
  console.log(`${index + 1}. ${item.url}`);
  console.log(`   Ubicación: ${item.path}`);
  console.log(`   Contexto: ${item.raw}`);
  console.log('');
});

// Agrupar por proyecto (basado en patrones en las URLs)
console.log('\n=== IMÁGENES AGRUPADAS POR POSIBLE PROYECTO ===\n');

const projects = {
  'hibridos': [],
  'cenac': [],
  'fiduprevisora': [],
  'esufa': [],
  'aerocivil': [],
  'wwf': [],
  'comando': [],
  'tayrona': [],
  'arc-bolivar': [],
  'migracion': [],
  'parques': [],
  'policia': [],
  'inverser': [],
  'geologico': [],
  'hmc': [],
  'hospital-neiva': [],
  'hcp': [],
  'eia': [],
  'emec': [],
  'corpochivor': [],
  'coordinadora': [],
  'rama-judicial': [],
  'banco-agrario': [],
  'medicina-legal': [],
  'mantenimientos': [],
  'presidencia': []
};

uniqueImages.forEach(item => {
  const url = item.url.toLowerCase();
  
  // Buscar coincidencias con nombres de proyectos
  if (url.includes('hibrido') || url.includes('20200604')) {
    projects.hibridos.push(item.url);
  } else if (url.includes('cenac') || url.includes('20210930')) {
    projects.cenac.push(item.url);
  } else if (url.includes('fiduprevisora') || url.includes('20211211')) {
    projects.fiduprevisora.push(item.url);
  } else if (url.includes('esufa') || url.includes('suboficial')) {
    projects.esufa.push(item.url);
  } else if (url.includes('aerocivil')) {
    projects.aerocivil.push(item.url);
  } else if (url.includes('wwf')) {
    projects.wwf.push(item.url);
  } else if (url.includes('comando') || url.includes('fuerzas')) {
    projects.comando.push(item.url);
  } else if (url.includes('tayrona')) {
    projects.tayrona.push(item.url);
  } else if (url.includes('bolivar') || url.includes('naval')) {
    projects['arc-bolivar'].push(item.url);
  } else if (url.includes('migracion')) {
    projects.migracion.push(item.url);
  } else if (url.includes('parque') && !url.includes('tayrona')) {
    projects.parques.push(item.url);
  } else if (url.includes('policia') || url.includes('cali')) {
    projects.policia.push(item.url);
  } else if (url.includes('inverser')) {
    projects.inverser.push(item.url);
  } else if (url.includes('geologico')) {
    projects.geologico.push(item.url);
  } else if (url.includes('hmc') || url.includes('militar')) {
    projects.hmc.push(item.url);
  } else if (url.includes('hospital') || url.includes('neiva')) {
    projects['hospital-neiva'].push(item.url);
  } else if (url.includes('hcp')) {
    projects.hcp.push(item.url);
  } else if (url.includes('eia') || url.includes('andina')) {
    projects.eia.push(item.url);
  } else if (url.includes('emec')) {
    projects.emec.push(item.url);
  } else if (url.includes('corpochivor')) {
    projects.corpochivor.push(item.url);
  } else if (url.includes('coordinadora')) {
    projects.coordinadora.push(item.url);
  } else if (url.includes('rama') || url.includes('judicial')) {
    projects['rama-judicial'].push(item.url);
  } else if (url.includes('agrario')) {
    projects['banco-agrario'].push(item.url);
  } else if (url.includes('medicina') || url.includes('legal')) {
    projects['medicina-legal'].push(item.url);
  } else if (url.includes('mantenimiento')) {
    projects.mantenimientos.push(item.url);
  } else if (url.includes('presidencia')) {
    projects.presidencia.push(item.url);
  }
});

// Mostrar imágenes por proyecto
Object.keys(projects).forEach(project => {
  if (projects[project].length > 0) {
    console.log(`\n${project.toUpperCase()}:`);
    projects[project].forEach((url, idx) => {
      console.log(`  ${idx + 1}. ${url}`);
    });
  }
});

// Guardar resultados
const results = {
  total_images: uniqueImages.length,
  images_by_project: projects,
  all_images: uniqueImages.map(item => item.url)
};

fs.writeFileSync(`${__dirname}/revslider-images-analysis.json`, JSON.stringify(results, null, 2));
console.log(`\n\nAnálisis completo. Se encontraron ${uniqueImages.length} imágenes potenciales.`);
console.log('Resultados guardados en revslider-images-analysis.json');