import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      // - " : " Indica que o que vem após é um parâmetro
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get subscriber invites count',
          tags: ['referral'],
          params: z.object({
            // - GET retorna "params" diferente de POST que retorna um "body"
            // - Valida o que vem na requisição
            subscriberId: z.string(),
          }),
          response: {
            // - Resposta para status de rota
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        // 🔁 - Rotas no fastify precisam ser assíncronas
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitesCount({ subscriberId })

        return { count }
      }
    )
  }
