import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      // - " : " Indica que o que vem após é um parâmetro
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get subscriber invite clicks count',
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

        const { count } = await getSubscriberInviteClicks({ subscriberId })

        return { count }
      }
    )
  }
