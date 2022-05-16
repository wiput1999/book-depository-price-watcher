import { inferAsyncReturnType } from '@trpc/server'
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { PrismaClient } from 'db'

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { name: req.headers.username ?? 'anonymous' }

  const db = new PrismaClient()

  return { req, res, user, db }
}

export type Context = inferAsyncReturnType<typeof createContext>
