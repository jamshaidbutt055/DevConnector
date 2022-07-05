import React, { useState } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { setAlert } from "../../redux/actions/alert"
import { register } from "../../redux/actions/auth"
import PropTypes from "prop-types"
const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const hanldeInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.password2) {
      setAlert("Passwords do not match", "danger", 2000)
    } else {
      register(formData)
    }
  }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={hanldeInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={hanldeInputChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={hanldeInputChange}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={formData.password2}
            onChange={hanldeInputChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  )
}
Register.propTypes = {
  setAlert: PropTypes.array.isRequired,
  register: PropTypes.array.isRequired,
}

export default connect(null, { setAlert, register })(Register)
