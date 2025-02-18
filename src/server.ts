import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors) // - Determina qual URL front-end irá acessar a api

app.register(fastifySwagger, {
  // - Documentação de api ( Swagger | Openapi )
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  // - Rota que acessa a documentação do fastify estilizada
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute) // - Cadastra a rota como um módulo

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
