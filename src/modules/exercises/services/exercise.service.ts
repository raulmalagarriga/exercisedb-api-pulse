import { FetchExerciseByIdReq } from '../types'
import { GetExerciseByIdUseCase } from '../use-cases'
import { GetExercisesArgs, GetExercisesUseCase } from '../use-cases/get-exercise.usecase'
export interface SearchExercisesArgs {
  offset?: number
  limit?: number
  query: string
  threshold?: number
}

export interface GetAllExercisesArgs {
  offset?: number
  limit?: number
  search?: string
  sort?: Record<string, 1 | -1>
}

export interface GetExercisesByMuscleArgs {
  offset?: number
  limit?: number
  muscle: string
  includeSecondary?: boolean
}

export interface GetExercisesByEquipmentArgs {
  offset?: number
  limit?: number
  equipment: string
}

export interface GetExercisesByBodyPartArgs {
  offset?: number
  limit?: number
  bodyPart: string
}

export interface FilterExercisesArgs {
  offset?: number
  limit?: number
  search?: string
  targetMuscles?: string[]
  equipments?: string[]
  bodyParts?: string[]
  sort?: Record<string, 1 | -1>
}

export interface GetExerciseSerivceArgs {
  offset?: number
  limit?: number
  search?: string
}
export class ExerciseService {
  private readonly getExercisesUseCase: GetExercisesUseCase
  private readonly getExerciseByIdUseCase: GetExerciseByIdUseCase
  constructor() {
    this.getExercisesUseCase = new GetExercisesUseCase()
    this.getExerciseByIdUseCase = new GetExerciseByIdUseCase()
  }

  async getAllExercises(params: GetAllExercisesArgs) {
    const query: GetExercisesArgs = {
      offset: params.offset,
      limit: params.limit,
      query: params.search ? { search: params.search } : {},
      sort: params.sort
    }

    return this.getExercisesUseCase.execute(query)
  }
  async filterExercises(params: FilterExercisesArgs) {
    const queryFilters: any = {}

    if (params.search) {
      queryFilters.search = params.search
    }

    if (params.targetMuscles && params.targetMuscles.length > 0) {
      queryFilters.targetMuscles = params.targetMuscles
    }

    if (params.equipments && params.equipments.length > 0) {
      queryFilters.equipments = params.equipments
    }

    if (params.bodyParts && params.bodyParts.length > 0) {
      queryFilters.bodyParts = params.bodyParts
    }

    const query: GetExercisesArgs = {
      offset: params.offset,
      limit: params.limit,
      query: queryFilters,
      sort: params.sort
    }

    return this.getExercisesUseCase.execute(query)
  }

  getExerciseById = (request: FetchExerciseByIdReq) => {
    return this.getExerciseByIdUseCase.execute(request)
  }

  // Get exercises by body part
  async getExercisesByBodyPart(params: GetExercisesByBodyPartArgs) {
    const query: GetExercisesArgs = {
      offset: params.offset,
      limit: params.limit,
      query: {
        bodyParts: [params.bodyPart]
      }
    }

    return this.getExercisesUseCase.execute(query)
  }

  // Get exercises by equipment
  async getExercisesByEquipment(params: GetExercisesByEquipmentArgs) {
    const query: GetExercisesArgs = {
      offset: params.offset,
      limit: params.limit,
      query: {
        equipments: [params.equipment]
      }
    }

    return this.getExercisesUseCase.execute(query)
  }

  // Get exercises by muscle (with option to include secondary muscles)
  async getExercisesByMuscle(params: GetExercisesByMuscleArgs) {
    const query: GetExercisesArgs = {
      offset: params.offset,
      limit: params.limit,
      query: {
        targetMuscles: [params.muscle],
        includeSecondaryMuscles: params.includeSecondary
      }
    }

    return this.getExercisesUseCase.execute(query)
  }
}
