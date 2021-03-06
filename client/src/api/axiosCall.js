import axios from "axios";

const BASEURL = "http://localhost:8000/api/";

export const loginUser = async (dispatch, loginPayload) => {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await axios.post(`${BASEURL}token/`, loginPayload);
    let res = await response;
    if (res.data) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      localStorage.setItem("refresh", res.data.refresh);
      // dispatch({ type: "MK", payload: loginPayload.password });
      return res.data;
    }
    dispatch({ type: "LOGIN_ERROR", error: res.errors });
    return res;
  } catch (error) {
    console.log(error.request.response);
    dispatch({ type: "LOGIN_ERROR", error: error });
    return JSON.parse(error.request.response);
  }
};

export const logout = (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("refresh");
  // localStorage.removeItem("mk");
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
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
};

export const signUp = async (newUser) => {
  try {
    let res = await axios.post(`${BASEURL}users/`, newUser);
    console.log(res);
    return res;
  } catch (error) {
    return JSON.parse(error.request.response);
  }
};

export const postNote = async (data) => {
  let res = await axios.post(`${BASEURL}notes/`, data);
  return res;
};

export const getNotes = async (id) => {
  let res = await axios.get(`${BASEURL}notesuser/${id}/`);
  return res;
};

export const getOneNote = (id) => {
  let res = axios.get(`${BASEURL}notes/${id}/`);
  return res;
};

export const editOneNote = (id, data) => {
  console.log(id, data);
  let res = axios.put(`${BASEURL}notes/${id}/`, data);
  return res;
};

export const deleteOneNote = (id) => {
  let res = axios.delete(`${BASEURL}notes/${id}/`);
  return res;
};
