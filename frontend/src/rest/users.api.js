import { get, post, destroy } from '../rest'
import _ from 'lodash'

export let _getUsers = (callback = null) => {
  get('/api/v1/users')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getUsers', e)
    })
}

export let _getDoctorsByClinic = (clinicID, callback = null) => {
  get(`/api/v1/users/clinic_doctors/${clinicID}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getDoctorsByClinic', e)
    })
}

export let _createUser = (data, callback = null, mainUser = true) => {
  if(mainUser){
    post('/api/user', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveUser', e)
    })
  }
  else {
    post('/api/v1/user/staff', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveUser', e)
    })
  }

}

export let _tryLogin = (payload, callback = null) => {
  post('/api/trylogin', payload)
    .then(response => {
      
      if(response.data.status == 200 && !_.isEmpty(response.data.access_token)){
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('rx', response.data.user.role)
        localStorage.setItem('user_id', response.data.user.id)
      }

      if (callback) callback(response.data)

    })
    .catch(e => {
      console.log('Error in _getUsers', e)
    })
}

export let _tryLogout = (payload, callback = null) => {
  post('/api/trylogout', payload)
    .then(response => {
      if (callback) callback()
    })
    .catch(e => {
      console.log('Error in _getUsers', e)
    })
}

export let _saveUser = (data, callback = null) => {
  post('/api/v1/user', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveUser', e)
    })
}

export let _deleteUser = (userId, callback = null) => {
  destroy(`/api/v1/user/${userId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteUser', e)
    })
}
