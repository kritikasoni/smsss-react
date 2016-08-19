import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/departments/:id/edit',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const EditDepartment = require('./EditDepartment.component').default
      // const reducer = null

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'editDepartment', reducer })

      /*  Return getComponent   */
      cb(null, EditDepartment)

      /* Webpack named bundle   */
    }, 'editDepartment')
  }
})
