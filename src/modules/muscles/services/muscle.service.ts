import { GetExerciseSerivceArgs } from '#modules/exercises/services/exercise.service.js'
import { GetExercisesArgs, GetExercisesUseCase } from '#modules/exercises/use-cases/get-exercise.usecase.js'
import { GetMusclesUseCase } from '../use-cases'

export class MuscleService {
  private readonly getMuscleUseCase: GetMusclesUseCase
  // private readonly getExercisesUseCase: GetExercisesUseCase

  constructor() {
    this.getMuscleUseCase = new GetMusclesUseCase()
    // this.getExercisesUseCase = new GetExercisesUseCase(exerciseModel)
  }

  getMuscles = () => {
    return this.getMuscleUseCase.execute()
  }
  // getExercisesByMuscles = (params: GetExerciseSerivceArgs) => {
  //   const query: GetExercisesArgs = {
  //     offset: params.offset,
  //     limit: params.limit,
  //     query: {
  //       targetMuscles: {
  //         $all: [params.search]
  //       }
  //     }
  //   }

  //   return this.getExercisesUseCase.execute(query)
  // }
}
