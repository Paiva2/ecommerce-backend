import { IProduct } from "../../@types/types"
import ProductInterface from "../../interfaces/ProductInterface"
import UserInterface from "../../interfaces/UserInterface"

type UpdateProductInformationsServiceRequest = {
  userId: string
  productId: string
  fields: {
    name?: string
    value?: number
    quantity?: number
    description?: string
    image?: string
    sizes?: string
    colors?: string
    gender?: string
    category?: string
    isOnSale?: boolean
    saleEnd?: Date | null
    saleValue?: number | null
  }
}

type UpdateProductInformationsServiceResponse = IProduct

export default class UpdateProductInformationsService {
  constructor(
    private userInterface: UserInterface,
    private productInterface: ProductInterface
  ) {}

  async exec({
    userId,
    productId,
    fields,
  }: UpdateProductInformationsServiceRequest): Promise<UpdateProductInformationsServiceResponse> {
    /*     if (!userId) {
      throw {
        status: 422,
        message: "Invalid user id.",
      }
    } else if (!productId) {
      throw {
        status: 422,
        message: "Invalid product id.",
      }
    } */

    const doesProductExists = await this.productInterface.findById(productId)

    if (!doesProductExists) {
      throw {
        status: 404,
        message: "Product not found.",
      }
    }

    /*     const getUser = await this.userInterface.findById(userId)

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
    } */

    if (!Object.keys(fields).length) return doesProductExists

    const updatedProduct = await this.productInterface.update(productId, fields)

    return updatedProduct
  }
}
