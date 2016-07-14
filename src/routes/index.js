// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  getChildRoutes (location, next) {
    require.ensure([], (require) => {
      next(null, [
        // Provide store for async reducers and middleware
        require('./Counter').default(store),
        require('./Admin/Patient/ListPatient').default(store),
        require('./Admin/Patient/AddPatient').default(store),
        require('./Admin/Patient/EditPatient').default(store),
        require('./Admin/Doctor/ListDoctor').default(store),
        require('./Admin/Doctor/AddDoctor').default(store),
        require('./Admin/Doctor/EditDoctor').default(store),
        require('./Admin/Nurse/ListNurse').default(store),
        require('./Admin/Nurse/AddNurse').default(store),
        require('./Admin/Nurse/EditNurse').default(store),
        require('./Admin/Medicine/ListMedicine').default(store),
        require('./Admin/Medicine/AddMedicine').default(store),
        require('./Admin/Medicine/EditMedicine').default(store),
        require('./Doctor/Symptom/AddSymptom').default(store),
        require('./Doctor/Symptom/EditSymptom').default(store),
        require('./Doctor/Symptom/ListSymptom').default(store),
        require('./Doctor/Appointment/AddAppointment').default(store),
        require('./Doctor/Appointment/EditAppointment').default(store),
        require('./Doctor/Appointment/ListAppointment').default(store),
        require('./NotFound').default
      ])
    })
  }
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
