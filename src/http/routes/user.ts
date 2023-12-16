import { Express } from "express"
import {
  authUserDto,
  forgotPasswordDto,
  registerUserDto,
  updateUserProfileDto,
} from "../dtos/user"
import RegisterUserController from "../controllers/user/registerUserController"
import dtoValidation from "../middleware/dtoValidation"
import AuthUserController from "../controllers/user/authUserController"
import ForgotPasswordController from "../controllers/user/forgotPasswordController"
import FetchMyProfileController from "../controllers/user/fetchMyProfileController"
import UpdateUserProfileController from "../controllers/user/updateUserProfileController"
import verifyToken from "../middleware/verifyToken"

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

  app.get("/profile", [verifyToken], FetchMyProfileController.handle)

  app.patch(
    "/profile",
    [verifyToken, dtoValidation(updateUserProfileDto)],
    UpdateUserProfileController.handle
  )
}
