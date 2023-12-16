import { z } from "zod"

export const registerUserDto = z.object({
  email: z.string().email(),
  password: z.string(),
  fullName: z.string(),
  profile: z.object({
    birthDate: z.string(),
    city: z.string(),
    contact: z.string(),
    country: z.string(),
    houseNumber: z.string(),
    neighbourhood: z.string(),
    street: z.string(),
    complement: z.string(),
    profileImage: z.string(),
  }),
})

export const authUserDto = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const forgotPasswordDto = z.object({
  email: z.string().email(),
  newPassword: z.string(),
})
