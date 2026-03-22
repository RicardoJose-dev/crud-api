import { describe, it, expect } from "vitest"
import { buildServer } from "../server.js"

const fastify = buildServer()

describe("Server routes", () => {
  it("should return a list of products", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/api/products",
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(JSON.parse(response.body)).toHaveLength(5)
  })

  it("should return a product by id", async () => {
    const productId = "dc734275-e690-479f-b793-394548ae78fb"

    const response = await fastify.inject({
      method: "GET",
      url: `/api/products/${productId}`,
    })

    expect(response.statusCode).toBe(200)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(JSON.parse(response.body)).toMatchObject({
      id: productId,
      name: "Tennis Racket",
      description: "High-quality tennis racket for your garden needs.",
      price: 76.26,
      category: "garden",
      inStock: true,
    })
  })

  it("should create a new product", async () => {
    const newProduct = {
      name: "Football",
      description: "High-quality football for your electronics needs.",
      price: 26.5,
      category: "electronics",
      inStock: true,
    }

    const response = await fastify.inject({
      method: "POST",
      url: "/api/products",
      payload: newProduct,
    })

    expect(response.statusCode).toBe(201)

    expect(JSON.parse(response.body).name).toEqual(newProduct.name)
    expect(JSON.parse(response.body).description).toEqual(
      newProduct.description
    )
    expect(JSON.parse(response.body).price).toEqual(newProduct.price)
    expect(JSON.parse(response.body).category).toEqual(newProduct.category)
    expect(JSON.parse(response.body).inStock).toEqual(newProduct.inStock)
  })

  it("should update an existing product", async () => {
    const updatedProductId = "dc734275-e690-479f-b793-394548ae78fb"

    const updatedProductBody = { price: 99.99 }

    const response = await fastify.inject({
      method: "PUT",
      url: `/api/products/${updatedProductId}`,
      payload: updatedProductBody,
    })

    expect(response.statusCode).toBe(200)

    expect(JSON.parse(response.body).id).toEqual(updatedProductId)
    expect(JSON.parse(response.body).price).toEqual(updatedProductBody.price)
  })

  it("should return 404 for non-existing product", async () => {
    const doesnotexistId = "bbbb"

    const response = await fastify.inject({
      method: "PUT",
      url: `/api/products/${doesnotexistId}`,
      payload: { name: "No Product" },
    })

    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual(`Product not found for id ${doesnotexistId}`)
  })

  it("should delete an existing product", async () => {
    const productId = "dc734275-e690-479f-b793-394548ae78fb"

    const response = await fastify.inject({
      method: "DELETE",
      url: `/api/products/${productId}`,
    })

    expect(response.statusCode).toBe(204)
    expect(response.body).toBe("")
  })
})
