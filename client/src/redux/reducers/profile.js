import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
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
    case PROFILE_ERROR:
      return { ...state, loading: false, profile: null, error: payload }
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false, repos: [] }
    default:
      return state
  }
}
