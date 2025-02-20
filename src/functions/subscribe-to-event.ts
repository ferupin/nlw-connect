import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null
}

export async function subscribeToEvent({
  name,
  email,
  referrerId,
}: SubscribeToEventParams) {
  // - Confere no database: Um usário com este mesmo e-mail já cadastrado
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  // - Encontrou o usário: 🆔 Retorna a inscrição anterior e inscreve ele novamente usando a mesma reff
  if (subscribers.length > 0) {
    return { subscribeId: subscribers[0].id }
  }

  // - 📨 Inserção no database
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  // - Incrementa um ponto para quem indicou no sistema (quem convidou / não quem convida)
  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  const subscribe = result[0] // - Retorna um array na posição do Id

  return {
    // 🆔 Retornar em forma de objeto é dinâmico caso haja necessidade de retornar mais de um valor
    subscriberId: subscribe.id,
  }
}
