import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_PROFILE,
} from "../../types"
import axios from "axios"
import { setAlert } from "./alert"
import setAuth from "../../utils/setAuthToken"

export const logUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuth(localStorage.token)
  }
  try {
    const res = await axios.get("/api/auth")
    dispatch({ type: USER_LOADED, payload: res.data })
  } catch (err) {
    dispatch({ type: AUTH_FAILED })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  })
  dispatch({
    type: CLEAR_PROFILE,
  })
}

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const body = JSON.stringify({ email, password })
    try {
      const res = await axios.post("/api/auth", body, config)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
      dispatch(logUser())
    } catch (err) {
      const errors = [err.response.data.errors]
      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 2000)))
      dispatch({
        type: LOGIN_FAILED,
      })
    }
  }

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const body = JSON.stringify({ name, email, password })
    try {
      const res = await axios.post("/api/users", body, config)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
      dispatch(logUser())
    } catch (err) {
      const errors = err.response.data.errors
      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 2000)))

      dispatch({
        type: REGISTER_FAIL,
      })
    }
  }
