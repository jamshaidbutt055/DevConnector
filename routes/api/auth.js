const express = require("express")
const authMiddleware = require("../../middlewares/auth")
const { check, validationResult } = require("express-validator")

const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const router = express.Router()
//Login user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    return res.status(500).send("Server Error.")
  }
})

router.post(
  "/",
  [
    check("email", "Please enter a valid Email Address.").isEmail(),
    check("password", "Please enter a password.").exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      let user = await User.findOne({ email })
      const isMatched = await bcrypt.compare(password, user?.password || "")
      if (!user || !isMatched) {
        return res
          .status(400)
          .json({ errors: { msg: "Invalid Email or Password." } })
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      }
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err
          return res.json({ token: token })
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

module.exports = router
