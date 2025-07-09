import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from 'src/data/load'
import Fuse from 'fuse.js'
import { Exercise } from '../types'

export interface GetExercisesArgs {
  offset?: number
  limit?: number
  query?: {
    search?: string
    [key: string]: any
  }
  sort?: Record<string, 1 | -1>
}

export interface GetExercisesReturnArgs {
  exercises: Exercise[]
  totalPages: number
  totalExercises: number
  currentPage: number
}

export class GetExercisesUseCase implements IUseCase<GetExercisesArgs, GetExercisesReturnArgs> {
  constructor() {}

  async execute({ offset, limit, query = {}, sort = {} }: GetExercisesArgs): Promise<GetExercisesReturnArgs> {
    try {
      const exerciseData = await FileLoader.loadExercises()

      const search = query.search?.toLowerCase()
      let filtered = exerciseData

      if (search) {
        const fuse = new Fuse(exerciseData, {
          keys: ['name', 'bodyParts', 'targetMuscles', 'secondaryMuscles', 'equipments'],
          threshold: 0.3,
          includeScore: false
        })

        const result = fuse.search(search)
        filtered = result.map((res) => res.item)
      }

      const sortKeys = Object.keys(sort || {})
      if (sortKeys.length > 0) {
        filtered.sort((a, b) => {
          for (const key of sortKeys) {
            const order = sort[key]
            const aVal = (a as any)[key]
            const bVal = (b as any)[key]
            if (aVal < bVal) return -1 * order
            if (aVal > bVal) return 1 * order
          }
          return 0
        })
      }

      const safeOffset = Math.max(0, Number(offset) || 0)
      const safeLimit = Math.max(1, Math.min(25, Number(limit) || 10))

      const totalCount = filtered.length
      const totalPages = Math.ceil(totalCount / safeLimit)
      const currentPage = Math.floor(safeOffset / safeLimit) + 1

      const paginated = filtered.slice(safeOffset, safeOffset + safeLimit)

      return {
        totalPages,
        totalExercises: totalCount,
        currentPage,
        exercises: paginated
      }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch exercises')
    }
  }
}
