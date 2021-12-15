require("dotenv").config();
const { Recipe } = require("../models/recipeModel");
const { User } = require("../models/userModel");
const mongoose = require("mongoose");
const recipes = require("./recipes");
const users = require("./users");
const config = require("../../config");
const bcrypt = require("bcrypt");

mongoose.connect(config.mongo).then(() => {
  console.log("seeding started");
});

var done = 0;
recipesDone = false;

recipes.forEach(async (recipe, i) => {
  let newRecipe = new Recipe({
    _id: recipe._id,
    name: recipe.name,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    recipeImage: recipe.recipeImage,
    author: recipe.author,
    description: recipe.description,
    category: recipe.category,
    rating: recipe.rating,
    isSeeded: recipe.isSeeded,
  });

  try {
    await newRecipe.save();
    done++;
  } catch (error) {
    console.log(error);
  }

  if (done === recipes.length) {
    console.log("seeding recipes done");
    done = 0;
    users.forEach(async (user, i) => {
      let hashedPassword = await bcrypt.hash(user.password, 12);
      let newUser = new User({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        recipes: user.recipes,
        active: user.active,
      });

      try {
        await newUser.save();
        done++;
      } catch (error) {
        console.log(error);
      }
      if (done === users.length) {
        console.log("seeding users done");
        console.log("all done");
        mongoose.disconnect();
      }
    });
  }
});
