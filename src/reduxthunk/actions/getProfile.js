import {
  GET_PROFILE_BEGIN,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  PATCH_PROFILE_BEGIN,
  PATCH_PROFILE_SUCCESS,
  PATCH_PROFILE_FAIL,

} from "./types-profile";
import axios from "axios";

export const getJsonProfile = () => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_PROFILE_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get("https://realizdea.kuyrek.com/user/profile", {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      loading: false,
      payload: res.data.result,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      error: error.response,
    });
    console.log(error);
  }
};

export const patchProfile = (data, id) => async (dispatch) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: PATCH_PROFILE_BEGIN,
      loading: true,
      error: null,
    });
    try {
        const res = await axios.patch(`https://realizdea.kuyrek.com/user/profile/update/${id}`,
          data, {headers: { Authorization: `bearer ${token}` },
        });
        console.log(res);
        dispatch({
          type: PATCH_PROFILE_SUCCESS,
          loading: false,
          payload: res.data.result,
          error: null,
        });
      } catch (error) {
        dispatch({
          type: PATCH_PROFILE_FAIL,
          error: error.response.data.errors,
        });
        console.log(error);
      }
    };