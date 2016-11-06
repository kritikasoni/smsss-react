import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_QUEUE_REQUEST = 'LOAD_QUEUE_REQUEST';
export const LOAD_QUEUE_SUCCESS = 'LOAD_QUEUE_SUCCESS';
export const LOAD_QUEUE_FAILURE = 'LOAD_QUEUE_FAILURE';
export const ADD_QUEUE_REQUEST = 'ADD_QUEUE_REQUEST';
export const ADD_QUEUE_SUCCESS = 'ADD_QUEUE_SUCCESS';
export const ADD_QUEUE_FAILURE = 'ADD_QUEUE_FAILURE';
export const EDIT_QUEUE_REQUEST = 'EDIT_QUEUE_REQUEST';
export const EDIT_QUEUE_SUCCESS = 'EDIT_QUEUE_SUCCESS';
export const EDIT_QUEUE_FAILURE = 'EDIT_QUEUE_FAILURE';
export const DELETE_QUEUE_REQUEST = 'DELETE_QUEUE_REQUEST';
export const DELETE_QUEUE_SUCCESS = 'DELETE_QUEUE_SUCCESS';
export const DELETE_QUEUE_FAILURE = 'DELETE_QUEUE_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function loadQueue() {
  return {
    types: [LOAD_QUEUE_REQUEST, LOAD_QUEUE_SUCCESS, LOAD_QUEUE_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/queues`),
    payload: {}
  }
}

export function addQueue(queue) {
  return {
    types: [ADD_QUEUE_REQUEST, ADD_QUEUE_SUCCESS, ADD_QUEUE_FAILURE],
    callAPI: () => Http.post(`${BackendUrl}/queues`, queue),
    payload: queue ,
    successMessage: {
      show: true,
      message: 'Add new queue success'
    }
  }
}

export function editQueue(id,queue) {
  return {
    types: [EDIT_QUEUE_REQUEST, EDIT_QUEUE_SUCCESS, EDIT_QUEUE_FAILURE],
    callAPI: () => Http.put(`${BackendUrl}/queues/${id}`, queue),
    payload: { id,name },
    successMessage: {
      show: true,
      message: 'Edit success!'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: `/nurse/queues/room/${queue.room.id}`
    }
  }
}

export function deleteQueue(id) {
  return {
    types: [DELETE_QUEUE_REQUEST, DELETE_QUEUE_SUCCESS, DELETE_QUEUE_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/queues/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Queue is deleted'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/queues'
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const QUEUE_ACTION_HANDLERS = {
  [LOAD_QUEUE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_QUEUE_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, queues: action.data })
  },
  [LOAD_QUEUE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_QUEUE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_QUEUE_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, queues: [...state.queues, action.data] })
  },
  [ADD_QUEUE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_QUEUE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_QUEUE_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      queues: state.queues.map(queue => queue.id == action.payload.id ? action.payload : queue)
    })
  },
  [EDIT_QUEUE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_QUEUE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_QUEUE_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, queues: state.queues.filter(queue => queue.id != action.payload.id)  })
  },
  [DELETE_QUEUE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  queues: [],
  fetching: false,
  error: undefined
}

export default function queueReducer(state = initialState, action) {
  const handler = QUEUE_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
