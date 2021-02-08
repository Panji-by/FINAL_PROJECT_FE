import {
    POST_ADMIN_PAYMENT_START,
    POST_ADMIN_PAYMENT_SUCCESS,
    POST_ADMIN_PAYMENT_FAIL
  } from "../actions/type-paymentSent";
import { POST_CREATE_CONTEST_FAIL } from "../actions/type-postCreateContest";
  
  const intialState = {
    dataJson: null,
    loading: false,
    error: null,
  };
  
  const postAdminPayment = (state = intialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case POST_ADMIN_PAYMENT_START:
        return {
          ...state,
          loading: true,
        };
      case POST_ADMIN_PAYMENT_SUCCESS:
        return {
          dataJson: payload,
          loading: false,
        };
      case POST_ADMIN_PAYMENT_FAIL:
        return {
          dataJson: null,
          loading: false,
          error: error,
        };
    }
  };
  
  export default postAdminPayment;