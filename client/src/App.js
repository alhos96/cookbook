import React from "react";
import {
  Navbar,
  Login,
  Register,
  Home,
  Recipe,
  EditRecipe,
  MyProfile,
  MyRecipes,
  CreateRecipe,
  Recipes,
  ChangePassword,
} from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <Container className="App">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/recipes/edit-recipe/:id"
              element={
                <PrivateRoute>
                  <EditRecipe />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-recipe"
              element={
                <PrivateRoute>
                  <CreateRecipe />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-recipes"
              element={
                <PrivateRoute>
                  <MyRecipes />
                </PrivateRoute>
              }
            />
            <Route
              path="/recipes/recipe/:id"
              element={
                <PrivateRoute>
                  <Recipe />
                </PrivateRoute>
              }
            />
            <Route
              path="/recipes"
              element={
                <PrivateRoute>
                  <Recipes />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-profile"
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <PrivateRoute>
                  <ChangePassword />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
