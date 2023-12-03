import { IUserProfile } from "../@types/types"
import InMemoryUserProfile from "../in-memory/inMemoryUserProfile"

export default interface UserProfileInterface {
  create(userId: string, profile: InMemoryUserProfile): Promise<IUserProfile>
}
