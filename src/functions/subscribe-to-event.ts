import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

interface SubscribeToEventParams {
  name: string
  email: string
}

export async function subscribeToEvent({
  name,
  email,
}: SubscribeToEventParams) {
  // - 📨 Inserção no database
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  const subscribe = result[0] // - Retorna um array na posição do Id

  return {
    // 🆔 Retornar em forma de objeto é dinâmico caso haja necessidade de retornar mais de um valor
    subscriberId: subscribe.id,
  }
}
