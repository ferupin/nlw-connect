import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      // - " : " Indica que o que vem após é um parâmetro
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscriber ranking position',
          tags: ['referral'],
          params: z.object({
            // - GET retorna "params" diferente de POST que retorna um "body"
            // - Valida o que vem na requisição
            subscriberId: z.string(),
          }),
          response: {
            // - Resposta para status de rota
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async request => {
        // 🔁 - Rotas no fastify precisam ser assíncronas
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })

        return { position }
      }
    )
  }
