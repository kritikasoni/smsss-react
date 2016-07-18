import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/rooms/add',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const AddRoom = require('./AddRoom.component').default
      const reducer = require('./AddRoom.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'addRooms', reducer })

      /*  Return getComponent   */
      cb(null, AddRoom)

      /* Webpack named bundle   */
    }, 'addRooms')
  }
})
