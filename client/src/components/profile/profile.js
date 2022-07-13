import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getProfileById } from "../../redux/actions/profile"
import Spinner from "../layout/spinner"
import ProfileTop from "./profileTop"
import ProfileAbout from "./profileAbout.js"
import ProfileExperience from "./profileExperience"
import ProfileEducation from "./profileEducation"
import ProfileGithub from "./profileGithub"

export const Profile = ({
  profile: { profile, loading },
  getProfileById,
  auth,
}) => {
  let { id } = useParams()
  useEffect(() => {
    getProfileById(id)
  }, [getProfileById])
  return !profile || loading ? (
    <Spinner />
  ) : (
    <>
      <Link to="/profiles" className="btn btn-light">
        Back to Developers
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link to="/editProfile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience.length > 0 ? (
            profile.experience.map((exp) => (
              <ProfileExperience key={exp._id} experience={exp} />
            ))
          ) : (
            <h4>No Experience</h4>
          )}
        </div>
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length > 0 ? (
            profile.education.map((edu) => (
              <ProfileEducation key={edu._id} education={edu} />
            ))
          ) : (
            <h4>No Education</h4>
          )}
        </div>
        {profile.user._id === id && profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    </>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile)
