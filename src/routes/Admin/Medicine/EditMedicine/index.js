import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/medicines/:id/edit',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const EditMedicine = require('./EditMedicine.component').default
      const reducer = require('./EditMedicine.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'editMedicine', reducer })

      /*  Return getComponent   */
      cb(null, EditMedicine)

      /* Webpack named bundle   */
    }, 'editMedicine')
  }
})
