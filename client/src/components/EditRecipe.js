import React, { useState, useEffect } from "react";
import { Box, Container, FormControl, Typography, TextField, Button, Divider, Input, IconButton, Rating } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

//helpers
import { getOneRecipe, userLeft, editRecipe } from "../store/recipesSlice";
import axios from "axios";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function EditRecipe() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeHandler, onSubmit, average } = helpers;
  const { get, patch } = methods;
  const [expanded, setExpanded] = React.useState(false);

  //global state
  const recipe = useSelector((state) => state.recipes.oneRecipe);
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");

  //local state
  const url = window.location.pathname;
  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  //side effects
  useEffect(() => {
    dispatch(getOneRecipe(url, get, token));
    return () => {
      dispatch(userLeft());
    };
  }, [url]);

  useEffect(() => {
    setImg(recipe.recipeImage);
    setName(recipe.name);
    setAuthor(recipe.author);
    setRating(recipe.rating);
    setDescription(recipe.description);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setCategory(recipe.category);
  }, [recipe]);

  // function
  function editRecipe(id) {
    const newRecipe = new FormData();

    newRecipe.append("img", img);
    newRecipe.append("author", author);
    newRecipe.append("category", category);
    newRecipe.append("instructions", instructions);
    newRecipe.append("ingredients", ingredients);
    newRecipe.append("rating", rating);
    newRecipe.append("description", description);
    newRecipe.append("name", name);
    axios.patch(`http://localhost:5000/recipes/update-recipe/${id}`, newRecipe, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  return (
    <Box className="EditRecipe" style={{ maxWidth: "768px", margin: "auto" }}>
      <Typography color="primary" gutterBottom variant="h6" component="div">
        Edit Recipe
      </Typography>
      {file && <img src={file || `http://localhost:5000/uploads/${img}`} width="60px" height="50px" />}
      {recipe && (
        <Box
          onSubmit={(e) => {
            e.preventDefault();
            editRecipe(recipe._id);
          }}
          component="form"
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
            sx={{ mt: 2 }}
            margin="dense"
            required
            value={name}
            type="text"
            name="name"
            label="Name"
            fullWidth
          />
          <br></br>

          <TextField size="medium" name="author" margin="dense" required value={author} disabled type="text" label="Author" fullWidth />
          <br></br>
          {rating && <Rating readOnly name="rating" defaultValue={average(rating)} precision={0.5} />}
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            size="medium"
            name="description"
            margin="dense"
            required
            defaultValue={description}
            type="text"
            multiline
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
            defaultValue={ingredients}
            type="text"
            multiline
            label="Ingredients"
            fullWidth
          />
          <br></br>
          <TextField
            onChange={(e) => setInstructions(e.target.value)}
            size="medium"
            name="instructions"
            margin="dense"
            required
            defaultValue={instructions}
            type="text"
            multiline
            label="Instructions"
            fullWidth
          />
          <br></br>

          <Divider sx={{ mt: 2 }} />

          <Button sx={{ mt: 2, mb: 2 }} variant="contained" disableElevation type="submit" children="edit recipe" fullWidth />
        </Box>
      )}
    </Box>
  );
}

export default EditRecipe;
