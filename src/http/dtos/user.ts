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

//TODO: FIX
const notEmptyString = (value: string) => value.trim() !== ""

export const updateUserProfileDto = z.object({
  birthDate: z.string().refine(notEmptyString).optional(),
  city: z.string().refine(notEmptyString).optional(),
  contact: z.string().refine(notEmptyString).optional(),
  country: z.string().refine(notEmptyString).optional(),
  houseNumber: z.string().refine(notEmptyString).optional(),
  neighbourhood: z.string().refine(notEmptyString).optional(),
  street: z.string().refine(notEmptyString).optional(),
  complement: z.string().refine(notEmptyString).optional(),
  profileImage: z.string().refine(notEmptyString).optional(),
})
