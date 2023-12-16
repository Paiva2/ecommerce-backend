import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import ProductFactory from "../factory/productFactory"
import jwtDecode from "../../utils/jwtDecode"

export default class UpdateProductInformationsController {
  public static async handle(req: Request, res: Response) {
    const { productId, fields } = req.body

    const getToken = jwtDecode(req.headers.authorization as string)

    const { updateProductInformationsService } = await ProductFactory.exec()

    try {
      await updateProductInformationsService.exec({
        productId,
        userId: getToken.sub,
        fields,
      })

      return res.status(204).send({ message: "Update successful." })
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
