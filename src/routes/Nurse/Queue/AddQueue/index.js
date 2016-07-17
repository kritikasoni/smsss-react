import { injectReducer } from '../../../../store/reducers'

export default (store) => ({

  path: 'nurse/queues/add/patient/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const AddQueue = require('./AddQueue.component').default
      const reducer = require('./AddQueue.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'addQueues', reducer })

      /*  Return getComponent   */
      cb(null, AddQueue)

      /* Webpack named bundle   */
    }, 'addQueues')
  }
})
