import fastify from 'fastify'
import mercurius from 'mercurius'
import mercuriusCodegen from 'mercurius-codegen'
import schema from './schema'
import resolvers from './resolvers'
import { buildContext } from './context'

const server = fastify({
  maxParamLength: 5000,
  logger: true,
})

const PORT = process.env.PORT || 3002

server.register(mercurius, {
  schema,
  resolvers,
  context: buildContext,
  graphiql: false,
})

async function main() {
  mercuriusCodegen(server, {
    disable: process.env.NODE_ENV === 'production',
    targetPath: './src/.codegen/graphql.ts',
  }).catch(console.error)

  try {
    await server.listen(PORT)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

main()
