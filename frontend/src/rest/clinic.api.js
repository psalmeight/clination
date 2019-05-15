import { get, post, destroy } from '../rest'

export let _getClinics = (callback = null) => {
  get('/api/v1/clinics')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getClinics', e)
    })
}

export let _getClinicsOwn = (callback = null) => {
  get('/api/v1/clinics/own')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getClinicsOwn', e)
    })
}

export let _createClinic = (data, callback = null) => {
  post('/api/v1/clinic', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveClinic', e)
    })
}

export let _saveClinic = (data, callback = null) => {
  post('/api/v1/clinic', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveClinic', e)
    })
}

export let _deleteClinic = (clinicId, callback = null) => {
  destroy(`/api/v1/clinic/${clinicId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteClinic', e)
    })
}
