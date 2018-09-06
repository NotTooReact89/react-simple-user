import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute ({
  Component,
  ...rest
}:{
  Component: React.Node,
  rest: Object
}) {
  return (
    <Route
      {...rest}
      render={props => (
        localStorage.getItem('user')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )}
    />
  )
}
