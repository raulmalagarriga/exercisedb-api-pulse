import { GetExercisesUseCase } from '#modules/exercises/use-cases/get-exercise.usecase.js'
import { GetBodyPartsUseCase } from '../use-cases'

export class BodyPartService {
  private readonly getBodyPartsUseCase: GetBodyPartsUseCase
  private readonly getExercisesUseCase: GetExercisesUseCase

  constructor() {
    this.getBodyPartsUseCase = new GetBodyPartsUseCase()
    this.getExercisesUseCase = new GetExercisesUseCase()
  }

  getBodyParts = () => {
    return this.getBodyPartsUseCase.execute()
  }
}
