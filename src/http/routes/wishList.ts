import { Express } from "express";
import verifyToken from "../middleware/verifyToken";
import InsertProductToStoreController from "../controllers/product/insertProductToStoreController";
import InsertToWishListController from "../controllers/wish_list/insertToWishListController";

export default function wishListRoutes(app: Express) {
  app.post("/wish-list", [verifyToken], InsertToWishListController.handle);
}
