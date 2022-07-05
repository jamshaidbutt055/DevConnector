import React, { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const hanldeInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password) {
      console.error("Passwords do not match.")
    } else {
      console.log("Success")
    }
  }

  return (
    <>
      <div className="alert alert-danger">Invalid credentials</div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={hanldeInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={hanldeInputChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  )
}

export default Login
