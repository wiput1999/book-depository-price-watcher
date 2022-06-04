import { createServer } from '@graphql-yoga/node'
import fastify, { FastifyRequest, FastifyReply } from 'fastify'

const app = fastify({ logger: true })

import { getClient } from './db'

import { resolvers } from './resolvers'
import { typeDefs } from './schema'

const graphQLServer = createServer<{
  req: FastifyRequest
  reply: FastifyReply
}>({
  schema: {
    typeDefs,
    resolvers,
  },
  context: (context) => ({ ...context, db: getClient() }),
  graphiql: {},
  logging: app.log,
})

app.get('/', (_, reply) => {
  reply.send('OK')
})

app.route({
  url: '/graphql',
  method: ['GET', 'POST', 'OPTIONS'],
  handler: async (req, reply) => {
    const response = await graphQLServer.handleIncomingMessage(req, {
      req,
      reply,
    })

    response.headers.forEach((value, key) => {
      reply.header(key, value)
    })

    reply.status(response.status)

    reply.send(response.body)
  },
})

app.listen(Number(process.env.PORT) || 4000, '0.0.0.0')
