import {
  GET_ADMIN_CONFIRMATION_START,
  GET_ADMIN_CONFIRMATION_SUCCESS,
  GET_ADMIN_CONFIRMATION_FAIL
} from "../actions/type-adminConfirmation";
  
  const intialState = {
    dataJson: [],
    loading: false,
    error: null,
  };
  
  const getPaymentConfirmation = (state = intialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_ADMIN_CONFIRMATION_START:
        return {
          ...state,
          loading: true,
        };
      case GET_ADMIN_CONFIRMATION_SUCCESS:
        return {
          dataJson: payload,
          loading: false,
        };
      case GET_ADMIN_CONFIRMATION_FAIL:
        return {
          dataJson: [],
          loading: false,
          error: error,
        };
    }
  };
  
  export default getPaymentConfirmation;
  