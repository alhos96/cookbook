const express = require("express");
const router = express.Router();
const fileUpload = require("../midleware/multer");

const {
  createRecipe,
  getUsersRecipes,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  getOneRecipe,
  getSimilarRecipes,
  rateRecipe,
} = require("../controlers/recipeControlers");

router.post("/create-recipe", fileUpload.single("img"), createRecipe);
router.get("/users-recipes", getUsersRecipes);
router.get("/recipe/:id", getOneRecipe);
router.get("/edit-recipe/:id", getOneRecipe);
router.get("/all-recipes", getAllRecipes);
router.get("/similar-recipes/:category", getSimilarRecipes);
router.patch("/update-recipe/:id", fileUpload.single("img"), updateRecipe);
router.patch("/rate-recipe/:id", rateRecipe);
router.delete("/delete-recipe/:id", deleteRecipe);

module.exports = router;
