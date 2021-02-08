import {
  GET_PAYMENT_STATUS_SUCCESS,
  GET_PAYMENT_STATUS_FAILED,
  GET_PAYMENT_STATUS_BEGIN

} from "../types";
import axios from "axios";

export const getPaymentStatus = (id) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_PAYMENT_STATUS_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`https://realizdea.kuyrek.com/admin/dashboard/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: GET_PAYMENT_STATUS_SUCCESS,
      loading: false,
      payload: res.data.result,
      error: null
    });
  } catch (error) {
    dispatch({
      type: GET_PAYMENT_STATUS_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};