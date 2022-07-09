import PropTypes from "prop-types"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { addEducation } from "../../redux/actions/profile"

export const Education = ({ addEducation }) => {
  const nav = useNavigate()
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
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
    addEducation(formData, nav)
  }

  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={formData.school}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={formData.fieldofstudy}
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
            Current School or Bootcamp
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
            value={formData.description}
            onChange={handleChange}
            placeholder="Program Description"></textarea>
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

Education.propTypes = {
  addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(Education)
