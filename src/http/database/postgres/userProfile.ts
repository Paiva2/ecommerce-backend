import prisma from "../../../lib/prisma"
import { IUserProfile } from "../../@types/types"
import UserProfileInterface from "../../interfaces/UserProfileInterface"

export default class UserProfilePg implements UserProfileInterface {
  async create(userId: string, profile: IUserProfile): Promise<IUserProfile> {
    const createProfile: IUserProfile = await prisma.profile.create({
      data: {
        birthDate: profile.birthDate,
        city: profile.city,
        contact: profile.contact,
        country: profile.country,
        houseNumber: profile.houseNumber,
        neighbourhood: profile.neighbourhood,
        profileImage: "",
        street: profile.street,
        complement: profile.complement,
        fkUserId: userId,
      },
    })

    return createProfile
  }

  async findByUserId(userId: string): Promise<IUserProfile> {
    const getProfile = await prisma.profile.findUniqueOrThrow({
      where: {
        fkUserId: userId,
      },
    })

    return getProfile
  }
}
