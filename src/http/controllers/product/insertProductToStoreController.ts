import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import Factory from "../factory"

export default class InsertProductToStoreController {
  public static async handle(req: Request, res: Response) {
    const { product } = req.body

    //VALIDATE JTW

    const { insertProductToStoreService } = await Factory.exec()

    try {
      await insertProductToStoreService.exec({
        userId: "",
        product,
      })
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
