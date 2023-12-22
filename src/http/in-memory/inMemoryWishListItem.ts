import { randomUUID } from "crypto";
import { WishListItemInsert, WishListItem } from "../@types/types";
import WishListItemInterface from "../interfaces/WishListItemInterface";

export default class InMemoryWIshListItem implements WishListItemInterface {
  private wishListItems = [] as WishListItem[];

  async insert(
    userId: string,
    wishListItem: WishListItemInsert
  ): Promise<WishListItem> {
    const item = {
      ...wishListItem,
      id: randomUUID(),
      createdAt: new Date(),
      fkUserId: userId,
    };

    this.wishListItems.push(item);

    return item;
  }

  async findProductId(
    userId: string,
    productId: string
  ): Promise<WishListItem | null> {
    const findProductOnList = this.wishListItems.find(
      (product) =>
        product.productId === productId && product.fkUserId === userId
    );

    if (!findProductOnList) return null;

    return findProductOnList;
  }
}
