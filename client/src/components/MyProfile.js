import React, { useState, useEffect } from "react";
import { Box, Container, FormControl, Typography, TextField, Button, Divider, IconButton, Popover } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
//helpers
import { getUserInfo, editProfile, messageReset, userLoggedOut } from "../store/usersSlice";
import { getRecipes } from "../store/recipesSlice";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function MyProfile() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeHandler, onSubmit, popoverOpen, popoverClose } = helpers;
  const { get, patch } = methods;

  //global state
  const error = useSelector((state) => state.users.error);
  const message = useSelector((state) => state.users.message);
  const userInfo = useSelector((state) => state.users.user);
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");

  //local state
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    active: true,
  });
  const [willEdit, setWillEdit] = useState(false);

  //popper state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  //side effects
  useEffect(() => {
    dispatch(getUserInfo("/users/my-profile", get, token));
    return () => {
      dispatch(messageReset());
    };
  }, []);

  useEffect(() => {
    userInfo && setUserInput({ ...userInput, name: userInfo.name, email: userInfo.email, password: "" });
  }, [userInfo]);

  return (
    <Box className="ViewProfile" style={{ maxWidth: "500px", margin: "auto" }}>
      <Popover
        style={{ padding: "10px" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          popoverClose(setAnchorEl);
          setUserInput({ ...userInput, active: true });
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>Are you sure? Please type your password!</Typography>
          <TextField
            onChange={(e) => changeHandler(e, userInput, setUserInput)}
            size="small"
            margin="dense"
            required
            name="password"
            type="password"
            label="Password"
            fullWidth
          />
          <Button
            variant="primary"
            onClick={(e) => {
              onSubmit(e, dispatch, editProfile, `/users/edit-profile/`, patch, userInput, token);
              dispatch(userLoggedOut());
              navigate("/login");
            }}
          >
            {" "}
            deactivate
          </Button>
          <Button
            onClick={() => {
              popoverClose(setAnchorEl);
              setUserInput({ ...userInput, active: true });
            }}
          >
            {" "}
            cancel
          </Button>
        </Box>
      </Popover>

      <>
        <Typography color="primary" gutterBottom variant="h6" component="div">
          View or Edit Profile
          <IconButton onClick={() => setWillEdit(true)}>
            <Edit />
          </IconButton>
          <IconButton
            aria-describedby={id}
            onClick={(e) => {
              popoverOpen(e, setAnchorEl);
              setUserInput({ ...userInput, active: false });
            }}
          >
            <Delete />
          </IconButton>
        </Typography>
        {userInfo && (
          <Box
            onSubmit={(e) => {
              onSubmit(e, dispatch, editProfile, `/users/edit-profile/`, patch, userInput, token);
              setTimeout(() => {
                if (!message) {
                  dispatch(userLoggedOut());
                  navigate("/login");
                  console.log("object");
                }
              }, 3000);
            }}
            component="form"
            fullWidth
          >
            <TextField
              onChange={(e) => changeHandler(e, userInput, setUserInput)}
              size="medium"
              margin="dense"
              required
              type="text"
              label="Name"
              name="name"
              defaultValue={userInfo.name}
              disabled={!willEdit}
              fullWidth
            />{" "}
            <br></br>
            <TextField
              onChange={(e) => changeHandler(e, userInput, setUserInput)}
              size="medium"
              margin="dense"
              required
              type="text"
              label="Email"
              name="email"
              defaultValue={userInfo.email}
              disabled={!willEdit}
              fullWidth
            />{" "}
            <br></br>
            {willEdit && (
              <TextField
                onChange={(e) => changeHandler(e, userInput, setUserInput)}
                size="medium"
                margin="dense"
                required
                name="password"
                type="password"
                label="Password"
                fullWidth
              />
            )}
            <Divider sx={{ mt: 2 }} />
            <span className="error">{error}</span>
            <span className="success">{message}</span>
            <Button
              sx={{ mt: 2, mb: 1 }}
              disabled={!willEdit}
              variant="contained"
              disableElevation
              type="submit"
              children="save"
              fullWidth
            />{" "}
            <br></br>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/change-password");
              }}
              align="center"
            >
              Change Your Password <span style={{ color: "#285678" }}>Here!</span>
            </Typography>
          </Box>
        )}
      </>
    </Box>
  );
}

export default MyProfile;
