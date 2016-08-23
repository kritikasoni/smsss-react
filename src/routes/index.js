// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'


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
        require('./Admin/Patient/ListPatient').default(store),
        require('./Admin/Patient/AddPatient').default(store),
        require('./Admin/Patient/DetailPatient').default(store),
        require('./Admin/Patient/EditPatient').default(store),
        require('./Admin/Doctor/ListDoctor').default(store),
        require('./Admin/Doctor/AddDoctor').default(store),
        require('./Admin/Doctor/EditDoctor').default(store),
        require('./Admin/Doctor/DetailDoctor').default(store),
        require('./Admin/Nurse/ListNurse').default(store),
        require('./Admin/Nurse/AddNurse').default(store),
        require('./Admin/Nurse/EditNurse').default(store),
        require('./Admin/Nurse/DetailNurse').default(store),
        require('./Admin/Medicine/ListMedicine').default(store),
        require('./Admin/Medicine/AddMedicine').default(store),
        require('./Admin/Medicine/EditMedicine').default(store),
        require('./Admin/Medicine/DetailMedicine').default(store),
        require('./Doctor/Prescription/AddPrescription').default(store),
        require('./Doctor/Prescription/EditPrescription').default(store),
        require('./Doctor/Prescription/ListPrescription').default(store),
        require('./Nurse/Queue/AddQueue').default(store),
        require('./Nurse/Queue/EditQueue').default(store),
        require('./Nurse/Queue/ListQueue').default(store),
        require('./Nurse/Queue/ManageQueue').default(store),
        require('./Admin/Room/AddRoom').default(store),
        require('./Admin/Room/ListRoom').default(store),
        require('./Admin/Department/AddDepartment').default(store),
        require('./Admin/Department/EditDepartment').default(store),
        require('./Admin/Department/ListDepartment').default(store),
        require('./Admin/Position/AddPosition').default(store),
        require('./Admin/Position/ListPosition').default(store),
        require('./Authentication/Login').default(store),
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
