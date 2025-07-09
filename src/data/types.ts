export interface Equipment {
  name: string
}

export interface Exercise {
  exerciseId: string
  name: string
  gifUrl: string
  equipments: string[]
  bodyParts: string[]
  targetMuscles: string[]
  secondaryMuscles: string[]
  instructions: string[]
}

export interface BodyPart {
  name: string
}

export interface Muscle {
  name: string
}
