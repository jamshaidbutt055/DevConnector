import "./App.css"
import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
import setAuth from "./utils/setAuthToken"
import { logUser } from "./redux/actions/auth"

import Dashboard from "./components/dashboard/dashboard"
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Alert from "./components/layout/alert"
import PrivateRoute from "./components/PrivateRoute"
import CreateProfile from "./components/profile/createProfile"
import Education from "./components/profile/education"
import Experience from "./components/profile/experience"
import Profiles from "./components/profile/profiles"
import Profile from "./components/profile/profile"
import Posts from "./components/posts/posts"
import Post from "./components/posts/post"

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
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute redirectTo="/login">
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/createProfile"
                element={
                  <PrivateRoute redirectTo="/login">
                    <CreateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/editProfile"
                element={
                  <PrivateRoute redirectTo="/login">
                    <CreateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addEducation"
                element={
                  <PrivateRoute redirectTo="/login">
                    <Education />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addExperience"
                element={
                  <PrivateRoute redirectTo="/login">
                    <Experience />
                  </PrivateRoute>
                }
              />
              <Route
                path="/posts/:id"
                element={
                  <PrivateRoute redirectTo="/login">
                    <Post />
                  </PrivateRoute>
                }
              />

              <Route
                path="/posts"
                element={
                  <PrivateRoute redirectTo="/login">
                    <Posts />
                  </PrivateRoute>
                }
              />
            </Routes>
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  )
}

export default App
