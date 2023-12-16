import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import UserFactory from "../factory/userFactory"
import jwtDecode from "../../utils/jwtDecode"

export default class FetchMyProfileController {
  public static async handle(req: Request, res: Response) {
    const getToken = jwtDecode(req.headers.authorization as string)

    const { fetchMyProfileService } = await UserFactory.exec()

    try {
      const getProfile = await fetchMyProfileService.exec({
        userId: getToken.sub,
      })

      return res.status(200).send(getProfile)
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
