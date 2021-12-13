import React, { useState, useEffect } from "react";
import { Box, FormControl, Typography, TextField, Button, Divider } from "@mui/material";

//helpers
import { userLogin } from "../store/usersSlice";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeHandler, onSubmit } = helpers;
  const { post } = methods;

  //global state
  const error = useSelector((state) => state.users.error);
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const token = sessionStorage.getItem("token");

  //local state
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  //side effects
  useEffect(() => {
    loggedIn && navigate("/");
  }, [loggedIn]);

  return (
    <Box className="Login" style={{ maxWidth: "500px", margin: "auto" }}>
      <Typography color="primary" gutterBottom variant="h6" component="div">
        Login
      </Typography>
      <Box component="form" onSubmit={(e) => onSubmit(e, dispatch, userLogin, "/users/login", userInput, post, token)} fullWidth>
        <TextField
          onChange={(e) => changeHandler(e, userInput, setUserInput)}
          size="medium"
          margin="dense"
          required
          type="text"
          name="email"
          label="Email"
          fullWidth
        />
        <TextField
          onChange={(e) => changeHandler(e, userInput, setUserInput)}
          size="medium"
          margin="dense"
          required
          type="password"
          name="password"
          label="Password"
          fullWidth
        />
        <br></br>
        <span className="error">{error}</span>
        <Button sx={{ mt: 1, mb: 2 }} variant="contained" disableElevation type="submit" children="login" fullWidth />

        <Divider />
        <Typography onClick={() => navigate("/register")} align="center" sx={{ mt: 1 }}>
          Don't have account? <span className="link">Register!</span>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
