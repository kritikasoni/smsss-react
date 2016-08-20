import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_ROOM_REQUEST = 'LOAD_ROOM_REQUEST';
export const LOAD_ROOM_SUCCESS = 'LOAD_ROOM_SUCCESS';
export const LOAD_ROOM_FAILURE = 'LOAD_ROOM_FAILURE';
export const ADD_ROOM_REQUEST = 'ADD_ROOM_REQUEST';
export const ADD_ROOM_SUCCESS = 'ADD_ROOM_SUCCESS';
export const ADD_ROOM_FAILURE = 'ADD_ROOM_FAILURE';
export const EDIT_ROOM_REQUEST = 'EDIT_ROOM_REQUEST';
export const EDIT_ROOM_SUCCESS = 'EDIT_ROOM_SUCCESS';
export const EDIT_ROOM_FAILURE = 'EDIT_ROOM_FAILURE';
export const DELETE_ROOM_REQUEST = 'DELETE_ROOM_REQUEST';
export const DELETE_ROOM_SUCCESS = 'DELETE_ROOM_SUCCESS';
export const DELETE_ROOM_FAILURE = 'DELETE_ROOM_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function loadRoom() {
  return {
    types: [LOAD_ROOM_REQUEST, LOAD_ROOM_SUCCESS, LOAD_ROOM_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/rooms`),
    payload: {}
  }
}

export function addRoom(name) {
  return {
    types: [ADD_ROOM_REQUEST, ADD_ROOM_SUCCESS, ADD_ROOM_FAILURE],
    callAPI: () => Http.post(`${BackendUrl}/rooms`, {name}),
    payload: { name },
    successMessage: {
      show: true,
      message: 'Add new room success'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/rooms'
    }
  }
}

export function editRoom(id,name) {
  return {
    types: [EDIT_ROOM_REQUEST, EDIT_ROOM_SUCCESS, EDIT_ROOM_FAILURE],
    callAPI: () => Http.put(`${BackendUrl}/rooms/${id}`, {name}),
    payload: { id,name },
    successMessage: {
      show: true,
      message: 'Edit success!'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/rooms'
    }
  }
}

export function deleteRoom(id) {
  return {
    types: [DELETE_ROOM_REQUEST, DELETE_ROOM_SUCCESS, DELETE_ROOM_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/rooms/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Room is deleted'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/rooms'
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ROOM_ACTION_HANDLERS = {
  [LOAD_ROOM_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_ROOM_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, rooms: action.data })
  },
  [LOAD_ROOM_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_ROOM_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_ROOM_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, rooms: [...state.rooms, action.data] })
  },
  [ADD_ROOM_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_ROOM_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_ROOM_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      rooms: state.rooms.map(room => room.id == action.payload.id ? action.payload : room)
    })
  },
  [EDIT_ROOM_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_ROOM_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_ROOM_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, rooms: state.rooms.filter(room => room.id != action.payload.id)  })
  },
  [DELETE_ROOM_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  rooms: [],
  fetching: false,
  error: undefined
}

export default function roomReducer(state = initialState, action) {
  const handler = ROOM_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
