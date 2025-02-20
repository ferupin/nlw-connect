import { redis } from '../redis/client'

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  // - Usuário ainda não pontuou. Não está no ranking
  if (rank === null) {
    return { position: null }
  }

  // - Se ele pontou:
  return { position: rank + 1 }
}
