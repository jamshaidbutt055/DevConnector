const jwt = require("jsonwebtoken")
const config = require("config")

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token")
  if (!token) {
    return res.status(404).json({
      errors: { msg: "Token is missing, Authorization Failed." },
    })
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"))
    req.user = decoded.user
    next()
  } catch (err) {
    console.log(err.message)
    return res.status(401).json({ errors: { msg: "Invalid token supplied." } })
  }
}
module.exports = authMiddleware
