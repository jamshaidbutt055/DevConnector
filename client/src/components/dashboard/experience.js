import React from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"
import { connect } from "react-redux"
import { deleteExperience } from "../../redux/actions/profile"

const Experience = ({ experiences, deleteExperience }) => {
  const experience = experiences.map((exp) => {
    return (
      <tr key={exp.id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td className="hide-sm">
          <Moment format="DD-MM-YYYY">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Present"
          ) : (
            <Moment format="DD-MM-YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteExperience(exp.id)}>
            Delete
          </button>
        </td>
      </tr>
    )
  })
  return experiences.length > 0 ? (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experience}</tbody>
      </table>
    </>
  ) : (
    <></>
  )
}

Experience.propTypes = {
  experiences: PropTypes.array,
  deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience)
