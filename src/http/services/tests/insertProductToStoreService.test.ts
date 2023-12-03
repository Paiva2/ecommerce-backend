import InMemoryProduct from "../../in-memory/InMemoryProduct"
import InMemoryUser from "../../in-memory/InMemoryUser"
import InsertProductToStoreService from "../product/insertProductToStoreService"
import { randomUUID } from "crypto"
import { IProduct, IUser } from "../../@types/types"

let inMemoryUser: InMemoryUser
let inMemoryProduct: InMemoryProduct

let createdUser: IUser

let sut: InsertProductToStoreService

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
}

describe("Insert new product to store Service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryProduct = new InMemoryProduct()

    createdUser = await inMemoryUser.create({
      id: randomUUID(),
      email: "johndoe@test.com",
      fullName: "John Doe",
      password: "12345678",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    sut = new InsertProductToStoreService(inMemoryUser, inMemoryProduct)
  })

  it("should insert a new product on store list", async () => {
    const newProduct = await sut.exec({
      userId: createdUser.id as string,
      product: mockProduct,
    })

    expect(newProduct).toEqual(
      expect.objectContaining({
        id: newProduct.id,
        name: newProduct.name,
        value: newProduct.value,
        quantity: newProduct.quantity,
        description: newProduct.description,
        image: newProduct.image,
        sizes: newProduct.sizes,
        colors: newProduct.colors,
        gender: newProduct.gender,
        category: newProduct.category,
        isOnSale: false,
        saleEnd: null,
        saleValue: null,
        active: true,
      })
    )
  })

  it("should not insert a new product if user id are not provided in request", async () => {
    await expect(() => {
      return sut.exec({
        userId: "",
        product: mockProduct,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid user id.",
      })
    )
  })

  it("should not insert a new product if user doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        userId: "Inexistent user id",
        product: mockProduct,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "User not found.",
      })
    )
  })

  it("should not insert a new product if user isn't an admin", async () => {
    const clientUser = await inMemoryUser.create({
      id: randomUUID(),
      email: "johndoeclient@test.com",
      fullName: "John Doe Client",
      password: "12345678",
      role: "client",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await expect(() => {
      return sut.exec({
        userId: clientUser.id as string,
        product: mockProduct,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Permission denied.",
      })
    )
  })

  it("should not insert a new product if all product fields aren't valid", async () => {
    await expect(() => {
      return sut.exec({
        userId: createdUser.id as string,
        product: {
          category: "T-Shirt",
          quantity: 1,
          value: 200,
        } as IProduct,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid product schema.",
      })
    )
  })
})
