import { GetExerciseSerivceArgs } from '#modules/exercises/services/exercise.service.js'
import { GetExercisesArgs, GetExercisesUseCase } from '#modules/exercises/use-cases/get-exercise.usecase.js'
import { GetEquipmentsUseCase } from '../use-cases'

export class EquipmentService {
  private readonly getEquipmentUseCase: GetEquipmentsUseCase
  private readonly getExercisesUseCase: GetExercisesUseCase

  constructor() {
    this.getEquipmentUseCase = new GetEquipmentsUseCase()
    this.getExercisesUseCase = new GetExercisesUseCase()
  }

  getEquipments = () => {
    return this.getEquipmentUseCase.execute()
  }
  // getExercisesByEquipment = (params: GetExerciseSerivceArgs) => {
  //   const query: GetExercisesArgs = {
  //     offset: params.offset,
  //     limit: params.limit,
  //     query: {
  //       equipments: {
  //         $all: [params.search]
  //       }
  //     }
  //   }

  //   return this.getExercisesUseCase.execute(query)
  // }
}
