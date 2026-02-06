import data from '@/modules/projects/data/projects'
import type { Project } from '@/core/domain/project'

export const projectsService = {
  async list(): Promise<Project[]> {
    return data
  }
}
