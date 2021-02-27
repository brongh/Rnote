import axios from "axios";

const BASEURL = "http://localhost:8000/api/";

export const loginUser = async (dispatch, loginPayload) => {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await axios.post(`${BASEURL}token/`, loginPayload);
    let res = await response;

    if (res.data) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(res.data.refresh);
      //   localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      return res.data;
    }
    dispatch({ type: "LOGIN_ERROR", error: res.errors });
    return;
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOGIN_ERROR", error: error.response.data.detail });
  }
};

export const logout = (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("refresh");
  //   localStorage.removeItem("token");
};

export const getAccessToken = async (dispatch) => {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    const refreshToken = localStorage.getItem("refresh");
    let res = await axios.post(`${BASEURL}token/refresh/`, {
      refresh: refreshToken,
    });

    if (res.data) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      return res.data;
    }
    dispatch({ type: "LOGIN_ERROR", error: res.errors });
    return;
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOGIN_ERROR", error: error.response.data.detail });
  }
};

export const signUp = async (newUser) => {
  let res = await axios.post(`${BASEURL}users/`, newUser);
  return res;
};
