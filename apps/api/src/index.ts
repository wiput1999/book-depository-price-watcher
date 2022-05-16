import fastify from 'fastify'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { createContext } from './context'

const server = fastify({
  maxParamLength: 5000,
  logger: true,
})

const PORT = process.env.PORT || 3002

;(async () => {
  try {
    await server.listen(PORT)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
})()
