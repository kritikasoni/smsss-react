import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DEPARTMENT_REQUEST = 'LOAD_DEPARTMENT_REQUEST';
export const LOAD_DEPARTMENT_SUCCESS = 'LOAD_DEPARTMENT_SUCCESS';
export const LOAD_DEPARTMENT_FAILURE = 'LOAD_DEPARTMENT_FAILURE';
export const ADD_DEPARTMENT_REQUEST = 'ADD_DEPARTMENT_REQUEST';
export const ADD_DEPARTMENT_SUCCESS = 'ADD_DEPARTMENT_SUCCESS';
export const ADD_DEPARTMENT_FAILURE = 'ADD_DEPARTMENT_FAILURE';
export const EDIT_DEPARTMENT_REQUEST = 'EDIT_DEPARTMENT_REQUEST';
export const EDIT_DEPARTMENT_SUCCESS = 'EDIT_DEPARTMENT_SUCCESS';
export const EDIT_DEPARTMENT_FAILURE = 'EDIT_DEPARTMENT_FAILURE';
export const DELETE_DEPARTMENT_REQUEST = 'DELETE_DEPARTMENT_REQUEST';
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS';
export const DELETE_DEPARTMENT_FAILURE = 'DELETE_DEPARTMENT_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function loadDepartment() {
  return {
    types: [LOAD_DEPARTMENT_REQUEST, LOAD_DEPARTMENT_SUCCESS, LOAD_DEPARTMENT_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/departments`),
    payload: {}
  }
}

export function addDepartment(name) {
  return {
    types: [ADD_DEPARTMENT_REQUEST, ADD_DEPARTMENT_SUCCESS, ADD_DEPARTMENT_FAILURE],
    callAPI: () => Http.post(`${BackendUrl}/departments`, {name}),
    payload: { name },
    successMessage: {
      show: true,
      message: 'Add new department success'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/departments'
    }
  }
}

export function editDepartment(id,name) {
  return {
    types: [EDIT_DEPARTMENT_REQUEST, EDIT_DEPARTMENT_SUCCESS, EDIT_DEPARTMENT_FAILURE],
    callAPI: () => Http.put(`${BackendUrl}/departments/${id}`, {name}),
    payload: { id,name },
    successMessage: {
      show: true,
      message: 'Edit success!'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/departments'
    }
  }
}

export function deleteDepartment(id) {
  return {
    types: [DELETE_DEPARTMENT_REQUEST, DELETE_DEPARTMENT_SUCCESS, DELETE_DEPARTMENT_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/departments/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Department is deleted'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/departments'
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const DEPARTMENT_ACTION_HANDLERS = {
  [LOAD_DEPARTMENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_DEPARTMENT_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, departments: action.data })
  },
  [LOAD_DEPARTMENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_DEPARTMENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_DEPARTMENT_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, departments: [...state.departments, action.data] })
  },
  [ADD_DEPARTMENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_DEPARTMENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_DEPARTMENT_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      departments: state.departments.map(department => department.id == action.payload.id ? action.payload : department)
    })
  },
  [EDIT_DEPARTMENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_DEPARTMENT_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_DEPARTMENT_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, departments: state.departments.filter(department => department.id != action.payload.id)  })
  },
  [DELETE_DEPARTMENT_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  departments: [],
  fetching: false,
  error: undefined
}

export default function departmentReducer(state = initialState, action) {
  const handler = DEPARTMENT_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
