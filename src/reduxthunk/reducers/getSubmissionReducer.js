import {
  GET_SUBMISSION_SUCCESS,
  GET_SUBMISSION_FAILED,
  GET_SUBMISSION_BEGIN
  } from '../types';
  
  const initialState = {
    dataJson: [],
    loading: false,
    error: null
  };
  
  const getSubmission = (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_SUBMISSION_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_SUBMISSION_SUCCESS:
        return {
          dataJson: payload,
          loading: false,
        };
      case GET_SUBMISSION_FAILED:
        return {
          dataJson: [],
          loading: false,
          error: error,
        };
    }
  };
  
  export default getSubmission;
  