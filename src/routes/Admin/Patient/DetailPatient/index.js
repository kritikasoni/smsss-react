import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/patients/:id/detail',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const DetailPatient = require('./DetailPatient.component').default
      const reducer = require('./DetailPatient.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'detailPatient', reducer })

      /*  Return getComponent   */
      cb(null, DetailPatient)

      /* Webpack named bundle   */
    }, 'detailPatient')
  }
})

