import Fastify from "fastify"
import { addValidateProductId } from "./decorators.js"
import { setRoutes } from "./router.js"

export function buildServer() {
  const fastify = Fastify({
    logger: true,
  })

  const port = Number(process.env.PORT || 7001)
  
  addValidateProductId(fastify)
  setRoutes(fastify)

  fastify.listen({ port })
  return fastify
}
