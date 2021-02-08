import {
  POST_CREATE_CONTEST_START,
  POST_CREATE_CONTEST_SUCCESS,
  POST_CREATE_CONTEST_FAIL
} from "../actions/type-postCreateContest";

const intialState = {
  dataJson: null,
  loading: false,
  error: null
};

const postCreateContest = (state = intialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    default:
      return {
        ...state,
      };
    case POST_CREATE_CONTEST_START:
      return {
        ...state,
        loading: true,
      };
    case POST_CREATE_CONTEST_SUCCESS:
      return {
        dataJson: payload,
        loading: false,
      };
    case POST_CREATE_CONTEST_FAIL:
      return {
        dataJson: null,
        loading: false,
        error: error,
      };
  }
};

export default postCreateContest;