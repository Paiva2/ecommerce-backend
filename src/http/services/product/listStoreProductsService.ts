import { IProduct } from "../../@types/types"
import ProductInterface from "../../interfaces/ProductInterface"

type ListStoreProductsServiceRequest = {
  page: number
}

type ListStoreProductsServiceResponse = {
  page: number
  products: IProduct[]
}

export default class ListStoreProductsService {
  constructor(private productInterface: ProductInterface) {}

  async exec({
    page,
  }: ListStoreProductsServiceRequest): Promise<ListStoreProductsServiceResponse> {
    if (page < 1) {
      page = 1
    }

    const getValidProducts = await this.productInterface.getActiveOnes(page)

    return {
      page,
      products: getValidProducts,
    }
  }
}
