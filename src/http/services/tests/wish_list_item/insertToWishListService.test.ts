import InMemoryProduct from "../../../in-memory/InMemoryProduct";
import InMemoryUser from "../../../in-memory/InMemoryUser";
import InsertProductToStoreService from "../../product/insertProductToStoreService";
import InserToWishListService from "../../wish_list/insertToWishListService";
import WishListItemInterface from "../../../interfaces/WishListItemInterface";
import InMemoryWIshListItem from "../../../in-memory/inMemoryWishListItem";
import { randomUUID } from "crypto";
import { IUser } from "../../../@types/types";

let inMemoryUser: InMemoryUser;
let inMemoryProduct: InMemoryProduct;
let inMemoryWishListItem: WishListItemInterface;

let createdUser: IUser;

let insertProductToStoreService: InsertProductToStoreService;

let sut: InserToWishListService;

const mockProduct = {
  category: "T-Shirt",
  colors: "blue;green;red",
  description: "Normal T-Shirt for tests",
  gender: "M;F",
  image: "Product Picture URL",
  name: "Normal T-Shirt",
  quantity: 1,
  sizes: "s;m;g",
  value: 200,
};

describe("Insert to wish list service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser();
    inMemoryProduct = new InMemoryProduct();
    inMemoryWishListItem = new InMemoryWIshListItem();

    sut = new InserToWishListService(
      inMemoryUser,
      inMemoryWishListItem,
      inMemoryProduct
    );

    createdUser = await inMemoryUser.create({
      id: randomUUID(),
      email: "johndoe@test.com",
      fullName: "John Doe",
      password: "12345678",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    insertProductToStoreService = new InsertProductToStoreService(
      inMemoryUser,
      inMemoryProduct
    );
  });

  it("should insert an product store item to user wish list", async () => {
    const productOne = await insertProductToStoreService.exec({
      userId: createdUser.id as string,
      product: mockProduct,
    });

    const productInserted = await sut.exec({
      productId: productOne.id as string,
      userId: createdUser.id as string,
    });

    expect(productInserted).toEqual({
      id: expect.any(String),
      createdAt: expect.any(Date),
      fkUserId: createdUser.id,
      name: productOne.name,
      value: productOne.value,
      image: productOne.image,
      productId: productOne.id,
    });
  });

  it("should not insert to wish list without user id provided", async () => {
    await expect(() => {
      return sut.exec({
        userId: "",
        productId: "",
      });
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid user id.",
      })
    );
  });

  it("should not insert to wish list if user id does't exists registered", async () => {
    await expect(() => {
      return sut.exec({
        userId: "Inexistent user id",
        productId: "",
      });
    }).rejects.toEqual(
      expect.objectContaining({
        message: "User not found.",
      })
    );
  });

  it("should not insert to wish list if product doesn't exists.", async () => {
    await expect(() => {
      return sut.exec({
        userId: createdUser.id as string,
        productId: "",
      });
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Product not found.",
      })
    );
  });

  it("should not insert to wish list if product is already on wish list.", async () => {
    const productOne = await insertProductToStoreService.exec({
      userId: createdUser.id as string,
      product: mockProduct,
    });

    await sut.exec({
      productId: productOne.id as string,
      userId: createdUser.id as string,
    });

    await expect(() => {
      return sut.exec({
        productId: productOne.id as string,
        userId: createdUser.id as string,
      });
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Item is already on user's wish list.",
      })
    );
  });
});
