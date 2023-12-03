import InMemoryProduct from "../../in-memory/InMemoryProduct"
import InMemoryUser from "../../in-memory/InMemoryUser"
import InsertProductToStoreService from "../product/insertProductToStoreService"
import GetAllProductsService from "../product/getAllProductsService"
import { randomUUID } from "crypto"
import { IProduct, IUser } from "../../@types/types"

let inMemoryUser: InMemoryUser
let inMemoryProduct: InMemoryProduct

let createdUser: IUser

let insertProductToStoreService: InsertProductToStoreService
let sut: GetAllProductsService

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

describe("Get all products service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryProduct = new InMemoryProduct()

    createdUser = await inMemoryUser.create({
      id: randomUUID(),
      email: "johndoe@test.com",
      fullName: "John Doe",
      password: "12345678",
      profileImage: "any pic url",
      role: "admin",
      contact: "99999999999",
      birthDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    insertProductToStoreService = new InsertProductToStoreService(
      inMemoryUser,
      inMemoryProduct
    )

    sut = new GetAllProductsService(inMemoryProduct)
  })

  it("should get all store products", async () => {
    const productOne = await insertProductToStoreService.exec({
      userId: createdUser.id as string,
      product: mockProduct,
    })

    const productTwo = await insertProductToStoreService.exec({
      userId: createdUser.id as string,
      product: {
        ...mockProduct,
        description: "Different T-Shirt for tests",
        name: "Different T-Shirt",
        value: 300,
      },
    })

    const getProducts = await sut.exec({
      page: 1,
    })

    expect(getProducts).toEqual({
      page: 1,
      products: [
        expect.objectContaining({
          id: productOne.id,
          name: productOne.name,
          value: productOne.value,
          quantity: productOne.quantity,
          description: productOne.description,
          image: productOne.image,
          sizes: productOne.sizes,
          colors: productOne.colors,
          gender: productOne.gender,
          category: productOne.category,
        }),

        expect.objectContaining({
          id: productTwo.id,
          name: productTwo.name,
          value: productTwo.value,
          quantity: productTwo.quantity,
          description: productTwo.description,
          image: productTwo.image,
          sizes: productTwo.sizes,
          colors: productTwo.colors,
          gender: productTwo.gender,
          category: productTwo.category,
        }),
      ],
    })
  })

  it("should get all store products with pagination", async () => {
    let twentyOne = {} as IProduct
    let twentyTwo = {} as IProduct
    let twentyThree = {} as IProduct

    for (let i = 1; i <= 23; i++) {
      let createdProduct = await insertProductToStoreService.exec({
        userId: createdUser.id as string,
        product: {
          ...mockProduct,
          description: `Different T-Shirt for tests ${i}`,
          name: `T-Shirt ${i}`,
          value: +Math.random().toFixed(1),
        },
      })

      if (i === 21) twentyOne = createdProduct

      if (i === 22) twentyTwo = createdProduct

      if (i === 23) twentyThree = createdProduct
    }

    const getProducts = await sut.exec({
      page: 3,
    })

    expect(getProducts).toEqual({
      page: 3,
      products: [
        expect.objectContaining({
          id: twentyOne.id,
          name: twentyOne.name,
          value: twentyOne.value,
          quantity: twentyOne.quantity,
          description: twentyOne.description,
          image: twentyOne.image,
          sizes: twentyOne.sizes,
          colors: twentyOne.colors,
          gender: twentyOne.gender,
          category: twentyOne.category,
        }),

        expect.objectContaining({
          id: twentyTwo.id,
          name: twentyTwo.name,
          value: twentyTwo.value,
          quantity: twentyTwo.quantity,
          description: twentyTwo.description,
          image: twentyTwo.image,
          sizes: twentyTwo.sizes,
          colors: twentyTwo.colors,
          gender: twentyTwo.gender,
          category: twentyTwo.category,
        }),

        expect.objectContaining({
          id: twentyThree.id,
          name: twentyThree.name,
          value: twentyThree.value,
          quantity: twentyThree.quantity,
          description: twentyThree.description,
          image: twentyThree.image,
          sizes: twentyThree.sizes,
          colors: twentyThree.colors,
          gender: twentyThree.gender,
          category: twentyThree.category,
        }),
      ],
    })
  })

  it("should return products from first page if provided page are less than 1", async () => {
    const productOne = await insertProductToStoreService.exec({
      userId: createdUser.id as string,
      product: mockProduct,
    })

    const getProducts = await sut.exec({
      page: -1,
    })

    expect(getProducts).toEqual({
      page: 1,
      products: [
        expect.objectContaining({
          id: productOne.id,
          name: productOne.name,
          value: productOne.value,
          quantity: productOne.quantity,
          description: productOne.description,
          image: productOne.image,
          sizes: productOne.sizes,
          colors: productOne.colors,
          gender: productOne.gender,
          category: productOne.category,
        }),
      ],
    })
  })
})
