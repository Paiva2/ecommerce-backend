import { Request, Response } from "express";
import { ErrorHandling } from "../../@types/types";
import ProductFactory from "../factory/productFactory";
import jwtDecode from "../../utils/jwtDecode";

export default class InsertProductToStoreController {
  public static async handle(req: Request, res: Response) {
    const { product } = req.body;

    const getToken = jwtDecode(req.headers.authorization as string);

    const { insertProductToStoreService } = await ProductFactory.exec();

    try {
      await insertProductToStoreService.exec({
        userId: getToken.sub,
        product,
      });

      return res.status(201).send({ message: "Product created successfully." });
    } catch (e) {
      const error = e as ErrorHandling;

      return res.status(error.status).send({ message: error.message });
    }
  }
}
