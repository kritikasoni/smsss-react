import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';
import moment from 'moment';
// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_APPOINTMENT_REQUEST = 'LOAD_APPOINTMENT_REQUEST';
export const LOAD_APPOINTMENT_SUCCESS = 'LOAD_APPOINTMENT_SUCCESS';
export const LOAD_APPOINTMENT_FAILURE = 'LOAD_APPOINTMENT_FAILURE';
export const ADD_APPOINTMENT_REQUEST = 'ADD_APPOINTMENT_REQUEST';
export const ADD_APPOINTMENT_SUCCESS = 'ADD_APPOINTMENT_SUCCESS';
export const ADD_APPOINTMENT_FAILURE = 'ADD_APPOINTMENT_FAILURE';
export const EDIT_APPOINTMENT_REQUEST = 'EDIT_APPOINTMENT_REQUEST';
export const EDIT_APPOINTMENT_SUCCESS = 'EDIT_APPOINTMENT_SUCCESS';
export const EDIT_APPOINTMENT_FAILURE = 'EDIT_APPOINTMENT_FAILURE';
export const DELETE_APPOINTMENT_REQUEST = 'DELETE_APPOINTMENT_REQUEST';
export const DELETE_APPOINTMENT_SUCCESS = 'DELETE_APPOINTMENT_SUCCESS';
export const DELETE_APPOINTMENT_FAILURE = 'DELETE_APPOINTMENT_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function loadAppointment(id) {
  return {
    types: [LOAD_APPOINTMENT_REQUEST, LOAD_APPOINTMENT_SUCCESS, LOAD_APPOINTMENT_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/appointments/patient/${id}`),
    payload: {}
  }
}

export function addAppointment(appointment) {
  return {
    types: [ADD_APPOINTMENT_REQUEST, ADD_APPOINTMENT_SUCCESS, ADD_APPOINTMENT_FAILURE],
    callAPI: () => Http.post(`${BackendUrl}/appointments`, appointment),
    payload: appointment,
    successMessage: {
      show: true,
      message: 'Add new appointment success'
    }
  }
}

export function editAppointment(id,appointment) {
  return {
    types: [EDIT_APPOINTMENT_REQUEST, EDIT_APPOINTMENT_SUCCESS, EDIT_APPOINTMENT_FAILURE],
    callAPI: () => Http.put(`${BackendUrl}/appointments/${id}`, appointment),
    payload: { id, appointment },
    successMessage: {
      show: true,
      message: 'Edit success!'
    }
  }
}

export function deleteAppointment(id) {
  return {
    types: [DELETE_APPOINTMENT_REQUEST, DELETE_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/appointments/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Appointment is deleted'
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const APPOINTMENT_ACTION_HANDLERS = {
  [LOAD_APPOINTMENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_APPOINTMENT_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, appointments: action.data })
  },
  [LOAD_APPOINTMENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_APPOINTMENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_APPOINTMENT_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, appointments: [...state.appointments, action.data] })
  },
  [ADD_APPOINTMENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_APPOINTMENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_APPOINTMENT_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      appointments: state.appointments.map(appointment => appointment.id == action.payload.id ? action.payload : appointment)
    })
  },
  [EDIT_APPOINTMENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_APPOINTMENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_APPOINTMENT_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, appointments: state.appointments.filter(appointment => appointment.id != action.payload.id)  })
  },
  [DELETE_APPOINTMENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  appointments: [],
  fetching: false,
  error: undefined
}

export default function appointmentReducer(state = initialState, action) {
  const handler = APPOINTMENT_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
