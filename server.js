const express = require("express")
const connectDB = require("./config/db")
const path = require("path")
const APP = express()
const PORT = process.env.PORT || 5000

connectDB()
APP.use(express.json({ extended: true }))

APP.use("/api/auth", require("./routes/api/auth"))
APP.use("/api/users", require("./routes/api/users"))
APP.use("/api/profile", require("./routes/api/profile"))
APP.use("/api/posts", require("./routes/api/posts"))

if (process.env.NODE_ENV === "production") {
  APP.use(express.static("client/build"))
  APP.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}
APP.listen(PORT, () => console.log(`Server is running on Port ${PORT}.`))
