import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS,
  REPOS_RECEIVED,
  GITHUB_ERROR,
} from "../../types"

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
    case CREATE_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false }
    case GET_REPOS:
      return { ...state, repos: [], loading: true }
    case REPOS_RECEIVED:
      return { ...state, repos: payload, loading: false, error: {} }
    case GITHUB_ERROR:
      return { ...state, repos: [], error: payload, loading: false }
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false }
    case PROFILE_ERROR:
      return { ...state, loading: false, profile: null, error: payload }
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false, repos: [], error: {} }
    default:
      return state
  }
}
