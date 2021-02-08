import {
    GET_PAYMENT_REJECT_BEGIN,
    GET_PAYMENT_REJECT_SUCCESS,
    GET_PAYMENT_REJECT_FAIL,
  
  } from "./type-PaymentReject";
  import axios from "axios";
  
  export const getPaymentReject = (id) => async (dispatch) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: GET_PAYMENT_REJECT_BEGIN,
      loading: true,
      error: null,
    });
    try {
      const res = await axios.get(`https://realizdea.kuyrek.com/payment/reject/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      console.log(res);
      dispatch({
        type: GET_PAYMENT_REJECT_SUCCESS,
        loading: false,
        payload: res.data,
        error: null,
      });
    } catch (error) {
      dispatch({
        type: GET_PAYMENT_REJECT_FAIL,
        error: error.response,
      });
      console.log(error);
    }
  };
  