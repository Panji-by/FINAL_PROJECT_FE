import {
  POST_SEARCH_PROVIDER_BEGIN,
  POST_SEARCH_PROVIDER_SUCCESS,
  POST_SEARCH_PROVIDER_FAILED
} from "../types";
import axios from "axios";

export const postSearchProvider = (data, page) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: POST_SEARCH_PROVIDER_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.post(`https://realizdea.kuyrek.com/contest/mycontest?page=${page}`, data, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: POST_SEARCH_PROVIDER_SUCCESS,
      loading: false,
      payload: res.data.result,
      total: res.data.totalResult,
      pages: res.data.totalPage,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: POST_SEARCH_PROVIDER_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};