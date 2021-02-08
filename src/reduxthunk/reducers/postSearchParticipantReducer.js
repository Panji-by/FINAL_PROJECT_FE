import {
  POST_SEARCH_PARTICIPANT_BEGIN,
  POST_SEARCH_PARTICIPANT_SUCCESS,
  POST_SEARCH_PARTICIPANT_FAILED
  } from '../types';
  
  const initialState = {
    dataJson: null,
    total: null,
    pages: null,
    loading: false,
    error: null
  };
  
  const postSearchParticipant = (state = initialState, action) => {
    console.log(action, 'ACTION');
    const { type, payload, error, total, pages } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case POST_SEARCH_PARTICIPANT_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case POST_SEARCH_PARTICIPANT_SUCCESS:
        return {
          dataJson: payload,
          total: total,
          pages: pages,
          loading: false,
        };
      case POST_SEARCH_PARTICIPANT_FAILED:
        return {
          dataJson: null,
          loading: false,
          error: error,
        };
    }
  };
  
  export default postSearchParticipant;
  