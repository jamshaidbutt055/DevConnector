const express = require("express")
const connectDB = require("./config/db")
const APP = express()
const PORT = process.env.PORT || 5000

connectDB()

APP.get("/", (req, res) => res.send("API Called"))
APP.use("/api/auth", require("./routes/api/auth"))
APP.use("/api/users", require("./routes/api/users"))
APP.use("/api/profile", require("./routes/api/profile"))
APP.use("/api/posts", require("./routes/api/posts"))
APP.listen(PORT, () => console.log(`Server is running on Port ${PORT}.`))
