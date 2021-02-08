import {
  GET_PROVIDER_CONTEST_SUCCESS,
  GET_PROVIDER_CONTEST_FAILED,
  GET_PROVIDER_CONTEST_BEGIN
  } from '../types';
  
  const initialState = {
    dataJson: [],
    loading: false,
    error: null
  };
  
  const getProviderContest = (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_PROVIDER_CONTEST_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_PROVIDER_CONTEST_SUCCESS:
        return {
          dataJson: payload,
          loading: false,
        };
      case GET_PROVIDER_CONTEST_FAILED:
        return {
          dataJson: [],
          loading: false,
          error: error,
        };
    }
  };
  
  export default getProviderContest;
  