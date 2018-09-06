import React from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import history from '../Helpers/History'
// import { PrivateRoute } from '../_components'
import HomePage from '../Components/HomePage/HomePage'
import LoginPage from '../Components/LoginPage/LoginPage'
import RegisterPage from '../Components/RegisterPage/RegisterPage'
import AlertAction, { getAlertType, getAlertMessage } from '../Redux/AlertRedux'

type Props = {
  alertType: string,
  alertMessage: string,
  clearAlert: () => void
}

class App extends React.Component<Props, *> {
  constructor (props: Props) {
    super(props)

    history.listen((location, action) => {
      this.props.clearAlert()
    })
  }

  render () {
    const { alertType, alertMessage } = this.props
    return (
      <div className='jumbotron'>
        <div className='container'>
          <div className='col-sm-8 col-sm-offset-2'>
            {alertMessage && (
              <div className={`alert ${alertType}`}>{alertMessage}</div>
            )}
            <Router history={history}>
              <div>
                <Route exact path='/' component={HomePage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/register' component={RegisterPage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  alertType: getAlertType(state),
  alertMessage: getAlertMessage(state)
})

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  clearAlert: () => dispatch(AlertAction.alertClear())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
