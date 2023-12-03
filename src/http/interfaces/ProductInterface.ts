import { IProduct } from "../@types/types"

export default interface ProductInterface {
  create(product: IProduct): Promise<IProduct>
}
