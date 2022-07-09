import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

export const PrivateRoute = ({
  children,
  redirectTo,
  auth: { isAuthenticated, loading },
}) => {
  return !isAuthenticated && !loading ? <Navigate to={redirectTo} /> : children
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
