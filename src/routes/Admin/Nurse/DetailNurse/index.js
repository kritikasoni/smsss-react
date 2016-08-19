import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/nurses/:id/detail',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const DetailNurse = require('./DetailNurse.component').default
      // const reducer = null;

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'detailNurse', reducer })

      /*  Return getComponent   */
      cb(null, DetailNurse)

      /* Webpack named bundle   */
    }, 'detailNurse')
  }
})

