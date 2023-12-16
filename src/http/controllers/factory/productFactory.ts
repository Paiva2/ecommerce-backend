import ProductMongo from "../../database/mongo/product"
import UserPg from "../../database/postgres/user"
import GetAllProductsForAdminService from "../../services/product/getAllProductsForAdminService"
import InsertProductToStoreService from "../../services/product/insertProductToStoreService"
import ListStoreProductsService from "../../services/product/listStoreProductsService"
import UpdateProductInformationsService from "../../services/product/updateProductInformationsService"

export default class ProductFactory {
  public static async exec() {
    const productModel = new ProductMongo()
    const userModel = new UserPg()

    const updateProductInformationsService = new UpdateProductInformationsService(
      userModel,
      productModel
    )

    const listStoreProductsService = new ListStoreProductsService(productModel)

    const getAlLProductsForAdminService = new GetAllProductsForAdminService(
      productModel,
      userModel
    )

    const insertProductToStoreService = new InsertProductToStoreService(
      userModel,
      productModel
    )

    return {
      updateProductInformationsService,
      listStoreProductsService,
      getAlLProductsForAdminService,
      insertProductToStoreService,
    }
  }
}
