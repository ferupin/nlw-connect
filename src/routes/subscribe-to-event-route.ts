import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribes someone to the event',
        tags: ['subscription'],
        body: z.object({
          // - Valida o que vem na requisição
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          // - Resposta para status de rota
          201: z.object({
            name: z.string(),
            email: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      // - Rotas no fastify precisam ser assíncronas
      const { name, email } = request.body

      return reply.status(201).send({
        // - Criação no banco de dados
        name,
        email,
      })
    }
  )
}
