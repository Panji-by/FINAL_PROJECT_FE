import {
  GET_PROVIDER_CONTEST_SUCCESS,
  GET_PROVIDER_CONTEST_FAILED,
  GET_PROVIDER_CONTEST_BEGIN

} from "../types";
import axios from "axios";

export const getProviderContest = (page) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_PROVIDER_CONTEST_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`https://realizdea.kuyrek.com/contest/mycontest?page=${page}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: GET_PROVIDER_CONTEST_SUCCESS,
      loading: false,
      payload: res.data.result,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: GET_PROVIDER_CONTEST_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};