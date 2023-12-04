import { Express } from "express"
import InsertProductToStoreController from "../controllers/product/insertProductToStoreController"
import GetAllProductsForAdminController from "../controllers/product/getAllProductsForAdminController"
import ListStoreProductsController from "../controllers/product/listStoreProductsController"
import UpdateProductInformationsController from "../controllers/product/updateProductInformationsController"

export default function productRoutes(app: Express) {
  app.post(
    "/product",
    [
      /* ONLY ADMIN */
    ],
    InsertProductToStoreController.handle
  )

  app.get(
    "/profile/products",
    [
      /* ONLY ADMIN */
    ],
    GetAllProductsForAdminController.handle
  )

  app.get(
    "/products",
    [
      /* ONLY ADMIN */
    ],
    ListStoreProductsController.handle
  )

  app.patch(
    "/products",
    [
      /* ONLY ADMIN */
    ],
    UpdateProductInformationsController.handle
  )
}
