import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getPosts } from "../../redux/actions/post"

import Spinner from "../layout/spinner"
import CreatePost from "./createPost"
import PostItem from "./postItem"

export const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to Community
      </p>
      <CreatePost />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post,
})

export default connect(mapStateToProps, { getPosts })(Posts)
