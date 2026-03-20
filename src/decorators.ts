import { FastifyInstance, FastifyReply } from "fastify"

export function addValidateProductId(fastify: FastifyInstance) {
  fastify.decorateRequest("validateProductId", function (reply: FastifyReply) {
    const { productId } = this.params as { productId?: string }
    if (!productId) {
      reply.status(400).send(`Invalid product id`)
      return false
    }
    return productId
  })
}
