import { injectReducer } from '../../../../store/reducers'

export default (store) => ({

  path: 'doctor/appointments/add/patient/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const AddAppointment = require('./AddAppointment.component').default
      const reducer = require('./AddAppointment.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'addAppointments', reducer })

      /*  Return getComponent   */
      cb(null, AddAppointment)

      /* Webpack named bundle   */
    }, 'addAppointments')
  }
})
