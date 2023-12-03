import { IUser } from "../@types/types"

export default interface UserInterface {
  create(user: IUser): Promise<IUser>

  findById(userId: string): Promise<IUser | null>
}
