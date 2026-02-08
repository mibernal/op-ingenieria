O&P Ingeniería — Sitio Web Corporativo

Sitio web corporativo moderno para O&P Ingeniería S.A.S, diseñado como catálogo profesional y portafolio de proyectos, enfocado en mostrar servicios, productos, clientes y aliados estratégicos, con alto estándar visual, rendimiento y mantenibilidad.

🔗 Repositorio: https://github.com/mibernal/op-ingenieria

🌐 Sitio en producción: https://mibernal.github.io/op-ingenieria/

📌 Descripción General

Este proyecto es una Single Page Application (SPA) desarrollada con tecnologías frontend modernas.
No es un ecommerce, sino un sitio corporativo informativo, optimizado para:

Mostrar catálogo de productos

Presentar proyectos realizados

Exponer clientes y partners

Facilitar contacto comercial

Mantener una imagen corporativa sólida y profesional

🧱 Arquitectura del Proyecto

La arquitectura está organizada por módulos funcionales, lo que permite escalar y mantener el proyecto fácilmente.

src/
├── app/                # Configuración principal y routing
├── components/         # Layouts y componentes reutilizables
├── core/               # Modelos de dominio (tipos base)
├── modules/            # Funcionalidades por sección
│   ├── catalog/
│   ├── projects/
│   ├── clients/
│   ├── partners/
│   ├── marketing/
│   └── contact/
├── shared/             # Hooks y componentes compartidos
├── styles/             # Estilos globales (Tailwind + CSS)
├── main.tsx            # Punto de entrada
└── vite-env.d.ts

Principios aplicados

Separación de responsabilidades

Arquitectura modular

Reutilización de componentes

Tipado estricto con TypeScript

Escalabilidad a largo plazo

⚙️ Tecnologías Utilizadas
Core

React 18

Vite

TypeScript

UI / UX

Tailwind CSS

Radix UI

Lucide Icons

Framer Motion

Routing y Estado

React Router DOM

@tanstack/react-query

Performance y Build

vite-plugin-image-optimizer

vite-plugin-pwa

Rollup (bundling)

Deploy

GitHub Pages

GitHub Actions

📦 Módulos Principales
🗂️ Catálogo (/modules/catalog)

Listado de productos

Filtros por categoría

Modal de detalle

Datos desde JSON normalizado

🏗️ Proyectos (/modules/projects)

Galería de proyectos ejecutados

Categorías técnicas

Carruseles de imágenes

🤝 Clientes y Partners

Logos corporativos

Carruseles automáticos

Imágenes optimizadas

📢 Marketing

Hero principal

Servicios

Sección “Sobre nosotros”

Call To Action (CTA)

📞 Contacto

Página de contacto

Llamadas directas

Integración preparada para formularios

🖼️ Manejo de Imágenes y Assets

El proyecto maneja imágenes de dos formas:

1️⃣ Assets públicos

Ubicados en:

public/
└── images/
└── uploads/


Se acceden mediante rutas relativas:

`${import.meta.env.BASE_URL}images/uploads/...`


Esto garantiza compatibilidad tanto en desarrollo como en GitHub Pages.

2️⃣ Assets importados

Para logos y recursos críticos:

import logo from "@/assets/images/logo.png";


Vite se encarga de empaquetarlos correctamente en producción.

🧭 Routing y Navegación

Navegación SPA sin recarga

Soporte de hashes (#secciones)

Compatible con GitHub Pages mediante base dinámico

base: isProduction ? "/op-ingenieria/" : "/"

🚀 Scripts Disponibles
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting
npm run test         # Tests

🌍 Deploy (GitHub Pages)

El sitio se despliega automáticamente mediante GitHub Actions:

Se ejecuta npm run build

Se publica el contenido de dist/

Se sirve desde:

https://mibernal.github.io/op-ingenieria/

🎨 Estilos y Diseño

Diseño responsive (mobile-first)

Colores y tipografías alineadas con la imagen corporativa

Animaciones suaves y profesionales

Accesibilidad básica (focus, aria, contraste)

🔐 Calidad y Mantenibilidad

✔ Código tipado con TypeScript
✔ Componentes reutilizables
✔ Datos desacoplados de la UI
✔ Build optimizado para performance
✔ Preparado para futuras ampliaciones

👨‍💻 Autor

Miguel Bernal
Ingeniero de Software / Frontend
Arquitectura, UI/UX y desarrollo completo del proyecto.

📄 Licencia

Proyecto privado de uso corporativo para O&P Ingeniería S.A.S.
