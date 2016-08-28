import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify,cancelNotify } from 'components/Notification/CustomNotification.reducer';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_PRESCRIPTION_REQUEST = 'LOAD_PRESCRIPTION_REQUEST';
export const LOAD_PRESCRIPTION_SUCCESS = 'LOAD_PRESCRIPTION_SUCCESS';
export const LOAD_PRESCRIPTION_FAILURE = 'LOAD_PRESCRIPTION_FAILURE';
export const LOAD_MED_PRESCRIPTION_REQUEST = 'LOAD_MED_PRESCRIPTION_REQUEST';
export const LOAD_MED_PRESCRIPTION_SUCCESS = 'LOAD_MED_PRESCRIPTION_SUCCESS';
export const LOAD_MED_PRESCRIPTION_FAILURE = 'LOAD_MED_PRESCRIPTION_FAILURE';
export const ADD_PRESCRIPTION_REQUEST = 'ADD_PRESCRIPTION_REQUEST';
export const ADD_PRESCRIPTION_SUCCESS = 'ADD_PRESCRIPTION_SUCCESS';
export const ADD_PRESCRIPTION_FAILURE = 'ADD_PRESCRIPTION_FAILURE';
export const EDIT_PRESCRIPTION_REQUEST = 'EDIT_PRESCRIPTION_REQUEST';
export const EDIT_PRESCRIPTION_SUCCESS = 'EDIT_PRESCRIPTION_SUCCESS';
export const EDIT_PRESCRIPTION_FAILURE = 'EDIT_PRESCRIPTION_FAILURE';
export const DELETE_PRESCRIPTION_REQUEST = 'DELETE_PRESCRIPTION_REQUEST';
export const DELETE_PRESCRIPTION_SUCCESS = 'DELETE_PRESCRIPTION_SUCCESS';
export const DELETE_PRESCRIPTION_FAILURE = 'DELETE_PRESCRIPTION_FAILURE';

export const SELECT_PRESCRIPTION = 'SELECT_PRESCRIPTION';
// ------------------------------------
// Actions
// ------------------------------------
export function loadPrescription() {
  return {
    types: [LOAD_PRESCRIPTION_REQUEST, LOAD_PRESCRIPTION_SUCCESS, LOAD_PRESCRIPTION_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/prescriptions`),
    payload: {}
  }
}
export function loadMedicinePrescription(id) {
  return {
    types: [LOAD_MED_PRESCRIPTION_REQUEST, LOAD_MED_PRESCRIPTION_SUCCESS, LOAD_MED_PRESCRIPTION_FAILURE],
    callAPI: () => Http.get(`${BackendUrl}/medicinePrescriptions/prescription/${id}`),
    payload: { id }
  }
}

export function addPrescription(prescription, medicinePrescriptions) {
  return {
    types: [ADD_PRESCRIPTION_REQUEST, ADD_PRESCRIPTION_SUCCESS, ADD_PRESCRIPTION_FAILURE],
    callAPI: () => Http
      .post(`${BackendUrl}/prescriptions`, prescription)
      .then(({data}) => {
        prescription = data;
        medicinePrescriptions = medicinePrescriptions.map(medPres => ({...medPres, prescription: prescription.id}));
        return Http.post(`${BackendUrl}/medicinePrescriptions`, medicinePrescriptions);
      })
      .then(() => Http.get(`${BackendUrl}/prescriptions/${prescription.id}`))

    ,
    payload: prescription,
    successMessage: {
      show: true,
      message: 'Add new prescription success'
    }
  }
}

export function editPrescription(id,prescription) {
  return {
    types: [EDIT_PRESCRIPTION_REQUEST, EDIT_PRESCRIPTION_SUCCESS, EDIT_PRESCRIPTION_FAILURE],
    callAPI: () => {
      const medPresToAdd = prescription.filter(medPres => !medPres.id);
      const medPresToUpdate = prescription.filter(medPres => medPres.id);
      return Http
        .post(`${BackendUrl}/medicinePrescriptions`, medPresToAdd)
        .then(() => {
          const promises = medPresToUpdate
            .map(medPres => Http.put(`${BackendUrl}/medicinePrescriptions/${medPres.id}`, medPres));
          return Promise.all(promises);
        });
    },
    payload: { id, prescription },
    successMessage: {
      show: true,
      message: 'Edit success!'
    }
  }
}

export function deletePrescription(id) {
  return {
    types: [DELETE_PRESCRIPTION_REQUEST, DELETE_PRESCRIPTION_SUCCESS, DELETE_PRESCRIPTION_FAILURE],
    callAPI: () => Http.delete(`${BackendUrl}/prescriptions/${id}`),
    payload: { id },
    successMessage: {
      show: true,
      message: 'Prescription is deleted'
    }
  }
}

export function selectPrescription(id) {
  return {
    type: SELECT_PRESCRIPTION,
    payload: { id }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const PRESCRIPTION_ACTION_HANDLERS = {
  [LOAD_PRESCRIPTION_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_PRESCRIPTION_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, prescriptions: action.data })
  },
  [LOAD_PRESCRIPTION_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [LOAD_MED_PRESCRIPTION_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [LOAD_MED_PRESCRIPTION_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, selectedPrescription: {...state.selectedPrescription, medicinePrescription: action.data} })
  },
  [LOAD_MED_PRESCRIPTION_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [ADD_PRESCRIPTION_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [ADD_PRESCRIPTION_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, prescriptions: [...state.prescriptions, action.data] })
  },
  [ADD_PRESCRIPTION_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [EDIT_PRESCRIPTION_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [EDIT_PRESCRIPTION_SUCCESS]: (state, action) => {
    return ({
      ...state,
      fetching: false
    })
  },
  [EDIT_PRESCRIPTION_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [DELETE_PRESCRIPTION_REQUEST]: (state) => {
    return ({ ...state, fetching: true })
  },
  [DELETE_PRESCRIPTION_SUCCESS]: (state, action) => {
    return ({ ...state, fetching: false, prescriptions: state.prescriptions.filter(prescription => prescription.id != action.payload.id)  })
  },
  [DELETE_PRESCRIPTION_FAILURE]: (state, action) => {
    return ({ ...state, fetching: false, error: action.error})
  },
  [SELECT_PRESCRIPTION] : (state, action) => {
    return ({ ...state, selectedPrescription: {...state.prescriptions.filter(prescription => prescription.id == action.payload.id).pop()}})
  },
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  prescriptions: [],
  fetching: false,
  error: undefined,
  selectedPrescription: {
    medicinePrescription: []
  }
}

export default function prescriptionReducer(state = initialState, action) {
  const handler = PRESCRIPTION_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
