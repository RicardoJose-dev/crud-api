import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import {
  findProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  removeProductById,
} from "./services/productService.js"
import { UPDATE_PRODUCT_FIELDS } from "./services/constants.js"
import { RequestField, ProductParams, ProductBody } from "./types/domain.js"

export const setRoutes = (fastify: FastifyInstance) => {
  fastify.get("/api/products", function handler(_, reply: FastifyReply) {
    const products = getAllProducts()
    return reply.status(200).send(products)
  })

  fastify.get(
    "/api/products/:productId",
    function handler(
      request: FastifyRequest<{ Params: ProductParams }>,
      reply: FastifyReply
    ) {
      const productId = request.validateProductId(reply)

      if (!productId) {
        return
      }

      const product = findProductById(productId)

      if (product) {
        return reply.status(200).send(product)
      }

      return reply.status(404).send(`Product not found for id ${productId}`)
    }
  )

  fastify.post(
    "/api/products",
    function handler(
      request: FastifyRequest<{ Body: ProductBody }>,
      reply: FastifyReply
    ) {
      const body = request.body

      const missingFields = UPDATE_PRODUCT_FIELDS.map(
        (field) => body[field]
      ).some((value) => value === undefined || value === null)

      if (missingFields) {
        return reply.status(400).send("Missing fields in request body")
      }

      const { price } = body

      if (price < 0) {
        return reply.status(400).send("Price field cannot be less than 0")
      }

      const product = createProduct(body)
      return reply.status(201).send(product)
    }
  )

  fastify.put(
    "/api/products/:productId",
    function handler(
      request: FastifyRequest<{
        Params: ProductParams
        Body: Partial<ProductBody>
      }>,
      reply: FastifyReply
    ) {
      const productId = request.validateProductId(reply)

      if (!productId) {
        return
      }

      const product = findProductById(productId)

      if (product === undefined) {
        return reply.status(404).send(`Product not found for id ${productId}`)
      }

      const body = request.body

      //remove fields not valid for product objects
      const updateFields = Object.keys(body)
        .filter(
          (field) => UPDATE_PRODUCT_FIELDS.indexOf(field as RequestField) !== -1
        )
        .map((field) => ({ [field]: body[field as RequestField] }))
        .reduce(
          (responseObj, currObj) => ({
            ...responseObj,
            ...currObj,
          }),
          {}
        )

      const updatedProduct = updateProduct(product, updateFields)
      return reply.status(200).send(updatedProduct)
    }
  )

  fastify.delete(
    "/api/products/:productId",
    function handler(
      request: FastifyRequest<{
        Params: ProductParams
      }>,
      reply: FastifyReply
    ) {
      const productId = request.validateProductId(reply)

      if (!productId) {
        return
      }

      if (removeProductById(productId)) {
        return reply.status(204).send()
      }

      return reply.status(404).send(`Product not found for id ${productId}`)
    }
  )
}
