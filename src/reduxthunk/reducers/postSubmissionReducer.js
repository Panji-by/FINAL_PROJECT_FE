import {
  POST_SUBMISSION_BEGIN,
  POST_SUBMISSION_SUCCESS,
  POST_SUBMISSION_FAILED
  } from '../types';
  
  const initialState = {
    dataJson: null,
    loading: false,
    error: null
  };
  
  const postSubmission = (state = initialState, action) => {
    console.log(action, 'ACTION');
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case POST_SUBMISSION_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case POST_SUBMISSION_SUCCESS:
        return {
          dataJson: payload,
          loading: false,
        };
      case POST_SUBMISSION_FAILED:
        return {
          dataJson: null,
          loading: false,
          error: error,
        };
    }
  };
  
  export default postSubmission;
  