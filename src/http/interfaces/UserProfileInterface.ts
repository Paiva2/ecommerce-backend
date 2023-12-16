import { IUserProfile, IUserProfileUpdate } from "../@types/types"

export default interface UserProfileInterface {
  create(userId: string, profile: IUserProfile): Promise<IUserProfile>

  findByUserId(userId: string): Promise<IUserProfile>

  updateFull(userId: string, profile: IUserProfileUpdate): Promise<IUserProfile>
}
