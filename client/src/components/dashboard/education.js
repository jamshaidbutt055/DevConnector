import React from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"
import { connect } from "react-redux"
import { deleteEducation } from "../../redux/actions/profile"

const Education = ({ educations, deleteEducation }) => {
  const education = educations.map((edu) => {
    return (
      <tr key={edu.id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td className="hide-sm">
          <Moment format="DD-MM-YYYY">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Present"
          ) : (
            <Moment format="DD-MM-YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteEducation(edu.id)}>
            Delete
          </button>
        </td>
      </tr>
    )
  })
  return educations.length > 0 ? (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{education}</tbody>
      </table>
    </>
  ) : (
    <></>
  )
}

Education.propTypes = {
  educations: PropTypes.array,
  deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, { deleteEducation })(Education)
