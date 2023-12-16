import { Express } from "express"
import RegisterUserController from "../controllers/user/registerUserController"
import dtoValidation from "../middleware/dtoValidation"
import { registerUserDto } from "../dtos/user"

export default function userRoutes(app: Express) {
  app.post(
    "/register",
    [dtoValidation(registerUserDto)],
    RegisterUserController.handle
  )
}
