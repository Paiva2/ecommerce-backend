import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import UserFactory from "../factory/userFactory"
import jwt from "jsonwebtoken"

export default class AuthUserController {
  public static async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const { authUserService } = await UserFactory.exec()

    try {
      const userInfos = await authUserService.exec({
        email,
        password,
      })

      const token = jwt.sign(
        {
          sub: userInfos.id,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      )

      return res.status(200).send({ token })
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
