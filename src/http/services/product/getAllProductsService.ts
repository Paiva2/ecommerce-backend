import { IProduct } from "../../@types/types"
import ProductInterface from "../../interfaces/ProductInterface"

type GetAllProductsServiceRequest = {
  page: number
}

type GetAllProductsServiceResponse = {
  page: number
  products: Array<IProduct>
}

export default class GetAllProductsService {
  constructor(private productInterface: ProductInterface) {}

  async exec({
    page,
  }: GetAllProductsServiceRequest): Promise<GetAllProductsServiceResponse> {
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
