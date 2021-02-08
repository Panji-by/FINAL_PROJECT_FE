import {
  GET_ADMIN_DASHBOARD_PAID_SUCCESS,
  GET_ADMIN_DASHBOARD_PAID_FAILED,
  GET_ADMIN_DASHBOARD_PAID_BEGIN

} from "../types";
import axios from "axios";

export const getAdminDashboardPaid = (page) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_ADMIN_DASHBOARD_PAID_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`https://realizdea.kuyrek.com/admin/dashboard/paid?page=${page}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: GET_ADMIN_DASHBOARD_PAID_SUCCESS,
      loading: false,
      payload: res.data.result,
      total: res.data.totalResult,
      pages: res.data.totalPage,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_DASHBOARD_PAID_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};