import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DOCTOR_REQUEST = 'LOAD_DOCTOR_REQUEST';
export const LOAD_DOCTOR_SUCCESS = 'LOAD_DOCTOR_SUCCESS';
export const LOAD_DOCTOR_FAILURE = 'LOAD_DOCTOR_FAILURE';
export const ADD_DOCTOR_REQUEST = 'ADD_DOCTOR_REQUEST';
export const ADD_DOCTOR_SUCCESS = 'ADD_DOCTOR_SUCCESS';
export const ADD_DOCTOR_FAILURE = 'ADD_DOCTOR_FAILURE';
export const EDIT_DOCTOR_REQUEST = 'EDIT_DOCTOR_REQUEST';
export const EDIT_DOCTOR_SUCCESS = 'EDIT_DOCTOR_SUCCESS';
export const EDIT_DOCTOR_FAILURE = 'EDIT_DOCTOR_FAILURE';
export const DELETE_DOCTOR_REQUEST = 'DELETE_DOCTOR_REQUEST';
export const DELETE_DOCTOR_SUCCESS = 'DELETE_DOCTOR_SUCCESS';
export const DELETE_DOCTOR_FAILURE = 'DELETE_DOCTOR_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function loadDoctor() {
  return {
    types: [LOAD_DOCTOR_REQUEST, LOAD_DOCTOR_SUCCESS, LOAD_DOCTOR_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/doctors`),
    payload: {}
  }
}

export function addDoctor(doctor) {
  return {
    types: [ADD_DOCTOR_REQUEST, ADD_DOCTOR_SUCCESS, ADD_DOCTOR_FAILURE],
    callAPI: () => Http.post(`${BackendUrl}/doctors`, {name}),
    payload: doctor,
    successMessage: {
      show: true,
      message: 'Add new doctor success'
    }
  }
}

export function editDoctor(id,doctor) {
  return {
    types: [EDIT_DOCTOR_REQUEST, EDIT_DOCTOR_SUCCESS, EDIT_DOCTOR_FAILURE],
    callAPI: () => Http.put(`${BackendUrl}/doctors/${id}`, doctor),
    payload: { id, doctor },
    successMessage: {
      show: true,
      message: 'Edit success!'
    }
  }
}

export function deleteDoctor(id) {
  return {
    types: [DELETE_DOCTOR_REQUEST, DELETE_DOCTOR_SUCCESS, DELETE_DOCTOR_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/doctors/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Doctor is deleted'
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const DOCTOR_ACTION_HANDLERS = {
  [LOAD_DOCTOR_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_DOCTOR_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, doctors: action.data })
  },
  [LOAD_DOCTOR_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_DOCTOR_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_DOCTOR_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, doctors: [...state.doctors, action.data] })
  },
  [ADD_DOCTOR_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_DOCTOR_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_DOCTOR_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      doctors: state.doctors.map(doctor => doctor.id == action.payload.id ? action.payload : doctor)
    })
  },
  [EDIT_DOCTOR_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_DOCTOR_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_DOCTOR_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, doctors: state.doctors.filter(doctor => doctor.id != action.payload.id)  })
  },
  [DELETE_DOCTOR_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  doctors: [],
  fetching: false,
  error: undefined
}

export default function doctorReducer(state = initialState, action) {
  const handler = DOCTOR_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
