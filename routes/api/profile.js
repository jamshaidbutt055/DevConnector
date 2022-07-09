const express = require("express")
const config = require("config")
const Profile = require("../../models/Profile")
const Post = require("../../models/Post")
const User = require("../../models/User")
const authMiddleware = require("../../middlewares/auth")
const { check, validationResult } = require("express-validator")
const request = require("request")

const router = express.Router()
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    )
    if (!profile) {
      return res.status(404).json({ msg: "There is no profile for this user." })
    }
    res.json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

router.post(
  "/",
  [
    authMiddleware,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skill(s) is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body

    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (bio) profileFields.bio = bio
    if (location) profileFields.location = location
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim())
    }
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (twitter) profileFields.social.twitter = twitter
    if (instagram) profileFields.social.instagram = instagram
    try {
      let existingProfile = await Profile.findOne({ user: req.user.id })
      if (existingProfile) {
        existingProfile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(existingProfile)
      }

      existingProfile = new Profile(profileFields)
      await existingProfile.save()
      return res.json(existingProfile)
    } catch (err) {
      console.log(err.message)
      res.status(400).send("Server Error")
    }
  }
)

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

router.get("/user/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate(
      "user",
      ["name", "avatar"]
    )
    if (!profile) return res.status(404).json({ msg: "Profile not found." })
    res.json(profile)
  } catch (err) {
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Profile not found." })
    res.status(500).send("Server Error")
  }
})

router.delete("/", authMiddleware, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id })
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: "Profile Deleted" })
  } catch (err) {
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Profile not found." })
    res.status(500).send("Server Error")
  }
})

router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    }
    request(options, (error, response, body) => {
      if (error) console.error(error)
      if (response.statusCode !== 200)
        return res.status(404).json({ msg: "No github profile found." })
      res.json(JSON.parse(body))
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

router.use("/education", require("./education"))
router.use("/experience", require("./experience"))
module.exports = router
