import Http from 'helper/Http';
import { BackendUrl } from 'Config';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_QUEUE_REQUEST = 'REQUEST_QUEUE'
export const LOAD_QUEUE_SUCCESS = 'RECEIVE_QUEUE'
export const LOAD_QUEUE_FAILURE = 'LOAD_QUEUE_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function loadQueue() {
  return (dispatch) => dispatch({
    types: [LOAD_QUEUE_REQUEST, LOAD_QUEUE_SUCCESS, LOAD_QUEUE_FAILURE],
    shouldCallAPI: (state) => !state.queues,
    callAPI: () => Http.get(`${BackendUrl}/roles`),
    payload: {}
  })
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const QUEUE_ACTION_HANDLERS = {
  [LOAD_QUEUE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_QUEUE_SUCCESS]: (state, action) => {
    return ({ ...state, queues: action.payload, fetching: false })
  },
  [LOAD_QUEUE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = { fetching: false, queues: [], error: undefined}
export default function queueReducer (state = initialState, action) {
  const handler = QUEUE_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
