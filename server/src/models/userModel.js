const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;
exports.User = model(
  "User",
  new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      recipes: [{ type: Types.ObjectId, ref: "Recipe" }],
      active: { type: Boolean, default: true },
      confirmPassword: String,
    },
    { timestamps: true }
  )
);
