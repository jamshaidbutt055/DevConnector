import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getProfiles } from "../../redux/actions/profile"

import Spinner from "../layout/spinner"
import ProfileItem from "./profileItem"

export const Profiles = ({ getProfiles, profiles: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles()
  }, [])
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop" /> Browse and connect with
        Developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileItem key={profile.id} profile={profile} />
          ))
        ) : (
          <h4>No Profiles Found...</h4>
        )}
      </div>
    </>
  )
}

Profiles.propTypes = {
  profiles: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profiles: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
