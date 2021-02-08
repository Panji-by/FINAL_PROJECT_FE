import {
    GET_PAYMENT_APPROVE_BEGIN,
    GET_PAYMENT_APPROVE_SUCCESS,
    GET_PAYMENT_APPROVE_FAIL,
  
  } from "./type-paymentApprove";
  import axios from "axios";
  
  export const getPaymentApprove = (id) => async (dispatch) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: GET_PAYMENT_APPROVE_BEGIN,
      loading: true,
      error: null,
    });
    try {
      const res = await axios.get(`https://realizdea.kuyrek.com/payment/approve/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      console.log(res);
      dispatch({
        type:GET_PAYMENT_APPROVE_SUCCESS,
        loading: false,
        payload: res.data.result,
        error: null,
      });
    } catch (error) {
      dispatch({
        type: GET_PAYMENT_APPROVE_FAIL,
        error: error.response,
      });
      console.log(error);
    }
  };
  