import { IUserProfile } from "../@types/types"

export default interface UserProfileInterface {
  create(userId: string, profile: IUserProfile): Promise<IUserProfile>
}
