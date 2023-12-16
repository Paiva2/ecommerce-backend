import { Request, Response } from "express"
import { ErrorHandling } from "../../@types/types"
import UserFactory from "../factory/userFactory"

export default class RegisterUserController {
  public static async handle(req: Request, res: Response) {
    const { email, fullName, password, profile } = req.body

    const { registerUserService } = await UserFactory.exec()

    try {
      await registerUserService.exec({
        email,
        fullName,
        password,
        profile,
      })

      return res.status(201).send({ message: "User created successfully!" })
    } catch (e) {
      const error = e as ErrorHandling

      return res.status(error.status).send({ message: error.message })
    }
  }
}
