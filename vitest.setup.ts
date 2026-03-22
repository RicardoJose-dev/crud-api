import { vi } from "vitest"

vi.mock("./src/db.ts", () => ({
  default: [
    {
      id: "b776ef62-664d-4528-b7bd-8c2484847e23",
      name: "Pruning Shears",
      description: "High-quality pruning shears for your sports needs.",
      price: 84.46,
      category: "sports",
      inStock: true,
    },
    {
      id: "2f9126fe-107c-4bc6-8839-12a3226d0238",
      name: "Shampoo",
      description: "High-quality shampoo for your toys needs.",
      price: 49.84,
      category: "toys",
      inStock: true,
    },
    {
      id: "dc734275-e690-479f-b793-394548ae78fb",
      name: "Tennis Racket",
      description: "High-quality tennis racket for your garden needs.",
      price: 76.26,
      category: "garden",
      inStock: true,
    },
    {
      id: "e5163c4e-6a90-423a-bcf6-6e784b3a34b8",
      name: "Monitor Stand",
      description: "High-quality monitor stand for your clothing needs.",
      price: 16.11,
      category: "clothing",
      inStock: true,
    },
    {
      id: "0a1a2f92-f15f-489c-a675-b2068bb1c28b",
      name: "Car Charger",
      description: "High-quality car charger for your electronics needs.",
      price: 10.2,
      category: "electronics",
      inStock: true,
    },
  ],
}))
