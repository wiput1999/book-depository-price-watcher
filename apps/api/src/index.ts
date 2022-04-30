import fastify from 'fastify'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { createContext } from './context'
import { appRouter } from './router'

const server = fastify({
  maxParamLength: 5000,
})

const PORT = process.env.PORT || 3002

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
})
;(async () => {
  try {
    await server.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`)
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
})()

export type { AppRouter } from './router'
