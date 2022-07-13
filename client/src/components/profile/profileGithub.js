import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getGithubRepos } from "../../redux/actions/profile"
export const ProfileGithub = ({
  getGithubRepos,
  username,
  repos,
  loading,
  error,
}) => {
  useEffect(() => {
    //if (repos.length === 0 && !loading && Object.keys(error).length === 0)
    console.log(username)
    getGithubRepos(username)
  }, [])
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos.length > 0 ? (
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noregerrer">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watcher: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No GitHub Repository found...</p>
      )}
    </div>
  )
}

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
  loading: state.profile.loading,
  error: state.profile.error,
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub)
