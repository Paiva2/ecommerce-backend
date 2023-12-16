import { Express } from "express"
import { insertProductDto, updateProductInformationsDto } from "../dtos/products"
import InsertProductToStoreController from "../controllers/product/insertProductToStoreController"
import GetAllProductsForAdminController from "../controllers/product/getAllProductsForAdminController"
import ListStoreProductsController from "../controllers/product/listStoreProductsController"
import UpdateProductInformationsController from "../controllers/product/updateProductInformationsController"
import dtoValidation from "../middleware/dtoValidation"
import verifyToken from "../middleware/verifyToken"

export default function productRoutes(app: Express) {
  app.post(
    "/product",
    [verifyToken, dtoValidation(insertProductDto)],
    InsertProductToStoreController.handle
  )

  app.get(
    "/profile/products",
    [verifyToken],
    GetAllProductsForAdminController.handle
  )

  app.get("/products", ListStoreProductsController.handle)

  app.patch(
    "/products",
    [verifyToken, dtoValidation(updateProductInformationsDto)],
    UpdateProductInformationsController.handle
  )
}
