import * as types from '../types';
import axios from 'axios';
import {returnErrors} from './errorActions';

// register
export const register = ({fullname, email, password, passwordConfirmation, role}) => dispatch => {
	dispatch({
		type: types.REGISTER_BEGIN
	});
	// url
	const urlRegister = 'https://realizdea.kuyrek.com/user/register';
	// headers
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};
	// body
	const body = JSON.stringify({fullname, email, password, passwordConfirmation, role});

	axios
		.post(urlRegister, body, config)
		.then(res =>
			dispatch({
				type: types.REGISTER_SUCCESS,
				payload: res.data
			})
		)
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAILED'));
			dispatch({
				type: types.REGISTER_FAILED
			});
		});
}
// register ends

// login
export const login = ({email, password}) => dispatch => {
	dispatch({
		type: types.LOGIN_BEGIN
	});
	// url
	const urlLogin = 'https://realizdea.kuyrek.com/user/login';
	// headers
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};
	// body
	const body = JSON.stringify({email, password});

	axios
		.post(urlLogin, body, config)
		.then(res =>
			dispatch({
				type: types.LOGIN_SUCCESS,
				payload: res.data
			})
		)
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAILED'));
			dispatch({
				type: types.LOGIN_FAILED
			});
		});
};
// login ends

// logout
export const logout = () => {
	return {
		type: types.LOGOUT_SUCCESS
	};
}
// logout ends

// logout
export const toggleModal = () => {
	return {
		type: types.MODAL_TOGGLE
	};
}
// logout ends