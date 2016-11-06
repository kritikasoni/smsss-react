import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'nurse/queues/list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ListQueue = require('./ListQueue.component').default
      // const reducer = require('./ListQueue.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'queues', reducer })

      /*  Return getComponent   */
      cb(null, ListQueue)

      /* Webpack named bundle   */
    }, 'listQueues')
  }
})
