import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import Factory from "../factory/productFactory"
import ProductFactory from "../factory/productFactory"

export default class InsertProductToStoreController {
  public static async handle(req: Request, res: Response) {
    const { product } = req.body

    //TODO: JWT Validation

    const { insertProductToStoreService } = await ProductFactory.exec()

    try {
      await insertProductToStoreService.exec({
        userId: "",
        product,
      })

      return res.status(201).send({ message: "Product created successfully." })
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
