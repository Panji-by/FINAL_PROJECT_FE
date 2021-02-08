import {
    POST_PARTICIPANT_ACHIEVE_BEGIN,
    POST_PARTICIPANT_ACHIEVE_SUCCESS, 
    POST_PARTICIPANT_ACHIEVE_FAIL
    } from '../actions/type-participant-achiev';
    
    const initialState = {
      dataJson: null,
      total: null,
      pages: null,
      loading: false,
      error: null
    };
    
    const  getParticipantAchiev= (state = initialState, action) => {
      const { type, payload, error, total, pages } = action;
      switch (type) {
        default:
          return {
            ...state
          };
        case POST_PARTICIPANT_ACHIEVE_BEGIN:
          return {
            ...state,
            loading: true
          };
        case POST_PARTICIPANT_ACHIEVE_SUCCESS:
          return {
            dataJson: payload,
            total: total,
            pages: pages,
            loading: false
          };
        case POST_PARTICIPANT_ACHIEVE_FAIL:
          return {
            dataJson: null,
            loading: false,
            error: error
          };
      }
    };
    
    export default getParticipantAchiev;