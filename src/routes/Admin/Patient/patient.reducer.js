import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_PATIENT_REQUEST = 'LOAD_PATIENT_REQUEST';
export const LOAD_PATIENT_SUCCESS = 'LOAD_PATIENT_SUCCESS';
export const LOAD_PATIENT_FAILURE = 'LOAD_PATIENT_FAILURE';
export const LOAD_PATIENT_BY_ID_REQUEST = 'LOAD_PATIENT_BY_ID_REQUEST';
export const LOAD_PATIENT_BY_ID_SUCCESS = 'LOAD_PATIENT_BY_ID_SUCCESS';
export const LOAD_PATIENT_BY_ID_FAILURE = 'LOAD_PATIENT_BY_ID_FAILURE';
export const ADD_PATIENT_REQUEST = 'ADD_PATIENT_REQUEST';
export const ADD_PATIENT_SUCCESS = 'ADD_PATIENT_SUCCESS';
export const ADD_PATIENT_FAILURE = 'ADD_PATIENT_FAILURE';
export const EDIT_PATIENT_REQUEST = 'EDIT_PATIENT_REQUEST';
export const EDIT_PATIENT_SUCCESS = 'EDIT_PATIENT_SUCCESS';
export const EDIT_PATIENT_FAILURE = 'EDIT_PATIENT_FAILURE';
export const DELETE_PATIENT_REQUEST = 'DELETE_PATIENT_REQUEST';
export const DELETE_PATIENT_SUCCESS = 'DELETE_PATIENT_SUCCESS';
export const DELETE_PATIENT_FAILURE = 'DELETE_PATIENT_FAILURE';

export const SELECT_PATIENT = 'SELECT_PATIENT';

export const EDIT_PATIENT_PRELIMINARY_REQUEST = 'EDIT_PATIENT_PRELIMINARY_REQUEST';
export const EDIT_PATIENT_PRELIMINARY_SUCCESS = 'EDIT_PATIENT_PRELIMINARY_SUCCESS';
export const EDIT_PATIENT_PRELIMINARY_FAILURE = 'EDIT_PATIENT_PRELIMINARY_FAILURE';
// ------------------------------------
// Actions
// ------------------------------------
export function loadPatient() {
  return {
    types: [LOAD_PATIENT_REQUEST, LOAD_PATIENT_SUCCESS, LOAD_PATIENT_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/patients`),
    payload: {}
  }
}
export function loadPatientById(id) {
  return {
    types: [LOAD_PATIENT_BY_ID_REQUEST, LOAD_PATIENT_BY_ID_SUCCESS, LOAD_PATIENT_BY_ID_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/patients/${id}`),
    payload: { id }
  }
}

export function addPatient(patient) {
  return {
    types: [ADD_PATIENT_REQUEST, ADD_PATIENT_SUCCESS, ADD_PATIENT_FAILURE],
    callAPI: () => Http.post(`${BackendUrl}/patients`, patient),
    payload: patient,
    successMessage: {
      show: true,
      message: 'Add new patient success'
    }
  }
}

export function editPatient(id,patient) {
  return {
    types: [EDIT_PATIENT_REQUEST, EDIT_PATIENT_SUCCESS, EDIT_PATIENT_FAILURE],
    callAPI: () => Http.put(`${BackendUrl}/patients/${id}`, patient),
    payload: { id, patient },
    successMessage: {
      show: true,
      message: 'Edit success!'
    }
  }
}

export function deletePatient(id) {
  return {
    types: [DELETE_PATIENT_REQUEST, DELETE_PATIENT_SUCCESS, DELETE_PATIENT_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/patients/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Patient is deleted'
    }
  }
}

export function selectPatient(id) {
  return {
    type: SELECT_PATIENT,
    payload: { id }
  }
}

export function editPatientPreliminary(id,preliminary) {
  return {
    types: [EDIT_PATIENT_PRELIMINARY_REQUEST, EDIT_PATIENT_PRELIMINARY_SUCCESS, EDIT_PATIENT_PRELIMINARY_FAILURE],
    callAPI: () => Http.put(`${BackendUrl}/patients/${id}`, preliminary),
    payload: { id, ...preliminary },
    successMessage: {
      show: true,
      message: 'Update preliminary success!'
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const PATIENT_ACTION_HANDLERS = {
  [LOAD_PATIENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_PATIENT_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, patients: action.data })
  },
  [LOAD_PATIENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [LOAD_PATIENT_BY_ID_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_PATIENT_BY_ID_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, selectedPatient: action.data })
  },
  [LOAD_PATIENT_BY_ID_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_PATIENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_PATIENT_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, patients: [...state.patients, action.data] })
  },
  [ADD_PATIENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_PATIENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_PATIENT_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      patients: state.patients.map(patient => patient.id == action.payload.id ? action.payload : patient)
    })
  },
  [EDIT_PATIENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_PATIENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_PATIENT_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, patients: state.patients.filter(patient => patient.id != action.payload.id)  })
  },
  [DELETE_PATIENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [SELECT_PATIENT] : (state, action) => {
    return ({ ...state, selectedPatient: action.payload})
  },
  [EDIT_PATIENT_PRELIMINARY_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_PATIENT_PRELIMINARY_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      patients: state.patients.map(patient => patient.id == action.payload.id ? {...patient, ...action.payload} : patient),
      selectedPatient: { ...state.selectedPatient, ...action.payload }
    })
  },
  [EDIT_PATIENT_PRELIMINARY_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  patients: [],
  fetching: false,
  error: undefined,
  selectedPatient: {}
}

export default function patientReducer(state = initialState, action) {
  const handler = PATIENT_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
