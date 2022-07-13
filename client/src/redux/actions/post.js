import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../../types"
import axios from "axios"
import { setAlert } from "./alert"

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts")
    dispatch({ type: GET_POSTS, payload: res.data })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    })
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`)
    dispatch({ type: GET_POST, payload: res.data })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    })
  }
}

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/like/${id}`)
    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    })
  }
}

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`)
    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    })
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`)
    dispatch({ type: DELETE_POST, payload: id })
    dispatch(setAlert("Post has been deleted...", "success", 2000))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    })
  }
}
export const addPost = (formData) => async (dispatch) => {
  const config = {
    "Content-Type": "application/json",
  }
  try {
    const res = await axios.post(`/api/posts`, formData, config)
    dispatch({ type: ADD_POST, payload: res.data })
    dispatch(setAlert("New Post Added...", "success", 2000))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    })
  }
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
    dispatch({ type: DELETE_COMMENT, payload: commentId })
    dispatch(setAlert("Comment has been deleted...", "success", 2000))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    })
  }
}
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    "Content-Type": "application/json",
  }
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    )
    dispatch({ type: ADD_COMMENT, payload: res.data })
    dispatch(setAlert("New Comment Added...", "success", 2000))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    })
  }
}
