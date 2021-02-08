import { PATCH_PROFILE_BEGIN, PATCH_PROFILE_FAIL, PATCH_PROFILE_SUCCESS } from "../actions/types-profile";
  
  const intialState = {
    dataJson: null,
    loading: false,
    error: null,
  };
  
  const patchProfile = (state = intialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case PATCH_PROFILE_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case PATCH_PROFILE_SUCCESS:
        return {
          dataJson: payload,
          loading: false,
        };
      case PATCH_PROFILE_FAIL:
        return {
          dataJson: null,
          loading: false,
          error: error,
        };
    }
  };
  
  export default patchProfile;
  