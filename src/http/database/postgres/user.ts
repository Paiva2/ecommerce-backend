import prisma from "../../../lib/prisma"
import { IUser } from "../../@types/types"
import UserInterface from "../../interfaces/UserInterface"

export default class UserPg implements UserInterface {
  async create(user: IUser): Promise<IUser> {
    const userCreation = await prisma.user.create({
      data: {
        email: user.email,
        fullName: user.fullName,
        password: user.password,
        role: "client",
      },
    })

    return userCreation
  }

  async findById(userId: string): Promise<IUser | null> {
    const findUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!findUser) return null

    return findUser
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!findUser) return null

    return findUser
  }
}
