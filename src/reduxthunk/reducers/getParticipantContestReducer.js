import {
  GET_PARTICIPANT_CONTEST_SUCCESS,
  GET_PARTICIPANT_CONTEST_FAILED,
  GET_PARTICIPANT_CONTEST_BEGIN
} from "../types";

  
  const initialState = {
    dataJson: [],
    total: null,
    pages: null,
    loading: false,
    error: null
  };
  
  const getParticipantContest = (state = initialState, action) => {
    const { type, payload, error, total, pages } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_PARTICIPANT_CONTEST_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_PARTICIPANT_CONTEST_SUCCESS:
        return {
          dataJson: payload,
          total: total,
          pages: pages,
          loading: false,
        };
      case GET_PARTICIPANT_CONTEST_FAILED:
        return {
          dataJson: [],
          loading: false,
          error: error,
        };
    }
  };
  
  export default getParticipantContest;
  