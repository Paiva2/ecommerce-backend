import InMemoryUser from "../../in-memory/InMemoryUser"
import InMemoryUserProfile from "../../in-memory/inMemoryUserProfile"
import RegisterUserService from "../user/registerUserService"

let inMemoryUser: InMemoryUser
let inMemoryUserProfile: InMemoryUserProfile

let sut: RegisterUserService

const userToCreate = {
  email: "johndoe@example.com",
  fullName: "John Doe",
  password: "123456",
  profile: {
    birthDate: new Date(1999, 11, 26).toString(),
    city: "São Paulo",
    complement: "Any",
    street: "Test Street",
    contact: "11932245688",
    country: "SP",
    houseNumber: "24",
    neighbourhood: "Test Neighbourhood",
    profileImage: "",
  },
}

describe("Register user service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryUserProfile = new InMemoryUserProfile()

    sut = new RegisterUserService(inMemoryUser, inMemoryUserProfile)
  })

  it("should register a new user", async () => {
    const creation = await sut.exec(userToCreate)

    expect(creation).toEqual({
      userCreation: {
        id: creation.userCreation.id,
        email: "johndoe@example.com",
        password: expect.any(String),
        fullName: "John Doe",
        role: "client",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      profile: {
        profileImage: "",
        contact: "11932245688",
        birthDate: expect.any(Date),
        street: "Test Street",
        houseNumber: "24",
        neighbourhood: "Test Neighbourhood",
        complement: "Any",
        country: "SP",
        city: "São Paulo",
        userId: creation.userCreation.id,
      },
    })
  })

  it("should not register user if email already exists", async () => {
    await sut.exec(userToCreate)

    await expect(() => {
      return sut.exec(userToCreate)
    }).rejects.toEqual(
      expect.objectContaining({
        message: "E-mail already exists.",
      })
    )
  })
})
