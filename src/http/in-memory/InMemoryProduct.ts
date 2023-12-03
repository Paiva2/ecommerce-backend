import ProductInterface from "../interfaces/ProductInterface"
import { randomUUID } from "crypto"
import { IProduct, IProductUpdate } from "../@types/types"

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
      isOnSale: false,
      saleEnd: null,
      saleValue: null,
    }

    this.products.push(newProduct)

    return newProduct
  }

  async getAll(page: number): Promise<IProduct[]> {
    return this.products.slice((page - 1) * 10, page * 10)
  }

  async findById(productId: string): Promise<IProduct | null> {
    const findProduct = this.products.find((product) => product.id === productId)

    if (!findProduct) return null

    return findProduct
  }

  async update(productId: string, fields: IProductUpdate): Promise<IProduct> {
    let product = {} as IProduct

    const getProduct = this.products.find((product) => product.id === productId)
    const fieldsToUpdate = Object.keys(fields)

    if (getProduct) {
      product = getProduct

      for (let field of fieldsToUpdate) {
        const changingField = field as keyof typeof fields

        product = {
          ...product,
          [changingField]: fields[changingField],
        }
      }
    }

    return product
  }
}
