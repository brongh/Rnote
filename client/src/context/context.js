import React, { createContext, useContext, useReducer } from "react";
import {
  AuthReducer,
  initialState,
  SecondReducer,
  secondState,
} from "./reducer";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
};

const NoteContext = createContext();
const ChangeContext = createContext();

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("NoteContext must be used within a AuthProvider");
  }

  return context;
};

export const useChangeContext = () => {
  const context = useContext(ChangeContext);
  if (context === undefined) {
    throw new Error("ChangeContext must be used within a AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  const [note, change] = useReducer(SecondReducer, secondState);

  return (
    <NoteContext.Provider value={note}>
      <ChangeContext.Provider value={change}>
        <AuthStateContext.Provider value={user}>
          <AuthDispatchContext.Provider value={dispatch}>
            {children}
          </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
      </ChangeContext.Provider>
    </NoteContext.Provider>
  );
};
