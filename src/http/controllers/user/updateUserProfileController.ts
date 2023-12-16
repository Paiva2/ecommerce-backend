import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import UserFactory from "../factory/userFactory"
import jwtDecode from "../../utils/jwtDecode"

export default class UpdateUserProfileController {
  public static async handle(req: Request, res: Response) {
    const { fields } = req.body

    const tokenData = jwtDecode(req.headers.authorization as string)

    const { updateUserProfileService } = await UserFactory.exec()

    try {
      await updateUserProfileService.exec({
        userId: tokenData.sub,
        fields,
      })

      return res.status(200).send({ message: "Profile updated successfully!" })
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
