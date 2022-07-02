const express = require("express")

const APP = express()
const PORT = process.env.PORT || 5000

APP.get("/", (req, res) => res.send("API Called"))
APP.listen(PORT, () => console.log(`Server is running on Port ${PORT}.`))
