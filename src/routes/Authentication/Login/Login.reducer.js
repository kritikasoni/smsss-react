import Http from 'helper/Http';
import { BackendUrl } from 'Config';
const store = require('store');
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
// ------------------------------------
// Actions
// ------------------------------------
export function onSubmit(email, password) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {}
    });
    Http
      .post(`${BackendUrl}/authentication`,{email:email,password:password})
      .then( ({ data }) => {
        store.set('token', data.token);
        store.set('user', data.user);
        dispatch(cancelNotify())
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: data
        });
      })
      .catch(({data}) => {
        dispatch(notify(data.message,'Login failed'));
        return dispatch({
          type: LOGIN_FAILURE,
          error: data
        })
      })
  }
}

export function logout() {
  return (dispatch) => {
    store.remove('user');
    store.remove('token');
    dispatch({
      type: LOGOUT
    });
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const LOGIN_ACTION_HANDLERS = {
  [LOGIN_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOGIN_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, token: action.payload.token, user: action.payload.user, isLoggedIn: true })
  },
  [LOGIN_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [LOGOUT]: (state, action) => {
    return ({ ...state, user: undefined, token: undefined, isLoggedIn: false })
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  fetching: false,
  token: (store.get('token') || ''),
  user: (store.get('user') || {}),
  error: undefined,
  isLoggedIn: (store.get('token') ? true : false)
}

export default function loginReducer (state = initialState, action) {
  const handler = LOGIN_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
