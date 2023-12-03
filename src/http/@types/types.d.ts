export interface IUser {
  id?: string
  email: string
  password: string
  fullName: string
  role: "admin" | "client"
  createdAt: Date
  updatedAt: Date

  profile?: IUserProfile
}

export interface IUserProfile {
  profileImage?: string
  contact: string
  birthDate: Date
  street: string
  houseNumber: string
  neighbourhood: string
  complement?: string
  country: string
  city: string

  userId?: string // FK
}

export interface IProduct {
  id?: string
  name: string
  value: number
  quantity: number
  active?: boolean
  description: string
  image: string
  sizes: string
  colors: string
  gender: string
  category: string
  isOnSale?: boolean
  saleEnd?: Date | null
  saleValue?: number | null
}

export interface IProductUpdate {
  name?: string
  value?: number
  quantity?: number
  description?: string
  active?: boolean
  image?: string
  sizes?: string
  colors?: string
  gender?: string
  category?: string
  isOnSale?: boolean
  saleEnd?: Date | null
  saleValue?: number | null
}

export interface ErrorHandling {
  status: number
  message: string
}
