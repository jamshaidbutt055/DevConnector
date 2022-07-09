import PropTypes from "prop-types"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { addExperience } from "../../redux/actions/profile"

export const Experience = ({ addExperience }) => {
  const nav = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    current: false,
    to: "",
    description: "",
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const toggleDisabled = () => {
    setFormData({
      ...formData,
      current: !formData.current,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addExperience(formData, nav)
  }

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={formData.from}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={formData.current}
              onChange={toggleDisabled}
            />
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={formData.to}
            onChange={handleChange}
            disabled={formData.current ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}></textarea>
        </div>
        <input
          type="submit"
          className="btn btn-primary my-1"
          onClick={handleSubmit}
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  )
}

Experience.propTypes = {
  addExperience: PropTypes.func.isRequired,
}
export default connect(null, { addExperience })(Experience)
