import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  
  path: 'doctor/symptoms/add/patient/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const AddSymptom = require('./AddSymptom.component').default
      const reducer = require('./AddSymptom.reducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'addSymptoms', reducer })

      /*  Return getComponent   */
      cb(null, AddSymptom)

      /* Webpack named bundle   */
    }, 'addSymptoms')
  }
})
