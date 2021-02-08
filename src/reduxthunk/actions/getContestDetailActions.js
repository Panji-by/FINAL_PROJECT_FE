import {
  GET_CONTEST_DETAIL_SUCCESS,
  GET_CONTEST_DETAIL_FAILED,
  GET_CONTEST_DETAIL_BEGIN

} from "../types";
import axios from "axios";

export const getContestDetail = (id) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_CONTEST_DETAIL_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`https://realizdea.kuyrek.com/contest/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: GET_CONTEST_DETAIL_SUCCESS,
      loading: false,
      payload: res.data.result,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: GET_CONTEST_DETAIL_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};