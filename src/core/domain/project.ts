// src/core/domain/project.ts
export interface Project {
  id: string
  name: string
  description?: string
  image?: string | string[]  // ✅ Acepta ambos
  client?: string
}