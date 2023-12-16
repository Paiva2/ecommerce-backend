import UserInterface from "../interfaces/UserInterface"
import { randomUUID } from "crypto"
import { IUser } from "../@types/types"

export default class InMemoryUser implements UserInterface {
  private users: IUser[] = []

  async findById(userId: string): Promise<IUser | null> {
    const getUser = this.users.find((user) => user.id === userId)

    if (!getUser) return null

    return getUser
  }

  async create(user: IUser): Promise<IUser> {
    const newUser = {
      id: randomUUID(),
      email: user.email,
      password: user.password,
      fullName: user.fullName,
      role: user.role ?? "client",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(newUser)

    return newUser
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const findUser = this.users.find((user) => user.email === email)

    if (!findUser) return null

    return findUser
  }
}
