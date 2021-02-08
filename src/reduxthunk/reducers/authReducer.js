import * as types from '../types';
import Cookies from 'js-cookie';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	isLoading: false,
	modalError: false
};

export default function(state = initialState, action) {
	switch(action.type) {
		case types.LOGIN_BEGIN:
		case types.REGISTER_BEGIN:
			return {
				...state,
				isLoading: true
			}
		case types.LOGIN_SUCCESS:
		case types.REGISTER_SUCCESS:
			Cookies.set('token', action.payload.token);
			localStorage.setItem('token', action.payload.token);
			// localStorage.setItem()
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false
			};
		case types.LOGIN_FAILED:
		case types.REGISTER_FAILED:
		case types.LOGOUT_SUCCESS:
			Cookies.remove('token');
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: false,
				modalError: true
			};
		case types.MODAL_TOGGLE:
			return {
				...state,
				modalError: false
			}
		default:
			return state;
	}
}