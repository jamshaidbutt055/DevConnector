import { combineReducers } from "redux"
import displayAlert from "./alert"
import register from "./auth"
export default combineReducers({
  displayAlert,
  register,
})
