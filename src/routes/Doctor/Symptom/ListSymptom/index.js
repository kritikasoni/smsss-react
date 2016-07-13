import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'doctor/symptoms/list/patient/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ListSymptom = require('./ListSymptom.component').default
      const reducer = require('./ListSymptom.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'listSymptoms', reducer })

      /*  Return getComponent   */
      cb(null, ListSymptom)

      /* Webpack named bundle   */
    }, 'listSymptoms')
  }
})
