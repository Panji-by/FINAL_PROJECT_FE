import {
  GET_UPDATE_WINNER_SUCCESS,
  GET_UPDATE_WINNER_FAILED,
  GET_UPDATE_WINNER_BEGIN

} from "../types";
import axios from "axios";

export const updateWinner = (idUser,idSubmission) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_UPDATE_WINNER_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`https://realizdea.kuyrek.com/contest/update/winner/${idUser}/${idSubmission}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: GET_UPDATE_WINNER_SUCCESS,
      loading: false,
      payload: res.data.result,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: GET_UPDATE_WINNER_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};