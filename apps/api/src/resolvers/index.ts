import { IResolvers } from 'mercurius'

const resolvers: IResolvers = {
  Query: {
    add: async (_, { x, y }, ctx) => {
      const books = await ctx.db.book.findMany()
      console.log(books)
      return x + y
    },
  },
}

export default resolvers
