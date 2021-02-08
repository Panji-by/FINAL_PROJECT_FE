import {
    POST_PARTICIPANT_ACHIEVE_BEGIN,
    POST_PARTICIPANT_ACHIEVE_SUCCESS, 
    POST_PARTICIPANT_ACHIEVE_FAIL
  
  } from "./type-participant-achiev";
  import axios from "axios";
  
  export const postParticipantAchiev = (page) => async (dispatch) => {
    let token = localStorage.getItem("token");
    dispatch({
      type:  POST_PARTICIPANT_ACHIEVE_BEGIN,
      loading: true,
      error: null,
    });
    try {
      const res = await axios.get(`https://realizdea.kuyrek.com/contest/winContest?page=${page}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      console.log(res);
      dispatch({
        type:  POST_PARTICIPANT_ACHIEVE_SUCCESS,
        loading: false,
        payload: res.data.result,
        total: res.data.totalResult,
        pages: res.data.totalPage,
        error: null,
      });
    } catch (error) {
      dispatch({
        type:  POST_PARTICIPANT_ACHIEVE_FAIL,
        error: error.response,
      });
      console.log(error);
    }
  };