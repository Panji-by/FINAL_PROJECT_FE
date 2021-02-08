import {
  POST_CREATE_CONTEST_START,
  POST_CREATE_CONTEST_SUCCESS,
  POST_CREATE_CONTEST_FAIL,
} from "./type-postCreateContest";
import axios from "axios"

export const postCreateContest = (data) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: POST_CREATE_CONTEST_START,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.post(
      `https://realizdea.kuyrek.com/contest/create`,
      data,
      { headers: { Authorization: `bearer ${token}` } }
    );
    console.log(res);
    dispatch({
      type: POST_CREATE_CONTEST_SUCCESS,
      loading: false,
      payload: res.data.result,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_CONTEST_FAIL,
      error: error.response.data.errors,
    });
    console.log(error);
  }
};
