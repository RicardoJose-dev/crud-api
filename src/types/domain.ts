export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
}

export interface ProductParams {
  productId: string
}

export type RequestField = Exclude<keyof Product, "id">

export interface ProductBody extends Omit<Product, "id"> {}
