import { get, post, destroy } from '../rest'

export let _getPatientVaccinations = (callback = null) => {
  get('/api/v1/patient_vaccinations')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getPatientVaccinations', e)
    })
}

export let _getPatientVaccinationsByPatient = (patientID, callback = null) => {
  get(`/api/v1/patient_vaccination/patient/${patientID}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getPatientVaccinations', e)
    })
}

export let _getPatientVaccination = (id, callback = null) => {
  get(`/api/v1/patient_vaccination/${id}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getPatientVaccination', e)
    })
}

export let _createPatientVaccination = (data, callback = null) => {
  post('/api/v1/patient_vaccination', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _createPatientVaccination', e)
    })
}

export let _deletePatientVaccination = (patient_vaccinationId, callback = null) => {
  destroy(`/api/v1/patient_vaccination/${patient_vaccinationId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deletePatientVaccination', e)
    })
}
