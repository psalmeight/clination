import { get, post, destroy } from '../rest'

export let _getUsers = (callback = null) => {
  console.log('_getUsers called')
  get('/api/v1/users')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getUsers', e)
    })
}

export let _createUser = (data, callback = null) => {
  console.log('_createUser called')
  post('/api/user', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveUser', e)
    })
}

export let _tryLogin = (payload, callback = null) => {
  console.log('_tryLogin called')
  post('/api/trylogin', payload)
    .then(response => {

      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('rx', response.data.user.role)
      localStorage.setItem('user_id', response.data.user.id)

      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getUsers', e)
    })
}

export let _tryLogout = (payload, callback = null) => {
  console.log('_tryLogout called')
  post('/api/trylogout', payload)
    .then(response => {
      if (callback) callback()
    })
    .catch(e => {
      console.log('Error in _getUsers', e)
    })
}

export let _saveUser = (data, callback = null) => {
  console.log('_saveUser called')
  post('/api/v1/user', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveUser', e)
    })
}

export let _deleteUser = (userId, callback = null) => {
  console.log('_deleteUser called')
  destroy(`/api/v1/user/${userId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteUser', e)
    })
}
