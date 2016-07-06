import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/doctors/:id/edit',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const EditDoctor = require('./EditDoctor.component').default
      const reducer = require('./EditDoctor.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'editDoctor', reducer })

      /*  Return getComponent   */
      cb(null, EditDoctor)

      /* Webpack named bundle   */
    }, 'editDoctor')
  }
})