import React, { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { login } from "../../redux/actions/auth"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const Login = ({ login, isAuthenticated }) => {
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
    if (!formData.password) {
      console.error("Passwords do not match.")
    } else {
      login(formData)
    }
  }
  if (isAuthenticated) return <Navigate to="/dashboard" />

  return (
    <>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

let mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, { login })(Login)
