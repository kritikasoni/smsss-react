import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'doctor/prescriptions/list/patient/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ListPrescription = require('./ListPrescription.component').default
      const reducer = require('./ListPrescription.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'listPrescriptions', reducer })

      /*  Return getComponent   */
      cb(null, ListPrescription)

      /* Webpack named bundle   */
    }, 'listPrescriptions')
  }
})
