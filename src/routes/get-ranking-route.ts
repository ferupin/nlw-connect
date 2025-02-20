import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getRanking } from '../functions/get-ranking'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    // - " : " Indica que o que vem após é um parâmetro
    '/ranking',
    {
      schema: {
        summary: 'Get ranking',
        tags: ['referral'],
        response: {
          // - Resposta para status de rota
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      // 🔁 - Rotas no fastify precisam ser assíncronas
      const { rankingWithScore } = await getRanking()

      return { ranking: rankingWithScore }
    }
  )
}
