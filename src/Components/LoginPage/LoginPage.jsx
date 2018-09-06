import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import AuthenticationActions, { isLoggingIn, isLoggedIn, getLoginError } from '../../Redux/AuthenticationRedux'
import history from '../../Helpers/History'

type Props = {
  loginRequest: (string, string) => void,
  isLoggingIn: boolean,
  isLoggedIn: boolean
}

type State = {
  username: string,
  password: string,
  submitted: boolean,
  isLoggedIn: boolean
}

class LoginPage extends React.Component<Props, State> {
  state: State

  constructor (props: Props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      submitted: false,
      isLoggedIn: this.props.isLoggedIn
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static getDerivedStateFromProps (nextProps: Props, prevState: State) {
    let newState: State = prevState

    if (!nextProps.isLoggingIn && !nextProps.loginError && nextProps.isLoggedIn) {
      newState = {
        ...newState,
        submitted: true,
        isLoggedIn: true
      }
    }

    if (nextProps.loginError) {
      newState = {
        ...newState,
        error: true
      }
    }

    return prevState === newState ? null : newState
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    if (this.state.isLoggedIn) {
      history.push('/')
    }
  }

  handleChange (e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()

    this.setState({ submitted: true })
    const { username, password } = this.state
    if (username && password) {
      this.props.loginRequest(username, password)
    }
  }

  render () {
    const { username, password, submitted } = this.state
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2>Login</h2>
        <form name='form' onSubmit={this.handleSubmit}>
          <div
            className={
              `form-group ${(submitted && !username) ? ' has-error' : ''}`
            }
          >
            <label htmlFor='username'>Username
              <input
                type='text'
                className='form-control'
                name='username'
                value={username}
                onChange={this.handleChange}
              />
            </label>
            {submitted &&
              !username && (
              <div className='help-block'>Username is required</div>
            )}
          </div>
          <div
            className={
              `form-group ${(submitted && !password) ? ' has-error' : ''}`
            }
          >
            <label htmlFor='password'>Password
              <input
                type='password'
                className='form-control'
                name='password'
                value={password}
                onChange={this.handleChange}
              />
            </label>
            {submitted &&
              !password && (
              <div className='help-block'>Password is required</div>
            )}
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'>Login</button>
            {this.props.isLoggingIn && (
              <img
                alt='login'
                src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
              />
            )}
            <Link to='/register' className='btn btn-link'>
              Register
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggingIn: isLoggingIn(state),
  isLoggedIn: isLoggedIn(state),
  loginError: getLoginError(state)
})

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  loginRequest: (username, password) => dispatch(AuthenticationActions.loginRequest(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
