import React, { useEffect } from "react";
import { Recipes, TopRatings, Latest } from ".";
import { Box, CircularProgress } from "@mui/material";
import { getRecipes } from "../store/recipesSlice";

//helpers
import { methods } from "../helpers";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  //helpers

  const dispatch = useDispatch();
  const { get } = methods;

  //global state
  const token = sessionStorage.getItem("token");
  const recipes = useSelector((state) => state.recipes.recipes);

  //side effects
  useEffect(() => {
    dispatch(getRecipes("/recipes/all-recipes", get, token, undefined));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {recipes.length > 0 ? (
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
