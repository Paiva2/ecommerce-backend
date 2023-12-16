import { Express } from "express"
import RegisterUserController from "../controllers/user/registerUserController"

export default function userRoutes(app: Express) {
  app.post("/register", RegisterUserController.handle)
}
