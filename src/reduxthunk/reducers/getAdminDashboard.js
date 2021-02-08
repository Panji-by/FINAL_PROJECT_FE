import {
  GET_ADMIN_DASHBOARD_SUCCESS,
  GET_ADMIN_DASHBOARD_FAILED,
  GET_ADMIN_DASHBOARD_BEGIN
  } from '../types';
  
  const initialState = {
    dataJson: [],
    total: null,
    pages: null,
    loading: false,
    error: null
  };
  
  const getAdminDashboard = (state = initialState, action) => {
    const { type, payload, error, total, pages } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_ADMIN_DASHBOARD_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_ADMIN_DASHBOARD_SUCCESS:
        return {
          dataJson: payload,
          total: total,
          pages: pages,
          loading: false,
        };
      case GET_ADMIN_DASHBOARD_FAILED:
        return {
          dataJson: [],
          total: null,
          pages: null,
          loading: false,
          error: error,
        };
    }
  };
  
  export default getAdminDashboard;
  