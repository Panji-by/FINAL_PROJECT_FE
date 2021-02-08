import {
  GET_PARTICIPANT_CONTEST_SUCCESS,
  GET_PARTICIPANT_CONTEST_FAILED,
  GET_PARTICIPANT_CONTEST_BEGIN

} from "../types";
import axios from "axios";


export const getParticipantContest = (page,data) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_PARTICIPANT_CONTEST_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.post(`https://realizdea.kuyrek.com/contest/mycontest?page=${page}`, data ,{
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: GET_PARTICIPANT_CONTEST_SUCCESS,
      loading: false,
      payload: res.data.result,
      total: res.data.totalResult,
      pages: res.data.totalPage,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: GET_PARTICIPANT_CONTEST_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};