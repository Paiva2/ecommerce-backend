import { Express } from "express"
import InsertProductToStoreController from "../controllers/product/insertProductToStoreController"

export default function productRoutes(app: Express) {
  app.post(
    "/product",
    [
      /* ONLY ADMIN */
    ],
    InsertProductToStoreController.handle
  )
}
