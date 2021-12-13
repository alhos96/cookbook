import { combineReducers } from "redux";
import recipesSlice from "./recipesSlice";
import usersReducers from "./usersSlice";

export default combineReducers({
  users: usersReducers,
  recipes: recipesSlice,
});
