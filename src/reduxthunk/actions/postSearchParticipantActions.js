import {
  POST_SEARCH_PARTICIPANT_BEGIN,
  POST_SEARCH_PARTICIPANT_SUCCESS,
  POST_SEARCH_PARTICIPANT_FAILED
} from "../types";
import axios from "axios";

export const postSearchParticipant = (data, page) => async (dispatch) => {
  let token = localStorage.getItem("token");
  console.log(page, 'PAGEEEEYYYYYY')
  dispatch({
    type: POST_SEARCH_PARTICIPANT_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.post(`https://realizdea.kuyrek.com/contest/search/category?page=${page}`, data, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: POST_SEARCH_PARTICIPANT_SUCCESS,
      loading: false,
      payload: res.data.result,
      total: res.data.totalResult,
      pages: res.data.totalPage,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: POST_SEARCH_PARTICIPANT_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};