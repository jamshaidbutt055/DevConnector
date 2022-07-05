import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import RootReducer from "./reducers/root"
const initialState = {}

const store = createStore(
  RootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
