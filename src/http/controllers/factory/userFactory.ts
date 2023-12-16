import UserPg from "../../database/postgres/user"
import UserProfilePg from "../../database/postgres/userProfile"
import AuthUserService from "../../services/user/authUserService"
import FetchMyProfileService from "../../services/user/fetchMyProfileService"
import ForgotPasswordService from "../../services/user/forgotPasswordService"
import RegisterUserService from "../../services/user/registerUserService"
import UpdateUserProfileService from "../../services/user/updateUserProfileService"

export default class UserFactory {
  public static async exec() {
    const userModel = new UserPg()
    const userProfileModel = new UserProfilePg()

    const registerUserService = new RegisterUserService(userModel, userProfileModel)

    const authUserService = new AuthUserService(userModel)

    const forgotPasswordService = new ForgotPasswordService(userModel)

    const fetchMyProfileService = new FetchMyProfileService(
      userModel,
      userProfileModel
    )

    const updateUserProfileService = new UpdateUserProfileService(
      userModel,
      userProfileModel
    )

    return {
      updateUserProfileService,
      fetchMyProfileService,
      forgotPasswordService,
      authUserService,
      registerUserService,
    }
  }
}
