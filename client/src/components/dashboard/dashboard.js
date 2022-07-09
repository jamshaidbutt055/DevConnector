import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  deleteAccount,
  getCurrentUserProfile,
} from "../../redux/actions/profile"
import Spinner from "../layout/spinner"
import Education from "./education"
import Experience from "./experience"

export const Dashboard = ({
  getCurrentUserProfile,
  auth: { user },
  profile: { profile, loading },
  deleteUserAccount,
}) => {
  useEffect(() => {
    getCurrentUserProfile()
  }, [])

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> </i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <div className="dash-buttons">
            <Link to="/editProfile" className="btn btn-light">
              <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
            <Link to="/addExperience" className="btn btn-light">
              <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Link>
            <Link to="/addEducation" className="btn btn-light">
              <i className="fas fa-graduation-cap text-primary"></i> Add
              Education
            </Link>
          </div>
          <Experience experiences={profile.experience} />
          <Education educations={profile.education} />
          <button
            className="btn btn-danger"
            onClick={() => deleteUserAccount(profile.id)}>
            Delete Account
          </button>
        </>
      ) : (
        <p className="form-text">
          There is currently no profile associated with the user.{" "}
          <Link to="/createProfile">Create New Profile</Link>
        </p>
      )}
    </>
  )
}

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, {
  getCurrentUserProfile,
  deleteUserAccount: deleteAccount,
})(Dashboard)
