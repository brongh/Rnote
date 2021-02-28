import jwt from "jwt-decode";
import { masterKey } from "../encryption/masterkey";

let token = "";

let mk = localStorage.getItem("mk") || "";

let userDetails = token ? jwt(token) : "";

export const initialState = {
  userDetails: "" || userDetails,
  mk: "" || mk,
  token: "" || token,
  loading: false,
  errorMessage: null,
  noteID: "",
};

export const secondState = {
  noteID: "",
};

export const SecondReducer = (secondState, action) => {
  switch (action.type) {
    case "READ_NOTE":
      return {
        ...secondState,
        noteID: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        token: action.payload.access,
        userDetails: jwt(action.payload.access),

        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        userDetails: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    case "MK":
      const masterkey = masterKey(action.payload);
      localStorage.setItem("mk", masterkey);
      return {
        ...initialState,
        mk: masterkey,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
