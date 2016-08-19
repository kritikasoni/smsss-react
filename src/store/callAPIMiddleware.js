import {notify} from './../components/Notification/CustomNotification.reducer';
function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
      successMessage = {
        show: false,
        message: ''
      }
    } = action

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [ requestType, successType, failureType ] = types

    dispatch(Object.assign({}, payload, {
      type: requestType
    }))

    return callAPI()
      .then(({data}) => {
        dispatch(Object.assign({}, {
          payload,
          data : data,
          type: successType
        }));
        if(successMessage.show){
          dispatch(notify(successMessage.message,'Success!'));
        }
      })
      .catch(error => {
        dispatch(Object.assign({},{
          payload,
          error,
          type: failureType
        }))
        // if there are error messages, then compact to array
        if(error.data.Errors) {
          let errorMessages = [];
          for (let errorProperty in error.data.Errors) {
            //if it's really error property
            if (error.data.Errors.hasOwnProperty(errorProperty)) {
              // if array, then iterate
              if(Array.isArray(error.data.Errors[errorProperty])){
                error.data.Errors[errorProperty].forEach(e => {
                  errorMessages.push(e.message);
                });
              }
              else errorMessages.push(error.data.Errors[errorProperty]);
            }
          }
          dispatch(notify(errorMessages.join('\n'),'Error'));
        }
      })
  }
}

export default callAPIMiddleware;
