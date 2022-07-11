import React from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"

const ProfileExperience = ({ experience }) => {
  return (
    <div>
      <h3 className="text-dark">{experience.company}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{experience.from}</Moment> -{" "}
        {experience.to ? (
          <Moment format="DD/MM/YYYY">{experience.to}</Moment>
        ) : (
          "Present"
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {experience.title}
      </p>
      <p>
        <strong>Description: </strong>
        {experience.description}
      </p>
    </div>
  )
}

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default ProfileExperience
