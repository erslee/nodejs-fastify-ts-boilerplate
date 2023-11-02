import { type Server, type IncomingMessage, type ServerResponse } from 'node:http'
import Fastify, { type FastifyInstance } from 'fastify'
import { IObjectKeys } from 'src/interfaces'
import { getHandlers, postHandlers } from 'src/handlers'
import { environment, getConfigValue } from './config'

const envToLogger: IObjectKeys = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'yyyy-MM-dd HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
  logger: envToLogger[environment] ?? true,
})

getHandlers.map(({ url, options, handler }) => server.get(url, options, handler))
postHandlers.map(({ url, options, handler }) => server.post(url, options, handler))

export const start = async () => {
  const port = getConfigValue('SERVER_PORT')
  const host = getConfigValue('SERVER_HOST')

  try {
    await server.listen({ port: Number.parseInt(port, 10), host })
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}
