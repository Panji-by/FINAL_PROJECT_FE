import {
  POST_SEARCH_ALL_BEGIN,
  POST_SEARCH_ALL_SUCCESS,
  POST_SEARCH_ALL_FAILED
  } from '../types';
  
  const initialState = {
    dataJson: [],
    total: null,
    pages: null,
    loading: false,
    error: null
  };
  
  const postSearchAll = (state = initialState, action) => {
    console.log(action, 'ACTION');
    const { type, payload, error, total, pages } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case POST_SEARCH_ALL_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case POST_SEARCH_ALL_SUCCESS:
        return {
          dataJson: payload,
          total: total,
          pages: pages,
          loading: false,
        };
      case POST_SEARCH_ALL_FAILED:
        return {
          dataJson: [],
          loading: false,
          error: error,
        };
    }
  };
  
  export default postSearchAll;
  