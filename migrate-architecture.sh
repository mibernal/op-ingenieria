#!/usr/bin/env bash
set -e

echo "🚀 Iniciando migración de arquitectura profesional..."

# ===============================
# 1. CREAR ESTRUCTURA NUEVA
# ===============================

echo "📁 Creando carpetas nuevas..."

mkdir -p src/app/providers
mkdir -p src/core/{domain,services}
mkdir -p src/shared/{components,skeletons,hooks}
mkdir -p src/components/marketing
mkdir -p src/assets/images/{products,projects}
mkdir -p src/config
mkdir -p src/styles

# ===============================
# 2. APP SHELL
# ===============================

echo "📦 Moviendo App shell..."

git mv src/App.tsx src/app/App.tsx || true
git mv src/app/routes src/app/routes || true

# ===============================
# 3. SHARED COMPONENTS
# ===============================

echo "🔁 Migrando shared..."

git mv src/components/shared/OptimizedImage.tsx src/shared/components/OptimizedImage.tsx || true
git mv src/components/skeletons src/shared/components/skeletons || true

# ===============================
# 4. HOOKS
# ===============================

echo "🪝 Migrando hooks..."

git mv src/hooks/usemobile.tsx src/shared/hooks/useIsClient.ts || true
git mv src/hooks/usetoast.ts src/shared/hooks/useToast.ts || true

# ===============================
# 5. MARKETING SECTIONS
# ===============================

echo "🎯 Migrando marketing..."

git mv src/components/AboutSection.tsx src/components/marketing/AboutSection.tsx || true
git mv src/components/ServicesSection.tsx src/components/marketing/ServicesSection.tsx || true
git mv src/components/ui/Hero.tsx src/components/marketing/HeroSection.tsx || true

# ===============================
# 6. ASSETS NORMALIZATION
# ===============================

echo "🖼️ Normalizando assets..."

git mv src/assets/hero-bg.jpg src/assets/images/hero-bg.jpg || true

git mv src/assets/product-* src/assets/images/products/ || true
git mv src/assets/project-* src/assets/images/projects/ || true

# ===============================
# 7. CSS
# ===============================

echo "🎨 Migrando styles..."

git mv src/App.css src/styles/App.css || true
git mv src/index.css src/styles/index.css || true

# ===============================
# 8. CONFIG FILES
# ===============================

echo "⚙️ Creando config..."

cat > src/config/seo.ts <<'EOF'
export const SITE_META = {
  title: 'OP Ingeniería',
  titleTemplate: '%s | OP Ingeniería',
  description: 'Soluciones profesionales en ingeniería, proyectos y servicios industriales',
  url: 'https://opingenieria.com'
}
EOF

cat > src/config/routes.ts <<'EOF'
export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  PROJECTS: '/projects',
  CONTACT: '/contact'
}
EOF

# ===============================
# 9. CORE DOMAIN + SERVICES
# ===============================

echo "🧠 Creando core domain + services..."

cat > src/core/domain/product.ts <<'EOF'
export interface Product {
  id: string
  title: string
  description?: string
  image?: string
  categories?: string[]
}
EOF

cat > src/core/domain/project.ts <<'EOF'
export interface Project {
  id: string
  title: string
  description?: string
  images?: string[]
  client?: string
}
EOF

cat > src/core/domain/client.ts <<'EOF'
export interface Client {
  id: string
  name: string
  logo?: string
  website?: string
}
EOF

cat > src/core/services/productsService.ts <<'EOF'
import data from '@/modules/catalog/data/products_normalized.json'
import type { Product } from '@/core/domain/product'

export const productsService = {
  async list(): Promise<Product[]> {
    return data as Product[]
  },

  async findById(id: string): Promise<Product | null> {
    const items = data as Product[]
    return items.find(p => p.id === id) || null
  }
}
EOF

cat > src/core/services/projectsService.ts <<'EOF'
import data from '@/modules/projects/data/projects'
import type { Project } from '@/core/domain/project'

export const projectsService = {
  async list(): Promise<Project[]> {
    return data
  }
}
EOF

cat > src/core/services/clientsService.ts <<'EOF'
import data from '@/modules/projects/data/clientsPartners'
import type { Client } from '@/core/domain/client'

export const clientsService = {
  async list(): Promise<Client[]> {
    return data
  }
}
EOF

# ===============================
# 10. IMPORT REWRITE (SED)
# ===============================

echo "🛠️ Reescribiendo imports masivamente..."

rg "components/shared/OptimizedImage" -l src | xargs sed -i '' "s@components/shared/OptimizedImage@shared/components/OptimizedImage@g"

rg "components/skeletons" -l src | xargs sed -i '' "s@components/skeletons@shared/components/skeletons@g"

rg "hooks/usemobile" -l src | xargs sed -i '' "s@hooks/usemobile@shared/hooks/useIsClient@g"

rg "hooks/usetoast" -l src | xargs sed -i '' "s@hooks/usetoast@shared/hooks/useToast@g"

rg "components/AboutSection" -l src | xargs sed -i '' "s@components/AboutSection@components/marketing/AboutSection@g"

rg "components/ServicesSection" -l src | xargs sed -i '' "s@components/ServicesSection@components/marketing/ServicesSection@g"

rg "components/ui/Hero" -l src | xargs sed -i '' "s@components/ui/Hero@components/marketing/HeroSection@g"

rg "assets/" -l src | xargs sed -i '' "s@assets/@assets/images/@g"

# ===============================
# 11. VALIDACIÓN FINAL
# ===============================

echo "🧪 Ejecutando validación..."

npm run lint || true
npm run build || true

echo "✅ Migración completada. Revisa errores si los hay."
