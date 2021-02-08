import * as types from '../types';

// return errors
export const returnErrors = (msg, status, id = null) => {
	return {
		type: types.GET_ERRORS,
		payload: {msg, status, id}
	};
};

// clear errors
export const clearErrors = () => {
	return {
		type: types.CLEAR_ERRORS
	};
};