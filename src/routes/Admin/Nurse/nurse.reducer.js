import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_NURSE_REQUEST = 'LOAD_NURSE_REQUEST';
export const LOAD_NURSE_SUCCESS = 'LOAD_NURSE_SUCCESS';
export const LOAD_NURSE_FAILURE = 'LOAD_NURSE_FAILURE';
export const ADD_NURSE_REQUEST = 'ADD_NURSE_REQUEST';
export const ADD_NURSE_SUCCESS = 'ADD_NURSE_SUCCESS';
export const ADD_NURSE_FAILURE = 'ADD_NURSE_FAILURE';
export const EDIT_NURSE_REQUEST = 'EDIT_NURSE_REQUEST';
export const EDIT_NURSE_SUCCESS = 'EDIT_NURSE_SUCCESS';
export const EDIT_NURSE_FAILURE = 'EDIT_NURSE_FAILURE';
export const DELETE_NURSE_REQUEST = 'DELETE_NURSE_REQUEST';
export const DELETE_NURSE_SUCCESS = 'DELETE_NURSE_SUCCESS';
export const DELETE_NURSE_FAILURE = 'DELETE_NURSE_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function loadNurse() {
  return {
    types: [LOAD_NURSE_REQUEST, LOAD_NURSE_SUCCESS, LOAD_NURSE_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/nurses`),
    payload: {}
  }
}

export function addNurse(nurse) {
  return {
    types: [ADD_NURSE_REQUEST, ADD_NURSE_SUCCESS, ADD_NURSE_FAILURE],
    callAPI: () => Http.post(`${BackendUrl}/nurses`, nurse),
    payload: nurse,
    successMessage: {
      show: true,
      message: 'Add new nurse success'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/nurses'
    }
  }
}

export function editNurse(id,nurse) {
  return {
    types: [EDIT_NURSE_REQUEST, EDIT_NURSE_SUCCESS, EDIT_NURSE_FAILURE],
    callAPI: () => Http.put(`${BackendUrl}/nurses/${id}`, nurse),
    payload: { id, nurse },
    successMessage: {
      show: true,
      message: 'Edit success!'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/nurses'
    }
  }
}

export function deleteNurse(id) {
  return {
    types: [DELETE_NURSE_REQUEST, DELETE_NURSE_SUCCESS, DELETE_NURSE_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/nurses/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Nurse is deleted'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/nurses'
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const NURSE_ACTION_HANDLERS = {
  [LOAD_NURSE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_NURSE_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, nurses: action.data })
  },
  [LOAD_NURSE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_NURSE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_NURSE_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, nurses: [...state.nurses, action.data] })
  },
  [ADD_NURSE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_NURSE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_NURSE_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      nurses: state.nurses.map(nurse => nurse.id == action.payload.id ? action.payload : nurse)
    })
  },
  [EDIT_NURSE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_NURSE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_NURSE_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, nurses: state.nurses.filter(nurse => nurse.id != action.payload.id)  })
  },
  [DELETE_NURSE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  nurses: [],
  fetching: false,
  error: undefined
}

export default function nurseReducer(state = initialState, action) {
  const handler = NURSE_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
