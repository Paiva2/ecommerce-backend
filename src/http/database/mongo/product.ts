import { IProduct, IProductUpdate } from "../../@types/types"
import ProductModel from "./schemas/product"
import ProductInterface from "../../interfaces/ProductInterface"

export default class ProductMongo implements ProductInterface {
  async create(product: IProduct): Promise<IProduct> {
    const newProductFields = {
      name: product.name,
      quantity: product.quantity,
      category: product.category,
      colors: product.colors,
      active: true,
      description: product.description,
      gender: product.gender,
      image: product.image,
      sizes: product.sizes,
      value: product.value,
      isOnSale: false,
      saleValue: null,
      saleEnd: null,
    }

    const newProduct = new ProductModel(newProductFields)

    newProduct.save()

    return newProductFields
  }

  async getAll(page: number): Promise<IProduct[]> {
    throw new Error("Method not implemented.")
  }

  async findById(productId: string): Promise<IProduct | null> {
    throw new Error("Method not implemented.")
  }

  async update(productId: string, fields: IProductUpdate): Promise<IProduct> {
    throw new Error("Method not implemented.")
  }

  async getActiveOnes(page: number): Promise<IProduct[]> {
    throw new Error("Method not implemented.")
  }
}
