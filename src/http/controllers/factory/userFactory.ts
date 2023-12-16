import UserPg from "../../database/postgres/user"
import UserProfilePg from "../../database/postgres/userProfile"
import RegisterUserService from "../../services/user/registerUserService"

export default class UserFactory {
  public static async exec() {
    const userModel = new UserPg()
    const userProfileModel = new UserProfilePg()

    const registerUserService = new RegisterUserService(userModel, userProfileModel)

    return {
      registerUserService,
    }
  }
}
