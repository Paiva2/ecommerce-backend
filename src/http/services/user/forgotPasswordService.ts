import { hash } from "bcryptjs"
import { IUser } from "../../@types/types"
import UserInterface from "../../interfaces/UserInterface"

interface ForgotPasswordServiceRequest {
  email: string
  newPassword: string
}

export default class ForgotPasswordService {
  constructor(private userInterface: UserInterface) {}

  async exec({ email, newPassword }: ForgotPasswordServiceRequest) {
    if (!email) {
      throw {
        status: 400,
        message: "Invalid e-mail.",
      }
    }

    if (!newPassword || newPassword.length < 6) {
      throw {
        status: 400,
        message: "Invalid password.",
      }
    }

    const getUser = await this.userInterface.findByEmail(email)

    if (!getUser) {
      throw {
        status: 404,
        message: "User not found.",
      }
    }

    let updateUser = {} as IUser

    if (getUser.id) {
      const hashNewPassword = await hash(newPassword, 8)

      updateUser = await this.userInterface.updatePassword(
        getUser.id,
        hashNewPassword
      )
    }

    return updateUser
  }
}
