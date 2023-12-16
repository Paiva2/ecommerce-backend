import UserPg from "../../database/postgres/user"
import UserProfilePg from "../../database/postgres/userProfile"
import AuthUserService from "../../services/user/authUserService"
import ForgotPasswordService from "../../services/user/forgotPasswordService"
import RegisterUserService from "../../services/user/registerUserService"

export default class UserFactory {
  public static async exec() {
    const userModel = new UserPg()
    const userProfileModel = new UserProfilePg()

    const registerUserService = new RegisterUserService(userModel, userProfileModel)

    const authUserService = new AuthUserService(userModel)

    const forgotPasswordService = new ForgotPasswordService(userModel)

    return {
      forgotPasswordService,
      authUserService,
      registerUserService,
    }
  }
}
