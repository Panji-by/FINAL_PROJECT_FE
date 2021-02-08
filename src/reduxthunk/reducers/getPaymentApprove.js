import {
    GET_PAYMENT_APPROVE_BEGIN,
    GET_PAYMENT_APPROVE_SUCCESS,
    GET_PAYMENT_APPROVE_FAIL,
  } from "../actions/type-paymentApprove";
  
    const initialState = {
      dataJson: null,
      loading: false,
      error: null
    };
    
    const getPaymentApprove = (state = initialState, action) => {
      const { type, payload, error } = action;
      switch (type) {
        default:
          return {
            ...state,
          };
        case GET_PAYMENT_APPROVE_BEGIN:
          return {
            ...state,
            loading: true,
          };
        case GET_PAYMENT_APPROVE_SUCCESS:
          return {
            dataJson: payload,
            loading: false,
          };
        case GET_PAYMENT_APPROVE_FAIL:
          return {
            dataJson: null,
            loading: false,
            error: error,
          };
      }
    };
    
    export default getPaymentApprove;
    