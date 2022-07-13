import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  GITHUB_ERROR,
  PROFILE_ERROR,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  CLEAR_REPO,
  ACCOUNT_DELETED,
  REPOS_RECEIVED,
} from "../../types"
import axios from "axios"
import { setAlert } from "./alert"

export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me")
    dispatch({ type: GET_PROFILE, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get("/api/profile")
    dispatch({ type: GET_PROFILES, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const getProfileById = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_PROFILE })
    const res = await axios.get(`/api/profile/user/${id}`)
    dispatch({ type: GET_PROFILE, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    //  dispatch({ type: GET_REPOS })
    const res = await axios.get(`/api/profile/github/${username}`)
    //dispatch({ type: REPOS_RECEIVED, payload: res.data })
    dispatch({ type: GET_REPOS, payload: res.data })
  } catch (err) {
    dispatch({
      type: GITHUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const createProfile = (profileData, nav, edit = false) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const res = await axios.post(
        "/api/profile",
        JSON.stringify(profileData),
        config
      )
      dispatch({ type: CREATE_PROFILE, payload: res.data })
      dispatch(
        setAlert(edit ? "Profile Updated!" : "Profile Created", "success", 2000)
      )
      if (!edit) nav("/dashboard")
    } catch (err) {
      const errors = err.response.data.errors
      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 2000)))
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

export const addExperience = (profileData, nav) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const res = await axios.put(
        "/api/profile/experience",
        JSON.stringify(profileData),
        config
      )
      dispatch({ type: UPDATE_PROFILE, payload: res.data })
      dispatch(setAlert("Experience Added!", "success", 2000))
      nav("/dashboard")
    } catch (err) {
      const errors = err.response.data.errors
      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 2000)))
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

export const addEducation = (profileData, nav) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const res = await axios.put(
        "/api/profile/education",
        JSON.stringify(profileData),
        config
      )
      dispatch({ type: UPDATE_PROFILE, payload: res.data })
      dispatch(setAlert("Education Added!", "success", 2000))
      nav("/dashboard")
    } catch (err) {
      const errors = err.response.data.errors
      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 2000)))
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

export const deleteEducation = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`)
      dispatch({ type: UPDATE_PROFILE, payload: res.data })
      dispatch(setAlert("Education Deleted!", "success", 2000))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

export const deleteExperience = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`)
      dispatch({ type: UPDATE_PROFILE, payload: res.data })
      dispatch(setAlert("Experience Deleted!", "success", 2000))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

export const deleteAccount = () => {
  return async (dispatch) => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This operation CANNOT be undone."
      )
    ) {
      try {
        const res = await axios.delete("/api/profile")
        dispatch({ type: CLEAR_PROFILE })
        dispatch({ type: ACCOUNT_DELETED })
        dispatch(
          setAlert("Your account has been permanently Deleted!", "info", 2000)
        )
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        })
      }
    }
  }
}

export const clearRepo = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_REPO })
  }
}
