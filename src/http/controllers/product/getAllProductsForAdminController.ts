import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import ProductFactory from "../factory/productFactory"
import jwtDecode from "../../utils/jwtDecode"

export default class GetAllProductsForAdminController {
  public static async handle(req: Request, res: Response) {
    const { page } = req.query

    const getToken = jwtDecode(req.headers.authorization as string)

    const { getAlLProductsForAdminService } = await ProductFactory.exec()

    try {
      const products = await getAlLProductsForAdminService.exec({
        page: Number(page),
        userId: getToken.sub,
      })

      return res.status(200).send({ data: products })
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
