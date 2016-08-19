import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_POSITION_REQUEST = 'LOAD_POSITION_REQUEST';
export const LOAD_POSITION_SUCCESS = 'LOAD_POSITION_SUCCESS';
export const LOAD_POSITION_FAILURE = 'LOAD_POSITION_FAILURE';
export const ADD_POSITION_REQUEST = 'ADD_POSITION_REQUEST';
export const ADD_POSITION_SUCCESS = 'ADD_POSITION_SUCCESS';
export const ADD_POSITION_FAILURE = 'ADD_POSITION_FAILURE';
export const EDIT_POSITION_REQUEST = 'EDIT_POSITION_REQUEST';
export const EDIT_POSITION_SUCCESS = 'EDIT_POSITION_SUCCESS';
export const EDIT_POSITION_FAILURE = 'EDIT_POSITION_FAILURE';
export const DELETE_POSITION_REQUEST = 'DELETE_POSITION_REQUEST';
export const DELETE_POSITION_SUCCESS = 'DELETE_POSITION_SUCCESS';
export const DELETE_POSITION_FAILURE = 'DELETE_POSITION_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function loadPosition() {
  return {
    types: [LOAD_POSITION_REQUEST, LOAD_POSITION_SUCCESS, LOAD_POSITION_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/positions`),
    payload: {}
  }
}

export function addPosition(name) {
  return {
    types: [ADD_POSITION_REQUEST, ADD_POSITION_SUCCESS, ADD_POSITION_FAILURE],
    callAPI: () => Http.post(`${BackendUrl}/positions`, {name}),
    payload: { name },
    successMessage: {
      show: true,
      message: 'Add new position success'
    }
  }
}

export function editPosition(id,name) {
  return {
    types: [EDIT_POSITION_REQUEST, EDIT_POSITION_SUCCESS, EDIT_POSITION_FAILURE],
    callAPI: () => Http.put(`${BackendUrl}/positions/${id}`, {name}),
    payload: { id,name },
    successMessage: {
      show: true,
      message: 'Edit success!'
    }
  }
}

export function deletePosition(id) {
  return {
    types: [DELETE_POSITION_REQUEST, DELETE_POSITION_SUCCESS, DELETE_POSITION_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/positions/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Position is deleted'
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const POSITION_ACTION_HANDLERS = {
  [LOAD_POSITION_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_POSITION_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, positions: action.data })
  },
  [LOAD_POSITION_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_POSITION_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_POSITION_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, positions: [...state.positions, action.data] })
  },
  [ADD_POSITION_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_POSITION_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_POSITION_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      positions: state.positions.map(position => position.id == action.payload.id ? action.payload : position)
    })
  },
  [EDIT_POSITION_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_POSITION_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_POSITION_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, positions: state.positions.filter(position => position.id != action.payload.id)  })
  },
  [DELETE_POSITION_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  positions: [],
  fetching: false,
  error: undefined
}

export default function positionReducer(state = initialState, action) {
  const handler = POSITION_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
