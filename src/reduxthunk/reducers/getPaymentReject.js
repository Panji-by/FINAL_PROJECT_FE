import {
    GET_PAYMENT_REJECT_BEGIN,
    GET_PAYMENT_REJECT_SUCCESS,
    GET_PAYMENT_REJECT_FAIL,
  } from "../actions/type-PaymentReject";
  
    const initialState = {
      dataJson: null,
      loading: false,
      error: null
    };
    
    const getPaymentReject = (state = initialState, action) => {
      const { type, payload, error } = action;
      switch (type) {
        default:
          return {
            ...state,
          };
        case GET_PAYMENT_REJECT_BEGIN:
          return {
            ...state,
            loading: true,
          };
        case GET_PAYMENT_REJECT_SUCCESS:
          return {
            dataJson: payload,
            loading: false,
          };
        case GET_PAYMENT_REJECT_FAIL:
          return {
            dataJson: null,
            loading: false,
            error: error,
          };
      }
    };
    
    export default getPaymentReject;
    