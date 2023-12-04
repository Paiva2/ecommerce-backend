import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import Factory from "../factory"

export default class GetAllProductsForAdminController {
  public static async handle(req: Request, res: Response) {
    const { page } = req.query

    const { getAlLProductsForAdminService } = await Factory.exec()

    try {
      const products = await getAlLProductsForAdminService.exec({
        page: Number(page),
        userId: "",
      })

      return res.status(200).send({ data: products })
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
