import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./actions";
const slice = createSlice({
  initialState: {
    recipes: false,
    oneRecipe: false,
    similarRecipes: false,
    userRecipes: false,
    categories: false,
    message: "",
    error: "",
  },
  name: "recipes",
  reducers: {
    recipesRecieved: (recipes, { payload }) => {
      recipes.recipes = payload.data.recipes;
      recipes.user = payload.data.user;
      sessionStorage.setItem("user", payload.data.user);
    },
    userRecipesRecieved: (recipes, { payload }) => {
      recipes.userRecipes = payload.data.recipes;
    },
    oneRecipeRecieved: (recipes, { payload }) => {
      recipes.oneRecipe = payload.data;
    },
    similarRecipesRecieved: (recipes, { payload }) => {
      recipes.similarRecipes = payload.data;
    },
    recipeCreated: (recipes, { payload }) => {
      recipes.recipes = payload.data.recipes;
      recipes.message = "Recipe created!";
    },
    gotError: (recipes, { payload }) => {
      recipes.error = payload;
    },
    userLeft: (recipes, { payload }) => {
      recipes.oneRecipe = false;
      recipes.message = "";
    },
    recipeUpdated: (recipes, { payload }) => {
      recipes.oneRecipe = payload.data;
      recipes.message = "Recipe updated!";
    },
  },
});

export const getRecipes = (url, method, token) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      method,
      token,
      onSuccess: recipesRecieved.type,
      onError: gotError.type,
    })
  );
};

export const getUserRecipes = (url, method, token, setLocalState) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      method,
      token,
      setLocalState,
      onSuccess: userRecipesRecieved.type,
      onError: gotError.type,
    })
  );
};

export const createRecipe = (url, userInput, method, token) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      userInput,
      method,
      token,
      onSuccess: recipeCreated.type,
      onError: gotError.type,
    })
  );
};
export const editRecipe = (url, userInput, method, token) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      userInput,
      method,
      token,
      onSuccess: recipeUpdated.type,
      onError: gotError.type,
    })
  );
};
export const getOneRecipe = (url, method, token) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      method,
      token,
      onSuccess: oneRecipeRecieved.type,
      onError: gotError.type,
    })
  );
};
export const getSimilarRecipes = (url, method, token) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      method,
      token,
      onSuccess: similarRecipesRecieved.type,
      onError: gotError.type,
    })
  );
};

export const deleteRecipe = (url, method, token, setLocalState) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      method,
      token,
      setLocalState,
      onSuccess: userRecipesRecieved.type,
      onError: gotError.type,
    })
  );
};

export const {
  gotError,
  recipesRecieved,
  oneRecipeRecieved,
  recipeUpdated,
  similarRecipesRecieved,
  recipeCreated,
  userRecipesRecieved,
  userLeft,
} = slice.actions;
export default slice.reducer;
