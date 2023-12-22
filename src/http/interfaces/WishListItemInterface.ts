import { WishListItem, WishListItemInsert } from "../@types/types";

export default interface WishListItemInterface {
  insert(
    userId: string,
    wishListItem: WishListItemInsert
  ): Promise<WishListItem>;

  findProductId(
    userId: string,
    productId: string
  ): Promise<WishListItem | null>;
}
