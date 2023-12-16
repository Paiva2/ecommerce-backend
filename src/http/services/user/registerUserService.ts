import { hash } from "bcryptjs"
import { IUser, IUserProfile } from "../../@types/types"
import UserInterface from "../../interfaces/UserInterface"
import UserProfileInterface from "../../interfaces/UserProfileInterface"

interface RegisterUserServiceRequest {
  email: string
  fullName: string
  password: string
  profile: {
    profileImage: string
    contact: string
    birthDate: string
    street: string
    houseNumber: string
    neighbourhood: string
    complement: string
    country: string
    city: string
  }
}

interface RegisterUserServiceResponse {
  userCreation: IUser
  profile: IUserProfile
}

export default class RegisterUserService {
  constructor(
    private userInterface: UserInterface,
    private userProfileInterface: UserProfileInterface
  ) {}

  async exec(
    infos: RegisterUserServiceRequest
  ): Promise<RegisterUserServiceResponse> {
    const doesUserExists = await this.userInterface.findByEmail(infos.email)

    if (doesUserExists) {
      throw {
        status: 409,
        message: "E-mail already exists.",
      }
    }

    const hashPassword = await hash(infos.password, 8)

    const userCreation = await this.userInterface.create({
      email: infos.email,
      password: hashPassword,
      fullName: infos.fullName,
    })

    let profileCreation = {} as IUserProfile

    if (userCreation.id) {
      profileCreation = await this.userProfileInterface.create(userCreation.id, {
        birthDate: new Date(infos.profile.birthDate),
        city: infos.profile.city,
        contact: infos.profile.contact,
        country: infos.profile.country,
        houseNumber: infos.profile.houseNumber,
        neighbourhood: infos.profile.neighbourhood,
        street: infos.profile.street,
        complement: infos.profile.complement,
        profileImage: infos.profile.profileImage,
      })
    }

    return {
      userCreation,
      profile: profileCreation,
    }
  }
}
