import express from "express"
import mongoConnection from "./lib/mongo"
import productRoutes from "./http/routes/product"
import bodyParser from "body-parser"
import "dotenv/config"

const app = express()

app.use(bodyParser.json())

mongoConnection()

productRoutes(app)

export default app
