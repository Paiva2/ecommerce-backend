import InMemoryUser from "../../../in-memory/InMemoryUser"
import InMemoryUserProfile from "../../../in-memory/inMemoryUserProfile"
import RegisterUserService from "../../user/registerUserService"
import UpdateUserProfileService from "../../user/updateUserProfileService"

let inMemoryUser: InMemoryUser
let inMemoryUserProfile: InMemoryUserProfile

let registerUserService: RegisterUserService

let sut: UpdateUserProfileService

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

describe("Update user profile service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryUserProfile = new InMemoryUserProfile()

    registerUserService = new RegisterUserService(inMemoryUser, inMemoryUserProfile)

    sut = new UpdateUserProfileService(inMemoryUser, inMemoryUserProfile)
  })

  it("should update my profile", async () => {
    const newUser = await registerUserService.exec(userToCreate)

    const updateProfile = await sut.exec({
      userId: newUser.userCreation.id ?? "",
      fields: {
        city: "Blumenau",
        country: "Brazil",
        street: "Update my street",
        neighbourhood: "Update my neighbourhood",
        houseNumber: "200",
      },
    })

    expect(updateProfile).toEqual({
      profileImage: "",
      contact: "11932245688",
      birthDate: expect.any(Date),
      street: "Update my street",
      houseNumber: "200",
      neighbourhood: "Update my neighbourhood",
      complement: "Any",
      country: "Brazil",
      city: "Blumenau",
      userId: newUser.userCreation.id,
    })
  })
})
