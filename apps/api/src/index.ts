import { createServer } from '@graphql-yoga/common'
import { typeDefs } from './schema'

const server = createServer({
  schema: {
    typeDefs,
    resolvers: {
      Query: {
        pokemon: async (_parent, { id }) => {
          const result = await fetch(
            new Request(`https://pokeapi.co/api/v2/pokemon/${id}`),
            {
              // @ts-expect-error
              cf: {
                // Always cache this fetch regardless of content type
                // for a max of 1 min before revalidating the resource
                cacheTtl: 50,
                cacheEverything: true,
              },
            }
          )
          return await result.json()
        },
      },
    },
  },
  context: (context) => ({ ...context }),
  graphiql: {
    defaultQuery: /* GraphQL */ `
      query samplePokeAPIquery {
        pokemon: pokemon(id: 1) {
          id
          name
          height
          weight
          sprites {
            front_shiny
            back_shiny
          }
        }
      }
    `,
  },
})

server.start()
