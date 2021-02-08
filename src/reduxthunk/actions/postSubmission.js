import {
  POST_SUBMISSION_BEGIN,
  POST_SUBMISSION_SUCCESS,
  POST_SUBMISSION_FAILED
} from "../types";
import axios from "axios";

export const postSubmission = (idContest, idUser, data) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: POST_SUBMISSION_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.post(`https://realizdea.kuyrek.com/contest/submit/${idContest}/${idUser}`, data, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: POST_SUBMISSION_SUCCESS,
      loading: false,
      payload: res.data,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: POST_SUBMISSION_FAILED,
      error: error.response.data.errors,
    });
    console.log(error);
  }
};