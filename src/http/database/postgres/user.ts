import { IUser } from "../../@types/types"
import UserInterface from "../../interfaces/UserInterface"

export default class UserPg implements UserInterface {
  async create(user: IUser): Promise<IUser> {
    throw new Error("Method not implemented.")
  }
  async findById(userId: string): Promise<IUser | null> {
    throw new Error("Method not implemented.")
  }
}
