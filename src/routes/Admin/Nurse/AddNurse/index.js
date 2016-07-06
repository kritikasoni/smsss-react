import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/nurses/add',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Addnurse = require('./Addnurse.component').default
      const reducer = require('./Addnurse.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'addnurses', reducer })

      /*  Return getComponent   */
      cb(null, Addnurse)

      /* Webpack named bundle   */
    }, 'addnurses')
  }
})
