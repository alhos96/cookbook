import React, { useState, useEffect } from "react";
import { Recipes, TopRatings, Latest } from ".";
import { Box, CircularProgress } from "@mui/material";
import api from "../store/midleware/api";
import { getRecipes } from "../store/recipesSlice";
import axios from "axios";
//helpers
import { userLogin } from "../store/usersSlice";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeHandler, onSubmit } = helpers;
  const { get } = methods;

  //global state
  const token = sessionStorage.getItem("token");
  const recipes = useSelector((state) => state.recipes.recipes);

  //side effects
  useEffect(() => {
    dispatch(getRecipes("/recipes/all-recipes", get, token, undefined));
  }, []);

  return (
    <>
      {recipes ? (
        <Box className="Home-wrapp">
          {" "}
          <Recipes />
          <TopRatings />
          <Latest />
        </Box>
      ) : (
        <Box sx={{ m: "auto", pt: 7, width: "fit-content" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default Home;
