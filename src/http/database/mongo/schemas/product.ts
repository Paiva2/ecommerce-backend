import { randomUUID } from "crypto"
import mongoose from "mongoose"

const { Schema } = mongoose

const productSchema = new Schema({
  id: {
    type: String,
    default: () => randomUUID(),
    unique: true,
  },
  name: String,
  value: Number,
  quantity: Number,
  active: Boolean,
  description: String,
  image: String,
  sizes: String,
  colors: String,
  gender: String,
  category: String,
  isOnSale: {
    type: Boolean,
    required: false,
    default: false,
  },
  saleEnd: {
    type: Date,
    required: false,
    default: null,
  },
  saleValue: {
    type: Number,
    required: false,
    default: null,
  },
})

const ProductModel = mongoose.model("product", productSchema)

export default ProductModel
