import express from "express";
import mongoConnection from "./lib/mongo";
import productRoutes from "./http/routes/product";
import bodyParser from "body-parser";
import "dotenv/config";
import userRoutes from "./http/routes/user";
import wishListRoutes from "./http/routes/wishList";

const app = express();

app.use(bodyParser.json());

mongoConnection();

productRoutes(app);
userRoutes(app);
wishListRoutes(app);

export default app;
