import { IProduct } from "../../@types/types"
import ProductInterface from "../../interfaces/ProductInterface"
import UserInterface from "../../interfaces/UserInterface"

type GetAllProductsServiceRequest = {
  userId: string
  page: number
}

type GetAllProductsServiceResponse = {
  page: number
  products: Array<IProduct>
}

export default class GetAllProductsForAdminService {
  constructor(
    private productInterface: ProductInterface,
    private userInterface: UserInterface
  ) {}

  async exec({
    userId,
    page,
  }: GetAllProductsServiceRequest): Promise<GetAllProductsServiceResponse> {
    /*     if (!userId) {
      throw {
        status: 422,
        message: "Invalid user id.",
      }
    }

    const findUser = await this.userInterface.findById(userId)

    if (!findUser) {
      throw {
        status: 404,
        message: "User not found.",
      }
    } else if (findUser.role !== "admin") {
      throw {
        status: 403,
        message: "Permission denied.",
      }
    } */

    if (page < 1) {
      page = 1
    }

    const allProducts = await this.productInterface.getAll(page)

    return {
      page,
      products: allProducts,
    }
  }
}
