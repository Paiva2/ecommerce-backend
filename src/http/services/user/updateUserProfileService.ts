import { IUserProfile, IUserProfileUpdate } from "../../@types/types"
import UserInterface from "../../interfaces/UserInterface"
import UserProfileInterface from "../../interfaces/UserProfileInterface"

interface UpdateUserProfileServiceRequest {
  userId: string
  fields: IUserProfileUpdate
}

type UpdateUserProfileServiceResponse = IUserProfile

export default class UpdateUserProfileService {
  constructor(
    private userInterface: UserInterface,
    private userProfileInterface: UserProfileInterface
  ) {}

  async exec({
    fields,
    userId,
  }: UpdateUserProfileServiceRequest): Promise<UpdateUserProfileServiceResponse> {
    if (!userId) {
      throw {
        status: 400,
        message: "Invalid user id.",
      }
    }

    const getUser = await this.userInterface.findById(userId)

    if (!getUser) {
      throw {
        status: 404,
        message: "User not found.",
      }
    }

    const getProfile = await this.userProfileInterface.findByUserId(
      getUser.id as string
    )

    const fieldsToUpdate = Object.keys(fields)

    let updatedProfile = {} as IUserProfile

    fieldsToUpdate.forEach((field) => {
      updatedProfile = {
        ...getProfile,
        ...updatedProfile,
        [field]: fields[field as keyof typeof fields],
      }
    })

    const updateProfile = await this.userProfileInterface.updateFull(
      userId,
      updatedProfile
    )

    return updateProfile
  }
}
