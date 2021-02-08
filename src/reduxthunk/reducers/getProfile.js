import {
    GET_JSON_START,
    GET_JSON_SUCCESS,
    GET_JSON_FAIL,
  } from "../actions/types-admin";
import { GET_PROFILE_BEGIN, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS } from "../actions/types-profile";
  
  const intialState = {
    dataJson: [],
    loading: false,
    error: null,
  };
  
  const getJsonProfile = (state = intialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_PROFILE_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_PROFILE_SUCCESS:
        return {
          dataJson: action.payload,
          loading: false,
        };
      case GET_PROFILE_FAIL:
        return {
          dataJson: [],
          loading: false,
          error: error,
        };
    }
  };
  
  export default getJsonProfile;
  