import { FetchExerciseByIdReq } from '../types'
import { GetExerciseByIdUseCase } from '../use-cases'
import { GetExercisesArgs, GetExercisesUseCase } from '../use-cases/get-exercise.usecase'

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

  getExercise = (params: GetExerciseSerivceArgs) => {
    const query: GetExercisesArgs = {
      query: { ...(params.search && { search: params.search }) },
      offset: params.offset,
      limit: params.limit
    }

    return this.getExercisesUseCase.execute(query)
  }

  getExerciseById = (request: FetchExerciseByIdReq) => {
    return this.getExerciseByIdUseCase.execute(request)
  }
}
