#!/usr/bin/env bash
set -e

echo "🚀 Migración arquitectura PRO v2 iniciada..."

# ===============================
# 1. CREAR ESTRUCTURA
# ===============================

mkdir -p src/app/providers
mkdir -p src/core/{domain,services}
mkdir -p src/shared/components
mkdir -p src/shared/components/skeletons
mkdir -p src/shared/hooks
mkdir -p src/components/marketing
mkdir -p src/assets/images/{products,projects}
mkdir -p src/config
mkdir -p src/styles

# ===============================
# 2. SHARED
# ===============================

echo "🔁 Migrando shared..."

[ -f src/components/shared/OptimizedImage.tsx ] && \
git mv src/components/shared/OptimizedImage.tsx src/shared/components/OptimizedImage.tsx

[ -d src/components/skeletons ] && \
git mv src/components/skeletons/* src/shared/components/skeletons/ && \
rmdir src/components/skeletons

# ===============================
# 3. HOOKS
# ===============================

echo "🪝 Migrando hooks..."

[ -f src/hooks/usemobile.tsx ] && \
git mv src/hooks/usemobile.tsx src/shared/hooks/useIsClient.ts

[ -f src/hooks/usetoast.ts ] && \
git mv src/hooks/usetoast.ts src/shared/hooks/useToast.ts

# ===============================
# 4. MARKETING
# ===============================

echo "🎯 Migrando marketing..."

[ -f src/components/AboutSection.tsx ] && \
git mv src/components/AboutSection.tsx src/components/marketing/AboutSection.tsx

[ -f src/components/ServicesSection.tsx ] && \
git mv src/components/ServicesSection.tsx src/components/marketing/ServicesSection.tsx

[ -f src/components/ui/Hero.tsx ] && \
git mv src/components/ui/Hero.tsx src/components/marketing/HeroSection.tsx

# ===============================
# 5. ASSETS
# ===============================

echo "🖼️ Normalizando assets..."

[ -f src/assets/hero-bg.jpg ] && \
git mv src/assets/hero-bg.jpg src/assets/images/hero-bg.jpg

git mv src/assets/product-* src/assets/images/products/ 2>/dev/null || true
git mv src/assets/project-* src/assets/images/projects/ 2>/dev/null || true

# ===============================
# 6. STYLES
# ===============================

echo "🎨 Migrando styles..."

[ -f src/index.css ] && git mv src/index.css src/styles/index.css
[ -f src/App.css ] && git mv src/App.css src/styles/App.css

# ===============================
# 7. IMPORT FIXES
# ===============================

echo "🛠️ Reescribiendo imports..."

find src -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 | xargs -0 sed -i '' \
  -e "s@components/shared/OptimizedImage@shared/components/OptimizedImage@g" \
  -e "s@components/skeletons@shared/components/skeletons@g" \
  -e "s@hooks/usemobile@shared/hooks/useIsClient@g" \
  -e "s@hooks/usetoast@shared/hooks/useToast@g" \
  -e "s@components/AboutSection@components/marketing/AboutSection@g" \
  -e "s@components/ServicesSection@components/marketing/ServicesSection@g" \
  -e "s@components/ui/Hero@components/marketing/HeroSection@g" \
  -e "s@assets/@assets/images/@g"

# ===============================
# 8. MAIN.TSX CSS FIX
# ===============================

echo "🎯 Corrigiendo import css..."

sed -i '' "s@'./index.css'@'./styles/index.css'@g" src/main.tsx

# ===============================
# 9. CORE FILES
# ===============================

echo "🧠 Creando core..."

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
}
EOF

# ===============================
# 10. VALIDACIÓN
# ===============================

echo "🧪 Validando build..."

npm run build

echo "✅ Migración finalizada correctamente"
