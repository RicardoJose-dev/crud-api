import { FastifyReply } from "fastify"
import { buildServer } from "./server.js"

const fastify = buildServer()

fastify.all("*", async (_, reply: FastifyReply) => {
  reply.status(404).send("Route not found")
})

fastify.setErrorHandler((error, request, reply: FastifyReply) => {
  reply.status(500).send("Unexpected server error")
})

const port = Number(process.env.PORT || 7001)

// Run the server!
try {
  await fastify.listen({ port })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
