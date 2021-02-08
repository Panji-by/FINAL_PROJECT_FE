import {
  GET_UPDATE_WINNER_SUCCESS,
  GET_UPDATE_WINNER_FAILED,
  GET_UPDATE_WINNER_BEGIN
  } from '../types';
  
  const initialState = {
    dataJson: null,
    loading: false,
    error: null
  };
  
  const updateWinner = (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_UPDATE_WINNER_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_UPDATE_WINNER_SUCCESS:
        return {
          dataJson: payload,
          loading: false,
        };
      case GET_UPDATE_WINNER_FAILED:
        return {
          dataJson: null,
          loading: false,
          error: error,
        };
    }
  };
  
  export default updateWinner;
  