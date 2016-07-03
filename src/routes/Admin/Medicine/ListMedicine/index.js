import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'admin/medicines',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ListMedicine = require('./ListMedicine.component').default
      const reducer = require('./ListMedicine.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'listMedicines', reducer })

      /*  Return getComponent   */
      cb(null, ListMedicine)

      /* Webpack named bundle   */
    }, 'listMedicines')
  }
})

