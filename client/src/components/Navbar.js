import React, { useEffect, useState } from "react";
import { Avatar, Stack, IconButton, Popover, ListItem, ListItemButton, ListItemText, List, AppBar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

//helpers
import { helpers } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../store/usersSlice";
import logo from "../assets/img/logo.svg";

function Navbar() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { popoverOpen, popoverClose } = helpers;

  //global state
  const [user, setUser] = useState("");
  const userName = useSelector((state) => state.users.user.name);

  //popper state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useEffect(() => {
    setUser(sessionStorage.getItem("user"));
  }, [userName]);

  return (
    <AppBar sx={{ height: "80px", p: 2, mb: 3, position: "sticky", top: 0, zIndex: "2" }} className="Navbar">
      <Stack direction="row-reverse" spacing={2}>
        {user && (
          <>
            <Avatar className="avatar" aria-describedby={id} type="button" onClick={(e) => popoverOpen(e, setAnchorEl)} color="primary">
              {user.charAt(0).toUpperCase()}
            </Avatar>
            <IconButton onClick={() => navigate("/create-recipe")} variant="contained" color="primary">
              <AddIcon />
            </IconButton>
          </>
        )}

        <img
          alt="logo"
          style={{ left: "15px", bottom: "10%", cursor: "pointer" }}
          onClick={() => navigate("/")}
          className="logo"
          src={logo}
        />
      </Stack>

      {/* POPOVER */}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => popoverClose(setAnchorEl)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/my-profile");
                popoverClose(setAnchorEl);
              }}
            >
              <ListItemText primary="My profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/my-recipes");
                popoverClose(setAnchorEl);
              }}
            >
              <ListItemText primary="My recipes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(userLoggedOut());
                navigate("/login");
                popoverClose(setAnchorEl);
                setUser("");
              }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </AppBar>
  );
}

export default Navbar;
