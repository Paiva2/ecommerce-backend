import prisma from "../../../lib/prisma";
import { WishListItemInsert, WishListItem } from "../../@types/types";
import WishListItemInterface from "../../interfaces/WishListItemInterface";

export default class WishListItemPg implements WishListItemInterface {
  async insert(
    userId: string,
    wishListItem: WishListItemInsert
  ): Promise<WishListItem> {
    const insertProduct = await prisma.wishListItem.create({
      data: {
        ...wishListItem,
        fkUserId: userId,
      },
    });

    return insertProduct;
  }
  async findProductId(
    userId: string,
    productId: string
  ): Promise<WishListItem | null> {
    const findProduct = await prisma.wishListItem.findFirst({
      where: {
        productId,
        fkUserId: userId,
      },
    });

    return findProduct;
  }
}
