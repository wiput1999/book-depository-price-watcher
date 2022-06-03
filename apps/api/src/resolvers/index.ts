import { Resolvers } from '../.codegen/graphql.types'
import { AppContext } from '../context'

export const resolvers: Resolvers<AppContext> = {
  Query: {
    pokemon: async (_parent, { id }, ctx) => {
      const books = await ctx.db.book.findMany()
      console.log(books)

      const result = await fetch(
        new Request(`https://pokeapi.co/api/v2/pokemon/${id}`),
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
}
