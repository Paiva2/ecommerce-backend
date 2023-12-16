import { IUser } from "../../@types/types"
import UserInterface from "../../interfaces/UserInterface"
import UserProfileInterface from "../../interfaces/UserProfileInterface"

interface FetchMyProfileServiceRequest {
  userId: string
}

type FetchMyProfileServiceResponse = {
  userProfile: IUser
}

export default class FetchMyProfileService {
  constructor(
    private userInterface: UserInterface,
    private userProfileInterface: UserProfileInterface
  ) {}

  async exec({
    userId,
  }: FetchMyProfileServiceRequest): Promise<FetchMyProfileServiceResponse> {
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

    const getProfile = await this.userProfileInterface.findByUserId(userId)

    const userProfile = {
      ...getUser,
      password: "",
      profile: getProfile,
    }

    return { userProfile }
  }
}
