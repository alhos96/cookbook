const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

exports.Recipe = model(
  "Recipe",
  new Schema(
    {
      name: String,
      ingredients: [],
      instructions: String,
      recipeImage: String,
      author: String,
      description: String,
      category: String,
      rating: [],
      usersWhoRated: [],
    },
    { timestamps: true }
  )
);
