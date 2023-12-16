import { IUserProfile, IUserProfileUpdate } from "../@types/types"
import UserProfileInterface from "../interfaces/UserProfileInterface"

export default class InMemoryUserProfile implements UserProfileInterface {
  private profiles = [] as IUserProfile[]

  async create(userId: string, profile: IUserProfile): Promise<IUserProfile> {
    const newProfile = {
      profileImage: profile.profileImage,
      contact: profile.contact,
      birthDate: profile.birthDate,
      street: profile.street,
      houseNumber: profile.houseNumber,
      neighbourhood: profile.neighbourhood,
      complement: profile.complement,
      country: profile.country,
      city: profile.city,
      userId,
    }

    this.profiles.push(newProfile)

    return newProfile
  }

  async findByUserId(userId: string): Promise<IUserProfile> {
    let userProfile = {} as IUserProfile

    const findProfile = this.profiles.find((profile) => profile.userId === userId)

    if (findProfile) {
      userProfile = findProfile
    }

    return userProfile
  }

  async updateFull(
    userId: string,
    profile: IUserProfileUpdate
  ): Promise<IUserProfile> {
    let updatedProfile = {} as IUserProfile

    const updateProfiles = this.profiles.map((userProfile) => {
      if (userProfile.userId === userId) {
        userProfile = {
          ...userProfile,
          ...profile,
        }

        updatedProfile = userProfile
      }

      return userProfile
    })

    this.profiles = updateProfiles

    return updatedProfile
  }
}
