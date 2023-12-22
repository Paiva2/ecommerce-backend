import { Request, Response } from "express";
import { ErrorHandling } from "../../@types/types";
import WishListItemFactory from "../factory/wishListItemFactory";
import jwtDecode from "../../utils/jwtDecode";

export default class InsertToWishListController {
  public static async handle(req: Request, res: Response) {
    const { productId } = req.body;

    const userToken = jwtDecode(req.headers.authorization as string);

    const { insertToWishListService } = await WishListItemFactory.exec();

    try {
      await insertToWishListService.exec({
        userId: userToken.sub,
        productId,
      });

      return res.status(204).send();
    } catch (e) {
      const error = e as ErrorHandling;

      console.log(e);

      return res.status(error.status).send({ message: error.message });
    }
  }
}
