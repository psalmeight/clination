import _ from 'lodash'

export const REGISTER_CLINIC = ['MAIN_OWNER', 'OWNER']
export const CLINIC_LIST = ['MAIN_OWNER', 'OWNER', 'DOCTOR', 'STAFF']
export const DELETE_CLINIC = ['MAIN_OWNER']

export const roleQualified = (roles) => {
    let currentRole = localStorage.getItem("rx")
    return _.includes(roles, currentRole)
}