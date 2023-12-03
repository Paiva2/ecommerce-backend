import ProductInterface from "../interfaces/ProductInterface"
import { randomUUID } from "crypto"
import { IProduct } from "../@types/types"

export default class InMemoryProduct implements ProductInterface {
  private products: IProduct[] = []

  async create(product: IProduct): Promise<IProduct> {
    const newProduct = {
      id: randomUUID(),
      name: product.name,
      value: product.value,
      quantity: product.quantity,
      description: product.description,
      image: product.image,
      sizes: product.sizes,
      colors: product.colors,
      gender: product.gender,
      category: product.category,
    }

    this.products.push(newProduct)

    return newProduct
  }

  async getAll(page: number): Promise<IProduct[]> {
    return this.products.slice((page - 1) * 10, page * 10)
  }
}
