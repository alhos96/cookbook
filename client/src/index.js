import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { theme } from "./components";
import { Provider } from "react-redux";
import store from "./store/Store";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
