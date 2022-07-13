import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getPost } from "../../redux/actions/post"
import Spinner from "../../components/layout/spinner"
import PostItem from "./postItem"
import CommentForm from "./commentForm"
import CommentItem from "./commentItem"

export const Post = ({ getPost, post: { post, loading } }) => {
  let { id } = useParams()

  useEffect(() => {
    getPost(id)
  }, [])

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn btn-light">
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div class="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post)
