import { Product, RequestField } from "../types/domain.js"

export const UPDATE_PRODUCT_FIELDS: Array<RequestField> = [
  "name",
  "description",
  "price",
  "category",
  "inStock",
]
