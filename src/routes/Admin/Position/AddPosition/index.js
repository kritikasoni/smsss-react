import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/positions/add',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const AddPosition = require('./AddPosition.component').default
      const reducer = require('./AddPosition.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'addPositions', reducer })

      /*  Return getComponent   */
      cb(null, AddPosition)

      /* Webpack named bundle   */
    }, 'addPositions')
  }
})