import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import Home from "./Home";
import Recipe from "./Recipe";
import EditRecipe from "./EditRecipe";
import CreateRecipe from "./CreateRecipe";
import MyProfile from "./MyProfile";
import MyRecipes from "./MyRecipes";
import MoreLikeThisCard from "./MoreLikeThisCard";
import Latest from "./Latest";
import TopRatings from "./TopRatings";
import Recipes from "./Recipes";
import ChangePassword from "./ChangePassword";

export {
  Login,
  Navbar,
  Register,
  Home,
  Recipe,
  EditRecipe,
  CreateRecipe,
  MyProfile,
  MyRecipes,
  MoreLikeThisCard,
  Latest,
  TopRatings,
  Recipes,
  ChangePassword,
};

// classes
export const useStyles = makeStyles({});

//theme
export const theme = createTheme({
  palette: {
    primary: {
      main: "#ED6C30",
      contrastText: "#F4ECD9",
    },
    secondary: {
      main: "#285678",
      contrastText: "#F4ECD9",
    },
  },
});
