import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import UserFactory from "../factory/userFactory"

export default class ForgotPasswordController {
  public static async handle(req: Request, res: Response) {
    const { email, newPassword } = req.body

    const { forgotPasswordService } = await UserFactory.exec()

    try {
      await forgotPasswordService.exec({
        email,
        newPassword,
      })

      return res.status(200).send({ message: "Password updated successfully!" })
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
