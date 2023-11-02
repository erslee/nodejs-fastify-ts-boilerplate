import { type Server, type IncomingMessage, type ServerResponse } from 'node:http'
import Fastify, { type FastifyInstance } from 'fastify'
import { IObjectKeys } from 'src/interfaces'
import { getHandlers, postHandlers } from 'src/handlers'
import { environment } from './config'

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

// server.get('/ping', options, indexHandler)

export const start = async () => {
  try {
    await server.listen({ port: 3000, host: 'localhost' })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

    server.log.info(`Server is listening on port ${port}`)
  } catch (error) {
    server.log.error(error)
    // throw new Error('Something went wrong')
    process.exit(1)
  }
}
