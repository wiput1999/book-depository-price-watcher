import { createServer } from '@graphql-yoga/node'
import { getClient } from './db'

import { resolvers } from './resolvers'
import { typeDefs } from './schema'

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  context: (context) => ({ ...context, db: getClient() }),
  graphiql: {},
  port: Number(process.env.PORT) || 4000,
})

server.start()
