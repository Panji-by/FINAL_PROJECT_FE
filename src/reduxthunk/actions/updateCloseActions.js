import {
  GET_UPDATE_CLOSE_SUCCESS,
  GET_UPDATE_CLOSE_FAILED,
  GET_UPDATE_CLOSE_BEGIN

} from "../types";
import axios from "axios";

export const updateClose = (idContest,idUser) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_UPDATE_CLOSE_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`https://realizdea.kuyrek.com/contest/update/close/${idContest}/${idUser}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: GET_UPDATE_CLOSE_SUCCESS,
      loading: false,
      payload: res.data.result,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: GET_UPDATE_CLOSE_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};