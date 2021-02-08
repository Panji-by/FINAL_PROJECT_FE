import {
  POST_PROVIDER_PAYMENT_BEGIN,
  POST_PROVIDER_PAYMENT_SUCCESS,
  POST_PROVIDER_PAYMENT_FAILED
  } from '../types';
  
  const initialState = {
    dataJson: null,
    loading: false,
    error: null
  };
  
  const postPaymentSubmission = (state = initialState, action) => {
    console.log(action, 'ACTION');
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case POST_PROVIDER_PAYMENT_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case POST_PROVIDER_PAYMENT_SUCCESS:
        return {
          dataJson: payload,
          loading: false,
        };
      case POST_PROVIDER_PAYMENT_FAILED:
        return {
          dataJson: null,
          loading: false,
          error: error,
        };
    }
  };
  
  export default postPaymentSubmission;
  