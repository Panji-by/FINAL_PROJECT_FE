import {
  GET_SUBMISSION_SUCCESS,
  GET_SUBMISSION_FAILED,
  GET_SUBMISSION_BEGIN

} from "../types";
import axios from "axios";

export const getSubmission = (id) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_SUBMISSION_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`https://realizdea.kuyrek.com/contest/submission/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: GET_SUBMISSION_SUCCESS,
      loading: false,
      payload: res.data.result,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBMISSION_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};