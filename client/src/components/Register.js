import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
//helpers
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister, messageReset } from "../store/usersSlice";

function Register() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeHandler, onSubmit } = helpers;
  const { post } = methods;

  //global state
  const error = useSelector((state) => state.users.error);
  const isRegistered = useSelector((state) => state.users.registered);

  //local state
  const [userInput, setUserInput] = useState({ name: "", email: "", password: "", confirmPasword: "" });

  //side effects
  useEffect(() => {
    isRegistered && navigate("/login");
    // eslint-disable-next-line
  }, [isRegistered]);

  return (
    <Box className="Register" style={{ maxWidth: "500px", margin: "auto" }}>
      <Typography color="primary" gutterBottom variant="h6" component="div" children="Register" />

      <Box component="form" onSubmit={(e) => onSubmit(e, dispatch, userRegister, "/users/register", userInput, post)} fullWidth>
        <TextField
          onChange={(e) => changeHandler(e, userInput, setUserInput)}
          size="medium"
          margin="dense"
          required
          type="text"
          name="name"
          label="Name"
          fullWidth
        />
        <br></br>
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
        <br></br>
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
        <TextField
          onChange={(e) => changeHandler(e, userInput, setUserInput)}
          size="medium"
          margin="dense"
          required
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          fullWidth
        />
        <br></br>
        <span className="error">{error}</span>
        <Button sx={{ mt: 1, mb: 2 }} variant="contained" disableElevation type="submit" children="register" fullWidth />

        <Divider />

        <Typography
          onClick={() => {
            navigate("/login");
            dispatch(messageReset());
          }}
          align="center"
          sx={{ mt: 1 }}
        >
          Already have account? <span className="link">Login!</span>
        </Typography>
      </Box>
    </Box>
  );
}

export default Register;
