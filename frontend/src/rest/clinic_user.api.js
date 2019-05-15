import { get, post, destroy } from '../rest'

export let _getClinicUsers = (callback = null) => {
  get('/api/v1/clinic_users')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getClinicUsers', e)
    })
}

export let _createClinicUser = (data, callback = null) => {
  post('/api/v1/clinic_user', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveClinicUser', e)
    })
}

export let _saveClinicUser = (data, callback = null) => {
  post('/api/v1/clinic_user', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveClinicUser', e)
    })
}

export let _deleteClinicUser = (clinic_userId, callback = null) => {
  destroy(`/api/v1/clinic_user/${clinic_userId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteClinicUser', e)
    })
}
