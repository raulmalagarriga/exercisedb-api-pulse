import { Routes } from '#common/types/route.type.js'
import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { z } from 'zod'
import { ExerciseService } from '../services/exercise.service'
import { ExerciseModel } from '../models/exercise.model'

export class ExerciseController implements Routes {
  public controller: OpenAPIHono
  private readonly exerciseService: ExerciseService
  constructor() {
    this.controller = new OpenAPIHono()
    this.exerciseService = new ExerciseService()
  }

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/exercises',
        tags: ['Exercises'],
        summary: 'Retrive all exercises.',
        description: 'Retrive list of all the exercises.',
        operationId: 'getExercises',
        request: {
          query: z.object({
            search: z.string().optional().openapi({
              title: 'Search Query',
              description:
                'A string to filter exercises based on a search term. This can be used to find specific exercises by name or description.',
              type: 'string',
              example: 'cardio',
              default: ''
            }),
            offset: z.coerce.number().nonnegative().optional().openapi({
              title: 'Offset',
              description:
                'The number of exercises to skip from the start of the list. Useful for pagination to fetch subsequent pages of results.',
              type: 'number',
              example: 10,
              default: 0
            }),
            limit: z.coerce.number().positive().max(100).optional().openapi({
              title: 'Limit',
              description:
                'The maximum number of exercises to return in the response. Limits the number of results for pagination purposes.',
              maximum: 100,
              minimum: 1,
              type: 'number',
              example: 10,
              default: 10
            })
          })
        },
        responses: {
          200: {
            description: 'Successful response with list of all exercises.',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean().openapi({
                    description: 'Indicates whether the request was successful',
                    type: 'boolean',
                    example: true
                  }),
                  data: z.array(ExerciseModel).openapi({
                    description: 'Array of Exercises.'
                  })
                })
              }
            }
          },
          500: {
            description: 'Internal server error'
          }
        }
      }),
      async (ctx) => {
        const { offset, limit = 10, search } = ctx.req.valid('query')
        const { origin, pathname } = new URL(ctx.req.url)
        const response = await this.exerciseService.getExercise({ offset, limit, search })
        return ctx.json({
          success: true,
          data: {
            previousPage:
              response.currentPage > 1
                ? `${origin}${pathname}?offset=${(response.currentPage - 1) * limit}&limit=${limit}`
                : null,
            nextPage:
              response.currentPage < response.totalPages
                ? `${origin}${pathname}?offset=${response.currentPage * limit}&limit=${limit}`
                : null,
            ...response
          }
        })
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/exercises/{exerciseId}',
        tags: ['Exercises'],
        summary: 'Get exercise by ID',
        description: 'Retrieves a specific exercise by its unique identifier.',
        operationId: 'getExerciseById',
        request: {
          params: z.object({
            exerciseId: z.string().openapi({
              title: 'Exercise ID',
              description: 'The unique identifier of the exercise to retrieve.',
              type: 'string',
              example: 'ztAa1RK',
              default: 'ztAa1RK'
            })
          })
        },
        responses: {
          200: {
            description: 'Successful response with the exercise details.',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean().openapi({
                    description: 'Indicates whether the request was successful.',
                    type: 'boolean',
                    example: true
                  }),
                  data: ExerciseModel.openapi({
                    description: 'The retrieved exercise details.'
                  })
                })
              }
            }
          },
          404: {
            description: 'Exercise not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }),
      async (ctx) => {
        const exerciseId = ctx.req.param('exerciseId')
        const exercise = await this.exerciseService.getExerciseById({ exerciseId })

        return ctx.json({
          success: true,
          data: exercise
        })
      }
    )
  }
}
