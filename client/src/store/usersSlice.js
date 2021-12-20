import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./actions";

const slice = createSlice({
  initialState: {
    loggedIn: false,
    registered: false,
    user: {
      name: "",
      email: "",
    },
    error: "",
    message: "",
  },
  name: "users",
  reducers: {
    userLoggedIn: (users, { payload }) => {
      sessionStorage.setItem("token", payload.data.token);
      sessionStorage.setItem("user", payload.data.name);
      users.loggedIn = true;
      users.error = "";
      users.message = "";
      users.user.name = payload.data.name;
      users.user.email = payload.data.email;
    },
    userRegistered: (users, { payload }) => {
      users.registered = true;
      users.error = "";
    },
    gotUserInfo: (users, { payload }) => {
      users.user.name = payload.data.name;
      users.user.email = payload.data.email;
    },
    updatedSucessfuly: (users, { payload }) => {
      sessionStorage.setItem("user", payload.data.name);
      users.user.name = payload.data.name;
      users.user.email = payload.data.email;
      users.message = "New info saved";
    },
    userLoggedOut: (users, { payload }) => {
      users.loggedIn = false;
      users.user = {
        name: "",
        email: "",
      };
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
    messageReset: (users, { payload }) => {
      users.message = "";
      users.error = "";
      users.registered = false;
    },
    gotError: (users, { payload }) => {
      users.error = payload;
    },
  },
});

export const userLogin = (url, userInput, method, token) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      userInput,
      method,
      token,
      onSuccess: userLoggedIn.type,
      onError: gotError.type,
    })
  );
};

export const userRegister = (url, userInput, method, token) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      userInput,
      method,
      token,
      onSuccess: userRegistered.type,
      onError: gotError.type,
    })
  );
};

export const getUserInfo = (url, method, token, setLocalState) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      method,
      token,
      setLocalState,
      onSuccess: gotUserInfo.type,
      onError: gotError.type,
    })
  );
};

export const editProfile = (url, method, userInput, token, setLocalState) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      method,
      userInput,
      token,
      setLocalState,
      onSuccess: updatedSucessfuly.type,
      onError: gotError.type,
    })
  );
};

export const { userLoggedIn, userRegistered, userLoggedOut, gotUserInfo, gotError, updatedSucessfuly, messageReset } = slice.actions;
export default slice.reducer;
