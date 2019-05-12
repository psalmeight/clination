import { get, post, destroy } from '../rest'

export let _getClinicUsers = (callback = null) => {
  console.log('_getClinicUsers called')
  get('/api/v1/clinic_users')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getClinicUsers', e)
    })
}

export let _createClinicUser = (data, callback = null) => {
  console.log('_createClinicUser called')
  post('/api/v1/clinic_user', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveClinicUser', e)
    })
}

export let _saveClinicUser = (data, callback = null) => {
  console.log('_saveClinicUser called')
  post('/api/v1/clinic_user', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveClinicUser', e)
    })
}

export let _deleteClinicUser = (clinic_userId, callback = null) => {
  console.log('_deleteClinicUser called')
  destroy(`/api/v1/clinic_user/${clinic_userId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteClinicUser', e)
    })
}
