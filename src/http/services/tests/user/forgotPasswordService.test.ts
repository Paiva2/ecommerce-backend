import { compare } from "bcryptjs"
import InMemoryUser from "../../../in-memory/InMemoryUser"
import InMemoryUserProfile from "../../../in-memory/inMemoryUserProfile"
import ForgotPasswordService from "../../user/forgotPasswordService"
import RegisterUserService from "../../user/registerUserService"

let inMemoryUser: InMemoryUser
let inMemoryUserProfile: InMemoryUserProfile

let registerUserService: RegisterUserService

let sut: ForgotPasswordService

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

describe("Forgot password service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryUserProfile = new InMemoryUserProfile()

    registerUserService = new RegisterUserService(inMemoryUser, inMemoryUserProfile)

    sut = new ForgotPasswordService(inMemoryUser)
  })

  it("should update an user password", async () => {
    await registerUserService.exec(userToCreate)

    const updateUserPassword = await sut.exec({
      email: "johndoe@example.com",
      newPassword: "updating",
    })

    const checkNewPassword = await compare("updating", updateUserPassword.password)
    const checkOldPassword = await compare("123456", updateUserPassword.password)

    expect(checkNewPassword).toBeTruthy()
    expect(checkOldPassword).toBeFalsy()

    expect(updateUserPassword).toEqual(
      expect.objectContaining({
        id: updateUserPassword.id,
        email: "johndoe@example.com",
        fullName: "John Doe",
        role: "client",
      })
    )
  })

  it("should not update password if email aren't provided", async () => {
    await registerUserService.exec(userToCreate)

    await expect(() => {
      return sut.exec({
        email: "",
        newPassword: "123456",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid e-mail.",
      })
    )
  })

  it("should not auth user if new password aren't provided", async () => {
    await registerUserService.exec(userToCreate)

    await expect(() => {
      return sut.exec({
        email: "johndoe@example.com",
        newPassword: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid password.",
      })
    )
  })

  it("should not auth user if new password length are below 6", async () => {
    await registerUserService.exec(userToCreate)

    await expect(() => {
      return sut.exec({
        email: "johndoe@example.com",
        newPassword: "12345",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid password.",
      })
    )
  })

  it("should not update user password if user doesn't exists", async () => {
    await registerUserService.exec(userToCreate)

    await expect(() => {
      return sut.exec({
        email: "johndoeinexistent@example.com",
        newPassword: "123456",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "User not found.",
      })
    )
  })
})
