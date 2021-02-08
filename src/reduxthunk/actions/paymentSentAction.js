import {
    POST_ADMIN_PAYMENT_START,
    POST_ADMIN_PAYMENT_SUCCESS,
    POST_ADMIN_PAYMENT_FAIL,
  } from "./type-paymentSent";
  import axios from "axios"
  
  export const postAdminPayment = (data, idContest, idWinner) => async (dispatch) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: POST_ADMIN_PAYMENT_START,
      loading: true,
      error: null,
    });
    try {
      const res = await axios.post(
        `https://realizdea.kuyrek.com/payment/admin/${idContest}/${idWinner}`,
        data,
        { headers: { Authorization: `bearer ${token}` } }
      );
      console.log(res);
      dispatch({
        type: POST_ADMIN_PAYMENT_SUCCESS,
        loading: false,
        payload: res.data.result,
        error: null,
      });
    } catch (error) {
      dispatch({
        type: POST_ADMIN_PAYMENT_FAIL,
        error: error.response.data.errors,
      });
      console.log(error);
    }
  };
  