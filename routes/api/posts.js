const express = require("express")
const authMiddleware = require("../../middlewares/auth")
const { check, validationResult } = require("express-validator")
const Post = require("../../models/Post")
const User = require("../../models/User")
const router = express.Router()

router.post(
  "/",
  [authMiddleware, [check("text", "Text is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })
    try {
      let user = await User.findById(req.user.id).select("-password")
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      })
      const post = await newPost.save()
      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)

router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

router.get("/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) return res.status(404).json({ msg: "Could not find any post" })

    res.json(post)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Could not find any post" })
    res.status(500).send("Server Error")
  }
})

router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) return res.status(404).json({ msg: "Could not find any post" })
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized." })
    }
    await post.remove()
    res.json({ msg: "Post Deteled." })
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Could not find any post" })
    res.status(500).send("Server Error")
  }
})

router.put("/like/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) return res.status(404).json({ msg: "Could not find any post" })
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked." })
    }
    await post.likes.unshift({ user: req.user.id })
    await post.save()
    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Could not find any post" })
    res.status(500).send("Server Error")
  }
})

router.put("/unlike/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) return res.status(404).json({ msg: "Could not find any post" })
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length <= 0
    ) {
      return res.status(400).json({ msg: "Post is not liked yet." })
    }
    post.likes.splice(
      post.likes.findIndex((like) => like.user.toString() === req.user.id),
      1
    )
    await post.save()
    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Could not find any post" })
    res.status(500).send("Server Error")
  }
})

router.use("/comment", require("./comments"))
module.exports = router
