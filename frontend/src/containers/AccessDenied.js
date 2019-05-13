import React from 'react'
import { _tryLogout } from '../rest/users.api'
import { RouteTo, ActOnBranch } from '../components/Utils/RouterAction'

export default class AccessDenied extends React.Component {
  tryLogout = () => {
    _tryLogout({}, data => {
       ActOnBranch('clear')
       RouteTo(this.props, '/')
    })
 }

  render() {
    return (
      <div>
        <h3>Unable to Access This Page</h3>
        <a href="#" onClick={() => this.tryLogout()}>Go back to Login page</a>
      </div>
    )
  }
}
