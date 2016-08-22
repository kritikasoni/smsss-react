import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_SYMPTOM_REQUEST = 'LOAD_SYMPTOM_REQUEST';
export const LOAD_SYMPTOM_SUCCESS = 'LOAD_SYMPTOM_SUCCESS';
export const LOAD_SYMPTOM_FAILURE = 'LOAD_SYMPTOM_FAILURE';
export const ADD_SYMPTOM_REQUEST = 'ADD_SYMPTOM_REQUEST';
export const ADD_SYMPTOM_SUCCESS = 'ADD_SYMPTOM_SUCCESS';
export const ADD_SYMPTOM_FAILURE = 'ADD_SYMPTOM_FAILURE';
export const EDIT_SYMPTOM_REQUEST = 'EDIT_SYMPTOM_REQUEST';
export const EDIT_SYMPTOM_SUCCESS = 'EDIT_SYMPTOM_SUCCESS';
export const EDIT_SYMPTOM_FAILURE = 'EDIT_SYMPTOM_FAILURE';
export const DELETE_SYMPTOM_REQUEST = 'DELETE_SYMPTOM_REQUEST';
export const DELETE_SYMPTOM_SUCCESS = 'DELETE_SYMPTOM_SUCCESS';
export const DELETE_SYMPTOM_FAILURE = 'DELETE_SYMPTOM_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function loadSymptom(id) {
  return {
    types: [LOAD_SYMPTOM_REQUEST, LOAD_SYMPTOM_SUCCESS, LOAD_SYMPTOM_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/symptoms/patient/${id}`),
    payload: {}
  }
}

export function addSymptom(symptom) {
  return {
    types: [ADD_SYMPTOM_REQUEST, ADD_SYMPTOM_SUCCESS, ADD_SYMPTOM_FAILURE],
    callAPI: () => Http.post(`${BackendUrl}/symptoms`, symptom),
    payload: symptom,
    successMessage: {
      show: true,
      message: 'Add new symptom success'
    }
  }
}

export function editSymptom(id,symptom) {
  return {
    types: [EDIT_SYMPTOM_REQUEST, EDIT_SYMPTOM_SUCCESS, EDIT_SYMPTOM_FAILURE],
    callAPI: () => Http.put(`${BackendUrl}/symptoms/${id}`, symptom),
    payload: { id, symptom },
    successMessage: {
      show: true,
      message: 'Edit success!'
    }
  }
}

export function deleteSymptom(id) {
  return {
    types: [DELETE_SYMPTOM_REQUEST, DELETE_SYMPTOM_SUCCESS, DELETE_SYMPTOM_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/symptoms/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Symptom is deleted'
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const SYMPTOM_ACTION_HANDLERS = {
  [LOAD_SYMPTOM_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_SYMPTOM_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, symptoms: action.data })
  },
  [LOAD_SYMPTOM_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_SYMPTOM_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_SYMPTOM_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, symptoms: [...state.symptoms, action.data] })
  },
  [ADD_SYMPTOM_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_SYMPTOM_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_SYMPTOM_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      symptoms: state.symptoms.map(symptom => symptom.id == action.payload.id ? action.payload : symptom)
    })
  },
  [EDIT_SYMPTOM_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_SYMPTOM_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_SYMPTOM_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, symptoms: state.symptoms.filter(symptom => symptom.id != action.payload.id)  })
  },
  [DELETE_SYMPTOM_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  symptoms: [],
  fetching: false,
  error: undefined
}

export default function symptomReducer(state = initialState, action) {
  const handler = SYMPTOM_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
