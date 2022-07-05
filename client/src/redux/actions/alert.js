import { SET_ALERT, REMOVE_ALERT } from "../../types"
import { v4 as uuid } from "uuid"
export const setAlert = (msg, alertType, timeoutInMiliSec) => (dispatch) => {
  const id = uuid()
  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      alertType,
    },
  })

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    })
  }, timeoutInMiliSec)
}
