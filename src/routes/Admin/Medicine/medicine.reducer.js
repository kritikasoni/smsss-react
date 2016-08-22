import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_MEDICINE_REQUEST = 'LOAD_MEDICINE_REQUEST';
export const LOAD_MEDICINE_SUCCESS = 'LOAD_MEDICINE_SUCCESS';
export const LOAD_MEDICINE_FAILURE = 'LOAD_MEDICINE_FAILURE';
export const ADD_MEDICINE_REQUEST = 'ADD_MEDICINE_REQUEST';
export const ADD_MEDICINE_SUCCESS = 'ADD_MEDICINE_SUCCESS';
export const ADD_MEDICINE_FAILURE = 'ADD_MEDICINE_FAILURE';
export const EDIT_MEDICINE_REQUEST = 'EDIT_MEDICINE_REQUEST';
export const EDIT_MEDICINE_SUCCESS = 'EDIT_MEDICINE_SUCCESS';
export const EDIT_MEDICINE_FAILURE = 'EDIT_MEDICINE_FAILURE';
export const DELETE_MEDICINE_REQUEST = 'DELETE_MEDICINE_REQUEST';
export const DELETE_MEDICINE_SUCCESS = 'DELETE_MEDICINE_SUCCESS';
export const DELETE_MEDICINE_FAILURE = 'DELETE_MEDICINE_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function loadMedicine() {
  return {
    types: [LOAD_MEDICINE_REQUEST, LOAD_MEDICINE_SUCCESS, LOAD_MEDICINE_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/medicines`),
    payload: {}
  }
}

export function addMedicine(medicine) {
  return {
    types: [ADD_MEDICINE_REQUEST, ADD_MEDICINE_SUCCESS, ADD_MEDICINE_FAILURE],
    callAPI: () => {
      const formData = new FormData();
      formData.append('image', medicine.image)
      return Http.post(`${BackendUrl}/medicines/image/upload`,formData)
        .then(({data}) => {
          return data.url;
        })
        .then(imageUrl => {
          medicine.image = imageUrl;
          return Http.post(`${BackendUrl}/medicines`, medicine)
        })
    },
    payload: medicine,
    successMessage: {
      show: true,
      message: 'Add new medicine success'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/medicines'
    }
  }
}

export function editMedicine(id,medicine) {
  return {
    types: [EDIT_MEDICINE_REQUEST, EDIT_MEDICINE_SUCCESS, EDIT_MEDICINE_FAILURE],
    callAPI: () => {
      if(medicine.image.preview){
        const formData = new FormData();
        formData.append('image', medicine.image)
        return Http.post(`${BackendUrl}/medicines/image/upload`,formData)
          .then(({data}) => {
            return data.url;
          })
          .then(imageUrl => {
            medicine.image = imageUrl;
            return Http.put(`${BackendUrl}/medicines/${id}`, medicine);
          })
      }
      else {
        delete medicine.image;
        return Http.put(`${BackendUrl}/medicines/${id}`, medicine);
      }
    },
    payload: { id, medicine },
    successMessage: {
      show: true,
      message: 'Edit success!'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/medicines'
    }
  }
}

export function deleteMedicine(id) {
  return {
    types: [DELETE_MEDICINE_REQUEST, DELETE_MEDICINE_SUCCESS, DELETE_MEDICINE_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/medicines/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Medicine is deleted'
    },
    redirectAfterSuccess: {
      redirect: true,
      url: '/admin/medicines'
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const MEDICINE_ACTION_HANDLERS = {
  [LOAD_MEDICINE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_MEDICINE_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, medicines: action.data })
  },
  [LOAD_MEDICINE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_MEDICINE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_MEDICINE_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, medicines: [...state.medicines, action.data] })
  },
  [ADD_MEDICINE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_MEDICINE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_MEDICINE_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      medicines: state.medicines.map(medicine => medicine.id == action.payload.id ? action.payload : medicine)
    })
  },
  [EDIT_MEDICINE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_MEDICINE_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_MEDICINE_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, medicines: state.medicines.filter(medicine => medicine.id != action.payload.id)  })
  },
  [DELETE_MEDICINE_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  medicines: [],
  fetching: false,
  error: undefined
}

export default function medicineReducer(state = initialState, action) {
  const handler = MEDICINE_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
