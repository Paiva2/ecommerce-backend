import InMemoryProduct from "../../in-memory/InMemoryProduct"
import InMemoryUser from "../../in-memory/InMemoryUser"
import InsertProductToStoreService from "../product/insertProductToStoreService"
import { randomUUID } from "crypto"
import { IUser } from "../../@types/types"
import UpdateProductInformationsService from "../product/updateProductInformationsService"

let inMemoryUser: InMemoryUser
let inMemoryProduct: InMemoryProduct

let createdUser: IUser

let insertProductToStoreService: InsertProductToStoreService
let sut: UpdateProductInformationsService

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

describe("Update product informations service", () => {
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

    insertProductToStoreService = new InsertProductToStoreService(
      inMemoryUser,
      inMemoryProduct
    )

    sut = new UpdateProductInformationsService(inMemoryUser, inMemoryProduct)
  })

  it("should update an product informations dinamically", async () => {
    const productOne = await insertProductToStoreService.exec({
      userId: createdUser.id as string,
      product: mockProduct,
    })

    const updatedProduct = await sut.exec({
      userId: createdUser.id as string,
      productId: productOne.id as string,
      fields: {
        name: "Update product name",
        description: "Update product description",
        isOnSale: true,
        saleEnd: new Date(2100, 10, 10),
        saleValue: 400,
      },
    })

    expect(updatedProduct).toEqual(
      expect.objectContaining({
        ...productOne,
        name: "Update product name",
        description: "Update product description",
        isOnSale: true,
        saleValue: 400,
        saleEnd: new Date("2100-11-10T03:00:00.000Z"),
      })
    )
  })

  it("should return current product infos if any field are provided to update", async () => {
    const productOne = await insertProductToStoreService.exec({
      userId: createdUser.id as string,
      product: mockProduct,
    })

    const updatedProduct = await sut.exec({
      userId: createdUser.id as string,
      productId: productOne.id as string,
      fields: {},
    })

    expect(updatedProduct).toEqual(expect.objectContaining(productOne))
  })

  it("should not update an product informations without an provided user id", async () => {
    await expect(() => {
      return sut.exec({
        userId: "",
        productId: "",
        fields: {
          name: "Update product name",
          description: "Update product description",
          isOnSale: true,
          saleEnd: new Date(2100, 10, 10),
          saleValue: 400,
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid user id.",
      })
    )
  })

  it("should not update an product informations without an provided product id", async () => {
    await expect(() => {
      return sut.exec({
        userId: "Any user id",
        productId: "",
        fields: {
          name: "Update product name",
          description: "Update product description",
          isOnSale: true,
          saleEnd: new Date(2100, 10, 10),
          saleValue: 400,
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid product id.",
      })
    )
  })

  it("should not update an product informations if product doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        userId: "Any user id",
        productId: "Inexistent product id",
        fields: {
          name: "Update product name",
          description: "Update product description",
          isOnSale: true,
          saleEnd: new Date(2100, 10, 10),
          saleValue: 400,
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Product not found.",
      })
    )
  })

  it("should not update an product informations if user doesn't exists", async () => {
    const productOne = await insertProductToStoreService.exec({
      userId: createdUser.id as string,
      product: mockProduct,
    })

    await expect(() => {
      return sut.exec({
        userId: "Inexistent user id",
        productId: productOne.id as string,
        fields: {
          name: "Update product name",
          description: "Update product description",
          isOnSale: true,
          saleEnd: new Date(2100, 10, 10),
          saleValue: 400,
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "User not found.",
      })
    )
  })

  it("should not update an product informations if user isn't an admin", async () => {
    const clientUser = await inMemoryUser.create({
      id: randomUUID(),
      email: "johndoeclient@test.com",
      fullName: "John Doe Client",
      password: "12345678",
      role: "client",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const productOne = await insertProductToStoreService.exec({
      userId: createdUser.id as string,
      product: mockProduct,
    })

    await expect(() => {
      return sut.exec({
        userId: clientUser.id as string,
        productId: productOne.id as string,
        fields: {
          name: "Update product name",
          description: "Update product description",
          isOnSale: true,
          saleEnd: new Date(2100, 10, 10),
          saleValue: 400,
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Permission denied.",
      })
    )
  })
})
