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
    const perPage = 10
    const product = (await ProductModel.find({})
      .skip((page - 1) * perPage)
      .limit(page * perPage)) as IProduct[]

    return product
  }

  async findById(productId: string): Promise<IProduct | null> {
    const getProduct = (await ProductModel.findOne({
      id: productId,
    }).lean()) as IProduct | null

    return getProduct
  }

  async update(productId: string, fields: IProductUpdate): Promise<IProduct> {
    const fieldsToUpdate = Object.keys(fields)

    const currentProduct = (await ProductModel.findOne({
      id: productId,
    }).lean()) as IProduct

    let productUpdated = currentProduct

    for (const field of fieldsToUpdate) {
      productUpdated = {
        ...productUpdated,
        [field]: fields[field as keyof typeof fields],
      }
    }

    const updatedProduct = (await ProductModel.findOneAndUpdate(
      {
        id: productId,
      },
      productUpdated
    )) as IProduct

    return updatedProduct
  }

  async getActiveOnes(page: number): Promise<IProduct[]> {
    const perPage = 10

    const getProducts = (await ProductModel.find({
      active: true,
    })
      .skip((page - 1) * perPage)
      .limit(page * perPage)) as IProduct[]

    return getProducts
  }
}
