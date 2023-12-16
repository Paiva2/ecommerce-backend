import { z } from "zod"

export const insertProductDto = z.object({
  product: z.object({
    name: z.string(),
    value: z.number().min(1),
    quantity: z.number().min(1),
    description: z.string(),
    image: z.string(),
    sizes: z.string(),
    colors: z.string(),
    gender: z.string(),
    category: z.string(),
  }),
})

export const updateProductInformationsDto = z.object({
  productId: z.string(),
  fields: z.object({
    name: z.string(),
    value: z.number().min(1),
    quantity: z.number().min(1),
    description: z.string(),
    image: z.string(),
    sizes: z.string(),
    colors: z.string(),
    gender: z.string(),
    category: z.string(),
    isOnSale: z.boolean(),
    saleEnd: z.string(),
    saleValue: z.number().min(1),
  }),
})
