import InMemoryUser from "../../../in-memory/InMemoryUser"
import InMemoryUserProfile from "../../../in-memory/inMemoryUserProfile"
import FetchMyProfileService from "../../user/fetchMyProfileService"
import RegisterUserService from "../../user/registerUserService"

let inMemoryUser: InMemoryUser
let inMemoryUserProfile: InMemoryUserProfile

let registerUserService: RegisterUserService

let sut: FetchMyProfileService

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

describe("Fetch my profile service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryUserProfile = new InMemoryUserProfile()

    registerUserService = new RegisterUserService(inMemoryUser, inMemoryUserProfile)

    sut = new FetchMyProfileService(inMemoryUser, inMemoryUserProfile)
  })

  it("should fetch my profile", async () => {
    const newUser = await registerUserService.exec(userToCreate)

    const myProfile = await sut.exec({
      userId: newUser.userCreation.id ?? "",
    })

    expect(myProfile).toEqual({
      userProfile: expect.objectContaining({
        id: newUser.userCreation.id,
        email: "johndoe@example.com",
        password: "",
        fullName: "John Doe",
        role: "client",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
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
          userId: newUser.userCreation.id,
        },
      }),
    })
  })

  it("should not fetch my profile if id aren't provided", async () => {
    await expect(() => {
      return sut.exec({
        userId: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Invalid user id.",
      })
    )
  })

  it("should not fetch my profile if user doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        userId: "inexistent user id",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "User not found.",
      })
    )
  })
})
