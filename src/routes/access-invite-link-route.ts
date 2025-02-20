import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'
// import { redis } from '../redis/client'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    // - " : " Indica que o que vem após é um parâmetro
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        params: z.object({
          // - GET retorna "params" diferente de POST que retorna um "body"
          // - Valida o que vem na requisição
          subscriberId: z.string(),
        }),
        response: {
          // - Resposta para status de rota
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      // 🔁 - Rotas no fastify precisam ser assíncronas
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      // 👀 - Conferir se está acessando e contabilizando os acessos
      // console.log(await redis.hgetall('referral:access-count'))

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)

      // ⛔ 301: redirect permanente (Usa cache para amarzenar)
      // ⛔ 302: redirect temporário (Não usa cache)
      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
