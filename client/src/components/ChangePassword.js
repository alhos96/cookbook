import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";

//helpers
import { editProfile, messageReset, userLoggedOut } from "../store/usersSlice";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ChangePassword() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeHandler, onSubmit } = helpers;
  const { patch } = methods;

  //global state
  const error = useSelector((state) => state.users.error);
  const message = useSelector((state) => state.users.message);
  const token = sessionStorage.getItem("token");

  //local state
  const [userInput, setUserInput] = useState({
    newPassword: "",
    oldPassword: "",
    confirmNewPassword: "",
  });

  //side effects
  useEffect(() => {
    return () => {
      dispatch(messageReset());
      dispatch(userLoggedOut());
    };
  }, []);

  return (
    <Box className="ViewProfile" style={{ maxWidth: "500px", margin: "auto" }}>
      <Typography color="primary" gutterBottom variant="h6" component="div">
        Change Password
      </Typography>
      <Box
        onSubmit={(e) => {
          onSubmit(e, dispatch, editProfile, `/users/change-password/`, patch, userInput, token);
        }}
        component="form"
        fullWidth
      >
        <TextField
          onChange={(e) => changeHandler(e, userInput, setUserInput)}
          name="oldPassword"
          size="medium"
          margin="dense"
          required
          type="password"
          label="Old password"
          fullWidth
        />{" "}
        <br></br>
        <TextField
          onChange={(e) => changeHandler(e, userInput, setUserInput)}
          name="newPassword"
          size="medium"
          margin="dense"
          required
          type="password"
          label="New password"
          fullWidth
        />{" "}
        <br></br>
        <TextField
          onChange={(e) => changeHandler(e, userInput, setUserInput)}
          name="confirmNewPassword"
          size="medium"
          margin="dense"
          required
          type="password"
          label="Confirm password"
          fullWidth
        />{" "}
        <br></br>
        <Divider sx={{ mt: 2 }} />
        <span className="error">{error}</span>
        <span className="success">{message}</span>
        <Button sx={{ mt: 2, mb: 1 }} variant="contained" disableElevation type="submit" children="save" fullWidth />
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/my-profile");
          }}
          align="center"
        >
          View or Edit your Profile <span style={{ color: "#285678" }}>Here!</span>
        </Typography>
      </Box>
    </Box>
  );
}

export default ChangePassword;
