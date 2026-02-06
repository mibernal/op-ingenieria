// src/modules/marketing/components/index.ts
export { default as HeroSection } from './HeroSection';
export { default as AboutSection } from './AboutSection';
export { default as ServicesSection } from './ServicesSection';
export { default as CTASection } from './CTASection';
export { default as PartnersSection } from './PartnersSection';

// NOTA: No exportas "Hero", exportas "HeroSection"
// Si necesitas "Hero" como alias, haz:
export { default as Hero } from './HeroSection';