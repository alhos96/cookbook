import React, { useState, useEffect } from "react";
import { Box, Container, MenuItem, Typography, TextField, Button, Divider, Input, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

//helpers
import axios from "axios";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../store/recipesSlice";

function CreateRecipe() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeHandler, onSubmit, getSomething, postSomething } = helpers;
  const { post, get } = methods;

  //global state
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  //local state

  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState(user);
  const [rating, setRating] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [label, setLabel] = useState("Ingredients");
  const [categories, setCategories] = useState([]);
  //recipe that will be returned as response
  const [createdRecipe, setCreatedRecipe] = useState([]);

  //side effects
  useEffect(() => {
    getSomething(get, "categories.json", setCategories);
  }, []);

  //function
  function createRecipe() {
    const newRecipe = new FormData();

    newRecipe.append("img", img);
    newRecipe.append("author", author);
    newRecipe.append("category", category);
    newRecipe.append("instructions", instructions);
    newRecipe.append("ingredients", ingredients);
    newRecipe.append("rating", rating);
    newRecipe.append("description", description);
    newRecipe.append("name", name);
    axios.post("http://localhost:5000/recipes/create-recipe", newRecipe, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  return (
    <Box className="CreateRecipe" style={{ maxWidth: "768px", margin: "auto" }}>
      <Typography color="primary" gutterBottom variant="h6" component="div">
        Create Recipe
      </Typography>
      <img src={file} width="60px" height="50px" />
      <Box
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/");
          createRecipe();
        }}
        component="form"
        enctype="multipart/form-data"
        fullWidth
      >
        <label htmlFor="icon-button-file">
          <input
            onChange={(e) => {
              setFile(URL.createObjectURL(e.target.files[0]));
              setImg(e.target.files[0]);
            }}
            type="file"
            name="img"
          />
          <Typography variant="body2" children="Upload Photo" />
        </label>
        <br></br>
        <TextField
          onChange={(e) => setName(e.target.value)}
          size="medium"
          margin="dense"
          required
          type="text"
          name="name"
          label="Name"
          fullWidth
        />

        <br></br>
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          size="medium"
          name="description"
          margin="dense"
          required
          type="text"
          label="Description"
          fullWidth
        />
        <br></br>
        <TextField
          onChange={(e) => setIngredients(e.target.value)}
          size="medium"
          name="ingredients"
          margin="dense"
          required
          type="text"
          label={label}
          onFocus={() => setLabel("Please use comma to seperate ingredients")}
          onBlur={() => setLabel("Ingredients")}
          fullWidth
        />
        <br></br>
        <TextField
          onChange={(e) => setInstructions(e.target.value)}
          size="medium"
          name="instructions"
          margin="dense"
          required
          type="text"
          label="Instructions"
          fullWidth
        />
        <br></br>
        <TextField
          labelId="select"
          id="select"
          label="Category"
          name="category"
          fullWidth
          margin="dense"
          onChange={(e) => setCategory(e.target.value)}
          select
        >
          {categories.map((cat, i) => {
            return (
              <MenuItem value={cat} key={i}>
                {cat}
              </MenuItem>
            );
          })}
        </TextField>
        <br></br>

        <Divider sx={{ mt: 2 }} />

        <Button sx={{ mt: 2, mb: 2 }} variant="contained" disableElevation type="submit" children="create recipe" fullWidth />
      </Box>
    </Box>
  );
}

export default CreateRecipe;
