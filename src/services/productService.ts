import { randomUUID } from "crypto"
import products from "../db"
import { Product, ProductBody } from "../types/domain"

export function getAllProducts(): Product[] {
  return products
}

export function findProductById(productId: string): Product | undefined {
  return products.find(({ id }) => id === productId)
}

export function createProduct(body: ProductBody): Product {
  const newProduct = {
    id: randomUUID(),
    ...body,
  }
  products.push(newProduct)
  return newProduct
}

export function updateProduct(
  product: Product,
  updateFields: Partial<Product>
): Product {
  return Object.assign(product, updateFields)
}

export function removeProductById(productId: string): boolean {
  const productIndex = products.findIndex(({ id }) => id === productId)

  if (productIndex === -1) {
    return false
  }

  products.splice(productIndex, 1)
  return true
}
