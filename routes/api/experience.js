const express = require("express")
const Profile = require("../../models/Profile")
const authMiddleware = require("../../middlewares/auth")
const { check, validationResult } = require("express-validator")
const router = express.Router()

router.put(
  "/",
  [
    authMiddleware,
    [
      check("title", "Title is Required").not().isEmpty(),
      check("company", "Company is Required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, company, location, from, to, current, description } =
      req.body

    const newExp = { title, company, location, from, to, current, description }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.experience.unshift(newExp)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)

router.delete("/:expId", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    let indexOfExperience = profile.experience.findIndex(
      (element) => element.id === req.params.expId
    )
    profile.experience.splice(indexOfExperience, 1)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
