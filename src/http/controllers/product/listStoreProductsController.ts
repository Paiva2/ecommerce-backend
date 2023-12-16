import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import ProductFactory from "../factory/productFactory"

export default class ListStoreProductsController {
  public static async handle(req: Request, res: Response) {
    const { page } = req.query

    const { listStoreProductsService } = await ProductFactory.exec()

    try {
      const products = await listStoreProductsService.exec({
        page: Number(page),
      })

      return res.status(200).send({ data: products })
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
