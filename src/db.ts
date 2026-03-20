import { randomUUID } from "crypto"
import { Product } from "./types/domain"

const categories = [
  "electronics",
  "books",
  "clothing",
  "home",
  "toys",
  "sports",
  "beauty",
  "automotive",
  "garden",
  "office",
]

const productNames = [
  "Wireless Headphones",
  "Bluetooth Speaker",
  "Smart Watch",
  "Laptop Stand",
  "Desk Lamp",
  "Classic Novel",
  "Cookbook",
  "Children's Storybook",
  "Notebook",
  "Planner",
  "Men's T-Shirt",
  "Women's Jacket",
  "Kids' Sneakers",
  "Baseball Cap",
  "Socks",
  "Coffee Maker",
  "Vacuum Cleaner",
  "Wall Clock",
  "Throw Pillow",
  "Tableware Set",
  "Building Blocks",
  "Puzzle Game",
  "Action Figure",
  "Board Game",
  "Dollhouse",
  "Yoga Mat",
  "Tennis Racket",
  "Football",
  "Water Bottle",
  "Fitness Tracker",
  "Face Cream",
  "Shampoo",
  "Perfume",
  "Lipstick",
  "Hair Dryer",
  "Car Charger",
  "Dash Cam",
  "Tire Inflator",
  "Car Vacuum",
  "Seat Cover",
  "Garden Hose",
  "Plant Pot",
  "Lawn Mower",
  "Pruning Shears",
  "Garden Gloves",
  "Desk Organizer",
  "Stapler",
  "Pen Set",
  "Monitor Stand",
  "File Cabinet",
]

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomPrice() {
  return Number((Math.random() * 100 + 5).toFixed(2))
}

function getRandomDescription(name, category) {
  return `High-quality ${name.toLowerCase()} for your ${category} needs.`
}

const products: Product[] = []

for (let i = 0; i < 50; i++) {
  const name = getRandomElement(productNames)
  const category = getRandomElement(categories)
  products.push({
    id: randomUUID(),
    name,
    description: getRandomDescription(name, category),
    price: getRandomPrice(),
    category,
    inStock: Math.random() < 0.7, // 70% chance in stock
  })
}

export default products
