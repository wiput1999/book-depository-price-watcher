import { createServer } from '@graphql-yoga/common'
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
})

server.start()
