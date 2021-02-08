import {
  POST_PROVIDER_PAYMENT_BEGIN,
  POST_PROVIDER_PAYMENT_SUCCESS,
  POST_PROVIDER_PAYMENT_FAILED
} from "../types";
import axios from "axios";

export const postPaymentProvider = (idContest, idUser, data) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: POST_PROVIDER_PAYMENT_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.post(`https://realizdea.kuyrek.com/payment/provider/${idContest}/${idUser}`, data, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: POST_PROVIDER_PAYMENT_SUCCESS,
      loading: false,
      payload: res.data,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: POST_PROVIDER_PAYMENT_FAILED,
      error: error.response.data.errors,
    });
    console.log(error);
  }
};