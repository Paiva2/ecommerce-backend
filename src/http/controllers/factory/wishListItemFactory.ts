import ProductMongo from "../../database/mongo/product";
import UserPg from "../../database/postgres/user";
import WishListItemPg from "../../database/postgres/wishListItem";
import InserToWishListService from "../../services/wish_list/insertToWishListService";

export default class WishListItemFactory {
  public static async exec() {
    const userPg = new UserPg();
    const productMongo = new ProductMongo();
    const wishListItemPg = new WishListItemPg();

    const insertToWishListService = new InserToWishListService(
      userPg,
      wishListItemPg,
      productMongo
    );

    return {
      insertToWishListService,
    };
  }
}
