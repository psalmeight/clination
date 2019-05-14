import { get, post, destroy } from '../rest'

export let _getPatientHistories = (callback = null) => {
  console.log('_getPatientHistories called')
  get('/api/v1/patient_histories')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getPatientHistories', e)
    })
}

export let _getPatientHistoriesByPatient = (patientID, callback = null) => {
  console.log('_getPatientHistories called')
  get(`/api/v1/patient_histories/${patientID}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getPatientHistories', e)
    })
}

export let _getPatientHistory = (id, callback = null) => {
  console.log('_getPatientHistory called')
  get(`/api/v1/patient_history/${id}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getPatientHistory', e)
    })
}

export let _createPatientHistory = (data, callback = null) => {
  console.log('_createPatientHistory called')
  post('/api/v1/patient_history', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _createPatientHistory', e)
    })
}

export let _deletePatientHistory = (patient_historyId, callback = null) => {
  console.log('_deletePatientHistory called')
  destroy(`/api/v1/patient_history/${patient_historyId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deletePatientHistory', e)
    })
}
