import React from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"

const ProfileEducation = ({ education }) => {
  return (
    <div>
      <h3 className="text-dark">{education.school}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{education.from}</Moment> -{" "}
        {education.to ? (
          <Moment format="DD/MM/YYYY">{education.to}</Moment>
        ) : (
          "Present"
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {education.degree}
      </p>
      <p>
        <strong>Field of Study: </strong>
        {education.fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {education.description}
      </p>
    </div>
  )
}

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
}

export default ProfileEducation
