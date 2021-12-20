import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  ButtonGroup,
} from "@mui/material";
//helpers
import moment from "moment";
import { getUserRecipes, deleteRecipe } from "../store/recipesSlice";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function MyRecipes() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { average, sortRatings, sortLatest, sortAlphabeticalOrder, sortCategory } = helpers;
  const { get, remove } = methods;

  //global state
  const token = sessionStorage.getItem("token");
  const recipes = useSelector((state) => state.recipes.userRecipes);

  //local state
  const [data, setData] = useState([]);
  const [orderDirection, setOrderDirection] = useState("asc");

  //side effects
  useEffect(() => {
    dispatch(getUserRecipes("/recipes/users-recipes", get, token, false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setData(recipes);
  }, [recipes]);

  return (
    <Box>
      <Typography color="primary" gutterBottom variant="h6" component="div">
        My Recipes
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell key="recipe">
              <TableSortLabel
                onClick={() => {
                  if (orderDirection === "asc") {
                    setOrderDirection("desc");
                  } else if (orderDirection === "desc") {
                    setOrderDirection("asc");
                  }
                  sortAlphabeticalOrder(recipes, recipes.length, orderDirection, setData);
                }}
              >
                Recipe
              </TableSortLabel>{" "}
            </TableCell>
            <TableCell key="rating">
              <TableSortLabel
                onClick={() => {
                  if (orderDirection === "asc") {
                    setOrderDirection("desc");
                  } else if (orderDirection === "desc") {
                    setOrderDirection("asc");
                  }
                  sortRatings(recipes, average, recipes.length, orderDirection, setData);
                }}
              >
                Rating
              </TableSortLabel>
            </TableCell>
            <TableCell key="date">
              <TableSortLabel
                onClick={() => {
                  if (orderDirection === "asc") {
                    setOrderDirection("desc");
                  } else if (orderDirection === "desc") {
                    setOrderDirection("asc");
                  }
                  sortLatest(recipes, recipes.length, orderDirection, setData);
                }}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell key="category">
              <TableSortLabel
                onClick={() => {
                  if (orderDirection === "asc") {
                    setOrderDirection("desc");
                  } else if (orderDirection === "desc") {
                    setOrderDirection("asc");
                  }
                  sortCategory(recipes, recipes.length, orderDirection, setData);
                }}
              >
                Category
              </TableSortLabel>
            </TableCell>
            <TableCell key="actions">
              <TableSortLabel>Actions</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((recipe, index) => {
              let date = moment(recipe.createdAt).format("YYYY-MM-DD hh:mm");
              return (
                <TableRow>
                  <TableCell>{recipe.name}</TableCell>
                  <TableCell>
                    <Rating name="half-rating" value={+average(recipe.rating)} precision={0.5} readOnly />
                  </TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{recipe.category}</TableCell>
                  <TableCell>
                    <ButtonGroup size="small">
                      <Button onClick={(e) => navigate(`/recipes/edit-recipe/${e.target.id}`)} id={recipe._id} size="small">
                        edit
                      </Button>
                      <Button onClick={(e) => navigate(`/recipes/recipe/${e.target.id}`)} id={recipe._id} size="small">
                        view
                      </Button>
                      <Button
                        id={recipe._id}
                        size="small"
                        onClick={(e) => {
                          dispatch(deleteRecipe(`/recipes/delete-recipe/${e.target.id}`, remove, token, setData));
                        }}
                      >
                        delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <tr>
              <td>You don't have any recipes :\</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}

export default MyRecipes;
