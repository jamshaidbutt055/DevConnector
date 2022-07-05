const express = require("express")
const router = express.Router()
const authMiddleware = require("../../middlewares/auth")
const { check, validationResult } = require("express-validator")
const Profile = require("../../models/Profile")

router.put(
  "/",
  [
    authMiddleware,
    [
      check("school", "School is Required").not().isEmpty(),
      check("degree", "Degree is Required").not().isEmpty(),
      check("fieldofstudy", "Field of Study is Required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body

    const newExp = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.education.unshift(newExp)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)

router.delete("/:eduId", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    let indexOfEducation = profile.education.findIndex(
      (element) => element.id === req.params.eduId
    )
    profile.education.splice(indexOfEducation, 1)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})
module.exports = router
