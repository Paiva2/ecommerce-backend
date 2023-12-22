import { WishListItem } from "../../@types/types";
import ProductInterface from "../../interfaces/ProductInterface";
import UserInterface from "../../interfaces/UserInterface";
import WishListItemInterface from "../../interfaces/WishListItemInterface";

interface InserToWishListServiceRequest {
  userId: string;
  productId: string;
}

type InserToWishListServiceResponse = WishListItem;

export default class InserToWishListService {
  constructor(
    private userInterface: UserInterface,
    private wishListItemInterface: WishListItemInterface,
    private productInterface: ProductInterface
  ) {}

  async exec({
    userId,
    productId,
  }: InserToWishListServiceRequest): Promise<InserToWishListServiceResponse> {
    if (!userId) {
      throw {
        status: 400,
        message: "Invalid user id.",
      };
    }

    const getUser = await this.userInterface.findById(userId);

    if (!getUser) {
      throw {
        status: 404,
        message: "User not found.",
      };
    }

    const doesProductExists = await this.productInterface.findById(productId);

    if (!doesProductExists) {
      throw {
        status: 404,
        message: "Product not found.",
      };
    }

    const isItemIsAlreadyOnList =
      await this.wishListItemInterface.findProductId(userId, productId);

    if (isItemIsAlreadyOnList) {
      throw {
        status: 409,
        message: "Item is already on user's wish list.",
      };
    }

    const insertOnWishList = await this.wishListItemInterface.insert(userId, {
      image: doesProductExists.image,
      name: doesProductExists.name,
      productId,
      value: doesProductExists.value,
    });

    return insertOnWishList;
  }
}
