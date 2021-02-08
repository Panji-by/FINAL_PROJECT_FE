import {
  POST_SEARCH_ALL_BEGIN,
  POST_SEARCH_ALL_SUCCESS,
  POST_SEARCH_ALL_FAILED
} from "../types";
import axios from "axios";

export const postSearchAll = (data, page) => async (dispatch) => {
  dispatch({
    type: POST_SEARCH_ALL_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.post(`https://realizdea.kuyrek.com/contest/getAllContest?page=${page}`, data);
    console.log(res);
    dispatch({
      type: POST_SEARCH_ALL_SUCCESS,
      loading: false,
      payload: res.data.result,
      total: res.data.totalResult,
      pages: res.data.totalPage,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: POST_SEARCH_ALL_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};