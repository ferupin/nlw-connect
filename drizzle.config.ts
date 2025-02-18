import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/drizzle/schema/*', // - Todo aqruivo que seguir este caminho será uma tabela
  out: './src/drizzle/migrations', // - Arquivos SQL gerados pelo drizzle
  dialect: 'postgresql', // - Qual database você estará utilizando
  dbCredentials: {
    url: env.POSTGRES_URL, // - Url de conexão com o database
  },
} satisfies Config

// 1st - 🔁 Execute "npx drizzle-kit generate" irá gerar o arquivo em SQL
// 2nd - 🔁 Execute "npx drizzle-kit migrate" irá rodar o comando gerado
