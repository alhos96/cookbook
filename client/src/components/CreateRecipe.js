import React, { useState, useEffect } from "react";
import { Box, MenuItem, Typography, TextField, Button, Divider } from "@mui/material";

//helpers
import axios from "axios";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  //helpers
  const navigate = useNavigate();

  const { getSomething } = helpers;
  const { get } = methods;

  //global state
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  //local state

  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  // eslint-disable-next-line
  const [author, setAuthor] = useState(user);
  // eslint-disable-next-line
  const [rating, setRating] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [label, setLabel] = useState("Ingredients");
  const [categories, setCategories] = useState([]);

  //side effects
  // eslint-disable-next-line
  useEffect(() => {
    getSomething(get, "categories.json", setCategories);
  }, [get, getSomething]);

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
      {file && <img alt="upload" src={file} width="60px" height="50px" />}
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
          value=""
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
