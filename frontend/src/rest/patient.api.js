import { get, post, destroy, patch } from '../rest'

export let _getPatient = (patientID, callback = null) => {
  get('/api/v1/patient/' + patientID)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getPatient', e)
    })
}

export let _getPatients = (search = '', callback = null) => {
  get('/api/v1/patients', { search })
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getPatients', e)
    })
}

export let _getPatientsByClinic = (clinicID, search = '', callback = null) => {
  get(`/api/v1/patients/by_clinic/${clinicID}?search=${search}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getPatientsByClinic', e)
    })
}

export let _createPatient = (data, callback = null) => {
  post('/api/v1/patient', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _savePatient', e)
    })
}

export let _savePatient = (data, callback = null) => {
  post('/api/v1/patient', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _savePatient', e)
    })
}

export let _updatePatient = (data, callback = null) => {
  patch('/api/v1/patient', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _updatePatient', e)
    })
}

export let _updatePatientPast = (data, callback = null) => {
  patch('/api/v1/patient_past', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _updatePatientPast', e)
    })
}

export let _deletePatient = (patientId, callback = null) => {
  destroy(`/api/v1/patient/${patientId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deletePatient', e)
    })
}
