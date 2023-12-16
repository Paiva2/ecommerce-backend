import { IUser } from "../@types/types"

export default interface UserInterface {
  create(user: IUser): Promise<IUser>

  findById(userId: string): Promise<IUser | null>

  findByEmail(email: string): Promise<IUser | null>

  updatePassword(userId: string, newPassword: string): Promise<IUser>
}
