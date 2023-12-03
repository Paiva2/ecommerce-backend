import express from "express"
import mongoConnection from "./lib/mongo"
import productRoutes from "./http/routes/product"
import "dotenv/config"

const app = express()

mongoConnection()

productRoutes(app)

export default app
