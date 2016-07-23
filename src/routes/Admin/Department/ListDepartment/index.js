import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/departments',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ListDepartment = require('./ListDepartment.component').default
      const reducer = require('./ListDepartment.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'listDepartments', reducer })

      /*  Return getComponent   */
      cb(null, ListDepartment)

      /* Webpack named bundle   */
    }, 'listDepartments')
  }
})
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/departments',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ListDepartment = require('./ListDepartment.component').default
      const reducer = require('./ListDepartment.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'listDepartments', reducer })

      /*  Return getComponent   */
      cb(null, ListDepartment)

      /* Webpack named bundle   */
    }, 'listDepartments')
  }
})
