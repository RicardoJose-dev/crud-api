import { FastifyReply } from "fastify"

declare module "fastify" {
  interface FastifyRequest {
    validateProductId: (reply: FastifyReply) => string | false
  }
}
