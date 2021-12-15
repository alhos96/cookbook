const { Recipe } = require("../models/recipeModel");
const { User } = require("../models/userModel");

exports.createRecipe = async (req, res, next) => {
  const { name, ingredients, instructions, description, category, rating } = req.body;
  const { userId, userName } = req.userData;

  let ingredArr = ingredients.split(",");

  const newRecipe = new Recipe({
    name,
    ingredients: ingredArr,
    instructions,
    recipeImage: req.file ? req.file.filename : "noImage.png",
    author: userName,
    description,
    category,
    rating,
  });

  try {
    await newRecipe.save();
  } catch (error) {
    res.status(500).json({ message: "Could not save recipe." });
    const err = new Error("Could not save recipe.", 500);
    return next(err);
  }

  let user;
  try {
    user = await User.findOne({ _id: userId });
  } catch (error) {
    return next(error);
  }

  user.recipes.push(newRecipe._id);
  await user.save();

  let recipes;
  try {
    recipes = await Recipe.find();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ recipes });
};

exports.getUsersRecipes = async (req, res, next) => {
  let id = req.userData.userId;
  let user;

  try {
    user = await User.findById(id).populate("recipes");
  } catch (error) {
    return next(error);
  }
  res.status(201).json({ recipes: user.recipes, user: req.userData.userName });
};

exports.getAllRecipes = async (req, res, next) => {
  let recipes;
  let user = req.userData.userName;
  try {
    recipes = await Recipe.find();
  } catch (error) {
    return next(error);
  }
  res.status(201).json({ recipes, user });
};

exports.getOneRecipe = async (req, res, next) => {
  let recipe;
  let id = req.params.id;
  try {
    recipe = await Recipe.findById(id);
  } catch (error) {
    res.status(203).json({ message: "No recipe" });

    return next(error);
  }
  res.status(201).json(recipe);
};

exports.getSimilarRecipes = async (req, res, next) => {
  let recipe;
  let category = req.params.category;

  try {
    similarRecipes = await Recipe.find({ category });
  } catch (error) {
    res.status(203).json({ message: "No recipe" });

    return next(error);
  }

  res.status(201).json(similarRecipes);
};

exports.updateRecipe = async (req, res, next) => {
  const recipeId = req.params.id;
  const { name, ingredients, instructions, recipeImage, descritpion, category, rating } = req.body;
  const { userId, userName } = req.userData;

  let ingredArr = ingredients.split(",");

  const updatedRecipe = {
    name,
    ingredients: ingredArr,

    author: userName,
    instructions,
    recipeImage: req.file.filename,
    descritpion,
    category,
    rating,
    _id: recipeId,
  };

  try {
    await Recipe.findByIdAndUpdate(recipeId, updatedRecipe, { new: true });
  } catch (error) {
    return next(error);
  }

  res.status(201).json(updatedRecipe);
};

exports.rateRecipe = async (req, res, next) => {
  const recipeId = req.params.id;

  const { name, ingredients, instructions, recipeImage, descritpion, category, rating, author } = req.body;

  const { userId, userName } = req.userData;

  let recipeToRate;

  try {
    recipeToRate = await Recipe.findById(recipeId);
  } catch (error) {
    return next(error);
  }

  let ratings = recipeToRate.rating;
  let usersWhoRatedArr = recipeToRate.usersWhoRated;

  ratings.push(rating);
  usersWhoRatedArr.push(userName);

  const updatedRecipe = {
    name,
    ingredients,
    author,
    instructions,
    recipeImage,
    descritpion,
    category,
    rating: ratings,
    usersWhoRated: usersWhoRatedArr,
    _id: recipeId,
  };

  try {
    await Recipe.findByIdAndUpdate(recipeId, updatedRecipe, { new: true });
  } catch (error) {
    return next(error);
  }

  res.status(201).json(updatedRecipe);
};

exports.deleteRecipe = async (req, res, next) => {
  const recipeId = req.params.id;
  const userId = req.userData.userId;

  try {
    await Recipe.findByIdAndDelete(recipeId);
  } catch (error) {
    return next(error);
  }

  let user;

  try {
    user = await User.findById(userId).populate("recipes");
  } catch (error) {
    return next(error);
  }
  res.status(201).json({ recipes: user.recipes, user: req.userData.userName });
};
