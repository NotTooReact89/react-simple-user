// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import AuthenticationAction, { getLoggedInUserFirstName, isAdminUser } from '../../Redux/AuthenticationRedux'
import UsersAction, {
  isLoadingUsersItems,
  getUserItemsError,
  getUserItems,
  isDeletingUserItem,
  getDeleteUserItemError,
  getUpdateUserItemError,
  isUpdatingUserItem
} from '../../Redux/UsersRedux'
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
  loggedInUserFirstName: string,
  loadingUserItems: boolean,
  userItemsError: string,
  userItems: Object[],
  deletingUserItem: boolean,
  getAllUserItems: () => void,
  updateUserItem: (Object) => void,
  deleteUserItem: (string) => void,
  resetUsers: () => void,
  resetAuthentication: () => void,
  deleteUserItemError: string,
  updateUserItemError: string,
  isAdminUser: boolean
}

class HomePage extends React.Component<Props, State> {
  props: Props
  state: State

  constructor (props) {
    super(props)
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: ''
      },
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    if (this.props.isAdminUser) {
      this.props.getAllUserItems()
    }
  }

  handleDeleteUser (id) {
    this.props.deleteUserItem(id)
  }

  handleUpdateUser (userObject) {
    this.props.updateUserItem(userObject)
  }

  handleLogout () {
    this.props.resetUsers()
    this.props.resetAuthentication()

    history.push('/login')
  }

  handleChange = (event) => {
    const { name, value } = event.target
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({ submitted: true })
    const { user } = this.state
    if (user.firstName && user.lastName && user.email && user.password && user.userType) {
      this.props.updateUserItem(user)
    }
  }

  render () {
    const { user, submitted } = this.state
    const {
      loggedInUserFirstName,
      loadingUserItems,
      userItemsError,
      userItems,
      deletingUserItem,
      deleteUserItemError,
      updateUserItemError
    } = this.props
    return (
      <div className='col-xs-12'>
        <h1>Hi {loggedInUserFirstName}!</h1>
        <p>You&#39;re logged in with React!!</p>
        <h3>All registered users:</h3>
        {loadingUserItems && <em>Loading users...</em>}
        {deletingUserItem ? (
          <em> - Deleting...</em>
        ) : null}
        {userItemsError && <span className='text-danger'>Error getting new set of users: {userItemsError}</span>}
        {updateUserItemError && (
          <span className='text-danger'> - Error updating user: {updateUserItemError}</span>
        )}
        {deleteUserItemError && (
          <span className='text-danger'> - Error deleting user: {deleteUserItemError}</span>
        )}
        {(userItems && this.props.isAdminUser) && (
          <table className='table table-striped'>
            <tbody>
              {userItems.map((userItem, index) => (
                <tr>
                  <th scope='row'>{`${userItem.userId}`}</th>
                  <td>{`${userItem.userFirstName} ${userItem.userSurname}`}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-primary'
                      data-toggle='modal'
                      data-target={`#modal${userItem.userId}`}
                    >
                        Update
                    </button>
                    <div
                      className='modal fade'
                      id={`modal${userItem.userId}`}
                      tabIndex='-1'
                      role='dialog'
                      aria-labelledby={`modal${userItem.userId}Label`}
                      aria-hidden='true'
                    >
                      <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                          <form name='form' onSubmit={this.handleSubmit}>
                            <div className='modal-header'>
                              <button type='button' className='close' data-dismiss='modal'>&times;</button>
                              <h4 className='modal-title'>User information</h4>
                            </div>
                            <div className='modal-body'>
                              <div className='form-group col-md-12'>
                                <div
                                  className={
                                    `form-group ${(submitted && !userItem.userFirstName) ? ' has-error' : ''}`
                                  }
                                >
                                  <label htmlFor='firstName'>First Name
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='firstName'
                                      value={userItem.userFirstName}
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
                                    `form-group ${(submitted && !userItem.userLastName) ? ' has-error' : ''}`
                                  }
                                >
                                  <label htmlFor='lastName'>Last Name
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='lastName'
                                      value={userItem.userSurname}
                                      onChange={this.handleChange}
                                    />
                                  </label>
                                  {submitted &&
                                    !userItem.userSurname && (
                                    <div className='help-block'>Last Name is required</div>
                                  )}
                                </div>
                                <div
                                  className={
                                    `form-group ${(submitted && !userItem.userEmail) ? ' has-error' : ''}`
                                  }
                                >
                                  <label htmlFor='email'>Email
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='email'
                                      value={userItem.userEmail}
                                      onChange={this.handleChange}
                                    />
                                  </label>
                                  {submitted &&
                                    !userItem.userEmail && (
                                    <div className='help-block'>Email is required</div>
                                  )}
                                </div>
                                <div
                                  className={
                                    `form-group ${(submitted && !userItem.userType) ? ' has-error' : ''}`
                                  }
                                >
                                  <select
                                    name='userType'
                                    onChange={this.handleChange}
                                    value={userItem.userType ? userItem.userType : ''}
                                  >
                                    <option value='' disabled defaultValue>Select your option</option>
                                    <option value='Admin'>Admin</option>
                                    <option value='User'>User</option>
                                  </select>
                                  {submitted &&
                                    !userItem.userType && (
                                    <div className='help-block'>Type of user is required</div>
                                  )}
                                </div>
                              </div>
                              <div className='clearfix' />
                            </div>
                            <div className='modal-footer'>
                              <button type='submit' className='btn btn-success' >Update</button>
                              <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      onClick={() => this.handleDeleteUser(userItem.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}
        <p>
          <button onClick={() => this.handleLogout()}>Logout</button>
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedInUserFirstName: getLoggedInUserFirstName(state),
  loadingUserItems: isLoadingUsersItems(state),
  userItemsError: getUserItemsError(state),
  userItems: getUserItems(state),
  deletingUserItem: isDeletingUserItem(state),
  deleteUserItemError: getDeleteUserItemError(state),
  updateUserItemError: getUpdateUserItemError(state),
  updatingUserItem: isUpdatingUserItem(state),
  isAdminUser: isAdminUser(state)
})

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  getAllUserItems: () => dispatch(UsersAction.getAllUserItemsRequest()),
  updateUserItem: userObject => dispatch(UsersAction.updateUserItemRequest(
    userObject.userId,
    userObject.userFirstName,
    userObject.userLastName,
    userObject.userEmail,
    userObject.userPassword,
    userObject.userType
  )),
  deleteUserItem: id => dispatch(UsersAction.deleteUserItemRequest(id)),
  resetUsers: () => dispatch(UsersAction.resetValues()),
  resetAuthentication: () => dispatch(AuthenticationAction.resetValues())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
