import {
  GET_ADMIN_DASHBOARD_UNPAID_SUCCESS,
  GET_ADMIN_DASHBOARD_UNPAID_FAILED,
  GET_ADMIN_DASHBOARD_UNPAID_BEGIN
  } from '../types';
  
  const initialState = {
    dataJson: [],
    total: null,
    pages: null,
    loading: false,
    error: null
  };
  
  const getAdminDashboardUnpaid = (state = initialState, action) => {
    const { type, payload, error, total, pages } = action;
    switch (type) {
      default:
        return {
          ...state,
        };
      case GET_ADMIN_DASHBOARD_UNPAID_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_ADMIN_DASHBOARD_UNPAID_SUCCESS:
        return {
          dataJson: payload,
          total: total,
          pages: pages,
          loading: false,
        };
      case GET_ADMIN_DASHBOARD_UNPAID_FAILED:
        return {
          dataJson: [],
          total: null,
          pages: null,
          loading: false,
          error: error,
        };
    }
  };
  
  export default getAdminDashboardUnpaid;
  