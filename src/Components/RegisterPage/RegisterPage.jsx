import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import AuthenticationActions, { isRegistering, isLoggedIn, getRegistrationError } from '../../Redux/AuthenticationRedux'
import history from '../../Helpers/History'

type User = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  userType: string
}
type State = {
  user: User,
  submitted: boolean
}

type Props = {
  isRegistering: boolean,
  isLoggedIn: boolean,
  registrationRequest: (
    string,
    string,
    string,
    string,
    string
  ) => void
}

class RegisterPage extends React.Component<Props, State> {
  state: State

  constructor (props) {
    super(props)
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: '',
        submitted: false,
        isLoggedIn: this.props.isLoggedIn,
        error: false
      },
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static getDerivedStateFromProps (nextProps: Props, prevState: State) {
    let newState: State = prevState

    if (!nextProps.isRegistering && !nextProps.registrationError && nextProps.isLoggedIn) {
      newState = {
        ...newState,
        submitted: true,
        isLoggedIn: true
      }
    }

    if (nextProps.registrationError) {
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

  handleChange (event) {
    const { name, value } = event.target
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    this.setState({ submitted: true })
    const { user } = this.state
    if (user.firstName && user.lastName && user.email && user.password && user.userType) {
      this.props.registrationRequest(user.firstName, user.lastName, user.email, user.password, user.userType)
    }
  }

  render () {
    const { user, submitted } = this.state
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2>Register</h2>
        <form name='form' onSubmit={this.handleSubmit}>
          <div
            className={
              `form-group ${(submitted && !user.firstName) ? ' has-error' : ''}`
            }
          >
            <label htmlFor='firstName'>First Name
              <input
                type='text'
                className='form-control'
                name='firstName'
                value={user.firstName}
                onChange={this.handleChange}
              />
            </label>
            {submitted &&
              !user.firstName && (
              <div className='help-block'>First Name is required</div>
            )}
          </div>
          <div
            className={
              `form-group ${(submitted && !user.lastName) ? ' has-error' : ''}`
            }
          >
            <label htmlFor='lastName'>Last Name
              <input
                type='text'
                className='form-control'
                name='lastName'
                value={user.lastName}
                onChange={this.handleChange}
              />
            </label>
            {submitted &&
              !user.lastName && (
              <div className='help-block'>Last Name is required</div>
            )}
          </div>
          <div
            className={
              `form-group ${(submitted && !user.email) ? ' has-error' : ''}`
            }
          >
            <label htmlFor='email'>Email
              <input
                type='text'
                className='form-control'
                name='email'
                value={user.email}
                onChange={this.handleChange}
              />
            </label>
            {submitted &&
              !user.email && (
              <div className='help-block'>Email is required</div>
            )}
          </div>
          <div
            className={
              `form-group ${(submitted && !user.password) ? ' has-error' : ''}`
            }
          >
            <label htmlFor='password'>Password
              <input
                type='password'
                className='form-control'
                name='password'
                value={user.password}
                onChange={this.handleChange}
              />
            </label>
            {submitted &&
              !user.password && (
              <div className='help-block'>Password is required</div>
            )}
          </div>
          <div
            className={
              `form-group ${(submitted && !user.userType) ? ' has-error' : ''}`
            }
          >
            <select
              name='userType'
              onChange={this.handleChange}
              value={user.userType ? user.userType : ''}
            >
              <option value='' disabled defaultValue>Select user type</option>
              <option value='Admin'>Admin</option>
              <option value='User'>User</option>
            </select>
            {submitted &&
              !user.userType && (
              <div className='help-block'>Type of user is required</div>
            )}
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'>Register</button>
            {this.props.isRegistering && (
              <img
                alt='register'
                src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
              />
            )}
            <Link to='/login' className='btn btn-link'>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isRegistering: isRegistering(state),
  isLoggedIn: isLoggedIn(state),
  registrationError: getRegistrationError(state)
})

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  registrationRequest: (
    userFirstName,
    userLastName,
    userEmail,
    userPassword,
    userType
  ) => dispatch(AuthenticationActions.registrationRequest(
    userFirstName,
    userLastName,
    userEmail,
    userPassword,
    userType
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
