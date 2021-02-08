import {
  GET_CONTEST_DETAIL_SUCCESS,
  GET_CONTEST_DETAIL_FAILED,
  GET_CONTEST_DETAIL_BEGIN
  } from '../types';
  
  const initialState = {
    dataJson: [],
    loading: false,
    error: null
  };
  
  const getContestDetail = (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_CONTEST_DETAIL_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_CONTEST_DETAIL_SUCCESS:
        return {
          dataJson: payload,
          loading: false,
        };
      case GET_CONTEST_DETAIL_FAILED:
        return {
          dataJson: [],
          loading: false,
          error: error,
        };
    }
  };
  
  export default getContestDetail;
  