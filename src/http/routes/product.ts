import { Express } from "express"
import InsertProductToStoreController from "../controllers/product/insertProductToStoreController"
import GetAllProductsForAdminController from "../controllers/product/getAllProductsForAdminController"
import ListStoreProductsController from "../controllers/product/listStoreProductsController"
import UpdateProductInformationsController from "../controllers/product/updateProductInformationsController"
import dtoValidation from "../middleware/dtoValidation"
import { insertProductDto, updateProductInformationsDto } from "../dtos/products"

export default function productRoutes(app: Express) {
  app.post(
    "/product",
    [
      /* ONLY ADMIN */
      dtoValidation(insertProductDto),
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
      dtoValidation(updateProductInformationsDto),
    ],
    UpdateProductInformationsController.handle
  )
}
