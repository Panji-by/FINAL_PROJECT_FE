import {
  POST_SEARCH_PROVIDER_BEGIN,
  POST_SEARCH_PROVIDER_SUCCESS,
  POST_SEARCH_PROVIDER_FAILED
  } from '../types';
  
  const initialState = {
    dataJson: null,
    total: null,
    pages: null,
    loading: false,
    error: null
  };
  
  const postSearchProvider = (state = initialState, action) => {
    const { type, payload, error, total, pages } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case POST_SEARCH_PROVIDER_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case POST_SEARCH_PROVIDER_SUCCESS:
        return {
          dataJson: payload,
          total: total,
          pages: pages,
          loading: false,
        };
      case POST_SEARCH_PROVIDER_FAILED:
        return {
          dataJson: null,
          total: null,
          pages: null,
          loading: false,
          error: error,
        };
    }
  };
  
  export default postSearchProvider;
  