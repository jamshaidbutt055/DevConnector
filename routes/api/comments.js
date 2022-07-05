const express = require("express")
const authMiddleware = require("../../middlewares/auth")
const { check, validationResult } = require("express-validator")
const Post = require("../../models/Post")
const User = require("../../models/User")
const router = express.Router()
router.post(
  "/:postId",
  [authMiddleware, [check("text", "Text is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      let user = await User.findById(req.user.id).select("-password")
      let post = await Post.findById(req.params.postId)
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      }
      post.comments.unshift(newComment)
      await post.save()
      res.json(post.comments)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)

router.delete("/:postId/:commentId", authMiddleware, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId)
    const comment = post.comments.find(
      (comment) => comment.id.toString() === req.params.commentId
    )
    if (!comment) return res.status(404).json({ msg: "Comment not found" })
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not Authorized." })

    post.comments.splice(
      post.comments.findIndex(
        (comment) => comment._id.toString() === req.params.commentId
      ),
      1
    )
    await post.save()
    res.json(post.comments)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})
module.exports = router
