export interface IUser {
  id?: string
  email: string
  password: string
  fullName: string
  profileImage?: string
  contact: string
  birthDate: Date
  address?: IUserAddress
  role: "admin" | "client"
  createdAt: Date
  updatedAt: Date
}

export interface IUserAddress {
  userId?: string
  street: string
  houseNumber: string
  neighbourhood: string
  complement?: string
  country: string
  city: string
  city: string
}

export interface IProduct {
  id?: string
  name: string
  value: number
  quantity: number
  description: string
  image: string
  sizes: string
  colors: string
  gender: string
  category: string
}
