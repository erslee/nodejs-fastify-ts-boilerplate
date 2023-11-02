import { type FastifyRequest, type FastifyReply, RouteShorthandOptions } from 'fastify'

const options: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
}

function indexGetHandler(request: FastifyRequest, response: FastifyReply) {
  return {
    pong: 'it worked!',
  }
}

export default {
  url: '/',
  options,
  handler: indexGetHandler,
}
