import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/departments/add',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const AddDepartment = require('./AddDepartment.component').default
      const reducer = require('./AddDepartment.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'addDepartments', reducer })

      /*  Return getComponent   */
      cb(null, AddDepartment)

      /* Webpack named bundle   */
    }, 'addDepartments')
  }
})
