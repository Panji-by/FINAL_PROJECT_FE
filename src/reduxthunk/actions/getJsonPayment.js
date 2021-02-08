import {
    GET_ADMIN_CONFIRMATION_START,
    GET_ADMIN_CONFIRMATION_SUCCESS,
    GET_ADMIN_CONFIRMATION_FAIL,
} from "./type-adminConfirmation";
import axios from "axios";

export const getPaymentConfirmation = (id) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_ADMIN_CONFIRMATION_START,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(
      `https://realizdea.kuyrek.com/payment/${id}`,
      { headers: { Authorization: `bearer ${token}` } }
    );
    console.log(res);
    dispatch({
      type: GET_ADMIN_CONFIRMATION_SUCCESS,
      loading: false,
      payload: res.data.result,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_CONFIRMATION_FAIL,
      error: error.response.data.errors
    });
    console.log(error);
  }
};
