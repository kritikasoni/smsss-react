import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/rooms/:id/edit',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const EditRoom = require('./EditRoom.component').default
      const reducer = require('./EditRoom.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'editRoom', reducer })

      /*  Return getComponent   */
      cb(null, EditRoom)

      /* Webpack named bundle   */
    }, 'editRoom')
  }
})
