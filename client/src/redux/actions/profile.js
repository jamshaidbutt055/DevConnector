import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
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
