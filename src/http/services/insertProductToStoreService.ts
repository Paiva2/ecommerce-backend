import ProductInterface from "../interfaces/ProductInterface"
import UserInterface from "../interfaces/UserInterface"
import { IProduct } from "../@types/types"

type InsertProductToStoreServiceRequest = {
  userId: string
  product: {
    name: string
    value: number
    quantity: number
    description: string
    image: string
    sizes: string
    colors: string
    gender: string
    category: string
  }
}

type InsertProductToStoreServiceResponse = IProduct

export default class InsertProductToStoreService {
  constructor(
    private userInterface: UserInterface,
    private productInterface: ProductInterface
  ) {}

  async exec({
    product,
    userId,
  }: InsertProductToStoreServiceRequest): Promise<InsertProductToStoreServiceResponse> {
    if (!userId) {
      throw {
        status: 422,
        message: "Invalid user id.",
      }
    }

    const getUser = await this.userInterface.findById(userId)

    if (!getUser) {
      throw {
        status: 404,
        message: "User not found.",
      }
    } else if (getUser.role !== "admin") {
      throw {
        status: 403,
        message: "Permission denied.",
      }
    }

    const getProductFields = Object.keys(product)

    if (getProductFields.length < 9) {
      throw {
        status: 409,
        message: "Invalid product schema.",
      }
    }

    const createdProduct = await this.productInterface.create(product)

    return createdProduct
  }
}
