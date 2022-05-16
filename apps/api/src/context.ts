import { PrismaClient } from 'db'
import { FastifyReply, FastifyRequest } from 'fastify'

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
  interface MercuriusContext
    extends PromiseType<ReturnType<typeof buildContext>> {}
}

export const buildContext = async (
  req: FastifyRequest,
  _reply: FastifyReply
) => {
  const db = new PrismaClient()

  return {
    db,
    authorization: req.headers.authorization,
  }
}
