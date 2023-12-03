import mongoose from "mongoose"

async function mongoConnection() {
  try {
    mongoose.connect(
      `mongodb://${process.env.MONGO_SERVER}/${process.env.MONGO_DB_NAME}`
    )

    console.log("🌱 MongoDB: connection successful")
  } catch (e) {
    console.error("🌱 MongoDB: connection error", e)
  }
}

export default mongoConnection
