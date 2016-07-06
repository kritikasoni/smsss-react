import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/nurses',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ListNurse = require('./ListNurse.component').default
      const reducer = require('./ListNurse.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'listNurses', reducer })

      /*  Return getComponent   */
      cb(null, ListNurse)

      /* Webpack named bundle   */
    }, 'listNurses')
  }
})
