import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'doctor/appointments/list/patient/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ListAppointment = require('./ListAppointment.component').default
      const reducer = require('./ListAppointment.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'listAppointments', reducer })

      /*  Return getComponent   */
      cb(null, ListAppointment)

      /* Webpack named bundle   */
    }, 'listAppointments')
  }
})
