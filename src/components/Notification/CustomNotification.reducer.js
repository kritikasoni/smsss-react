// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const CANCEL_NOTIFICATION = 'CANCEL_NOTIFICATION'

// ------------------------------------
// Actions
// ------------------------------------
export function notify(message, title, type) {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      message: message,
      title: title,
      type: type || ''
    }
  }
}
export function cancelNotify() {
  return (dispatch) => {
    dispatch({
      type: CANCEL_NOTIFICATION
    })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const NOTIFICATION_ACTION_HANDLERS = {
  [SHOW_NOTIFICATION]: (state, action) => {
    return ({ ...state, show: true, message: action.payload.message, title: action.payload.title, type: action.payload.type })
  },
  [CANCEL_NOTIFICATION]: (state, action) => {
    return ({ ...state, show: false, message: '', title: '' })
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = { show: false, message: '',title:'', type: '' }

export function notificationReducer (state = initialState, action) {
  const handler = NOTIFICATION_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export const middleware = store => next => action => {
  const result = next(action)
  const listener = store.getState().notifications.listeningTo[action.type]
  if (listener) {
    store.dispatch({
      type: SHOW_NOTIFICATION,
      key: 'noti',
      trigger: action,
      showDismiss: listener.showDismiss,
      message: action.playload || listener.defaultMessage
    })
  }
  return result
}

export default notificationReducer;
