import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import loginReducer from './../routes/Authentication/Login/Login.reducer';
import notiReducer from './../components/Notification/CustomNotification.reducer';
import departmentReducer from './../routes/Admin/Department';
import doctorReducer from './../routes/Admin/Doctor';
import nurseReducer from './../routes/Admin/Nurse';
import positionReducer from './../routes/Admin/Position';
import roomReducer from './../routes/Admin/Room';
import patientReducer from './../routes/Admin/Patient';
import medicineReducer from './../routes/Admin/Medicine';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router,
    auth: loginReducer,
    noti: notiReducer,
    departments: departmentReducer,
    doctors: doctorReducer,
    nurses: nurseReducer,
    positions: positionReducer,
    rooms: roomReducer,
    patients: patientReducer,
    medicines: medicineReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
