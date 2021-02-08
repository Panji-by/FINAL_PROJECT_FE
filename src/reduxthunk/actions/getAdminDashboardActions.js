import {
  GET_ADMIN_DASHBOARD_SUCCESS,
  GET_ADMIN_DASHBOARD_FAILED,
  GET_ADMIN_DASHBOARD_BEGIN

} from "../types";
import axios from "axios";

export const getAdminDashboard = (page) => async (dispatch) => {
  let token = localStorage.getItem("token");
  dispatch({
    type: GET_ADMIN_DASHBOARD_BEGIN,
    loading: true,
    error: null,
  });
  try {
    const res = await axios.get(`https://realizdea.kuyrek.com/admin/dashboard?page=${page}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    console.log(res);
    dispatch({
      type: GET_ADMIN_DASHBOARD_SUCCESS,
      loading: false,
      payload: res.data.result,
      total: res.data.totalResult,
      pages: res.data.totalPage,
      error: null,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_DASHBOARD_FAILED,
      error: error.response,
    });
    console.log(error);
  }
};