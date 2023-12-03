import app from "./app"

const port = process.env.PORT

const server = app.listen(port, () =>
  console.log(`✨ Server running on port ${port}`)
)

export default server
