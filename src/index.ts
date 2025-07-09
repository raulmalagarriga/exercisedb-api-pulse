import { BodyPartController, EquipmentController, MuscleController, ExerciseController } from './modules'
import { App } from './app'

const app = new App([
  //   new ExerciseController(),
  //   new MuscleController(),
  //   new EquipmentController(),
  //   new BodyPartController(),
  //   new UserController()
]).getApp()

export default app
