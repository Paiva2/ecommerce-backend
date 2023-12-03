import ProductMongo from "../../database/mongo/product"
import UserPg from "../../database/postgres/user"
import InsertProductToStoreService from "../../services/product/insertProductToStoreService"

export default class Factory {
  public static async exec() {
    const productModel = new ProductMongo()
    const userModel = new UserPg()

    const insertProductToStoreService = new InsertProductToStoreService(
      userModel,
      productModel
    )

    return {
      insertProductToStoreService,
    }
  }
}
