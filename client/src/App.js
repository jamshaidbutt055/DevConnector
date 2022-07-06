import "./App.css"
import React, { useEffect } from "react"
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import { Provider } from "react-redux"
import store from "./redux/store"
import Alert from "./components/layout/alert"
import setAuth from "./utils/setAuthToken"
import { logUser } from "./redux/actions/auth"

if (localStorage.token) {
  setAuth(localStorage.token)
}
function App() {
  useEffect(() => {
    store.dispatch(logUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <section className="container">
            <Alert />
            <Routes>
              <Route path="/" element={<Landing />} />

              <Route
                path="/login"
                element={
                  <section className="container">
                    <Login />
                  </section>
                }
              />
              <Route
                path="/register"
                element={
                  <section className="container">
                    <Register />
                  </section>
                }
              />
            </Routes>
          </section>{" "}
        </React.Fragment>
      </Router>
    </Provider>
  )
}

export default App
