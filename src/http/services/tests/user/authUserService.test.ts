import InMemoryUser from "../../../in-memory/InMemoryUser"
import InMemoryUserProfile from "../../../in-memory/inMemoryUserProfile"
import AuthUserService from "../../user/authUserService"
import RegisterUserService from "../../user/registerUserService"

let inMemoryUser: InMemoryUser
let inMemoryUserProfile: InMemoryUserProfile

let registerUserService: RegisterUserService

let sut: AuthUserService

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

describe("Auth User Service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryUserProfile = new InMemoryUserProfile()

    registerUserService = new RegisterUserService(inMemoryUser, inMemoryUserProfile)

    sut = new AuthUserService(inMemoryUser)
  })

  it("should auth an user", async () => {
    await registerUserService.exec(userToCreate)

    const authUser = await sut.exec({
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(authUser).toEqual(
      expect.objectContaining({
        id: authUser.id,
        email: "johndoe@example.com",
        password: "",
        fullName: "John Doe",
        role: "client",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    )
  })

  it("should not auth user if email aren't provided", async () => {
    await registerUserService.exec(userToCreate)

    await expect(() => {
      return sut.exec({
        email: "",
        password: "123456",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid e-mail.",
      })
    )
  })

  it("should not auth user if password aren't provided", async () => {
    await registerUserService.exec(userToCreate)

    await expect(() => {
      return sut.exec({
        email: "johndoe@example.com",
        password: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid password.",
      })
    )
  })

  it("should not auth user if password length are below 6", async () => {
    await registerUserService.exec(userToCreate)

    await expect(() => {
      return sut.exec({
        email: "johndoe@example.com",
        password: "12345",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid password.",
      })
    )
  })

  it("should not auth user if user doesn't exists", async () => {
    await registerUserService.exec(userToCreate)

    await expect(() => {
      return sut.exec({
        email: "johndoeinexistent@example.com",
        password: "123456",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "User not found.",
      })
    )
  })

  it("should not auth user if credentials are wrong", async () => {
    await registerUserService.exec(userToCreate)

    await expect(() => {
      return sut.exec({
        email: "johndoe@example.com",
        password: "wrongpass",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid credentials.",
      })
    )
  })
})
