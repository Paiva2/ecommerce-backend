import { IProduct, IProductUpdate } from "../@types/types"

export default interface ProductInterface {
  create(product: IProduct): Promise<IProduct>

  getAll(page: number): Promise<Array<IProduct>>

  findById(productId: string): Promise<IProduct | null>

  update(productId: string, fields: IProductUpdate): Promise<IProduct>

  getActiveOnes(page: number): Promise<IProduct[]>
}
