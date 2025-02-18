import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface AcessInviteLinkParams {
  subscriberId: string
}

export async function accessInviteLink({
  subscriberId,
}: AcessInviteLinkParams) {
  // - 📨 Inserção no database
  // - Usa a chave do id para cada vez que a função for chamada, incrementa o valor em +1
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
