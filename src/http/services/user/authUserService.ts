import { compare } from "bcryptjs"
import { IUser } from "../../@types/types"
import UserInterface from "../../interfaces/UserInterface"

interface AuthUserServiceRequest {
  email: string
  password: string
}

type AuthUserServiceResponse = IUser

export default class AuthUserService {
  constructor(private userInterface: UserInterface) {}

  async exec({
    email,
    password,
  }: AuthUserServiceRequest): Promise<AuthUserServiceResponse> {
    if (!email) {
      throw {
        status: 400,
        message: "Invalid e-mail.",
      }
    }

    if (!password || password.length < 6) {
      throw {
        status: 400,
        message: "Invalid password.",
      }
    }

    const doesUserExists = await this.userInterface.findByEmail(email)

    if (!doesUserExists) {
      throw {
        status: 404,
        message: "User not found.",
      }
    }

    const comparePasswords = await compare(password, doesUserExists.password)

    if (!comparePasswords) {
      throw {
        status: 401,
        message: "Invalid credentials.",
      }
    }

    return {
      ...doesUserExists,
      password: "",
    }
  }
}
