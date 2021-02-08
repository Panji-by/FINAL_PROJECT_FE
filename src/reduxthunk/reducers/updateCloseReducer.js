import {
  GET_UPDATE_CLOSE_SUCCESS,
  GET_UPDATE_CLOSE_FAILED,
  GET_UPDATE_CLOSE_BEGIN
  } from '../types';
  
  const initialState = {
    dataJson: null,
    loading: false,
    error: null
  };
  
  const updateClose = (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_UPDATE_CLOSE_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_UPDATE_CLOSE_SUCCESS:
        return {
          dataJson: payload,
          loading: false,
        };
      case GET_UPDATE_CLOSE_FAILED:
        return {
          dataJson: [],
          loading: false,
          error: error,
        };
    }
  };
  
  export default updateClose;
  