import {
  GET_PAYMENT_STATUS_SUCCESS,
  GET_PAYMENT_STATUS_FAILED,
  GET_PAYMENT_STATUS_BEGIN
  } from '../types';
  
  const initialState = {
    dataJson: null,
    loading: false,
    error: null
  };
  
  const getPaymentStatus = (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_PAYMENT_STATUS_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_PAYMENT_STATUS_SUCCESS:
        return {
          dataJson: payload,
          loading: false
        };
      case GET_PAYMENT_STATUS_FAILED:
        return {
          dataJson: null,
          loading: false,
          error: error
        };
    }
  };
  
  export default getPaymentStatus;
  