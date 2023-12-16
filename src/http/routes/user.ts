import { Express } from "express"
import { authUserDto, forgotPasswordDto, registerUserDto } from "../dtos/user"
import RegisterUserController from "../controllers/user/registerUserController"
import dtoValidation from "../middleware/dtoValidation"
import AuthUserController from "../controllers/user/authUserController"
import ForgotPasswordController from "../controllers/user/forgotPasswordController"

export default function userRoutes(app: Express) {
  app.post(
    "/register",
    [dtoValidation(registerUserDto)],
    RegisterUserController.handle
  )

  app.post("/login", [dtoValidation(authUserDto)], AuthUserController.handle)

  app.patch(
    "/forgot-password",
    [dtoValidation(forgotPasswordDto)],
    ForgotPasswordController.handle
  )
}
