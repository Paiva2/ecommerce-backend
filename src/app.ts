import express from "express"

const app = express()

app.get("/test", (req, res) => {
  res.status(200).send("Test")
})

export default app
